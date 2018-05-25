import firebase from 'firebase';

export class Authentication {
  private auth: firebase.auth.Auth;
  constructor(app: firebase.app.App) {
    this.auth = app.auth();
  }

  public register(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<any> {
    return this.auth.signOut();
  }
}
