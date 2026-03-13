export interface Blog {
  _id?: string;
  slug?: string;
  info: string;
  title: string;
  category?: string;
  description: string;
  author?: string;
  created_at?: string;
  last_updated?: string;
  deleted?: boolean;
}

export interface CreateBlogDto {
  title: string;
  description: string;
  info: string;
  author?: string;
  category?: string;
}

export interface UpdateBlogDto {
  title?: string;
  description?: string;
  info?: string;
  author?: string;
  category?: string;
}
