import styles from "./Form.module.css";
import { useState } from "react";
import axios from "axios";
import { Suden, Truck, SUV } from "./images.js";

const Form = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [response, setResponse] = useState(null);

  // Use state for reference arrays (optional, but allows future dynamic updates)
  const [suvImages] = useState(SUV);
  const [truckImages] = useState(Truck);
  const [sudenImages] = useState(Suden);

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

  // Helper to get all reference images for the predicted class
  const getReferenceImages = (className) => {
    if (!className) return ["Not Found"];
    if (className.toLowerCase().includes("suv")) {
      return suvImages.map((img) => img.image);
    }
    if (className.toLowerCase().includes("truck")) {
      return truckImages.map((img) => img.image);
    }
    if (className.toLowerCase().includes("suden")) {
      return sudenImages.map((img) => img.image);
    }
    return [];
  };
  const Carousel = ({ images }) => {
    const [index, setIndex] = useState(0);
    if (!images || images.length === 0) return null;

    const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    return (
      <div className={styles.carousel}>
        <button className={styles.carouselBtn} onClick={prev}>
          &lt;
        </button>
        <img
          src={images[index]}
          alt={`Reference ${index + 1}`}
          className={styles.previewImage}
        />
        <button className={styles.carouselBtn} onClick={next}>
          &gt;
        </button>
        <div className={styles.carouselIndicator}>
          {index + 1} / {images.length}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <section
        className={styles.container}
        style={{ display: showResult ? "block" : "none" }}
      >
        {response && (
          <div className={styles.resultContainer}>
            {/* <h2>Classification Result:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre> */}
            {/* Show reference image for predicted class */}
            {getTopPrediction(response) && (
              <div>
                <h1>Matches Images:</h1>
                <div className={styles.referenceImages}>
                  {/* <h1>Matches Images:</h1> */}
                  {getReferenceImages(getTopPrediction(response)).length > 0 ? (
                    <Carousel
                      images={getReferenceImages(getTopPrediction(response))}
                    />
                  ) : (
                    <div className={styles.errorNote}>
                      Not Found. Please Upload A Different Image
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* show the uploaded image */}
            {previewUrl && (
              <div className={styles.uploadedImageContainer}>
                <h3>Your Uploaded Image:</h3>
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={() => {
                    resetForm();
                    // Also clear the URL input
                    const urlInput = document.getElementById("image-url");
                    if (urlInput) urlInput.value = "";
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </section>
      <section
        className={styles.formContainer}
        style={{ display: showResult ? "none" : "block" }}
      >
        <h1>Upload Your Car Image</h1>
        <form onSubmit={submit}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={changeFile}
              className={styles.fileInput + " file-input"}
            />
          </div>
          <div className={styles.urlInputContainer}>
            <label style={{ color: "black" }} htmlFor="image-url">
              image URL:&nbsp;
            </label>
            <input
              type="url"
              id="image-url"
              placeholder="https://example.com/image.jpg"
              className={styles.urlInput}
              onChange={async (e) => {
                const url = e.target.value;
                if (!url) {
                  setImage(null);
                  setPreviewUrl(null);
                  return;
                }
                try {
                  // Fetch the image as a blob and convert to File
                  const res = await fetch(url);
                  const blob = await res.blob();
                  const filename = url.split("/").pop() || "image.jpg";
                  const file = new File([blob], filename, { type: blob.type });
                  setImage(file);
                  setPreviewUrl(URL.createObjectURL(blob));
                } catch {
                  setImage(null);
                  setPreviewUrl(null);
                }
              }}
            />
          </div>
          {previewUrl && (
            <div className={styles.previewContainer}>
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
              onClick={() => {
                resetForm();
                // Also clear the URL input
                const urlInput = document.getElementById("image-url");
                if (urlInput) urlInput.value = "";
              }}
              style={{ marginLeft: "10px" }}
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Form;
