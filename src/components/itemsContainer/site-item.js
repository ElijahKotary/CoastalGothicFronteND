import React, { Component } from "react";
import axios from "axios";
import CatalogItem from "./catalog-item";

export default class SiteItems extends Component {
  constructor() {
    super();

    this.state = {
      catalogItems: [],
    };

    this.getCatalogItems = this.getCatalogItems.bind(this);
  }

  getCatalogItems() {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        this.setState({
          catalogItems: response.data.products,
        });
      })
      .catch((error) => {
        console.log("getCatalogItems error", error);
      });
  }

  componentWillMount() {
    this.getCatalogItems();
  }

  render() {
    const catalogRecords = this.state.catalogItems.map((catalogItem) => {
      return <CatalogItem key={catalogItem.id} catalogItem={catalogItem} />;
    });

    return <div>{catalogRecords}</div>;
  }
}

// https://capstone-coastalgothic.herokuapp.com/products
