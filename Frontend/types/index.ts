export type Login = {
  email: string;
  password: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
};

export type Collection = {
  id: number;
  name: string;
  creatorName: string;
  description: string;
  category: Category;
  imageUrl: string;
  userId: number;
  itemCount: number;
};

export type Tag = {
  name: string;
};

export type Category = {
  name: string;
};

export type CustomFields = {
  [key: string]: string | number | boolean;
};

export type Item = {
  id: number;
  tags: Tag[];
  collectionId: number;
  collectionName: string;
  creatorName: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  customFields: CustomFields;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
