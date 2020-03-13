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

  fetch_data = async () => {
    try {
      let response = await axios.get(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks"
      );
      this.setState({ ProductList: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  post_data = async (form_Data, id) => {
    try {
      let response = await axios.put(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/addStock/" +
          id,
        form_Data
      );
      if (response.status === 200) {
        this.togglePopup();
        this.fetch_data();
        return response.status;
      }
    } catch (e) {
      console.log(e);
    }
  };

  edit_data = async (form_Data, id) => {
    try {
      let response = await axios.put(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/editStock/" +
          id,
        form_Data
      );
      if (response.status === 200) {
        this.fetch_data();
        return response.status;
      }
    } catch (e) {
      console.log(e);
    }
  };

  delete_data = async id => {
    try {
      let response = await axios.delete(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/deleteStocks/" +
          id
      );
      if (response.status === 200) {
        this.fetch_data();
        return response.status;
      }
    } catch (e) {
      console.log(e);
    }
  };

  search_data = async val => {
    try {
      let response = await axios.get(
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks/" +
          val
      );
      if (response.status === 200) {
        this.setState({ ProductList: response.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.fetch_data();
  }

  add_item = async form_Data => {
    try {
      let id = this.state.ProductList.length;
      form_Data = { ...form_Data, id: id };
      let response = await this.post_data(form_Data, id);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  edit_item = async form_Data => {
    try {
      let id = form_Data.id;
      let response = await this.edit_data(form_Data, id);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  delete_item = async id => {
    try {
      let response = await this.delete_data(id);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  search_item = async val => {
    try {
      let response = await this.search_data(val);
    } catch (e) {
      console.log(e);
    }
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
