// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  plan?: string;
  subscribeStatus?: string;
  firstAccess?: boolean;
  /**
   * Field to check whether a user has a subscription
   */
  jwt?:string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
    jwt?:string;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
