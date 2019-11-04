import React from "react";
// import Page from "../../components/Page";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Active from "./Active";
import Completed from "./Completed";
import { connect } from "react-redux";
import { loadGuestRequests,handle_header } from "../../actions";
import { bindActionCreators } from "redux";
import { red } from "@material-ui/core/colors";

class RequestMain extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.generateAvtiveData = this.generateAvtiveData.bind(generateAvtiveData)
    // this.generateCompletedData = this.generateCompletedData.bind(generateCompletedData)
    this.state = {
      activeTab: "1",
       laoder1:false,
         };
  }

 

  componentDidMount() {
    console.log(this.props,'dsgfdsgsgfgsgs')
    let data = {
    roomNo: localStorage.getItem("roomNo"),
    user_last_name: localStorage.getItem("guestName")
    
    };
    setTimeout(() => {
      this.props.actions.loadGuestRequests(data);
      this.props.actions.handle_header(['Request',true])
      }, 1200);
     this.setState({loader1:true})
    }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

generateAvtiveData = () => {
  //  this.setState({laoder:true}) 
  let activeGuestRequests = this.props.requests && this.props.requests.filter(request => request.completedAt == null)
  return activeGuestRequests;
}

generateCompletedData = () => {
  let activeGuestRequests = this.props.requests && this.props.requests.filter(request => request.completedAt != null)
  return activeGuestRequests;
}

  render() {
    
    console.log(this.props,'llllllllllllllllllll',this.state.loader1)
    
    // if(this.props.requests.length==0){
    // return(
    //   <div  className="RequestMainDiv"><p style={{top:"20px",color:"red"}}>loading...</p>
    //     </div>
    // )
    // }else{
    //  console.log(this.state.laoder1,'eeeellllllllllllllllllll')
      // 
     return (
      this.props.requests && this.props.requests.length > 0 ?
      <div className="RequestMainDiv">
        {/* <Page> */}
          <div className="tabRequestMain">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Active
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Completed
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          {/* <Loader loaded={false} lines={13} length={20} width={10} radius={30}
    corners={1} rotate={0} direction={1} color="#000" speed={1}
    trail={60} shadow={false} hwaccel={false} className="spinner"
    zIndex={2e9} top="50%" left="50%" scale={1.00}
    loadedClassName="loadedContent" /></LOader> */}
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Active data={this.generateAvtiveData()} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Completed data={this.generateCompletedData()} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        {/* </Page> */}
      </div> : <div></div>
    );
              //  }
  }
}

const mapStateToProps = (state) => {
  return {
    // reducers function name and action name
    requests: state.guestRequests.requests,
    laoder:state.guestRequests.loader
  };
}

const  mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        loadGuestRequests,
        handle_header
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestMain);
