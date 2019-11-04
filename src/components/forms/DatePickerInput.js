import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

export default class DatePickerInput extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    inputValueFormat: PropTypes.string,
  };

  static defaultProps = {
    inputValueFormat: null,
  };

  state = {
    selectedDate: null,
  };

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(this.props.input.value, this.props.inputValueFormat),
      });
    }
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    });
 
    this.props.input.onChange(date);
    console.log(date,'date')
  }

  render() {
    const {
      meta: { touched, error, warning},
      ...input 
    } = this.props;

    return (
      <div>
        <DatePicker
          {...input}
          selected={this.state.selectedDate}
          onChange={this.handleChange}
          className="form-control"
        />
       {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }
}
  