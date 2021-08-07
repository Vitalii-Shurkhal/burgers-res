import React from 'react';
import Login from './Login';
import firebase from 'firebase/app';
import {firebaseApp} from '../../base';

class SignIn extends React.Component{

    state = {
        user: ''
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.authHandler({user})
            }
        })
    }

    authHandler = async authData => {
        const {email} = authData.user
        this.setState({user: email})
    }

    authenticate = () =>{
        const authProvider = new firebase.auth['GithubAuthProvider']();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)

    }

    render(){
        return !this.state.user ? <Login authenticate = {this.authenticate}/> :this.props.children
    }


}

export default SignIn;