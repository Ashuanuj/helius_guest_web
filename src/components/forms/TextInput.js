import React from 'react';
import {Input} from 'reactstrap';

const TextInput = ({ input,label, type, meta: { touched, error, warning } }) => (
 <div>
      <Input {...input} placeholder={label} type={type} className="input-bgColor" max="2999-12-31"/>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
 </div>
);
  
export default TextInput;