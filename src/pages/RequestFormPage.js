import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, CardImg } from 'reactstrap';
import RequestForm from '../components/RequestForm'
import componentImg from '../components/assets/img/bg/component.png'
import Footer from '../components/Layout/Footer';
import { guestLogIn, loadService,checkURL } from '../actions';
// import { guestLogIn, loadService, appLoaded } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RequestFormPage extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit = (data, dispatch) => {
    data.params=this.props.location.search
    this.props.actions.guestLogIn(data);
    // this.props.actions.appLoaded();
    this.props.actions.loadService();
  };
  componentWillMount() {
    console.log(this,'llllllllllllllllllllllllllllllllllllll')
    this.props.actions.checkURL(this.props.location.search);
  }
  render() {
    return (
      this.props.urlStatus && this.props.urlStatus.customMessage == "Invalid url" ?
      <div className="main-requestform">
        <Row className="HomeMain">
          <Col className="pz"  md={6} lg={4} >
            <Card body className="cardbody-main">
              <div className="cardImgtext">
                <h1 className="para">404 </h1>
                <h3 className="subpara"> Page Not Found</h3>
              </div>
            </Card>
            {/* <Footer /> */}
          </Col>
        </Row>
      </div>
      :
      <div className="main-requestform">
        <Row className="HomeMain">
          <Col className="pz"  md={6} lg={4} >
            <Card body className="cardbody-main">
              <CardImg
                src={componentImg}
                className="cardImg"
              />
              <div className="cardImgtext">
                <p className="para">Welcome</p>
                <p className="subpara">Are you ready to enjoy a whole new guest experience without limits? Let’s go!</p>
              </div>

              <RequestForm
                onSubmit={this._handleSubmit}
              />

            </Card>

            <Footer />
          </Col>
        </Row>
      </div>

    );
  }
}

RequestFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  // error: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    // error: state.User.error,
    urlStatus: state.checkurl.urlStatus,
    login: state.gformReducers.IS_LOGIN
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      guestLogIn,
      loadService,
      checkURL
      // appLoaded
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestFormPage);

