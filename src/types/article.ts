export interface ArticleInfo {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ArticlesResult {
  articles: ArticleInfo[];
  articlesCount: number;
}

export interface ArticleResult {
  article: ArticleInfo;
}

export interface ArticleRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticleEditRequest extends ArticleRequest {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticleEditResult {
  status: string;
  article?: ArticleInfo;
}
