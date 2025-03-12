'use server'

import { api } from "@/api/axios";  
import { PaginationResponseResult, Response } from "@/models/response.model";
import { Teacher } from "@/models/teacherModel";

export async function getAllTeacher() {
    const response: PaginationResponseResult<Teacher[]> = await api.post("/teacher/getAllTeachers");
    return response.data.data.results;
}

