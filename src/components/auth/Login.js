import React from 'react';
import PropTypes from 'prop-types';

const Login = props =>{
    return(
        <div className = 'login-container'>
            <nav className = 'login'>
                <h2>Authorization</h2>
                <center><p>Enter the login and password of your GitHub account</p></center>
                <button className = 'github'
                    onClick = {()=> props.authenticate()}
                >Sign In</button>
            </nav>
        </div>
    )
}

Login.propTypes = {
    authenticate : PropTypes.func.isRequired
}

export default Login;