export class postForm {
    postId: number = 0;
    message: string = "";
    timeStamp: string="";
    userId: userForm=new userForm();
  }

  export class userForm{
    userId: number = 0;
    userName: string = "";
    timeStamp: string="";
  }