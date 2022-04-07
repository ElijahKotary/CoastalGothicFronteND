import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'

export default function AddProduct({
  image,
  name,
  price,
  loading,
  error,
  setError,
  setLoading,
  handleSubmit,
}) {
  const [imageUrlInput, setUrlInput] = useState("");
  const [imageInput, setImageInput] = useState(image || "");
  const [nameInput, setNameInput] = useState(name || "");
  const [priceInput, setPriceInput] = useState(price || "");
  const [requiredError, setRequiredError] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setRequiredError(true);

    const formattedImage = imageInput
      .trim()
      .split(" ")
      .map((word) => (word !== "" ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

    const formattedName = nameInput
      .trim()
      .split(" ")
      .map((word) => (word !== "" ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

    const formattedPrice = priceInput.trim();

    let image = setUrlInput;
    if (imageInput) {
      const form = new FormData();
      form.append("file", imageInput);
      form.append("upload_preset", "coastal");

      await fetch(
        `https://api.cloudinary.com/v1_1/coastalgothic/image/upload`,
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
            setUrlInput(data.url);
          }
        })
        .catch((error) => {
          setError("An error occured... Please try again later.");
          setLoading(false);
          console.log("Error adding shelf: ", error);
        });
    }

    handleSubmit({
      imageInput: formattedImage,
      nameInput: formattedName,
      priceInput: formattedPrice,
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
      <div className="image-wrapper">
        <label>
          Upload Image
          <img src={imageInput ? imageInput : imageUrlInput} alt="" />
        </label>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="options-wrapper">
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
        Name
        <input
          type="text"
          autoCorrect="off"
          placeholder="*Required"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="text"
          autoCorrect="off"
          placeholder="*Required"
          value={priceInput}
          onChange={(event) => setPriceInput(event.target.value)}
        />
      </label>

      <div className="options-wrapper">
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>

      <div className="error-loading">
        {error}
        {loading ? <img src={loadingImg} /> : null}
      </div>
    </form>
  );
}
