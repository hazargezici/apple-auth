import { Component, OnInit } from '@angular/core';
declare var AppleID: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  public async apple() {
    try {
      console.log(AppleID);
      AppleID.auth.init({
        clientId: 'VRSignIn',
        scope: 'name email',
        redirectURI:
          'https://angular-apple-signin.stackblitz.io/apple-callback',
        state: 'init',
        nonce: 'test',
        usePopup: true, //or false defaults to false
      });
      const data = await AppleID.auth.signIn();
      console.log(this.parseJwt(data.authorization.id_token));
    } catch (error) {
      console.log(error);
      //handle error.
    }
  }
}
