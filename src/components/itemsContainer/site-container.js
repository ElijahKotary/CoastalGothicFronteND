import React, { Component } from "react";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    fetch("https://coastalapi.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          products: data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error getting products ", error);
        this.setState({
          error: true,
          loading: false,
        });
      });
  }

  renderProducts() {
    const productsList = this.state.products.map((products) => (
      <div className="products" key={products.id}>
        <img src={products.image} />
        <h3>{products.item}</h3>
        <p>${products.price}</p>
      </div>
    ));

    return productsList;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="products-load-wrapper">
          <div className="products-wrapper">
            <div className="loading">Loading...</div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="projects-load-wrapper">
          <div className="products-wrapper">
            <div className="error">
              An error occured... Please try again later.
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="products-page-wrapper">{this.renderProducts()}</div>
      );
    }
  }
}
