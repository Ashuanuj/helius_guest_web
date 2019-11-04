import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, Input,FormGroup } from 'reactstrap';
import { Field,reduxForm, formValueSelector } from 'redux-form';
import TextInput from '../components/forms/TextInput';
import NumberInput from '../components/forms/NumberInput';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flow from 'lodash/flow';
import { handleError } from '../actions'
import DatePickerInput from './forms/DatePickerInput';
import moment from 'moment';

// const validate = values => {
//   const errors = {};
//   if (!values.name) {
//   errors.name = 'Required';
//   }
  
//   if (!values.roomno) {
//   errors.roomno = 'Required';
//   }
//   return errors;
//   };
let a
class RequestForm extends React.Component{
 state ={
   error: this.props.error,
   clicked: true
 }
  changeData = (errorId) => {
    this.props.actions.handleError()
    this.setState({
      [`error${errorId}`]: this.props.error_1
    })
    // this.props.onChange()
  }
  
    render(){
      const { handleSubmit} = this.props;
      console.log(this.props, 'ppppppppppppp')
      if( this.props.error && this.props.error.message){
      this.props.error && this.props.error.message.indexOf('Missing')!== -1? a=true:a=false
      }else{
        a=false
      }

  return (
    this.props.error&&this.props.error.customMessage=="Invalid Url"?  <div>
    <h1 className="subpara">404 page not found</h1>
</div>:
    <Col className="form-main">
      <Form onSubmit={handleSubmit} autoComplete="off">

        <FormGroup style={{border:!this.props.values.name && this.state[`error${1}`] != undefined ? '1px solid red':
        this.props.values.name && this.props.error && this.props.error.message ? '' :
          !this.props.values.name && this.props.error && (this.props.error.customMessage && this.props.error.customMessage.indexOf('Guest') !== -1 || this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true) ? '1px solid red':

          this.props.values.name && this.props.error && (this.props.error.customMessage && this.props.error.customMessage.indexOf('Guest') !== -1 ||  this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true)  
          ?'1px solid red':  ''}} >
          <Field component={TextInput} name="name" label="Name" onChange={()=>this.changeData(1)} />
        </FormGroup>

        <FormGroup style={{border: !this.props.values.roomno && this.state[`error${2}`] != undefined ? '1px solid red' : 
        this.props.values.roomno && this.props.error && this.props.error.message ? '' :
        !this.props.values.roomno && this.props.error && (this.props.error.customMessage && this.props.error.customMessage.indexOf('Room') !== -1 || this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true) ? '1px solid red' : a==true?'1px solid red': 
        
        this.props.values.roomno &&  this.props.error && (this.props.error.customMessage && this.props.error.customMessage.indexOf('Room') !== -1 || this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true) ? '1px solid red' :
        
        this.props.error && 
          (this.props.error.customMessage && this.props.error.customMessage.indexOf('Room') !== -1 || this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true) 
          ?'1px solid red':''}}>
          <Field component={NumberInput} name="roomno" label="Room No." onChange={()=>this.changeData(2)} />
        </FormGroup>
        
        <FormGroup style={{border:this.props.values.dob && !this.props.error ? '' : a==true?'1px solid red':
 this.props.error && 
          (this.props.error.customMessage && this.props.error.customMessage.indexOf('Date') !== -1 || this.props.error.message && this.props.error.message.indexOf('Invalid') !== -1 || a==true || this.props.error.customMessage.indexOf('User') !== -1)
          ?'1px solid red':''}}>
          <Field type="date" component={TextInput} name="dob" label="Date of Birth" value="" />  
        
        {/* <Field
          name="dob"
          placeholderText="Date of Birth"
         inputValueFormat='YYYY-MM-DD'
          normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
          component={DatePickerInput}
          
          onChange={this.props.onChange}
        />  */}
        </FormGroup>

 
        <Button
          size="lg"
          className="Requestbtn bg-gradient-Requestbtn border-0"
          block
        >
          REQUEST ACCESS
        </Button>
        
      </Form>
    </Col>

    );
  }
}

RequestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const selector = formValueSelector('guestForm');

const mapStateToProps = state => {
  return {
    error: state.gformReducers.error,
    error_1: state.gformReducers.error_1,
    values: {
      name: selector(state, 'name'),
      roomno: selector(state, 'roomno'),
      dob: selector(state, 'dob'),
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      handleError
    },dispatch)
  }
}

export default flow([
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
  form: "guestForm",
  //validate
 }),
])
(RequestForm);