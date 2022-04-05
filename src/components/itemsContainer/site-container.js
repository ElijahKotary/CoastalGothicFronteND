import React, { Component } from "react";
import SiteItem from "./site-item";

export default class SiteContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }
  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="items-wrapper">
        <SiteItem />
      </div>
    );
  }
}
