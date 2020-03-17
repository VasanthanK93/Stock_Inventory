import React from "react";
import "./DeletePopup.css";

class DeletePopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="modal-header bg-dark">
            <h6 className="modal-title text-white">Delete Item?</h6>
            <button
              className="close text-white"
              onClick={this.props.toggleDelete}
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete{" "}
              <b>{this.props.product.product_Name}</b>
              from the stock?
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={this.props.delete_item}>
              Delete
            </button>
            <button className="btn btn-info" onClick={this.props.toggleDelete}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeletePopup;
