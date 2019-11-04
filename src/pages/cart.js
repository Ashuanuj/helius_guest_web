import React from 'react';
import { connect } from "react-redux";
import { createRequest, getCartItems,handle_header } from "../actions";
import Checkout from './CheckoutPage';
import { bindActionCreators } from "redux";

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCount: 10,
            loading: false
        }
    }

    timer() {
        this.setState({
          currentCount: this.state.currentCount - 1
        })
        if(this.state.currentCount < 1) { 
          clearInterval(this.intervalId);
        }
      }

    componentDidMount() {
        // this.props.actions.getCartItems(localStorage.getItem('areaId'))
        this.intervalId = setInterval(this.timer.bind(this), 12000);
        this.props.actions.handle_header(['Checkout',true])
      }
    render() {
       if( localStorage.getItem('cartCount') > 0 )
        return(
            <Checkout />
        )
        else 
            return (<div></div>)
    }
}

const mapStateToProps = state => {
    return {
        checkout: state.checkoutReducers.checkout,
        cartItems: state.checkoutReducers.requests
    }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
          createRequest,
          getCartItems,
          handle_header
        },
        dispatch
      )
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)