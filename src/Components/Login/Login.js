import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';
//import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from './../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signin = () => {
/*
        signInWithPopup(auth, provider)
  .then((result) => {

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    
  }).catch(error=> alert(error.message));
    }
  */
        auth
        .signInWithPopup(provider)           // sign in broken signInWithPopup/signInWithRedirect figure out
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message));
};
    


    return (
        <div className="login">
            <div className="loginContainer">
                
                <div className="loginTxt">
                    <h1>Welcome to Chatsit</h1>
                </div>

                <Button type="submit" onClick={signin}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
