import React, { useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct({
  image,
  item,
  price,
  loading,
  error,
  setError,
  setLoading,
  handleSubmit,
}) {
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageInput, setImageInput] = useState(image || "");
  const [itemInput, setItemInput] = useState(item || "");
  const [priceInput, setPriceInput] = useState(price || "");
  const [requiredError, setRequiredError] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setRequiredError(false);

    let image = imageUrlInput;
    if (imageInput) {
      const form = new FormData();
      form.append("file", imageInput);
      form.append("upload_preset", "coastal");

      await fetch(
        "https://api.cloudinary.com/v1_1/coastalgothic/image/upload",
        {
          method: "POST",
          body: form,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error.message);
            setError("An error occured... Please try again later.");
            setLoading(false);
          } else {
            image = data.url;
            setImageUrlInput(data.url);
          }
        })
        .catch((error) => {
          setError("An error occured... Please try again later.");
          setLoading(false);
          console.log("Error adding product: ", error);
        });
    }

    handleSubmit({
      imageInput: image,
      itemInput: item,
      priceInput: price,
    });
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = new FileReader();
      let img = event.target.files[0];
      file.onload = () => setImageInput(file.result);
      file.readAsDataURL(img);
    }
  };

  const handleImageRemove = (event) => {
    event.preventDefault();

    setImageInput(null);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div classitem="image-wrapper">
        <label>
          Upload Image
          <img src={imageInput ? imageInput : imageUrlInput} alt="" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div classitem="options-wrapper">
            <FontAwesomeIcon icon={faUpload} />
            {imageInput ? (
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={handleImageRemove}
              />
            ) : null}
          </div>
        </label>
      </div>

      <label>
        item
        <input
          type="text"
          placeholder="*Required"
          value={itemInput}
          onChange={(event) => setItemInput(event.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="text"
          placeholder="*Required"
          value={priceInput}
          onChange={(event) => setPriceInput(event.target.value)}
        />
      </label>

      <div classitem="options-wrapper">
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>
      <div classitem="error-loading">
        {error}
        {loading}
      </div>
    </form>
  );
}
