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
import { createLesson, recommendLesson, updateLesson } from "@/services/lessonService";
import { toast } from "sonner";

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
  durationEstimation: z.number().min(1, "Duration Estimation is required"),
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
  const [promptInput, setPromptInput] = useState(
    "I want to generate a topic about sport, A1 level, estimate 20 minutes"
  );
  const [showPromptInput, setShowPromptInput] = useState(false);

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

  const generateWithAI = async () => {
    try {
      setIsGenerating(true);

      const response = await recommendLesson(promptInput);

      const result: any = response;

      if (result) {
        setValue("title", result?.data?.title);
        setValue("level", result?.data?.level);
        setValue("topic", result?.data?.topic);
        setValue("learningObjectives", result?.data?.learningObjectives);
        setValue("vocabulary", result?.data?.vocabulary);
        setValue("conversationStructure", result?.data?.conversationStructure);
        setValue("durationEstimation", result?.data?.durationEstimation);

        // Hide prompt input after successful generation
        setShowPromptInput(false);
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
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
        setShowPromptInput(false);
        toast.success("Lesson created successfully");
        reset();
        resetData?.();
      }
    }
    else if (action === VirtualTeacherAction.UPDATE) {
      lesson.id = data?.id;

      console.log(lesson);
      
      const response: any = await updateLesson(lesson);

      if (response.statusCode === 200) {
        onOpenChange(false);
        toast.success("Lesson updated successfully");
        setShowPromptInput(false); 
        reset();
        resetData?.();

      }
    }
  };

  const onClickCancel = () => {
    onOpenChange(false);
    setShowPromptInput(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] p-0 overflow-hidden bg-white dark:bg-slate-950 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
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
          <div className="py-3 border-b">
            <div className="flex flex-col gap-2">
              {showPromptInput ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="flex-1 min-h-[60px] max-h-[100px]"
                      placeholder="Describe the lesson you want to generate..."
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPromptInput(false)}
                      disabled={isGenerating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={generateWithAI}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-3 w-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPromptInput(true)}
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v6.5M12 2l5 3.5M12 2 7 5.5M17 17.5L12 21v-6.5M12 14.5 7 17.5 12 21M7 6.5v11" />
                  </svg>
                  Generate with AI
                </Button>
              )}
            </div>
          </div>

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
                      <Label htmlFor="title" className="font-medium">
                        Title <span className="text-red-500">*</span>
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
                      <Label htmlFor="level" className="font-medium">
                        Level <span className="text-red-500">*</span>
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
                    <Label htmlFor="topic" className="font-medium">
                      Topic <span className="text-red-500">*</span>
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
                    <Label htmlFor="durationEstimation" className="font-medium">
                      Duration (minutes) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="durationEstimation"
                      type="number"
                      {...register("durationEstimation")}
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
                <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Lesson Content
                </h3>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="learningObjectives"
                        className="font-medium"
                      >
                        Learning Objectives{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs text-slate-500">
                        List key skills students will acquire
                      </span>
                    </div>
                    <Textarea
                      id="learningObjectives"
                      {...register("learningObjectives")}
                      className={cn(
                        "h-[120px] resize-none transition-all",
                        errors.learningObjectives &&
                        "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="e.g., 'By the end of this lesson, students will be able to...'"
                    />
                    {errors.learningObjectives && (
                      <p className="text-sm text-red-500">
                        {errors.learningObjectives.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="vocabulary" className="font-medium">
                        Vocabulary <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs text-slate-500">
                        List key words and phrases
                      </span>
                    </div>
                    <Textarea
                      id="vocabulary"
                      {...register("vocabulary")}
                      className={cn(
                        "h-[120px] resize-none transition-all",
                        errors.vocabulary &&
                        "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Enter key vocabulary words and phrases for this lesson"
                    />
                    {errors.vocabulary && (
                      <p className="text-sm text-red-500">
                        {errors.vocabulary.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="conversationStructure"
                        className="font-medium"
                      >
                        Conversation Structure{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs text-slate-500">
                        Outline the lesson flow
                      </span>
                    </div>
                    <Textarea
                      id="conversationStructure"
                      {...register("conversationStructure")}
                      className={cn(
                        "h-[120px] resize-none transition-all",
                        errors.conversationStructure &&
                        "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                      placeholder="Describe how the conversation should flow (introduction, practice, conclusion, etc.)"
                      style={{  }}
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
              disabled={isSubmitting}
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
