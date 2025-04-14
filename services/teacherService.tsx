'use server'

import { api, apiPrivate } from "@/api/axios";  
import { PaginationResponseResult, Response } from "@/models/response.model";
import { CreateTeacherRequest, Teacher } from "@/models/teacherModel";

export async function getAllTeacher() {
    try {
        const response: PaginationResponseResult<Teacher[]> = await api.post("/teacher/getAllTeachers");
        return response.data.data.results;
    } catch (error) {
        console.error("Error getting all teachers:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to get all teachers"
        );
    }
}

export async function createTeacher(teacher: CreateTeacherRequest) {
    try {
        const response: Response<Teacher> = await apiPrivate.post("/teacher/createTeacher", teacher);
        return response?.data;
    } catch (error) {
        console.error("Error creating teacher:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to create teacher!"
        );
    }
}

export async function updateTeacher(teacher: Teacher) {
    try {
        const response: Response<Teacher> = await apiPrivate.put("/teacher/updateTeacher", teacher);
        return response?.data;
    } catch (error) {
        console.error("Error updating teacher:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to update teacher"
        );
    }
}

export async function deleteTeachers(ids: string[]) {
    try {
        const response: Response<Teacher> = await apiPrivate.delete(`/teacher/deleteTeachers`, { data: { ids: ids } });
        return response?.data;
    } catch (error) {
        console.error("Error deleting teacher:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to delete teacher"
        );
    }
}


