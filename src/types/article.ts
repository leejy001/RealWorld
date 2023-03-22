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

export interface PutArticleRequest {
  title: string;
  description: string;
  body: string;
}

export interface PostArticleRequest extends PutArticleRequest {
  tagList: string[];
}
