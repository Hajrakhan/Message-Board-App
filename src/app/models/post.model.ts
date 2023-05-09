import { User } from "./user";

export class postForm {
    postId: number = 0;
    message: string = "";
    timeStamp: string="";
    userId: User=new User();
  }

  export class userForm{
    userId: number = 0;
    userName: string = "";
    timeStamp: string="";
  }