"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { Lesson } from "@/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  createLesson,
  recommendLesson,
  updateLesson,
} from "@/services/lessonService";
import { toast } from "sonner";
import { Loader2, Info, CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomToast } from "@/components/custom-toast";
// Schema definition remains unchanged
const dialogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  level: z.string().min(1, "Level is required"),
  topic: z.string().min(1, "Topic is required"),
  learningObjectives: z.string().min(1, "Learning Objectives is required"),
  vocabulary: z.string().min(1, "Vocabulary is required"),
  conversationStructure: z
    .string()
    .min(1, "Conversation Structure is required"),
  durationEstimation: z
    .number()
    .min(10, "Duration must be at least 10 minutes")
    .max(30, "Duration must not exceed 30 minutes"),
});

type DialogFormData = z.infer<typeof dialogSchema>;

interface AddEditLessonDialogProps {
  action: VirtualTeacherAction;
  data?: Lesson | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resetData?: () => void;
}

export function AddEditLessonDialog({
  action,
  data,
  isOpen,
  onOpenChange,
  resetData,
}: AddEditLessonDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    
  } = useForm<DialogFormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      title: "",
      level: "",
      topic: "",
      learningObjectives: "",
      vocabulary: "",
      conversationStructure: "",
      durationEstimation: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (data && action === VirtualTeacherAction.UPDATE) {
        setValue("title", data.title);
        setValue("level", data.level);
        setValue("topic", data.topic);
        setValue("learningObjectives", data.learningObjectives);
        setValue("vocabulary", data.vocabulary);
        setValue("conversationStructure", data.conversationStructure);
        setValue("durationEstimation", data.durationEstimation);
      } else {
        reset({
          title: "",
          level: "",
          topic: "",
          learningObjectives: "",
          vocabulary: "",
          conversationStructure: "",
          durationEstimation: 0,
        });
      }
    }
  }, [isOpen, data, action, setValue, reset]);

  const checkValidation = (isCheckAll: boolean = false) => {
    const title = watch("title");
    const level = watch("level");
    const topic = watch("topic");
    const durationEstimation = Number(watch("durationEstimation"));

    if (isCheckAll) {
      return !title || !level || !topic || !durationEstimation || durationEstimation < 10 || durationEstimation > 30;
    }

    return !title || !level || !topic || !durationEstimation;
  };

  const generateWithAI = async () => {
    try {
      setIsGenerating(true);
      const promptInput = `I want to generate a topic about ${watch(
        "topic"
      )}, ${watch("level")} level, estimate ${watch(
        "durationEstimation"
      )} minutes`;

      const response = await recommendLesson(promptInput);

      const result: any = response;

      if (result) {
        toast.custom((t) => (
          <CustomToast message="Lesson generated successfully" type="success" />
        ));
        setValue("learningObjectives", result?.data?.learningObjectives);
        setValue("vocabulary", result?.data?.vocabulary);
        setValue("conversationStructure", result?.data?.conversationStructure);
        setValue("durationEstimation", result?.data?.durationEstimation);

        // Hide prompt input after successful generation
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      toast.custom((t) => (
        <CustomToast message="Error generating AI content" type="error" />
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (formData: DialogFormData) => {
    const lesson: any = {
      title: formData.title,
      level: formData.level,
      topic: formData.topic,
      learningObjectives: formData.learningObjectives,
      vocabulary: formData.vocabulary,
      conversationStructure: formData.conversationStructure,
      durationEstimation: formData.durationEstimation,
    };

    if (action === VirtualTeacherAction.CREATE) {
      const response: any = await createLesson(lesson);

      if (response.statusCode === 200) {
        onOpenChange(false);
        toast.custom((t) => (
          <CustomToast message="Lesson created successfully" type="success" />
        ));
        reset();
        resetData?.();
      }
    } else if (action === VirtualTeacherAction.UPDATE) {
      lesson.id = data?.id;

      console.log(lesson);

      const response: any = await updateLesson(lesson);

      if (response.statusCode === 200) {
        onOpenChange(false);
        toast.success("Lesson updated successfully");
        reset();
        resetData?.();
      }
    }
  };

  const onClickCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[800px] lg:max-w-[900px] p-0 overflow-hidden bg-white dark:bg-slate-950 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="p-6 bg-slate-50/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-none">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {action === VirtualTeacherAction.CREATE
              ? "Add New Lesson"
              : "Edit Lesson"}
          </DialogTitle>
          <DialogDescription className="text-base text-slate-600 dark:text-slate-400 mt-1">
            {action === VirtualTeacherAction.CREATE
              ? "Add a new lesson to the system. Fill in all the required fields below."
              : "Update the lesson details. Modify the fields you want to change."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6">
          {/* AI Generation Section */}

          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent pr-2">
            {/* Basic Information Section */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-medium flex items-center gap-2">
                        Title <span className="text-red-500">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter a descriptive title for your lesson</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="title"
                        {...register("title")}
                        className={cn(
                          "transition-all",
                          errors.title &&
                            "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                        )}
                        placeholder="Enter lesson title"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level" className="font-medium flex items-center gap-2">
                        Level <span className="text-red-500">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Select the appropriate proficiency level for your students</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("level", value)}
                        value={watch("level")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A1">A1 - Beginner</SelectItem>
                          <SelectItem value="A2">A2 - Elementary</SelectItem>
                          <SelectItem value="B1">B1 - Intermediate</SelectItem>
                          <SelectItem value="B2">
                            B2 - Upper Intermediate
                          </SelectItem>
                          <SelectItem value="C1">C1 - Advanced</SelectItem>
                          <SelectItem value="C2">C2 - Mastery</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("level")} />
                      {errors.level && (
                        <p className="text-sm text-red-500">
                          {errors.level.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic" className="font-medium flex items-center gap-2">
                      Topic <span className="text-red-500">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-slate-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter the main subject or theme of your lesson</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="topic"
                      {...register("topic")}
                      className={cn(
                        "transition-all",
                        errors.topic &&
                          "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Enter lesson topic (e.g., 'Daily Routines', 'Business Negotiations')"
                    />
                    {errors.topic && (
                      <p className="text-sm text-red-500">
                        {errors.topic.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durationEstimation" className="font-medium flex items-center gap-2">
                      Duration (minutes) <span className="text-red-500">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-slate-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter lesson duration (10-30 minutes)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="durationEstimation"
                      type="number"
                      {...register("durationEstimation", {
                        valueAsNumber: true,
                      })}
                      className={cn(  
                        "max-w-[180px] transition-all",
                        errors.durationEstimation &&
                          "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="0"
                    />
                    {errors.durationEstimation && (
                      <p className="text-sm text-red-500">
                        {errors.durationEstimation.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content Section */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400">
                    Lesson Content
                  </h3>

                  {/* Generate With AI */}
                  <Button
                    type="button"
                    variant="default"
                    onClick={generateWithAI}
                    className="px-4"
                    disabled={checkValidation() || isSubmitting || isGenerating}
                  >
                    Generate With AI
                    {isGenerating && (
                      <span className="ml-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </span>
                    )}
                  </Button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="learningObjectives" className="font-medium flex items-center gap-2">
                        Learning Objectives <span className="text-red-500">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>List the specific skills and knowledge students will gain from this lesson</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <span className="text-xs text-slate-500">
                        List key skills students will acquire
                      </span>
                    </div>
                    <Textarea
                      id="learningObjectives"
                      {...register("learningObjectives")}
                      className={cn(
                        "min-h-[120px] h-auto max-h-[400px] whitespace-pre-wrap break-words transition-all",
                        errors.learningObjectives &&
                          "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="e.g., 'By the end of this lesson, students will be able to...'"
                      rows={5}
                    />
                    {errors.learningObjectives && (
                      <p className="text-sm text-red-500">
                        {errors.learningObjectives.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="vocabulary" className="font-medium flex items-center gap-2">
                        Vocabulary <span className="text-red-500">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>List key words and phrases that will be taught in this lesson</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <span className="text-xs text-slate-500">
                        List key words and phrases
                      </span>
                    </div>
                    <Textarea
                      id="vocabulary"
                      {...register("vocabulary")}
                      className={cn(
                        "min-h-[120px] h-auto max-h-[400px] whitespace-pre-wrap break-words transition-all",
                        errors.vocabulary &&
                          "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Enter key vocabulary words and phrases for this lesson"
                      rows={5}
                    />
                    {errors.vocabulary && (
                      <p className="text-sm text-red-500">
                        {errors.vocabulary.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="conversationStructure" className="font-medium flex items-center gap-2">
                        Conversation Structure <span className="text-red-500">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Describe the flow and organization of your lesson</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <span className="text-xs text-slate-500">
                        Outline the lesson flow
                      </span>
                    </div>
                    <Textarea
                      id="conversationStructure"
                      {...register("conversationStructure")}
                      className={cn(
                        "min-h-[120px] h-auto max-h-[400px] whitespace-pre-wrap break-words transition-all",
                        errors.conversationStructure &&
                          "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Describe how the conversation should flow (introduction, practice, conclusion, etc.)"
                      rows={5}
                    />
                    {errors.conversationStructure && (
                      <p className="text-sm text-red-500">
                        {errors.conversationStructure.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-none flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClickCancel}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting || checkValidation(true)}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting
                ? "Saving..."
                : action === VirtualTeacherAction.CREATE
                ? "Create Lesson"
                : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

