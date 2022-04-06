import React, { Component } from "react";
import ImgUp from "./imgUp";
import Axios from "axios";

export default class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageInput: "",
      nameInput: "",
      priceInput: "",
      loading: false,
      error: false,
    };

    this.handleImage = this.handleImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImage(event) {
    this.setState({
      imageInput: [event.target.response.data.url],
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      loading: true,
      error: false,
    });

    Axios.post("https://capstone-coastal-gothic.herokuapp.com/product", {
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        image: this.state.imageInput,
        name: this.state.nameInput,
        price: this.state.priceInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.history.push("/product");
        }
      })
      .catch((error) => {
        console.log("Error adding Products ", error);

        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render() {
    return (
      <div className="product-item-wrapper">
        <ImgUp onLoad={this.handleImage} />

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="imageInput" value={this.state.image} />

          <input
            type="text"
            placeholder="name"
            name="nameInput"
            value={this.state.nameInput}
            onChange={this.handleChange}
          />

          <input
            type="text"
            placeholder="price"
            name="priceInput"
            value={this.state.priceInput}
            onChange={this.handleChange}
          />

          <button type="submit" disabled={this.state.loading}>
            Add Product
          </button>
        </form>

        {this.state.loading ? (
          <div className="loading">Submitting...</div>
        ) : null}

        {this.state.error ? (
          <div className="error">
            An error occured... Please try again later.
          </div>
        ) : null}
      </div>
    );
  }
}
