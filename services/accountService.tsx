"use server";

import { PaginationResponseResult } from "@/models/response.model";
import { Account } from "@/types";
import { apiPrivate } from "@/api/axios";

export const getAllAccount = async (): Promise<Account[]> => {
    try {
      const response: PaginationResponseResult<Account[]> = await apiPrivate.post("/account/getAllAccounts", {});
      return response?.data?.data?.results;

  
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to fetch accounts");
    }
  };
