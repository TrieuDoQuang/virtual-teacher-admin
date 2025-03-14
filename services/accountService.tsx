"use server";

import { PaginationResponseResult } from "@/models/response.model";
import { Account } from "@/types";
import { apiPrivate } from "@/api/axios";

export const getAllAccount = async (): Promise<Account[]> => {
  try {
    const response: PaginationResponseResult<Account[]> = await apiPrivate.post(
      "/account/getAllAccounts",
      {}
    );
    return response?.data?.data?.results;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch accounts"
    );
  }
};

export const deleteAccount = async (accountId: string) => {
  try {
    const response: any = await apiPrivate.post("/account/deleteAccount", {
      accountId,
    });
    return response?.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete account"
    );
  }
};
