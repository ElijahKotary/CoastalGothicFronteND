import React from "react";
import SiteContainer from "../itemsContainer/site-container";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="catalog-item-list">{<SiteContainer />}</div>
    </div>
  );
}
