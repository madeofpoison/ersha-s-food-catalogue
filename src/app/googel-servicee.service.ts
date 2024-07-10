import { NgTemplateOutlet } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogelServiceeService {
  private base_url = 'https://accounts.google.com/o/oauth2/v2/auth?'
  private client_id = '970876214080-hc0j4d8358con6d689mjvq2uvorde7rb.apps.googleusercontent.com';
  private redirect_uri = 'http://localhost:4200/';
  private response_type = 'token';
  private scopes = ['email', 'profile', 'https://www.googleapis.com/auth/spreadsheets.readonly'];


  createFinalUrl (): string {
    let scope  = 'scope=';
    this.scopes.forEach((string, index) => {
      if((index) != (this.scopes.length - 1)) {
      scope+= `${string} `
      } else scope+= `${string}&`
    } )
    console.log(scope);
    const response = `response_type=${this.response_type}&`;
    const redirect_uri = `redirect_uri=${this.redirect_uri}&`;
    const client_id = `client_id=${this.client_id}`;
    return `${this.base_url}${scope}${response}${redirect_uri}${client_id}`;
  }


  getAccessToken(): string | null{
    const currentUrl = document.URL;
    const accessTokenRegEx = /(?<=#access_token=)[\w\W]+(?=&token_type)/;
    const accessToken = currentUrl.match(accessTokenRegEx);
    if(accessToken) return accessToken[0];
    else return null;
  }
  
  
  constructor() {

   }
}
