"use server";

import { apiPrivate } from "@/api/axios";
import { Setting } from "@/types/setting";
import { Response } from "@/models/response.model";
import { SettingModel } from "@/models/settingModel";

export async function getAllSettings(): Promise<Setting[]> {
    try {
        const response: Response<Setting[]> = await apiPrivate.get(
            "/settings/getAllSettings"
        );
        return response?.data?.data;
    } catch (error) {
        console.error("Error getting all settings:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to get all settings"
        );
    }
}

export async function updateSetting(setting: SettingModel) {
try {
  const response: Response<Setting[]> = await apiPrivate.put(
    "/settings/updateSettings",
    { settings: [setting] }
  );
  return response?.data;
} catch (error) {
  console.error("Error updating setting:", error);
  throw new Error(
    error instanceof Error ? error.message : "Failed to update setting"
  );
}
}
