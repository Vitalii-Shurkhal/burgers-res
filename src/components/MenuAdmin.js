import React from 'react';
import PropTypes from 'prop-types';
import AddBurgerForm from './AddBurgerForm'
import EditBurgerForm from './EditBurgerForm';
import firebase from 'firebase/app';

class MenuAdmin extends React.Component{

    state = {
        photo : '',
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
        const {email, photoURL} = authData.user
        this.setState({user: email, photo: photoURL})
    }

    static propTypes = {
        burgers : PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func
    }
    render(){

        const {user, photo} = this.state
        const avatar = photo ? photo : '/images/avatar.png'

        return(
            <div className = 'menu-admin'>
               {user ? ( <div className = 'login-header'>
                    <div className = 'avatar'>
                        <img src = {avatar} alt = {user} />
                    </div>
                    <button className = 'buttonLogout'
                        onClick = {this.props.handleLogOut}
                    >Log Out</button>
                </div>) : null
                }
                <h2>Panel Control</h2>
                {Object.keys(this.props.burgers).map(key =>{
                    return(
                        <EditBurgerForm key = {key} 
                        index = {key}
                        burger = {this.props.burgers[key]}
                        updateBurger = {this.props.updateBurger}
                        deleteBurger = {this.props.deleteBurger}
                        />
                    )
                })}
                <AddBurgerForm addBurger = {this.props.addBurger}/>
                <button onClick = {this.props.loadSampleBurgers}>Upload burgers</button>
                
            </div>
            

        )

    }
}

export default MenuAdmin; 