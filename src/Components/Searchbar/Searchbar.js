import React from "react";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.search_item = this.search_item.bind(this);
  }
  search_item = e => {
    e.preventDefault();
    const data = document.getElementById("search_value").value;
    this.props.search_item(data);
  };
  render() {
    return (
      <div className="search_div">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter Product Name"
            id="search_value"
          />
          <button
            className="btn btn-light my-2 my-sm-0"
            type="submit"
            onClick={this.search_item}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
