

import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { useState } from "react";

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(""); // To store prediction result

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("Backend Response:", data);  // Log the backend response
  
      setResult(data.class || "Error in prediction");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error in prediction");
    }
  };
  

  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              {/* Video Editing */}
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
            CaptionAI
            </h1>
            <h2 className="max-w-440 mb-14 body-1 max-md:mb-10">
              "Transforming Images into Words with AI Precision
            </h2>
            <p>
            Upload an image, and let our AI-powered tool generate descriptive captions with precision.
            </p>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button className="btn" onClick={handleButtonClick} icon="/images/zap.svg">
              Try it now
            </Button>

            {selectedFile && (
              <div className="mt-4">
                <p>Selected Image: {selectedFile.name}</p>
                <button className="btn" onClick={handleSubmit}>
                  Classify Image
                </button>
              </div>
            )}

            {result && <p className="mt-4">Prediction: {result}</p>}
          </div>
          <div className="absolute -bottom-3 right-[calc(50%-650px)] w-[600px] pointer-events-none hero-img_res">
            <img
              src="/images/hero33.png"
              className="size-600 max-lg:h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
