import firebase from 'firebase';

export class AuthService {
    signup(email: string, password: string) {
        let signupRes = firebase.auth().createUserWithEmailAndPassword(email, password);
        return signupRes;
    }

    signin(email: string, password: string) {
        let promise = firebase.auth().signInWithEmailAndPassword(email, password);
        return promise;
    }

    logout() {
        firebase.auth().signOut();
    }

    getActiveUser(): firebase.User {
        return firebase.auth().currentUser;
    }
}