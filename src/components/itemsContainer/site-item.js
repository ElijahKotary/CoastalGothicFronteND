import React, { Component } from "react";

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    fetch("https://capstone-coastalgothic.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          products: data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error getting items ", error);
        this.setState({
          error: true,
          loading: false,
        });
      });
  }

  renderItems() {
    const productsHtml = this.state.products.map((product) => (
      <div className="item-wrapper" key={product.id}>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>
    ));

    return productsHtml;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="products-page-wrapper">
          <div className="products-wrapper">
            <div className="loading">Loading...</div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="items-page-wrapper">
          <h2>Items</h2>
          <div className="items-wrapper">
            <div className="error">
              An error occured... Please try again later.
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="items-page-wrapper">
          <div className="items-wrapper">{this.renderItems()}</div>
        </div>
      );
    }
  }
}
