import Rebase  from 're-base';
import firebase from 'firebase/app';
import  'firebase/database';
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBGXupEQ6StAZj8XQptk79wd37jV6vFylg",
    authDomain: "burgers-shop-a0097.firebaseapp.com",
    databaseURL: "https://burgers-shop-a0097-default-rtdb.europe-west1.firebasedatabase.app"
})

const base = Rebase.createClass(firebaseApp.database()); 

export {firebaseApp}
export default base;