import React from "react";
import "./App.css";
import ProductList from "../../Container/ProductList";
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
  }

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
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        <ProductList
        />
      </div>
    );
  }
}

export default App;
