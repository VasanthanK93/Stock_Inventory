import React from "react";
import { connect } from 'react-redux';
import { fetchDataByName } from '../../actions';

class Searchbar extends React.Component {
  search_item =async  e => {
    e.preventDefault();
    const data = document.getElementById("search_value").value,
    {fetchDataByName} = this.props
    await fetchDataByName(data)
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

export default connect (null,{fetchDataByName}) (Searchbar);
