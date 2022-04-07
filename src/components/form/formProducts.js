import React, { useState, useEffect } from "react";

import AddProduct from "./addProduct";

export default function formProducts({ image, name, price }) {
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
        fetch("https://capstone-coastal-gothic.herokuapp.com/products", {
          // https://capstone-coastal-gothic.herokuapp.com/products
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            image: addData.imageInput,
            name: addData.nameInput,
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
            console.log("Error adding book: ", error);
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

  const handleCancel = () => setDisplay("bookcase");

  return (
    <div className="add-book">
      <AddProduct
        image={image}
        name={name}
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
