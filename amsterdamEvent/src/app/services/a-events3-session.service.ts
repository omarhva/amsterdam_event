import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AEvents3SessionService {
  public readonly STORAG_BASE_URL = 'http://localhost:8081';
  private BS_TOKEN_NAME = 'AUTH_TOKEN';
  public currentUserName: string = null;

  // user information
  currentUser:User;
  currentToken:string = null;

  // utility function to decode token
  jwtService = new JwtHelperService();


  constructor(private http: HttpClient, private router: Router) {
    this.updateUserInformation();
  }


  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }

    // check if token is expired
    const expirationDate: number = this.jwtService.getTokenExpirationDate(this.currentToken).getTime();
    const currentTime: number = new Date().getTime();

    return expirationDate > currentTime;
  }

  signIn(email: string, password: string, target?: string) {
    console.log('login: ' + email + ' /password: ' + password);
    let oObservable =
      this.http.post <HttpResponse<User>>(this.STORAG_BASE_URL + '/authenticate/login',
        {eMail: email, passWord: password},
        {observe: 'response'}
      );

    oObservable.subscribe(response => {
        console.log('logged in !is dat goed',response);
        let token = response['headers'].get('Authorization');

        if(token == null) {
          throw new Error('token was not present in the response');
        }
        token = token.replace('Bearer ','');

        //this.setToken(token,((response.body as unknown) as User).name)
         sessionStorage.setItem('token' ,token);
        this.updateUserInformation();
      },
      (err) => {
        console.log('authentication error',err);
        // this.setToken(null, null);
        this.currentUser = null;
        this.currentToken = null;
      });
    return oObservable;
  }


  //allow for different user sessions from same computer
  getToken(): string {
    let token = sessionStorage.getItem(this.BS_TOKEN_NAME);
    if (token = null) {
      token = localStorage.getItem(this.BS_TOKEN_NAME);
      sessionStorage.setItem(this.BS_TOKEN_NAME, token);
    }
    if (token != null) {
      let tokenparts = token.split('/');
      this.currentUserName = tokenparts[1];
      return tokenparts[0];

    }
    return null;
  }


  setToken(token: string, uName?: string) {
    let namedToken = token + ' /' + uName;
    let oldSessionToken = sessionStorage.getItem(this.BS_TOKEN_NAME);
    if (namedToken == oldSessionToken) {
      return;
    }
    if (token == null) {
      this.currentUserName = null;
      let oldlocalToken = localStorage.getItem(this.BS_TOKEN_NAME);
      sessionStorage.removeItem(this.BS_TOKEN_NAME);
      if (oldSessionToken == oldlocalToken) {
        localStorage.removeItem(this.BS_TOKEN_NAME);
      }
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    this.updateUserInformation();
  }


  private updateUserInformation() {
    this.currentToken = sessionStorage.getItem('token');

    if(this.currentToken != null) {
      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();
      this.currentUser.name = decodedToken.sub;

      this.currentUser.admin = decodedToken.admin;

    } else {
      this.currentUser = null;
    }
  }


  signUP(eMail: string, passWord: string) {
    //   firebase.auth().createUserWithEmailAndPassword(eMail, passWord)
    //     .then(
    //       response => {
    //         this.route.navigate(['/signIn']);
    //       }
    //     )
    //     .catch(
    //       error => console.log(error)
    //     );
  }
}
