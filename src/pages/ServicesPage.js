
import React from 'react';
import { Row,Col,Card,Media } from 'reactstrap';
import Page from '../components/Page';
import {Link} from 'react-router-dom';

import {  MdKeyboardArrowRight } from 'react-icons/md';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getServiceCategory,handle_header} from '../actions'
import history from "../helper/history";

class ServicesPage extends React.Component {
  constructor(props) {
    super(props)
  }
//   componentWillMount() {
//     this.props.actions.getServiceCategory(localStorage.getItem('serviceCategoryId'));
//   }
// handleClick = (link, id) => {
//   history.push(`/${link}`)
//   localStorage.setItem('serviceSubCategoryId', id)
// }
componentWillMount() {
  this.props.actions.getServiceCategory(localStorage.getItem('serviceCategoryId'));
  this.props.actions.handle_header(['All Day Dining',true]);
  }
  handleClick = (id,link, serviceName) => {
    if(serviceName == 'Breakfast')
  this.props.actions.handle_header([serviceName,true]);
  localStorage.setItem('serviceSubCategoryId', id)
  history.push(`/${link}`)
  }
  render(){
    const {props} = this;
    
    const servicesCategory = props.category && props.category.map(requestCategory =>(
      <Col lg={4} md={6} sm={6} xs={12} className="mb-3" key={requestCategory.id}>
        {/* <Link to={`/${requestCategory.link}`} > */}
          <Card className="card-serv-main" onClick={()=>this.handleClick( requestCategory.id,requestCategory.link,requestCategory.title)}>
           <Media className="mediaMain">
              <Media left>
                <Media object src={requestCategory.icon} alt="image"/>
              </Media>
              <Media body>
                  <Media heading>
                        {requestCategory.title}
                  </Media>
                   <span className="sub-title"> {requestCategory.subTitle} </span>
              </Media> 
              <Media right onClick={()=>this.handleClick( requestCategory.id,requestCategory.link,requestCategory.title)}>
                {/* <Link to={`/${requestCategory.link}`} >  */}
                  <MdKeyboardArrowRight/>
                {/* </Link> */}
              </Media>
           </Media>
          </Card> 
          {/* </Link> */}
        </Col>
       ));
    return(

      <div>
        <Page>
          <Row className="ServicePageMain">
            {servicesCategory}
          </Row>
       </Page>
      </div>
      );
  }
}

ServicesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  category: PropTypes.array.isRequired,
};

function mapStateToProps(state)
{
     return {
       // reducers function name and action name
       category: state.serviceCategoryReducers.Category,
     };
}

function mapDispatchToProps(dispatch)
{
     return {
          actions: bindActionCreators({
            getServiceCategory,
            handle_header
          }, dispatch),
     };
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(ServicesPage);