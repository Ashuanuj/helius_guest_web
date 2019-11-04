import React, { Component } from 'react';
import { Row, Col, Card, Media, Button } from 'reactstrap';
// import{Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getServiceSubCategory, storeOrder } from '../../actions'
import {Link} from 'react-router-dom';
import history from '../../helper/history';

class SubCategory1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalItems: 0,
      totalRate: 0
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }
  componentWillMount() {
    this.props.actions.getServiceSubCategory(localStorage.getItem('serviceSubCategoryId'));    
  }

  handleAddItem(id) {
    let index = this.props.subcategory.findIndex(item => item.id === id)
    this.props.subcategory[index].accept = true
    
    this.setState({
      [`add${id}`]: this.state[`add${id}`] == undefined ? this.state[`add${id}`] = true : this.state[`add${id}`] == true ? this.state[`add${id}`] = false : this.state[`add${id}`] == true
    })
  }

  onIncrement(id) {
    let index = this.props.subcategory.findIndex(item => item.id === id)
    this.props.subcategory[index].selectedItems += 1
    this.props.subcategory[index].itemsRate += parseFloat(this.props.subcategory[index].rate)

    this.setState({
      [`selectedItem${id}`]: this.state[`selectedItem${id}`] = this.props.subcategory[index].selectedItems,
      totalItems: this.state.totalItems + 1,
      totalRate: this.state.totalRate + parseFloat(this.props.subcategory[index].rate)
    })
  }

  onDecrement(id) {
    let index = this.props.subcategory.findIndex(item => item.id === id)
    this.setState({
      [`selectedItem${id}`]: this.state[`selectedItem${id}`] = this.props.subcategory[index].selectedItems,
      totalItems: this.state.totalItems > 0 && this.props.subcategory[index].selectedItems > 0 ? this.state.totalItems - 1 : this.state.totalItems, 
      totalRate: this.state.totalItems > 0 && this.props.subcategory[index].selectedItems > 0 ? this.state.totalRate - parseFloat(this.props.subcategory[index].rate) : this.state.totalRate
    })
    this.props.subcategory[index].selectedItems = this.props.subcategory[index].selectedItems > 0 ? this.props.subcategory[index].selectedItems - 1 : 0
    this.props.subcategory[index].itemsRate = this.props.subcategory[index].selectedItems > 0 && this.props.subcategory[index].itemsRate > 0 ? this.props.subcategory[index].itemsRate - parseFloat(this.props.subcategory[index].rate) : this.props.subcategory[index].itemsRate
    this.props.subcategory[index].accept =  this.props.subcategory[index].selectedItems == 0 ? false : true
  }

  handleContinue(e) {
    e.preventDefault();
    this.props.actions.storeOrder(this.props.subcategory)
    history.push("/"+localStorage.getItem('tenantId')+'/checkout')
  }

  render() {
    const { props } = this;
    const subCategoryitems = props.subcategory && props.subcategory.map(data => (
      <Col lg={4} md={6} sm={6} xs={12} className="" key={data.id} >
        <Card className="">
          <Media className="SubcategoryMain">
            <Media left>
              <Media object src={data.image} alt="image" />
            </Media>
            <Media body>
              <Media heading>
                <Media object src={data.icon} alt="image" />{data.Title}
              </Media>
              <span className="items-list"> {data.SubTitle} </span>
              <b>{`$${data.rate}`}</b>
            </Media>

            <Media right>
              <Button className="addbtn " style={{ display: !this.state[`add${data.id}`] ? "block" : "none" }} onClick={() => this.handleAddItem(data.id)}>Add</Button>
              <div className="qtybtn" style={{ display: this.state[`add${data.id}`] ? "block" : "none" }}>
                <span className="minus" onClick={() => this.onDecrement(data.id)} style={{userSelect:"none"}}>-</span>
                <span className="count"><b>{data.selectedItems}</b></span>
                <span className="plus" onClick={() => this.onIncrement(data.id)} style={{userSelect:"none"}}>+</span>
              </div>
            </Media>

          </Media>
        </Card>
      </Col>
    ));
    return (
      <div className='tabContent'>
        <Row className="ServicePageMain">
          {subCategoryitems}
        </Row>
        <div className="addItem-div">
          <span> {`${this.state.totalItems} Items || $ ${this.state.totalRate}`}</span>
          {/* <Link to="/checkout"> */}
          <Button
            size="lg"
            className="ContinueBtn btn-outline-info"
            onClick={(e) => this.handleContinue(e)}
          >
            Continue
            </Button>
        </div>
      </div>
    );
  }
}

SubCategory1.propTypes = {
  actions: PropTypes.object.isRequired,
  subcategory: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
  return {
    // reducers function name and variable name 
    subcategory: state.subCategory.subCategory && state.subCategory.subCategory.map(item => {
      return {
        id: item.id,
        accept: false,
        selectedItems: 0,
        itemsRate: 0,
        Title: item.title,
        SubTitle: item.subTitle,
        icon: item.icon,
        image: item.image,
        rate: item.rate,
        link: item.link
      }
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getServiceSubCategory,
      storeOrder
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategory1);