import React from "react";
import Product from "../Product/Product";

class ProductList extends React.Component {
  render() {
    return (
      <div className="card-deck mt-3">
        {this.props.product_list.map(product => {
          return (
            <Product
              delete_item={this.props.delete_item}
              edit_Item={this.props.edit_Item}
              product={product}
              key={product.id}
            />
          );
        })}
      </div>
    );
  }
}

export default ProductList;
