
import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,CardText,CardImg} from 'reactstrap';

import Page from '../components/Page';
// import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loadService,handle_header} from '../actions'
import history from '../helper/history';

class DashboardPage extends React.Component {

  componentWillMount() {
    // this.props.actions.handle_header([localStorage.getItem(' '), false]);
    this.props.actions.handle_header([`Welcome Mr. ${localStorage.getItem('guestName')}`,true]);
    this.props.actions.loadService();
  }
  handleClick = (id, serviceName) => {
    this.props.actions.handle_header([serviceName,true]);
    localStorage.setItem('serviceCategoryId', id)
    localStorage.setItem('serviceName', serviceName)
    history.push("/"+localStorage.getItem('tenantId')+`/category`)
    }
  render(){
    const {props} = this;
    
    const services = props.requests && props.requests.map(request =>(
      <Col lg={4} md={6} sm={6} xs={12} className="mb-3" key={request.id} onClick={()=>this.handleClick(request.id,request.serviceName)}>
        {/* <Link to={`/${request.link}`} > */}
          <Card className="flex-row card-serv-main-dash">
            <CardImg
              className="card-img-left"
              src={request.icon}
              style={{width:50 , height:50}}
            />
            <CardBody className="pz">
              <CardTitle>{request.serviceName}</CardTitle>
              <CardText>
                {request.subText}
              </CardText>
            </CardBody>
          </Card>
         {/* </Link> */}
        </Col>
    ));

    return(
     <div>  
       <Page>      
        <Row className="ServicePageMain">
            {services}
        </Row>
       </Page>
    </div>
   );
  }
}
DashboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
};

function mapStateToProps(state)
{
     return {
       // reducers function name and action name
          requests: state.dashboardServicesReducers.services,
          services: state.gformReducers.services
     };
}

function mapDispatchToProps(dispatch)
{
     return {
          actions: bindActionCreators({
            loadService,
            handle_header
          }, dispatch),
     };
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(DashboardPage);
