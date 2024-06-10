export interface UserModel {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  token?: true;
  isAdmin?: true;
  street?: string;
  zip?: string;
  apartment?: string;
  city?: number;
  country?: number;
}
