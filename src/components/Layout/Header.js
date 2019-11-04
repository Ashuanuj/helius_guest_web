import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import componentImg from '../assets/img/bg/component.png'

import cartIcon from '../assets/img/icons/cart.svg';
import { bindActionCreators } from "redux";

import {MdClose} from 'react-icons/md';
import { Nav,Navbar,NavItem } from 'reactstrap';
import {shallowEqual,  useSelector } from "react-redux";
import history from '../../helper/history';


const useStyles = makeStyles({
  fullList: {
    width: 'auto',
  },
});
// export default function Header(props) {
  
//   let { header, dashboard ,cart, cartCount} = useSelector(state => ({
//     header: state.header.header,
//     dashboard: state.header.dashbaord,
//     cart:state.header.cart,
//     cartCount: state.header.cartCount 
//   }),shallowEqual)
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     left: false,
//   });
//   const [cartItems, setCartItems] = React.useState(0);
//   const handleClick=(link)=>{
//     // const [state, setState] = React.useState({
//     //   left: false,
//     // })
//     if(localStorage.getItem('cartCount') != null || localStorage.getItem('cartCount') != 0)
//     history.push(link)
//   }

//   const handleLogOut=(link)=>{
//     history.push(link)
//     localStorage.removeItem('roomNo')
//     localStorage.removeItem('header')
//     localStorage.removeItem('accessToken')
//     localStorage.removeItem('guestName')
//     localStorage.removeItem('areaId')
//     localStorage.removeItem('guestId')
//     localStorage.removeItem('serviceCategoryId')
//     localStorage.removeItem('room_no')
//     localStorage.removeItem('instructions')
//     localStorage.removeItem('dashboard')
//     localStorage.removeItem('serviceSubCategoryId')
//     localStorage.removeItem('cart_details')
//     localStorage.removeItem('cartCount')
//     localStorage.clear();
//   }
//   const toggleDrawer = (side, open) => event => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setState({ ...state, [side]: open });
//   };
//   const [showLoading, setShowLoading] = useState(false)
//   React.useEffect(
//     () => {
//       // if (componentDidUpdate & (x or y changed))
//       localStorage.getItem('cartCount') === null ?
//       setCartItems(0) : setCartItems(localStorage.getItem('cartCount'));
//       let timer1 = setTimeout(() => setShowLoading(true), 1000)
//       return () => {
//         clearTimeout(timer1)
//       }
//     }
//   );


//   const sideList = side => (
//   <>
//     <div className="sidebarImg-main">
//       <img
//         src={componentImg}
//         className="sidebarImg"
//         alt="cmp"
//       />
//       <span className="headername text-white">
        
//         {`Welcome Mr. ${ localStorage.getItem('guestName') }`}
//       </span>
//       <span className="crossbtn" onClick={toggleDrawer('left', false)}> <MdClose/></span>
//     </div>

//     <div
//       className={classes.list}
//       role="presentation"
//       onClick={toggleDrawer(side, false)}
//       onKeyDown={toggleDrawer(side, false)}
//     >
//       <List onClick={()=>handleClick("/"+localStorage.getItem('tenantId')+"/dashboard")}>
//         {['Services'].map((text) => (
//           <ListItem button key={text}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}

//       </List>
//       <List  onClick={()=>handleClick("/"+localStorage.getItem('tenantId')+"/requestmain")} >
//         {/* {setShowLoading?<div></div>:<div></div> */}
//         {['My Request'].map((text) => (
         
//           <ListItem button key={text}>
//              <ListItemText primary={text} />
//           </ListItem>
        
//         ))}
//       </List>
//       <List  onClick={()=>handleLogOut("/?"+localStorage.getItem('tenantId'))} >
//         {['Logout'].map((text) => (
//           <ListItem button key={text}>
//               <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//     <div className="sidebar-footer">
//       <p> Copyright Helius © 2019 </p>
//     </div>
//   </>
//   );

//   return (
//     <div>
//          <Navbar expand className="bgNav">
        
//          <Nav navbar className="">
//           <IconButton
//               cursor= "pointer"
//               aria-label="open drawer"
//               onClick={toggleDrawer('left', true)}
//             >
//               <MenuIcon />
//             </IconButton>
//          </Nav>

//         <Nav className="Nav-Name">
      
//         {/* {localStorage.getItem('header')} */}
//         </Nav>

//          <div>
//            {cart?<div></div>:
//         <Nav navbar className='nav-right'>
//           <NavItem className="d-inline-flex">
//             <div style={{ position: 'relative', width: '30%', alignItems: 'center' }} onClick={() => handleClick("/"+localStorage.getItem('tenantId')+"/checkout")}> 
//               <img
//                   src={cartIcon}
//                   className="cartImg"
//                   style={{position: 'relative', display: 'inline-block'}}
//                   alt="cartimg"   
//               />

//               <span style={{borderRadius: '50%', backgroundColor: 'white', color: 'black', height: '62%', width: '230%', fontSize: '0.7em', padding: '10% 20%', left: '-3%', top: '40%', left: '120%', position: 'absolute', textAlign: 'center' }}>
//               {localStorage.getItem('cartCount') == null || localStorage.getItem('cartCount') == 0 ? 0 : localStorage.getItem('cartCount')}
//               </span>
//             </div>
//            </NavItem>
//         </Nav>
//            }
//     </div>
//       </Navbar> 
     
//       <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
//         {sideList('left')}
//       </Drawer>
//     </div>
//   );
// }

import Panel from './panel'
class Header extends React.Component {
  constructor(props) {

    super(props);
    this.state ={
      left: false,
      laoding:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  // componentWillMount() {
  //   this.props.actions.handle_header([
  //     localStorage.getItem("serviceName"),
  //   this.props.actions.getCategoryList(
  //     localStorage.getItem("serviceCategoryId")
  //   );
  // }


  handleLogOut = (link) => {

    history.push(link)
    localStorage.removeItem('roomNo')
    localStorage.removeItem('header')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('guestName')
    localStorage.removeItem('areaId')
    localStorage.removeItem('guestId')
    localStorage.removeItem('serviceCategoryId')
    localStorage.removeItem('room_no')
    localStorage.removeItem('instructions')
    localStorage.removeItem('dashboard')
    localStorage.removeItem('serviceSubCategoryId')
    localStorage.removeItem('cart_details')
    localStorage.removeItem('cartCount')
    localStorage.clear();
  }

  handleClick = (link) => {
 
    if(localStorage.getItem('cartCount') != null || localStorage.getItem('cartCount') != 0)
   // this.setState({side:true})
     history.push(link)
     
  };
 
  
  render() {
   const toggleDrawer = (side, open) => event => {
     console.log(open,'llllllllllll',side,'dddddddddddddddddddd')
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
     this.setState({  [side]: open });
    };
    const sideList = side => (
        <>
          <div className="sidebarImg-main">
            <img
              src={componentImg}
              className="sidebarImg"
              alt="cmp"
            />
            <span className="headername text-white">
              
              {`Welcome Mr. ${ localStorage.getItem('guestName') }`}
            </span>
            <span className="crossbtn" onClick={toggleDrawer('left', false)}> <MdClose/></span>
          </div>
      
          <div
            // className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
          >
            <List onClick={()=>this.handleClick("/"+localStorage.getItem('tenantId')+"/dashboard")}>
              {['Services'].map((text) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
      
            </List>
            <List  onClick={()=>this.handleClick("/"+localStorage.getItem('tenantId')+"/requestmain")} >
              {/* {setShowLoading?<div></div>:<div></div> */}
              {['My Request'].map((text) => (
               
                <ListItem button key={text}>
                   <ListItemText primary={text} />
                </ListItem>
              
              ))}
            </List>
            <List  onClick={()=>this.handleLogOut("/?"+localStorage.getItem('tenantId'))} >
              {['Logout'].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className="sidebar-footer">
            <p> Copyright Helius © 2019 </p>
          </div>
        </>
        );
        // if(this.state.laoding){
        //   console.log(this.state.laoding,'llllllllllllllllllllll')
          
        // }else{
        return (
          <div>
               <Navbar expand className="bgNav">
              
               <Nav navbar className="">
                <IconButton
                    cursor= "pointer"
                    aria-label="open drawer"
                    onClick={toggleDrawer('left', true)}
                  >
                    <MenuIcon />
                  </IconButton>
               </Nav>
      
              <Nav className="Nav-Name">
              {this.props.dashboard==true? this.props.header :`Welcome Mr. ${ localStorage.getItem('guestName') }`}
              {/* {localStorage.getItem('header')} */}
              </Nav>
      
               <div>
                 {this.props.cart?<div></div>:
              <Nav navbar className='nav-right'>
                <NavItem className="d-inline-flex">
                  <div style={{ position: 'relative', width: '30%', alignItems: 'center' }} onClick={() =>this.handleClick("/"+localStorage.getItem('tenantId')+"/checkout")}> 
                    <img
                        src={cartIcon}
                        className="cartImg"
                        style={{position: 'relative', display: 'inline-block'}}
                        alt="cartimg"   
                    />
      
                    <span style={{borderRadius: '50%', backgroundColor: 'white', color: 'black', height: '62%', width: '230%', fontSize: '0.7em', padding: '10% 20%', left: '-3%', top: '40%', left: '120%', position: 'absolute', textAlign: 'center' }}>
                    {localStorage.getItem('cartCount') == null || localStorage.getItem('cartCount') == 0 ? 0 : localStorage.getItem('cartCount')}
                    </span>
                  </div>
                 </NavItem>
              </Nav>
                 }
          </div>
            </Navbar> 
            {/* <Panel
                        open={this.state.left}
                        hasCloseBtn={!this.state.left}
                        onClose={toggleDrawer('left', false)}
                        
                        >

                        {props.selectedRequest && <IssueReportPreview />}
                        {props.form && <IssueReportNew />}
                    </Panel> */}
                    
            <Drawer open={this.state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </Drawer>
          </div>
        );
  // }
 }
}

const mapStateToProps = state => {
  return {
        header: state.header.header,
        dashboard: state.header.dashbaord,
        cart:state.header.cart,
        cartCount: state.header.cartCount 
    // services: state.category.serviceCategory,
    // category: state.serviceCategoryReducers.Category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
       
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


