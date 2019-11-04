import { Content, Header } from '../Layout';
import React from 'react';

class MainLayout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    console.log(this.props, this.state);

    return true;  
  }
  componentWillUpdate(newProps, newStates) {
    console.log('lokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  }
  componentWillReceiveProps(nextProps) {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkooooooooooooooooiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiilllllllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  }
  render() {
    const { children } = this.props;
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeelllllllllllllllllllooooooooooooooooooooooooooooo')
    return (
      // <main className="cr-app col-sm-auto offset-md-0  col-md-auto offset-md-0 col-lg-0 offset-lg-0">
      <main className="cr-app">
      <Content fluid>
          <Header crt={localStorage.getItem('cartCount')!=null?localStorage.getItem('cartCount'):0}/>
          {children}
          {/* <Footer /> */}
        </Content>
      </main>
    );
  }
}

export default MainLayout;
