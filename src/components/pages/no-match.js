import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <h2>We couldn't fidn that page</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
