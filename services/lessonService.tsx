"use server";

import { PaginationResponseResult, Response } from "@/models/response.model";
import { Lesson } from "@/types";
import { apiPrivate } from "@/api/axios";

export async function getAllLessons() {
    const response: PaginationResponseResult<Lesson[]> = await apiPrivate.post("/lesson/getAllLessons");
    return response?.data?.data?.results;
}

export async function recommendLesson(prompt: string) {
    const response: Response<Lesson> = await apiPrivate.post("/lesson/recommendLesson", { prompt });
    return response?.data;
}

export async function createLesson(lesson: Lesson) {
    const response: Response<Lesson> = await apiPrivate.post("/lesson/createLesson", lesson);
    return response?.data;
}

export async function deleteLesson(lessonIds: string[]) {
    const response: Response<Lesson> = await apiPrivate.delete("/lesson/deleteLessons", { data: { ids: lessonIds } });
    
    return response?.data;
}

export async function updateLesson(lesson: Lesson) {
    console.log(lesson);
    
    const response: Response<Lesson> = await apiPrivate.put("/lesson/updateLesson", lesson);
    return response?.data;
}






