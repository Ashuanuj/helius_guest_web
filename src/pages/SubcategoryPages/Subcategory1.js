import React, { Component } from 'react';
import { Row, Col, Card, Media, Button } from 'reactstrap';
// import{Link} from 'react-router-dom';
import {MdAdd,MdRemove} from 'react-icons/md'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getServiceSubCategory, storeOrder, handle_header, setCounter } from '../../actions'
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
    this.props.actions.handle_header(['Break Fast', true]);   
  }

  handleAddItem(id, e) {
    let index = this.props.subcategory.findIndex(item => item.id === id)
    if(localStorage.getItem(this.props.subcategory[index].id) == null || localStorage.getItem(this.props.subcategory[index].id) ==0 ){
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
      this.props.actions.handle_header(['Break Fast',true])
    }
    this.props.subcategory[index].accept = true
    this.props.subcategory[index].selectedItems += 1
    this.props.subcategory[index].itemsRate += parseFloat(this.props.subcategory[index].rate)
    
    localStorage.setItem(`_${this.props.subcategory[index].Title}`, 0) 
    
    this.setState({
      [`add${id}`]: this.state[`add${id}`] == undefined ? this.state[`add${id}`] = true : this.state[`add${id}`] == true ? this.state[`add${id}`] = false : this.state[`add${id}`] == true,
      [`selectedItem${id}`]: this.state[`selectedItem${id}`] = this.props.subcategory[index].selectedItems,
      totalItems: this.state.totalItems + 1,
      totalRate: this.state.totalRate + parseFloat(this.props.subcategory[index].rate)
    })
    // localStorage.getItem(`add${id}`) == 'null' || localStorage.getItem(`add${id}`) == null || localStorage.getItem(`add${id}`) == 0 ?)

    localStorage.getItem('totalItems') != null ? localStorage.setItem('totalItems', parseFloat(localStorage.getItem('totalItems'))+1):localStorage.setItem('totalItems',1);
    
    localStorage.getItem('totalRate') != null ? localStorage.setItem('totalRate', parseFloat(localStorage.getItem('totalRate'))+parseFloat(this.props.subcategory[index].rate)):localStorage.setItem('totalRate', this.props.subcategory[index].rate);
    
    localStorage.getItem('cartCount') == null || localStorage.getItem('cartCount') == 0 && (localStorage.getItem('totalItems') == null || localStorage.getItem('totalItems') == 0) ? localStorage.setItem('cartCount', 1) : localStorage.getItem(this.props.subcategory[index].id) == null || localStorage.getItem(this.props.subcategory[index].id) == 0 ? localStorage.setItem('cartCount', parseFloat(localStorage.getItem('cartCount'))+1) : console.log() 
    
    localStorage.getItem(this.props.subcategory[index].Title) != null && localStorage.getItem(this.props.subcategory[index].Title) != 0 ? localStorage.setItem(this.props.subcategory[index].Title, parseFloat(localStorage.getItem(this.props.subcategory[index].Title))+1) : localStorage.setItem(this.props.subcategory[index].Title, 1)

    localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) != null && localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) !=0 ? localStorage.setItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`, parseFloat(localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`))+1) : localStorage.setItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`, 1)
    
    localStorage.getItem(this.props.subcategory[index].id) != null ? localStorage.setItem(this.props.subcategory[index].id, parseFloat(localStorage.getItem(this.props.subcategory[index].id))+1) : localStorage.setItem(this.props.subcategory[index].id, 1)
    
  }

  handleCartAdd = (index,[servicename, justify]) => {
    console.log('ooooooooooooooooooooooooooooooooooooooooooooo')
    localStorage.getItem(this.props.subcategory[index].id) == 0 || localStorage.getItem(this.props.subcategory[index].id) == null ? localStorage.setItem('cartCount', parseFloat(localStorage.getItem('cartCount')) + 1) : localStorage.setItem('cartCount', localStorage.getItem('cartCount'))
    this.props.actions.handle_header([servicename,justify])
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

    localStorage.getItem(`_${this.props.subcategory[index].Title}`) == -1 && (localStorage.getItem(this.props.subcategory[index].id) == 0 || localStorage.getItem(this.props.subcategory[index].id) == null)  ? this.handleCartAdd(index, ['Break Fast',true]) : console.log('hukumat ki jung')

    localStorage.getItem(`_${this.props.subcategory[index].Title}`) == -1 && (localStorage.getItem(this.props.subcategory[index].id) == 0 || localStorage.getItem(this.props.subcategory[index].id) == null) ? localStorage.setItem(`_${this.props.subcategory[index].Title}`, 0) 
    : console.log()

    localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) != null || localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) !=0 ? localStorage.setItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`, parseFloat(localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`))+1) : console.log()

    localStorage.getItem('totalItems') != null ? localStorage.setItem('totalItems', parseFloat(localStorage.getItem('totalItems'))+1):localStorage.setItem('totalItems',localStorage.getItem('totalItems'));
    
    localStorage.getItem('totalRate') != null ? localStorage.setItem('totalRate', parseFloat(localStorage.getItem('totalRate'))+parseFloat(this.props.subcategory[index].rate)):localStorage.setItem('totalRate', localStorage.getItem('totalRate'));


    localStorage.getItem(this.props.subcategory[index].id) != null ? localStorage.setItem(this.props.subcategory[index].id, parseFloat(localStorage.getItem(this.props.subcategory[index].id))+1) : localStorage.setItem(this.props.subcategory[index].id, 1)
  }

  handleCartSub = (index,[servicename, justify]) => {
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', index)
    localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) == 0  ? localStorage.setItem('cartCount', parseFloat(localStorage.getItem('cartCount')) - 1) : localStorage.setItem('cartCount', localStorage.getItem('cartCount'))
    this.props.actions.handle_header([servicename,justify])
  }

  onDecrement(id) {
    let index = this.props.subcategory.findIndex(item => item.id === id)
    this.setState({
      [`selectedItem${id}`]: this.state[`selectedItem${id}`] = this.props.subcategory[index].selectedItems,
      totalItems: this.state.totalItems > 0 && this.props.subcategory[index].selectedItems > 0 ? this.state.totalItems - 1 : this.state.totalItems, 
      totalRate: this.state.totalItems > 0 && this.props.subcategory[index].selectedItems > 0 ? this.state.totalRate - parseFloat(this.props.subcategory[index].rate) : this.state.totalRate
    })

    localStorage.getItem('totalItems') != null && localStorage.getItem('totalItems') > 0 && localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) > 0 ? localStorage.setItem('totalItems', parseFloat(localStorage.getItem('totalItems'))-1):localStorage.setItem('totalItems', localStorage.getItem('totalItems'));
    
    localStorage.getItem('totalRate') != null && localStorage.getItem('totalRate') > 0 && localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) > 0 ? localStorage.setItem('totalRate', parseFloat(localStorage.getItem('totalRate'))-parseFloat(this.props.subcategory[index].rate)):localStorage.setItem('totalRate', localStorage.getItem('totalRate'));
    
    localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) 
    > 0 && localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`) 
    != null ? localStorage.setItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`, parseFloat(localStorage.getItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`))-1) : localStorage.setItem(`${this.props.subcategory[index].Title}_${this.props.subcategory[index].id}`, 0)
    console.log(localStorage.getItem(this.props.subcategory[index].id))
    
    localStorage.getItem(this.props.subcategory[index].id) != null && localStorage.getItem(this.props.subcategory[index].id) > 0 ? localStorage.setItem(this.props.subcategory[index].id, parseFloat(localStorage.getItem(this.props.subcategory[index].id)-1)) : localStorage.setItem(this.props.subcategory[index].id, localStorage.getItem(this.props.subcategory[index].id))

    localStorage.getItem(`_${this.props.subcategory[index].Title}`) == 0 && (localStorage.getItem(this.props.subcategory[index].id) ==0 )  ? this.handleCartSub(index, ['Break Fast',true]) : console.log('hukumat ki jung')

    localStorage.getItem(`_${this.props.subcategory[index].Title}`) == 0 && (localStorage.getItem(this.props.subcategory[index].id) == 0 || localStorage.getItem(this.props.subcategory[index].id) == null) ? localStorage.setItem(`_${this.props.subcategory[index].Title}`, -1) 
    : console.log()

    this.props.subcategory[index].selectedItems = this.props.subcategory[index].selectedItems > 0 ? this.props.subcategory[index].selectedItems - 1 : 0
    this.props.subcategory[index].itemsRate = this.props.subcategory[index].selectedItems > 0 && this.props.subcategory[index].itemsRate > 0 ? this.props.subcategory[index].itemsRate - parseFloat(this.props.subcategory[index].rate) : this.props.subcategory[index].itemsRate
    this.props.subcategory[index].accept =  this.props.subcategory[index].selectedItems == 0 ? false : true; 
  }

  handleContinue(e) {
    e.preventDefault();
this.props.actions.storeOrder(this.props.subcategory)
this.props.actions.handle_header(['Checkout',true])

history.push("/"+localStorage.getItem('tenantId')+'/checkout')
this.props.subcategory&& this.props.subcategory.forEach(item => {
  item.accept = localStorage.getItem(`${item.Title}_${item.id}`) != null && localStorage.getItem(`${item.Title}_${item.id}`) != 0 ? true : false;
  item.selectedItems = localStorage.getItem(`${item.Title}_${item.id}`) != null ? localStorage.getItem(`${item.Title}_${item.id}`) : 0;
  item.itemsRate = localStorage.getItem(`${item.Title}_${item.id}`) != null ? parseFloat(localStorage.getItem(`${item.Title}_${item.id}`))*item.rate : 0;
  localStorage.removeItem(`${item.Title}_${item.id}`)
})
console.log(this.props.subcategory, 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

if(localStorage.getItem('cart_details')==null || localStorage.getItem('cart_details')=='null'){
  localStorage.setItem('cart_details',JSON.stringify(this.props.subcategory))
}else{
  let object=JSON.parse(localStorage.getItem('cart_details'))
  object.forEach(cart => {
    this.props.subcategory.forEach(obj=>{
      if(obj.id==cart.id){
        obj.selectedItems=parseFloat(obj.selectedItems)+parseFloat(cart.selectedItems)
        obj.itemsRate=parseFloat(obj.itemsRate)+parseFloat(cart.itemsRate)
        // cart.accept=true;
      }
    })
  });
  localStorage.setItem('cart_details',JSON.stringify(this.props.subcategory))
}
localStorage.removeItem('totalRate')
localStorage.removeItem('totalItems')
localStorage.removeItem('count')
}

  render() {
    const { props } = this;
    const subCategoryitems = props.subcategory && props.subcategory.map(data => (
      <Col lg={4} md={6} sm={6} xs={12} className="col-spacing" key={data.id} >
        <Card style={{borderRadius:'0px'}}>
          <Media className="SubcategoryMain">
            <Media left>
              <Media object src={data.image} alt="image" />
            </Media>
            <Media body>
              <Media heading>
                <Media object src={data.icon} alt="image" />{data.Title}
              </Media>
              <span className="items-list"> {data.SubTitle} </span>
              <b>{`${data.rate}.00`}</b>
            </Media>

            <Media right>
              <Button className="addbtn btn" style={{ display: !this.state[`add${data.id}`] ? "block" : "none" }} onClick={(e) => this.handleAddItem(data.id, e)}>{localStorage.getItem(`${data.Title}_${data.id}`) != null && localStorage.getItem(`${data.Title}_${data.id}`) != 0 ? localStorage.getItem(`${data.Title}_${data.id}`) : 'Add'}</Button>
              <div className="qtybtn" style={{ display: this.state[`add${data.id}`] ? "block" : "none" }}>
                <span className="minus" style={{display: localStorage.getItem(`${data.Title}_${data.id}`) != null && localStorage.getItem(`${data.Title}_${data.id}`) >= 0 ? 'block' : 'none'}} onClick={() => this.onDecrement(data.id)} style={{userSelect:"none"}}><MdRemove size={15}/></span>
                                
                <span className="count"><b>{localStorage.getItem(`${data.Title}_${data.id}`) != null || localStorage.getItem(`${data.Title}_${data.id}`) != 0 ? localStorage.getItem(`${data.Title}_${data.id}`) : data.selectedItems}</b></span>
                
                <span className="plus" style={{display: localStorage.getItem(`${data.Title}_${data.id}`) != null && localStorage.getItem(`${data.Title}_${data.id}`) >= 0 ? 'block' : 'none'}} onClick={() => this.onIncrement(data.id)} style={{userSelect:"none"}}><MdAdd size={15}/></span>
              </div>
            </Media>

          </Media>
        </Card>
      </Col>
    ));
    return (
      <div className='tabContent'>
        <div style={{right: -100, bottom: 0, zIndex: -9999999, position: "absolute"}}>
          <img src="../../components/assets/img/icons/cart.svg" />
        </div>
        <Row className="ServicePageMain">
          {subCategoryitems}
        </Row>
        <div className="addItem-div">
          <span> {localStorage.getItem('totalItems') != null ? `${localStorage.getItem('totalItems')} Items | ${localStorage.getItem('totalRate')}.00` :`${this.state.totalItems} Items | ${this.state.totalRate}.00`}</span>
          {/* <Link to="/checkout"> */}
          <Button
            size="lg"
            className="ContinueBtn"
            onClick={(e) => this.handleContinue(e)}
            disabled={localStorage.getItem('totalItems') == null || localStorage.getItem('totalItems') == 0 ? true : false}
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
      storeOrder,
      handle_header,
      setCounter
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategory1);