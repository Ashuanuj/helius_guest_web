import React from "react";
import { Row, Col, Card, Media } from "reactstrap";
import Page from '../components/Page';
import { MdKeyboardArrowRight } from "react-icons/md";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getServiceCategory, handle_header, getCategoryList } from "../actions";
import history from "../helper/history";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.handle_header([
      localStorage.getItem("serviceName"),
      true
    ]);
    this.props.actions.getCategoryList(
      localStorage.getItem("serviceCategoryId")
    );
  }

  handleService = (id, link, serviceName) => {
    // history.push(link);
    this.props.actions.handle_header([serviceName, true]);
    localStorage.setItem("serviceSubCategoryId", id);
    localStorage.setItem("serviceSubCategoryName", serviceName);
    history.push("/"+localStorage.getItem('tenantId')+`/service`);
  };

  handleProduct = (id, link, serviceName) => {
    // history.push(link)
    this.props.actions.handle_header([serviceName, true]);
    localStorage.setItem("serviceSubCategoryId", id);
    localStorage.setItem("serviceSubCategoryName", serviceName);
    history.push("/"+localStorage.getItem('tenantId')+`/sub-category1`);
  }

  handleClick = (id, link, serviceName) => {
    // if (serviceName == "Breakfast")
      this.props.actions.handle_header([serviceName, true]);
    localStorage.setItem("serviceSubCategoryId", id);
    localStorage.setItem("serviceSubCategoryName", serviceName);
    history.push(`/sub-category1`);
  };

  render() {
    const {props} = this;
    console.log(props,'lllkjsddffffffffsdfsdfsdfsdfsdfsdfsdf')
    const servicesCategory = props.services && props.services.map(requestCategory =>(
      <Col lg={4} md={6} sm={6} xs={12} className="mb-3" key={requestCategory.id}>
        {/* <Link to={`/${requestCategory.link}`} > */}
          <Card className="card-serv-main" onClick={()=> requestCategory.product !==null ? this.handleProduct( requestCategory.id,requestCategory.link,requestCategory.title) : this.handleService( requestCategory.id,requestCategory.link,requestCategory.title)}>
           <Media className="mediaMain">
              <Media left>
                <Media object src={requestCategory.icon} alt="image" style={{display: requestCategory.icon ? 'block' : 'none'}} />
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
    return (
      props.services&&props.services.length?
      <div>
        <Page>
          <Row className="ServicePageMain">{servicesCategory}</Row>
        </Page>
      </div>:<div  style={{color:'white', padding: '15 15 15 15'}}><span className="tabMain" style={{backgroundColor: 'rgb(19, 42, 59)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    textAlign: 'center'}}>No data available</span></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.category.serviceCategory,
    category: state.serviceCategoryReducers.Category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getCategoryList,
        handle_header,
        getServiceCategory
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
