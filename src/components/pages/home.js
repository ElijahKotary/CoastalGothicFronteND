import React from "react";
import SiteItem from "./SiteItem";

export default function Home() {
  return (
    <div className="home-wrapper">
      <h2>Full invitory</h2>
      <div className="catalog-item-list">{<SiteItem />}</div>
    </div>
  );
}
