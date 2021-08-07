import React from 'react';
import PropTypes from 'prop-types';
import Header  from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';
import firebase from 'firebase/app';
import SignIn from './auth/SignIn'


class App extends React.Component{
    

    static propTypes = {
        match: PropTypes.object
    }

    state = {
        burgers: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.restaurantId)

        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
          context: this,
          state: 'burgers'
        });
      }

      componentDidUpdate(){
        const { params } = this.props.match;
          localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
      }

      componentWillUnmount(){
          base.removeBinding(this.ref)
      }
    

    addBurger = (burger) => {
        // Make state copy 
        const burgers = {...this.state.burgers}

        // add new burger to burgers
        burgers[`Burger${Date.now()}`] = burger;

        // record new burger to the state
        this.setState({burgers})
    }

    updateBurger = (key, updatedBurger) =>{
         // Make state copy 
         const burgers = {...this.state.burgers}
         burgers[key] = updatedBurger
         this.setState({burgers})
    }

    deleteBurger = key =>{
         // Make state copy 
         const burgers = {...this.state.burgers}

         // delete burger
         burgers[key] = null
 
         // record new burger to the state
         this.setState({burgers})

    }


    loadSampleBurgers = () => {
        this.setState({burgers : sampleBurgers})
    }

    addToOrder = (key) => {
        // Make state copy 
        const order = {...this.state.order}
        // add new burger to order
        order[key] = order[key] + 1 || 1
        // record new order to the state
        this.setState({order: order})
    }

    deleteFromOrder = (key)=>{
          // Make state copy 
          const order = {...this.state.order}
          // delete burger from order
          delete order[key]
          // record new order to the state
          this.setState({order: order})
    }

    handleLogOut = async () => {
        await firebase.auth().signOut();
        window.location.reload()
    }


    render(){

        return (
            <SignIn>
            <div className = 'burger-paradise'>
                <div className = 'menu'>
                    <Header title = 'Big Tasty Burger' />
                    <ul className = 'burgers'>
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger 
                            addToOrder = {this.addToOrder}
                            key = {key} 
                            index = {key}
                            details = {this.state.burgers[key]}
                            />
                        })}
                    </ul>
                </div>
                    <Order 
                    burgers = {this.state.burgers} 
                    order = {this.state.order}
                    deleteFromOrder = {this.deleteFromOrder}
                    />
                    
                    <MenuAdmin 
                    addBurger = {this.addBurger}
                    loadSampleBurgers = {this.loadSampleBurgers}
                    burgers = {this.state.burgers}
                    updateBurger = {this.updateBurger}
                    deleteBurger = {this.deleteBurger}
                    handleLogOut = {this.handleLogOut}
                    />
            </div>
            </SignIn>
        );


    }
}


export default App