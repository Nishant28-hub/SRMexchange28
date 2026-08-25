export interface User {
  _id: string;
  name: string;
  email: string;
  college?: string;
  branch?: string;
  year?: string;
  avatar?: string;
  bio?: string;
  reputation: number;
  badges: string[];
  role: "student" | "admin";
  bookmarks: string[];
  createdAt: string;
}

export interface ListingOwner {
  _id: string;
  name: string;
  avatar?: string;
  reputation: number;
  college?: string;
  bio?: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: "sell" | "exchange" | "donate" | "skill" | "request";
  price: number;
  condition: "new" | "like-new" | "good" | "fair" | "used";
  images: string[];
  location?: string;
  status: "active" | "pending" | "completed" | "cancelled";
  owner: ListingOwner;
  tags: string[];
  views: number;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ListingsResponse {
  success: boolean;
  listings: Listing[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
