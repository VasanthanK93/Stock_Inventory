import React from "react";
import { connect } from 'react-redux';
import { addData,editData } from '../../actions';


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: this.props.product.price,
      quantity: this.props.product.quantity
    };
    this.updateName = this.updateName.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.form_add = this.form_add.bind(this);
    this.form_edit = this.form_edit.bind(this);
  }

  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };

  updatePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  updateQuantity = e => {
    this.setState({
      quantity: e.target.value
    });
  };

  form_add = async e => {
      e.preventDefault();
      const form_data = {
        product_Name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity
      };
      let {addData} = this.props
      await addData(form_data)
      await this.props.closePopup();
       };

  form_edit = async e => {
      e.preventDefault();
      const form_data = {
        id: this.props.product.id,
        deleteStatus : this.props.product.deleteStatus,
        image : this.props.product.image,
        product_Name: document.getElementById("product_Name").value,
        price: parseInt(document.getElementById("price").value),
        quantity: parseInt(document.getElementById("quantity").value)
      };
      let {editData} = this.props
      await editData(form_data);
        await this.props.closePopup();
  };

  render() {
    return (
      <div>
        {this.props.product.Method === "Add Item" ? (
          <div className="popup">
          <div className="modal-dialog bg-light rounded">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h6 className="modal-title text-white">
                {this.props.product.Method}
              </h6>
              <button
                className="close text-white"
                onClick={this.props.closePopup}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Product Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Product Name"
                    name="product_Name"
                    onChange={this.updateName}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity: </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    onChange={this.updateQuantity}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price: </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    onChange={this.updatePrice}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Total Value: </label>
                  <input
                    className="form-control"
                    type="string"
                    placeholder="Total Value"
                    value={
                      this.state.quantity !== 0 && this.state.price !== 0
                        ? this.state.quantity * this.state.price
                        : 0
                    }
                    readOnly
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-info"
                    type="submit"
                    onClick={this.form_add}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.props.closePopup}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        ) : (
          <div className="popup">
          <div className="modal-dialog bg-light rounded">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h6 className="modal-title text-white">
                {this.props.Method}
              </h6>
              <button
                className="close text-white"
                onClick={this.props.closePopup}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Product Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Product Name"
                    id="product_Name"
                    onChange={this.updateName}
                    defaultValue={this.props.product.product_Name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity: </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter quantity"
                    id="quantity"
                    defaultValue={this.props.product.quantity}
                    required
                    onChange={this.updateQuantity}
                  />
                </div>
                <div className="form-group">
                  <label>Price: </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter price"
                    id="price"
                    defaultValue={this.props.product.price}
                    required
                    onChange={this.updatePrice}
                  />
                </div>
                <div className="form-group">
                  <label>Total Value: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Total Value"
                    value={
                      this.state.quantity !== 0 && this.state.price !== 0
                        ? this.state.quantity * this.state.price
                        : 0
                    }
                    readOnly
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-info"
                    onClick={this.form_edit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.props.closePopup}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect (null,{addData,editData}) (Popup);
