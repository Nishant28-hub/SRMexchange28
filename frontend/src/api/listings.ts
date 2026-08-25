import api from "./axios";
import type { Listing, ListingsResponse } from "../types";

export interface ListingFilters {
  search?: string;
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export const fetchListings = (filters: ListingFilters = {}) =>
  api.get<ListingsResponse>("/listings", { params: filters }).then((res) => res.data);

export const fetchListingById = (id: string) =>
  api.get<{ success: boolean; listing: Listing }>(`/listings/${id}`).then((res) => res.data);

export const createListingRequest = (data: Partial<Listing>) =>
  api.post<{ success: boolean; listing: Listing }>("/listings", data).then((res) => res.data);

export const fetchCategories = () =>
  api.get<{ success: boolean; categories: string[] }>("/listings/categories").then((res) => res.data);

export const fetchMyListings = () =>
  api.get<{ success: boolean; listings: Listing[] }>("/listings/mine").then((res) => res.data);
