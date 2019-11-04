import React from 'react';
import { Row,Col,Card,Media} from 'reactstrap';
import Page from '../components/Page';
import {  MdKeyboardArrowRight } from 'react-icons/md';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loadFrontOffice,handle_header} from '../actions'
import history from "../helper/history"

class FrontOffice extends React.Component {
    // componentWillMount() {
    //     this.props.actions.loadFrontOffice();
    //   }
    
    componentWillMount() {
      this.props.actions.loadFrontOffice();
      this.props.actions.handle_header(['Front Office', true]);
      }
      handleClick = (link, serviceName) => {
        if(serviceName == 'Wake up Call')
      this.props.actions.handle_header([serviceName,true]);
      history.push(`/${link}`)
      }
      render(){
        const {props} = this;
        const front_office = props.request && props.request.map(data =>(
            <Col lg={4} md={6} sm={6} xs={12} className="mb-3" key={data.id} onClick={()=>this.handleClick(data.link,data.Title)}>
              {/* <Link to={`/${data.link}`} > */}
                <Card className="front-office-main">
                <Media className="mediaMain">
                    <Media body>
                        <Media heading>
                            {data.Title}
                        </Media>
                    <span className="sub-title"> {data.SubTitle}</span>
                    </Media>
                    <Media right>
                    <MdKeyboardArrowRight/>
                    </Media>
                </Media>
                </Card> 
                {/* </Link> */}
            </Col>
        ));
       return (
       <div className=''> 
        <Page>
         <Row className="ServicePageMain">
            {front_office}
          </Row>
        </Page>
      </div>
   );
  }
}


FrontOffice.propTypes = {
    actions: PropTypes.object.isRequired,
    request: PropTypes.array.isRequired,
  };
  
  function mapStateToProps(state)
  {
       return {
         // reducers function name and action name
         request: state.frontOffice.frontOffice,
       };
  }
  
  function mapDispatchToProps(dispatch)
  {
       return {
            actions: bindActionCreators({
                loadFrontOffice,
                handle_header
            }, dispatch),
       };
  }
  
  export default connect(
          mapStateToProps,
          mapDispatchToProps
  )(FrontOffice);