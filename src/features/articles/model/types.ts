export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: number;
  author_username: string;
  author_avatar?: string;
  comments_count: number;
  reactions_count: number;
  reactions: {
    like: number;
    dislike: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  author_id?: number;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
}

export interface CreateArticleData {
  title: string;
  content: string;
}

export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

export interface ArticleForm {
  title: string;
  content: string;
}
