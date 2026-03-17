
export interface Author {
  _id?: string;
  name: string;
  avatar?: string;
  link?: string;
}

export interface Tag {
  _id?: string;
  name: string;
  slug: string;
}

export interface Article {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: (Category | string)[];
  tags: (Tag | string)[];
  image: string;
  author: Author;
  time: number;
  createdAt?: string;
  updatedAt?: string;
  source?: {
    name: string;
    link?: string;
  };
  categoryLink?: string;
  content?: string;
  reads: number;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
}
