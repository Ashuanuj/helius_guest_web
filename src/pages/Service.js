import React from "react";
import {
  Row,
  Button,
  Table,
  FormGroup,
  Label,
  CustomInput,
  Input
} from "reactstrap";
import Page from "../components/Page";
import history from "../helper/history";
import TextInput from "../components/forms/TextInput";
import { handle_header ,createRequest} from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class WakeUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleService = this.handleService.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
  }
  componentWillMount() {
    this.props.actions.handle_header([localStorage.getItem('serviceSubCategoryName'), true]);
  }
  handleService = link => {
      console.log(link, 'from service.js')
    history.push("/"+localStorage.getItem('tenantId')+'/category');
  };

  handleProduct = link => {
    history.push(link)
  }

  handleClick=()=>{
    let cart_details=[{
      SubTitle: " ",
      Title:localStorage.getItem('serviceSubCategoryName') ,
       accept: true,
       id: localStorage.getItem('serviceSubCategoryId'),
       image: "",
       itemsRate: 0,
       rate: 0,
      selectedItems: 0,
    }]
      let _data=cart_details
     this.props.actions.createRequest(_data);
    history.push("/"+localStorage.getItem('tenantId')+"/requestmain");
  }

  render() {
      const {props} = this;
      console.log(props,' from service.js');
      
    return (
      <div>
        <Page>
          <Row className="wakeup-div">
            <Table className="tableRadio">
              <tbody className="radio-div">
                <tr>
                  <>
                    <FormGroup row className="table-div">
                      <Label className="label" for="exampleCheckbox">
                        Select a Slot :{" "}
                      </Label>
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio"
                        name="customRadio"
                        label="Now"
                        inline
                      />
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio2"
                        name="customRadio"
                        label="Later"
                        inline
                        defaultChecked
                      />
                    </FormGroup>
                  </>
                </tr>
              </tbody>
            </Table>
            <div className="note-text">
              <FormGroup>
                <Input
                  type="textarea"
                  rows="3"
                  component={TextInput}
                  placeholder="E.g. Wake me up at 7am sharp tomorrow"
                />
              </FormGroup>
            </div>
            <div className="WakeupRequestBtn-div">
              <Button
                size="lg"
                className="btnCancel"
                onClick={() => this.handleService("/"+localStorage.getItem('tenantId')+`/${localStorage.getItem('serviceName')}`)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="btnReqt bg-gradient-Requestbtn border-0"
                onClick={() => this.handleClick("/"+localStorage.getItem('tenantId')+"/requestmain")}
              >
                Request
              </Button>
            </div>
          </Row>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        serviceSubCategory: state.subCategory.serviceSubCategory
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        handle_header,
        createRequest
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WakeUp);
