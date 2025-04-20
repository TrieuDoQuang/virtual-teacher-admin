"use server";
import { apiPrivate } from "@/api/axios";
import { Response } from "@/models/response.model";

export async function learnersByLevel() {
    const response: Response<any> = await apiPrivate.get("/statistics/learnersByLevel");
    return response.data;
}

export async function lessonsByLevel() {
    const response: Response<any> = await apiPrivate.get("/statistics/lessonsByLevel");
    return response.data;
}

export async function interactionCount() {
    const response: Response<any> = await apiPrivate.get("/statistics/interactionCount");
    return response.data;
}

export async function conversationCompletionStats() {
    const response: Response<any> = await apiPrivate.get("/statistics/conversationCompletionStats");
    return response.data;
}


