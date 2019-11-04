import React from 'react';

// import {Row, Col, Card, Media} from 'reactstrap';
// import { MdKeyboardArrowRight } from 'react-icons/md';

import {Row, Col, Card, Media,Collapse,Table} from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';
import moment from 'moment';

import vegImg from '../../components/assets/img/icons/veg.png';
import NonvegImg from '../../components/assets/img/icons/non-veg.png'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadGuestRequests } from "../../actions";

// const navComponents = [
//   {  exact: false },
// ];

let month = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

class Active extends React.Component{
  constructor(props) {
      super(props)
      this.state = { collapseID: "", veg: vegImg, Nonveg: NonvegImg } 
  }
    
  componentWillMount() {
    let data = {
      roomNo: localStorage.getItem("roomNo"),
      user_last_name: localStorage.getItem("guestName")
    };
    //this.props.actions.loadGuestRequests(data);
  }
    
    toggleCollapse = (collapseID, orderId) => () => { 
        this.setState(prevState => ({ [`collapseID${orderId}`]: prevState[`collapseID${orderId}`] !== collapseID ? collapseID : "" })); }    

    render(){
       console.log(this.props, 'from active................')
       function compare(a, b) {
        const genreA = a.orderId;
        const genreB = b.orderId;
        
        let comparison = 0;
        if (genreA < genreB) {
          comparison = 1;
        } else if (genreA > genreB) {
          comparison = -1;
        }
        return comparison;
      }
          let data = this.props.data && this.props.data.sort(compare).map((item, index) => {
              let total = 0;
              let time = new Date(moment.unix(item.createdAt));
              let hrs = time.getHours() > 12 ? time.getHours()-12 : time.getHours();
              let mins = time.getMinutes() < 9 ? `0${time.getMinutes()}` : time.getMinutes();
              let str = time.getHours() > 12 ? 'pm' : 'am';
              let newTime = `${time.getDate()} ${month[time.getMonth()+1]} ${time.getFullYear()} | ${hrs}:${mins}${str}`;
              return (
                  <Col sm={6} xs={12} className="pz mb-1 col-md-6 offset-md-3">
                  <Card className="requestTab-main">
                    <Media className="mediaMain">
                      <Media body>
                        <Media heading>{`Order ID: ${item.orderId}`}</Media>
                        {/* <span className="sub-title">23 Jun 2019 | 7:30am</span> */}
                        <span className="sub-title">{newTime}</span>
                        {/* //23 Jun 2019 | 7:30am */}
                        <span className="sub-title2"> Request Received </span>
                      </Media>
                      <Media right>
                        <MdKeyboardArrowDown
                          onClick={this.toggleCollapse("basicCollapse", item.orderId)}
                          style={{
                            transform: this.state[`collapseID${item.orderId}`]
                              ? "rotate(0deg)"
                              : "rotate(-90deg)",
                            transitionDuration: "0.3s",
                            transitionProperty: "transform"
                          }}
                        />
                      </Media>
                    </Media>
                    <Collapse id="basicCollapse" isOpen={this.state[`collapseID${item.orderId}`]}>
                      <Table responsive className="TableMainList">
                        <tbody className="t-body">
                            {item.requests && item.requests.map((elem, i) => {
                                total += elem.amount
                                // console.log(elem.title)
                                if((elem.subCategoryTitle!==null || elem.subCategoryTitle!=="null")&&(elem.title=="")){
                                  return(
                                    <tr>
                                    <td>
                                      <p>{`${elem.subCategoryTitle}`}</p> 
                                      <p>{`${elem.instruction}`}</p>
                                    </td>
                                    <td></td>
                                   
                                  </tr>
                                )
                                }else{
                                  return(
                                    <div>
                                      <tr>
                                    <td>
                                      <Media /> {`${elem.title} x ${elem.quantity}`}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                                                                                
                                    <td className="item-amt"> {`${elem.amount}.00`} </td>
                                  </tr>
                                      <div style={{display:item.requests.length==i+1?'':'none'}}>
                                      <tr>
                                    <td>
                                     <p>{`${elem.instruction}`}</p>
                                    </td>
                                  </tr>
                                      </div>
                                    </div>
                                    
                                )
                                }
                               })}
                        </tbody>
                      </Table>
                      
                        <Table    responsive className="TableMainList"  >
                        <tbody className="t-body" >
                          <tr className={total==0?"order-total":"order-total1" }>
                            <td className="totaltext">Total Bill</td>
                            <td></td>
                            <td className="totalamt1" > {`${total}.00`} </td>
                          </tr>
                        </tbody>
                      </Table>
                    
                    </Collapse>
                  </Card>
                </Col>
              )
          })
        return(

            <div>
               
               <Row className="ServicePageMainActive">
                   {data}
                </Row>
             
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      // reducers function name and action name
      requests: state.guestRequests.requests
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
          loadGuestRequests
        },
        dispatch
      )
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Active);