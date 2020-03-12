import React from "react";
import axios from "axios";
import "./App.css";
import ProductList from "../ProductList/ProductList";
import Searchbar from "../Searchbar/Searchbar";
import Popup from "../Popup/Popup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductList: [],
      showPopup: false,
      product: { Method: "Add Item", price: 0, quantity: 0 }
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.add_item = this.add_item.bind(this);
    this.edit_item = this.edit_item.bind(this);
    this.delete_item = this.delete_item.bind(this);
  }

  fetch_data = () => {
    axios
      .get(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks"
      )
      .then(response => {
        this.setState({ ProductList: response.data });
      });
  };

  post_data = (form_Data, id) => {
    axios
      .put(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/addStock/" +
          id,
        form_Data
      )
      .then(response => {
        if (response.status === 200) {
          this.togglePopup();
          this.fetch_data();
        }
      });
  };

  edit_data = (form_Data, id) => {
    axios
      .put(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/editStock/" +
          id,
        form_Data
      )
      .then(response => {
        if (response.status === 200) {
          this.togglePopup();
          this.fetch_data();
        }
      });
  };

  delete_data = id => {
    axios
      .delete(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/deleteStocks/" +
          id
      )
      .then(response => {
        if (response.status === 200) {
          this.fetch_data();
        }
      });
  };

  search_data = val => {
    axios
      .get(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks/" +
          val
      )
      .then(response => {
        this.setState({ ProductList: response.data });
      });
  };

  componentDidMount() {
    this.fetch_data();
  }

  add_item = form_Data => {
    let id = this.state.ProductList.length;
    form_Data = { ...form_Data, id: id };
    this.post_data(form_Data, id);
  };

  edit_item = form_Data => {
    let id = form_Data.id;
    this.edit_data(form_Data, id);
  };

  delete_item = id => {
    this.delete_data(id);
  };
  search_item = val => {
    this.search_data(val);
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <h2 className="navbar-brand text-light">Stock List</h2>
          <Searchbar search_item={this.search_item} />
        </nav>
        <hr />
        <button
          id="Add_Button"
          className="btn btn-outline-info ml-5"
          onClick={this.togglePopup}
        >
          Add Items
        </button>
        {this.state.showPopup ? (
          <Popup
            product={this.state.product}
            add_Item={this.add_item.bind(this)}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        <ProductList
          delete_item={this.delete_item.bind(this)}
          edit_Item={this.edit_item.bind(this)}
          product_list={this.state.ProductList}
        />
      </div>
    );
  }
}

export default App;
