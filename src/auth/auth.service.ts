import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    
  signin(){
    return { msg: "I have signed in to this" }
  }  

  signup(){
    return { msg: "I have signed up for this" }
  }
}