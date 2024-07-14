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
  
  async getUserEmail(accessToken: string) : Promise<string> {
    //NEW PLAN:
    //authenticate based on whether the spreadsheet call has a return value
    //It's slow but w/e at this point.
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1UzpJQV2wIbF-c6mOyARz0Os4UFmFYB065UstqT7NZys/values/A1:F1?access_token=${accessToken}`;
    /*
    let xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);
    xhr.send();
    return 'a';
    */
   const response = await fetch(endpoint);
   const data = await response.json();
   console.log(data);
   return "a";
  }

  constructor() {

   }
}
