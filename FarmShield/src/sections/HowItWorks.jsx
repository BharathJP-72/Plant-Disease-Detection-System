import React from 'react';
import { Element } from "react-scroll";
import Button from '../components/Button'; // Ensure Button is imported

const HowItWorks = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="how-it-works">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              {/* Video Editing or Intro */}
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              How It Works
            </h1>
            <h2 className="max-w-440 mb-14 body-1 max-md:mb-10">
              "Simple Steps to Protect Your Crops"
            </h2>
            <ul className="space-y-4">
              <li>
                <strong>Step 1: Upload a Photo</strong> - Simply upload a clear image of your plant.
              </li>
              <li>
                <strong>Step 2: AI Diagnosis</strong> - Our advanced AI detects potential diseases in the image.
              </li>
              <li>
                <strong>Step 3: Treatment Suggestions</strong> - Receive tailored treatment options based on the diagnosis.
              </li>
              <li>
                <strong>Step 4: Take Action</strong> - Follow the recommendations to protect your crops and improve yield.
              </li>
            </ul>
            {/* <LinkScroll to="features" offset={-100} spy smooth>
              <Button icon="/images/zap.svg">Start Now</Button>
            </LinkScroll> */}
          </div>
          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            {/* <img
              src="/images/how-it-works.png"
              className="size-1230 max-lg:h-auto"
              alt="how-it-works"
            /> */}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default HowItWorks;
