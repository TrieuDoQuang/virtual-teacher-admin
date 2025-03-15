"use server";

import { apiPrivate } from "@/api/axios";
import { Setting } from "@/types/setting";
import { Response } from "@/models/response.model";

export async function getAllSettings(): Promise<Setting[]> {
    const response: Response<Setting[]> = await apiPrivate.get("/settings/getAllSettings");
    
    return response?.data?.data;

}

