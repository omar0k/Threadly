export type User = {
  name: string;
};
export type Community = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  create_at: Date;
  members: User[];
};
