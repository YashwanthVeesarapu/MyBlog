import axios from "axios";
import { Blog, CreateBlogDto, UpdateBlogDto } from "@/models/blog.model";

let isDevelopment = process.env.NODE_ENV === "development";
isDevelopment = false;
const baseUrl = isDevelopment
  ? process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:8000"
  : process.env.NEXT_PUBLIC_API_URL || "https://api.redsols.com";

export const apiInstance = axios.create({
  baseURL: baseUrl,
});

// Blog API methods
export const blogApi = {
  getAll: async (): Promise<Blog[]> => {
    const response = await apiInstance.get<Blog[]>("/blog/blogs");
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Blog> => {
    const response = await apiInstance.get<Blog>(`/blog/blogs/post/${slug}`);
    return response.data;
  },

  create: async (data: CreateBlogDto): Promise<Blog> => {
    const response = await apiInstance.post<Blog>("/blog/blogs", data, {
      withCredentials: true,
    });
    return response.data;
  },

  update: async (id: string, data: UpdateBlogDto): Promise<Blog> => {
    const response = await apiInstance.put<Blog>(`/blog/blogs/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiInstance.delete(`/blog/blogs/${id}`, {
      withCredentials: true,
    });
  },
};

// Auth API methods
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiInstance.post("/blog/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiInstance.post(
      "/blog/auth/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiInstance.get("/blog/auth/me", {
      withCredentials: true,
    });
    return response.data;
  },

  verifyCode: async (uid: string, code: string, token: string) => {
    const response = await apiInstance.post("/blog/auth/verify-code", {
      uid,
      code,
      token,
    });
    return response.data;
  },
};
