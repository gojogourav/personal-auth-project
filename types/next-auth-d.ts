import "next-auth"
import { DefaultUser } from "next-auth";

declare module "next-auth"{
  interface Session{
    user:{
      id:string;
      // name:string;
      // email:string;
    }
  }

  interface User extends DefaultUser {
    id:string;
    // name:string;
    // email:string;
  }
}