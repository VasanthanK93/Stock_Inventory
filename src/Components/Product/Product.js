import React from "react";
import Popup from "../Popup/Popup";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.delete_item = this.delete_item.bind(this);
  }
  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };
  delete_item = () => {
    const id = this.props.product.id;
    this.props.delete_item(id);
  };
  render() {
    return (
      <div className="col-lg-3 mb-3">
        <div id="card" className="card">
          <img
            src={this.props.product.image}
            className="card-img-top"
            alt={this.props.product.product_Name}
            title={this.props.product.product_Name}
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.product.product_Name}</h5>
            <h6 className="card-text">
              Quantity : {this.props.product.quantity}
            </h6>
            <h6 className="card-text">Price : {this.props.product.price}</h6>
            <h6 className="card-text">
              Total Value :{" "}
              {this.props.product.price * this.props.product.quantity}
            </h6>
            <button
              onClick={this.togglePopup}
              className="btn btn-outline-warning mr-5"
            >
              Edit
            </button>
            {this.state.showPopup ? (
              <Popup
                Method="Edit Item"
                show_popup={this.togglePopup.bind(this)}
                edit_Item={this.props.edit_Item}
                product={this.props.product}
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
            <button
              className="btn btn-outline-danger"
              onClick={this.delete_item}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
