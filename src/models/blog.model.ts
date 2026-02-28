export interface Blog {
  _id?: string;
  info: string;
  title: string;
  category?: string;
  description: string;
  author?: string;
  last_updated?: string;
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
