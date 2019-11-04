import React from "react";

import {
  TabContent,
  TabPane,
  NavItem,
  Nav,
  Row,
  NavLink,
  Col,
  Card,
  Media,
  Button
} from "reactstrap";
import classnames from "classnames";
import { MdAdd, MdRemove } from "react-icons/md";
import Page from "../components/Page";
import { MdKeyboardArrowRight } from "react-icons/md";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSubCategories, handle_header } from "../actions";
import history from "../helper/history";
import { isTaggedTemplateExpression } from "@babel/types";

class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalItems: 0,
      totalRate: 0,
      activeTab: '1'
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  componentWillMount() {
    localStorage.setItem('cart',true)
    console.log(localStorage.getItem('tab'),'ssssssssssssssssssssss')
    // if(localStorage.getItem('tab')=='null'||localStorage.getItem('tab')==null){
      this.props.actions.handle_header([
        localStorage.getItem("serviceSubCategoryName"),
        true
      ]);
      this.props.actions.getSubCategories(
        localStorage.getItem("serviceSubCategoryId")
      );
      localStorage.setItem('tab', 1)
    // }else{
    //   this.props.actions.handle_header([
    //     localStorage.getItem("serviceSubCategoryName"),
    //     true
    //   ]);
    //   this.props.actions.getSubCategories(
    //     localStorage.getItem("serviceSubCategoryId")
    //   );
    //   localStorage.setItem('tab', parseFloat(localStorage.getItem('tab')))
    // }  
  }

  toggle(tab) {
    // if (this.state.activeTab !== tab) {
    //   this.setState({
    //     activeTab: tab
    //   });
      this.setState({
        activeTab: tab
    });
      localStorage.setItem('tab', tab)
    //   this.props.tab = tab
    // }

  }

  handleAddItem(id, e, index) {
    // let index = this.props.subcategory.findIndex(item => item.id === id);
    if (
      localStorage.getItem(index) == null ||
      localStorage.getItem(index) == 0
    ) {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      this.props.actions.handle_header(["Break Fast", true]);
      localStorage.setItem('cart',false)
    }
    this.props.subcategory[index].accept = true;
    this.props.subcategory[index].selectedItems += 1;
    this.props.subcategory[index].itemsRate += parseFloat(
      this.props.subcategory[index].rate
    );

    localStorage.setItem(`_${this.props.subcategory[index].Title}_${index}`, 0);

    this.setState({
      [`add${index}`]:
        this.state[`add${index}`] == undefined ? (this.state[`add${index}`] = true) : this.state[`add${index}`] == true ? (this.state[`add${index}`] = false) : this.state[`add${index}`] == true,
      [`selectedItem${index}`]: (this.state[`selectedItem${index}`] = this.props.subcategory[index].selectedItems),
      totalItems: this.state.totalItems + 1,
      totalRate:
        this.state.totalRate + parseFloat(this.props.subcategory[index].rate)
    });
    // localStorage.getItem(`add${id}`) == 'null' || localStorage.getItem(`add${id}`) == null || localStorage.getItem(`add${id}`) == 0 ?)

    localStorage.getItem("totalItems") != null
      ? localStorage.setItem(
          "totalItems",
          parseFloat(localStorage.getItem("totalItems")) + 1
        )
      : localStorage.setItem("totalItems", 1);

    localStorage.getItem("totalRate") != null
      ? localStorage.setItem(
          "totalRate",
          parseFloat(localStorage.getItem("totalRate")) +
            parseFloat(this.props.subcategory[index].rate)
        )
      : localStorage.setItem("totalRate", this.props.subcategory[index].rate);

    localStorage.getItem("cartCount") == null ||
    (localStorage.getItem("cartCount") == 0 &&
      (localStorage.getItem("totalItems") == null ||
        localStorage.getItem("totalItems") == 0))
      ? localStorage.setItem("cartCount", 1)
      : localStorage.getItem(index) == null ||
        localStorage.getItem(index) == 0
      ? localStorage.setItem(
          "cartCount",
          parseFloat(localStorage.getItem("cartCount")) + 1
        )
      : console.log();

    localStorage.getItem(`${index}_${this.props.subcategory[index].Title}`) != null &&
    localStorage.getItem(`${index}_${this.props.subcategory[index].Title}`) != 0
      ? localStorage.setItem(
          `${index}_${this.props.subcategory[index].Title}`,
          parseFloat(
            localStorage.getItem(`${index}_${this.props.subcategory[index].Title}`)
          ) + 1
        )
      : localStorage.setItem(`${index}_${this.props.subcategory[index].Title}`, 1);

    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) != null &&
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) != 0
      ? localStorage.setItem(
          `${this.props.subcategory[index].Title}_${index}`,
          parseFloat(
            localStorage.getItem(
              `${this.props.subcategory[index].Title}_${index}`
            )
          ) + 1
        )
      : localStorage.setItem(
          `${this.props.subcategory[index].Title}_${index}`,
          1
        );

    localStorage.getItem(index) != null
      ? localStorage.setItem(
          index,
          parseFloat(localStorage.getItem(index)) + 1
        )
      : localStorage.setItem(index, 1);

      
  }

  handleCartAdd = (index, [servicename, justify]) => {
    console.log("ooooooooooooooooooooooooooooooooooooooooooooo");
    localStorage.getItem(index) == 0 ||
    localStorage.getItem(index) == null
      ? localStorage.setItem(
          "cartCount",
          parseFloat(localStorage.getItem("cartCount")) + 1
        )
      : localStorage.setItem("cartCount", localStorage.getItem("cartCount"));
    this.props.actions.handle_header([servicename, justify]);

    
  };

  onIncrement(id, index) {
    // let index = this.props.subcategory.findIndex(item => item.id === id);
    this.props.subcategory[index].selectedItems += 1;
    this.props.subcategory[index].itemsRate += parseFloat(
      this.props.subcategory[index].rate
    );

    this.setState({
      [`selectedItem${index}`]: (this.state[
        `selectedItem${index}`
      ] = this.props.subcategory[index].selectedItems),
      totalItems: this.state.totalItems + 1,
      totalRate:
        this.state.totalRate + parseFloat(this.props.subcategory[index].rate)
    });

    localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == -1 || localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) &&
    (localStorage.getItem(index) == 0 ||
      localStorage.getItem(index) == null)
      ? this.handleCartAdd(index, ["Break Fast", true])
      : console.log("hukumat ki jung");

    localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == -1 || localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) &&
    (localStorage.getItem(index) == 0 ||
      localStorage.getItem(index) == null)
      ? localStorage.setItem(`_${this.props.subcategory[index].Title}_${index}`, 0)
      : console.log();

    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) != null ||
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) != 0
      ? localStorage.setItem(
          `${this.props.subcategory[index].Title}_${index}`,
          parseFloat(
            localStorage.getItem(
              `${this.props.subcategory[index].Title}_${index}`
            )
          ) + 1
        )
      : console.log();

    localStorage.getItem("totalItems") != null
      ? localStorage.setItem(
          "totalItems",
          parseFloat(localStorage.getItem("totalItems")) + 1
        )
      : localStorage.setItem("totalItems", localStorage.getItem("totalItems"));

    localStorage.getItem("totalRate") != null
      ? localStorage.setItem(
          "totalRate",
          parseFloat(localStorage.getItem("totalRate")) +
            parseFloat(this.props.subcategory[index].rate)
        )
      : localStorage.setItem("totalRate", localStorage.getItem("totalRate"));

    localStorage.getItem(index) != null
      ? localStorage.setItem(
         index,
          parseFloat(localStorage.getItem(index)) + 1
        )
      : localStorage.setItem(index, 1);
  }

  handleCartSub = (index, [servicename, justify]) => {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", index);
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) == 0
      ? localStorage.setItem(
          "cartCount",
          parseFloat(localStorage.getItem("cartCount")) - 1
        )
      : localStorage.setItem("cartCount", localStorage.getItem("cartCount"));

       localStorage.setItem('cart',false)
    this.props.actions.handle_header([servicename, justify]);
  };

  onDecrement(id, index) {
    // let index = this.props.subcategory.findIndex(item => item.id === id);
    this.setState({
      [`selectedItem${index}`]: (this.state[
        `selectedItem${index}`
      ] = this.props.subcategory[index].selectedItems),
      totalItems:
        this.state.totalItems > 0 &&
        this.props.subcategory[index].selectedItems > 0
          ? this.state.totalItems - 1
          : this.state.totalItems,
      totalRate:
        this.state.totalItems > 0 &&
        this.props.subcategory[index].selectedItems > 0
          ? this.state.totalRate -
            parseFloat(this.props.subcategory[index].rate)
          : this.state.totalRate
    });

    localStorage.getItem("totalItems") != null &&
    localStorage.getItem("totalItems") > 0 &&
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) > 0
      ? localStorage.setItem(
          "totalItems",
          parseFloat(localStorage.getItem("totalItems")) - 1
        )
      : localStorage.setItem("totalItems", localStorage.getItem("totalItems"));

    localStorage.getItem("totalRate") != null &&
    localStorage.getItem("totalRate") > 0 &&
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) > 0
      ? localStorage.setItem(
          "totalRate",
          parseFloat(localStorage.getItem("totalRate")) -
            parseFloat(this.props.subcategory[index].rate)
        )
      : localStorage.setItem("totalRate", localStorage.getItem("totalRate"));

    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) > 0 &&
    localStorage.getItem(
      `${this.props.subcategory[index].Title}_${index}`
    ) != null
      ? localStorage.setItem(
          `${this.props.subcategory[index].Title}_${index}`,
          parseFloat(
            localStorage.getItem(
              `${this.props.subcategory[index].Title}_${index}`
            )
          ) - 1
        )
      : localStorage.setItem(
          `${this.props.subcategory[index].Title}_${index}`,
          0
        );
    console.log(localStorage.getItem(index));

    localStorage.getItem(index) != null &&
    localStorage.getItem(index) > 0
      ? localStorage.setItem(
          index,
          parseFloat(localStorage.getItem(index) - 1)
        )
      : localStorage.setItem(
          index,
          localStorage.getItem(index)
        );

   { (localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == 0 || localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == null) && (localStorage.getItem(index) == 0 ||localStorage.getItem(index) == null)
      ? this.handleCartSub(index, ["Break Fast", true])
      : console.log();}

    {(localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == 0 || localStorage.getItem(`_${this.props.subcategory[index].Title}_${index}`) == null) &&
    (localStorage.getItem(index) == 0 ||
      localStorage.getItem(index) == null)
      ? localStorage.setItem(`_${this.props.subcategory[index].Title}_${index}`, -1)
      : console.log();}

    this.props.subcategory[index].selectedItems =
      this.props.subcategory[index].selectedItems > 0
        ? this.props.subcategory[index].selectedItems - 1
        : 0;
    this.props.subcategory[index].itemsRate =
      this.props.subcategory[index].selectedItems > 0 &&
      this.props.subcategory[index].itemsRate > 0
        ? this.props.subcategory[index].itemsRate -
          parseFloat(this.props.subcategory[index].rate)
        : this.props.subcategory[index].itemsRate;
    this.props.subcategory[index].accept =
      this.props.subcategory[index].selectedItems == 0 ? false : true;
  }

  handleContinue(e) {
    e.preventDefault();
    console.log(parseInt(localStorage.getItem('cartCount')),';lssdfsdfsdfsfsdfsdfsdf')
    // this.props.actions.storeOrder(this.props.subcategory);
    localStorage.setItem('newcartcount',parseInt(localStorage.getItem('cartCount')))
    localStorage.setItem('cart',true)
    this.props.actions.handle_header(["Checkout", true]);

    history.push("/"+localStorage.getItem('tenantId')+"/checkout");
    this.props.subcategory &&
      this.props.subcategory.forEach((item, index) => {
        item.accept =
          localStorage.getItem(`${item.Title}_${index}`) != null &&
          localStorage.getItem(`${item.Title}_${index}`) != 0
            ? true
            : false;
        item.selectedItems =
          localStorage.getItem(`${item.Title}_${index}`) != null
            ? localStorage.getItem(`${item.Title}_${index}`)
            : 0;
        item.itemsRate =
          localStorage.getItem(`${item.Title}_${index}`) != null
            ? parseFloat(localStorage.getItem(`${item.Title}_${index}`)) *
              item.rate
            : 0;
        localStorage.removeItem(`${item.Title}_${index}`);
      });
    if (
      localStorage.getItem("cart_details") == null ||
      localStorage.getItem("cart_details") == "null"
    ) {
      localStorage.setItem(
        "cart_details",
        JSON.stringify(this.props.subcategory)
      );
    } else {
      let object = JSON.parse(localStorage.getItem("cart_details"));
      object.forEach(cart => {
        this.props.subcategory.forEach(obj => {
          if (obj.id == cart.id) {
            obj.selectedItems =
              parseFloat(obj.selectedItems) + parseFloat(cart.selectedItems);
            obj.itemsRate =
              parseFloat(obj.itemsRate) + parseFloat(cart.itemsRate);
            // cart.accept=true;
          }
        });
      });
      localStorage.setItem(
        "cart_details",
        JSON.stringify(this.props.subcategory)
      );
    }
    localStorage.removeItem("totalRate");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("count");
  }

  render() {
      const { props } = this;
      console.log(props, "from subcategory.js", this.state);

      const headers = props.headers && props.headers.map(item => (
          <NavItem >
            <NavLink
              className={classnames({ active: this.state.activeTab == item.id.toString() })}
              onClick={() => { this.toggle(item.id.toString())}}
            >
              {item.subCategory2Title}
              
            </NavLink>
          </NavItem>
      ))

      const subCategoryitems = props.subcategory && props.subcategory.map((data, index) => {
          //  console.log(data.serviceSubCategory2Id,'llllllllllllldfssssssssssssssssdfsdf',parseInt(localStorage.getItem('tab')))
          if(parseInt(localStorage.getItem('tab')) == data.serviceSubCategory2Id) {
            
        return (<Col lg={4} md={6} sm={6} xs={12} className="col-spacing" key={index} >
          <Card style={{borderRadius:'0px',padding:"15px 10px"}}>
            <Media className="SubcategoryMain">
              <Media left>
                {/* <Media object src={data.image} alt="image" /> */}
              </Media>
              <Media body>
                <Media heading>
                  {/* <Media object src={data.icon} alt="image" /> */}
                  {data.Title}
                </Media>
                <span className="items-list"> {data.SubTitle} </span>
                <b>{`${data.rate}.00`}</b>
              </Media>
  
              <Media right>
                <Button className="addbtn btn" style={{ display: !this.state[`add${index}`] ? "block" : "none" }} onClick={(e) => this.handleAddItem(data.id, e, index)}>{localStorage.getItem(`${data.Title}_${index}`) != null && localStorage.getItem(`${data.Title}_${index}`) != 0 ? localStorage.getItem(`${data.Title}_${index}`) : 'Add'}</Button>
                <div className="qtybtn" style={{ display: this.state[`add${index}`] ? "block" : "none" }}>
                  
                  <span className="minus" style={{display: localStorage.getItem(`${data.Title}_${index}`) != null && localStorage.getItem(`${data.Title}_${index}`) >= 0 ? 'block' : 'none'}} onClick={() => this.onDecrement(data.id, index)} style={{userSelect:"none"}}><MdRemove size={15}/></span>
                                  
                  <span className="count"><b>{localStorage.getItem(`${data.Title}_${index}`) != null || localStorage.getItem(`${data.Title}_${index}`) != 0 ? localStorage.getItem(`${data.Title}_${index}`) : data.selectedItems}</b></span>
                  
                  <span className="plus" style={{display: localStorage.getItem(`${data.Title}_${index}`) != null && localStorage.getItem(`${data.Title}_${index}`) >= 0 ? 'block' : 'none'}} onClick={() => this.onIncrement(data.id, index)} style={{userSelect:"none"}}><MdAdd size={15}/></span>
                </div>
              </Media>
  
            </Media>
          </Card>
        </Col>) 
          }

      }
      );
      console.log(subCategoryitems);
      
    
    return (
        props.subcategory && props.subcategory.length ?
        <div className="tabMain" >
            <Nav tabs >
            {headers}         
            </Nav>
            <TabContent activeTab={this.state.activeTab} style={{}} >
            <div className="sometext"style={{display: 'none',}}>
                <p>Instruction heading</p>
            </div>
                <TabPane tabId={localStorage.getItem('tab')}>
                    <Row>
                        <Col sm="12">
                            <div className='tabContent' style={{overflowY: 'scroll',
    // position: 'fixed',
    top: '130px',
    bottom: '92px',
    overflowX: 'hidden',
    width: '100%',
    height: "calc(100vh - 156px)",
    overflowY: 'scroll' ,
    overflowX: 'hidden',
    padding:" 0 0 100px",
}}>
                                <div style={{right: -100, bottom: 0, zIndex: -9999999, position: "absolute"}}>
                                    <img src='../components/assets/img/icons/cart.svg' />
                                </div>
                                <Row className="ServicePageMain" style={{padding: '20px'}}>
                                    {subCategoryitems}
                                </Row>
                                <div className="addItem-div">
                                    <span> {localStorage.getItem('totalItems') != null ? `${localStorage.getItem('totalItems')} Items | ${localStorage.getItem('totalRate')}.00` :`${this.state.totalItems} Items | ${this.state.totalRate}.00`}</span>
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
                        </Col>
                    </Row>
                </TabPane>
          </TabContent>
      </div> : <div  style={{color:'white', padding: '15 15 15 15'}}><span className="tabMain" style={{backgroundColor: 'rgb(19, 42, 59)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    textAlign: 'center'}}>No data available</span></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subcategory:
      state.subcategory.serviceSubCategory &&
      state.subcategory.serviceSubCategory.map(item => {
        return {
          id: item.id,
          accept: false,
          selectedItems: 0,
          itemsRate: 0,
          Title: item.item,
          SubTitle: item.subTitle,
          icon: item.icon,
          image: item.image,
          rate: item.price,
          link: item.link,
          serviceSubCategory2Id: item.gsSubCat2Id
        };
      }),
      cat: state.subcategory.serviceSubCategory,
      tab: localStorage.getItem('tab'),
    headers: state.subcategory.headers
  };
  //   return {
  //     subCategory: state.subcategory.serviceSubCategory
  //   };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getSubCategories,
        handle_header
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategory);
