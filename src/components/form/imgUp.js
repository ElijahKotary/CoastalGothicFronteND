import React, { useState } from "react";
import Axios from "axios";

export default function () {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "coastal");

    Axios.post(
      "https://api.cloudinary.com/v1_1/coastalgothic/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
    });
    // return response.text()
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload</button>
    </div>
  );
}
