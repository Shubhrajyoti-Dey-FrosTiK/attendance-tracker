/*
This is replaceable module which will perform face recognition on the video stream.
This acts as a plug and play module which expects a video reference and the link of the image
with which the comparison will be made
*/

import React, { useRef, useEffect, useState } from "react";

// External libraries
import useSetInterval from "use-set-interval";

// FaceAPI
import * as faceapi from "face-api.js";

// Services
import { StorageService } from "../service/storage.service";

function FaceRecognition({ video, faceUnlock }) {
  const ss = new StorageService();
  const videoRef = useRef(video);

  useEffect(() => {
    loadModels();
  }, []);

  // Load models
  const loadModels = async () => {
    const MODEL_URL = "./models";

    Promise.all([
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ]).then();
  };

  // Face Recognition
  useSetInterval(async () => {
    if (videoRef && videoRef.current) {
      const imageLink =
        // "https://drive.google.com/uc?export=view&id=1cUkQZJ4YfjK__mIhtl6T4WA3JOAZeis0";
        "https://firebasestorage.googleapis.com/v0/b/frostik-sd.appspot.com/o/attendance-tracker%2Fimg%2Fnull%2F1652614097892-Photo%20on%2022-04-21%20at%2011.55%20PM.jpg?alt=media&token=dccb47bf-dbc9-4ba0-9ad0-cdee9629db0a";
      //   const ref = await canvas.loadImage(sd);
      var ref = new Image();
      ref.src = imageLink;
      ref.crossOrigin = "Anonymous";
      const results = await faceapi
        .detectAllFaces(ref)
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (!results.length) {
        return;
      }
      const faceMatcher = new faceapi.FaceMatcher(results);
      const singleResult = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (singleResult) {
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
        const match = bestMatch.toString();
        if (match.includes("person 1")) {
          if (faceUnlock) ss.setFaceRecognized();
        }
      }
    }
  }, 2000);

  return <div></div>;
}

export default FaceRecognition;
