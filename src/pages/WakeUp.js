import React from 'react';
import {Row,Button,Table,FormGroup,Label,CustomInput,Input } from 'reactstrap';
import Page from '../components/Page'
import history from '../helper/history';
import TextInput from "../components/forms/TextInput";
import {handle_header} from '../actions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class WakeUp extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    componentWillMount(){
        this.props.actions.handle_header(['Wake up Call',true])
        }
        handleClick = (link) => {
        history.push(link)
        }
    

    render(){
        return(
            <div>
                <Page>
                <Row className="wakeup-div"> 
                <Table className="tableRadio">
                    <tbody className="radio-div">
                            <tr>
                                <>
                            <FormGroup row className="table-div">
                             <Label className="label" for="exampleCheckbox">Select a Slot : </Label>
                                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Now" inline 
                               />
                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Later" inline 
                                defaultChecked
                                />
                            </FormGroup>
                               </>
                            </tr>
                    </tbody>
                </Table>
                <div className="note-text"> 
                 <FormGroup>
                     <Input type="textarea" rows="3" component={TextInput} placeholder="E.g. Wake me up at 7am sharp tomorrow" />
                 </FormGroup>
                </div>
                <div className="WakeupRequestBtn-div" >
                        <Button
                            size="lg"
                            className="btnCancel"
                            onClick={() => this.handleClick('/frontoffice')}
                            >
                               Cancel
                        </Button>
                        <Button
                            size="lg"
                            className="btnReqt bg-gradient-Requestbtn border-0"
                            onClick={() => this.handleClick('/requestmain')}
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

function mapDispatchToProps(dispatch) {
    return {
    actions: bindActionCreators(
    {
    handle_header
    },
    dispatch
    )
    };
    }
    
    export default connect(
    null,
    mapDispatchToProps
    )(WakeUp);