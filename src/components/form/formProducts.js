import React, { useState, useEffect } from "react";

import AddProduct from "./addProduct";

export default function FormProducts({ image, item, price, handleSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitForm, setSubmitForm] = useState(false);
  const [submitFormData, setSubmitFormData] = useState({});

  useEffect(() => {
    if (submitForm) {
      const addData = submitFormData;
      setSubmitForm(false);
      setSubmitFormData({});
      if (error === "") {
        fetch("https://coastalapi.herokuapp.com/product", {
          method: "POST",
          body: JSON.stringify({
            image: addData.imageUrlInput,
            item: addData.itemInput,
            price: addData.priceInput,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setLoading(false);
          })
          .catch((error) => {
            setError("An error occured... Please try again later.");
            setLoading(false);
            console.log("Error adding product: ", error);
          });
      } else {
        setLoading(false);
      }
    }
  }, [submitForm]);

  const handleAddSubmit = (addData) => {
    setSubmitFormData(addData);
    setSubmitForm(true);
  };

  return (
    <div classitem="add-product">
      <AddProduct
        image={image}
        item={item}
        price={price}
        handleSubmit={handleAddSubmit}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
    </div>
  );
}
