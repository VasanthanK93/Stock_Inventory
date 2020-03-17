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

  get_data = async url => {
    try {
      let response = await axios.get(url);
      let product_list = response.data.filter(val => {
        return val.deleteStatus === false;
      });
      await this.setState({ ProductList: product_list });
    } catch (e) {
      console.log(e);
    }
  };

  edit_data = async (url, data) => {
    try {
      let response = await axios.put(url, data);
      if (response.status === 200) {
        let get_url =
          "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks";
        await this.get_data(get_url);
        return response.status;
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = async () => {
    let url =
      "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks";
    await this.get_data(url);
  };

  add_item = async form_Data => {
    try {
      let id = this.state.ProductList.length;
      let url =
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/addStock/" +
        id;
      form_Data = { ...form_Data, id: id, deleteStatus: false };
      let response = await this.edit_data(url, form_Data);
      if (response === 200) {
        await this.togglePopup;
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  edit_item = async form_Data => {
    try {
      let id = form_Data.id;
      let url =
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/editStock/" +
        id;
      let response = await this.edit_data(url, form_Data);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  delete_item = async id => {
    try {
      let data = { deleteStatus: true };
      let url =
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/deleteStocks/" +
        id;
      let response = await this.edit_data(url, data);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  search_item = async val => {
    try {
      let url =
        "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/getStocks/" +
        val;
      await this.get_data(url);
    } catch (e) {
      console.log(e);
    }
  };

  togglePopup = async () => {
    await this.setState({
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
