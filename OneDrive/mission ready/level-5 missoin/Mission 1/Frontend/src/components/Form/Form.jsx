import styles from "./Form.module.css";
import { useState } from "react";
import axios from "axios";
import { SUV, truck, sedan } from "./scrypt.js";

const Form = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [response, setResponse] = useState(null);

  // Use state for reference arrays (optional, but allows future dynamic updates)
  const [suvImages] = useState(SUV);
  const [truckImages] = useState(truck);
  const [sedanImages] = useState(sedan);

  const changeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:5000/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
    } catch (error) {
      alert(
        "Failed to upload image.\n" +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setResponse(null);
    const fileInput = document.querySelector(".file-input");
    if (fileInput) fileInput.value = "";
  };

  const showResult = !!response;

  // Helper to get the top prediction
  const getTopPrediction = (response) => {
    if (response && response.predictions && response.predictions.length > 0) {
      return response.predictions[0].tagName;
    }
    return null;
  };

  // Helper to get a reference image from the arrays
  const getReferenceImage = (className) => {
    if (!className) return null;
    // Example: match className to folder/array
    if (className.toLowerCase().includes("suv") && suvImages.length > 0) {
      return suvImages[0].image;
    }
    if (className.toLowerCase().includes("truck") && truckImages.length > 0) {
      return truckImages[0].image;
    }
    if (className.toLowerCase().includes("sedan") && sedanImages.length > 0) {
      return sedanImages[0].image;
    }
    // fallback: null
    return null;
  };

  return (
    <section className={styles.section}>
      <div
        className={styles.container}
        style={{ display: showResult ? "block" : "none" }}
      >
        {response && (
          <div className={styles.resultContainer}>
            <h2>Classification Result:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
            {/* Show reference image for predicted class */}
            {getTopPrediction(response) && (
              <div>
                <h3>Reference Image:</h3>
                <img
                  src={getReferenceImage(getTopPrediction(response))}
                  alt={getTopPrediction(response)}
                  className={styles.previewImage}
                />
              </div>
            )}
            {/* show the uploaded image */}
            {previewUrl && (
              <div>
                <h3>Your Uploaded Image:</h3>
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={resetForm}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={styles.formContainer}
        style={{ display: showResult ? "none" : "block" }}
      >
        <h1>Upload Car Image</h1>
        <form onSubmit={submit}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={changeFile}
              className={styles.fileInput + " file-input"}
            />
          </div>
          {previewUrl && (
            <div>
              <h2>Preview:</h2>
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Upload & Classify
            </button>
            <button
              type="button"
              className="reset-button"
              onClick={resetForm}
              style={{ marginLeft: "10px" }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
