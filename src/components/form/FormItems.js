import React, { Component } from "react";
import ImgUp from "./imgUp";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageInput: "",
      nameInput: "",
      priceInput: "",
      apiUrl: "https://capstone-coastal-gothic.herokuapp.com/products",
      apiAction: "post",
      loading: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("products[image]", this.state.image);
    formData.append("products[name]", this.state.name);
    formData.append("products[price]", this.state.price);

    return formData;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
    }).then((response) => {
      this.props.handleSuccessfulFormSubmission(response.data.products);

      this.setState({
        imageInput: "",
        nameInput: "",
        priceInput: "",
        loading: false,
        error: false,
      });
    });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="product-item-wrapper">
        <ImgUp />
        <input
          type="text"
          placeholder="image url"
          name="imageInput"
          value={this.state.imageInput}
          onChange={this.handleChange}
        />

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
    );
    //     {this.state.loading ? (
    //       <div className="loading">Submitting...</div>
    //     ) : null}

    //     {this.state.error ? (
    //       <div className="error">
    //         An error occured... Please try again later.
    //       </div>
    //     ) : null}
    // );
  }
}
