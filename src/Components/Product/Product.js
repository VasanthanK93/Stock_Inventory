import React from "react";
import Popup from "../Popup/Popup";
import DeletePopup from "../DeletePopup/DeletePopup";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showDelete: false
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.handle_delete = this.handle_delete.bind(this);
  }
  togglePopup = async () => {
    await this.setState({ showPopup: !this.state.showPopup });
  };

  handle_delete = async () => {
    await this.setState({ showDelete: !this.state.showDelete });
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
                edit_Item={this.props.edit_Item}
                product={this.props.product}
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
            <button
              className="btn btn-outline-danger"
              onClick={this.handle_delete}
            >
              Delete
            </button>
            {this.state.showDelete ? (
              <DeletePopup
                product={this.props.product}
                toggleDelete={this.handle_delete.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
