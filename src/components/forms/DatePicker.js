import  React from 'react';
// import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';
function convertDate(date, formate) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return formate
         .replace(/Y+/, year)
         .replace(/M+/, month)
         .replace(/D+/, day)
         .replace(/h+/, hour)
         .replace(/m+/, minute)
         .replace(/s+/, second);
}
export default class App extends React.Component {
    state = {
        time: new Date(),
        isOpen: false,
        _time: undefined
    }
 
    handleClick = () => {
        this.setState({ isOpen: true });
    }
 
    handleCancel = () => {
        this.setState({ isOpen: false });
    }
 
    handleSelect = (time) => {
        this.setState({ time, isOpen: false, _time: time });
        
    }
 
    render() {
        console.log(this.state)
        return (
            <div className="App" style={{color:"white"}}>
                 <a
                    className="select-btn"
                    onClick={this.handleClick}>
                <p className="select-time ">
                        {convertDate(this.state.time, 'YYYY-MM-DD')}
                    </p>
                    </a>
                <a
                    className="select-btn"
                    onClick={this.handleClick}>
                   {/* {this.props.label} */}

                </a>
 
                <DatePicker
                    className="input-bgColor"
                    value={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel} />
            </div>
        );
    }
}

