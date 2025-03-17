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

export const deleteAccount = async (listAccountId: string[]) => {
  try {
    const response: any = await apiPrivate.delete("/account/deleteAccounts", {
      data: {
        ids: listAccountId,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete account"
    );
  }
};

export const updateAccount = async (account: Account) => {
  try {
    const response: any = await apiPrivate.post("/account/updateProfile", {
      account,
    });
    return response?.data;
  } catch (error) {
    console.error("Error updating account:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update account"
    );
  }
}
