import React from 'react';
import { connect } from 'react-redux';
import Product from "../Components/Product/Product"

const ProductList = (products)=>{
    const data = products.products
    let product = data.map(product => {
        return (
          <Product
            product={product}
            key={product.id}
          />
        );
      })
    if(data.length === 0){
        return (<div>
        <h2>No Stocks Available</h2></div>
        )}else{
            return (<div className="card-deck mt-3">{product}</div>)
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    };
  };
  
  export default connect(
    mapStateToProps
  )(ProductList);