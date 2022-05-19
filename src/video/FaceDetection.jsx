/*
This is replaceable module which will perform face detection on the video stream.
This acts as a plug and play module which expects a video reference
This module needs to be attached with the same container to the video element of the DOM and
the parent of this module needs to inherit the dimensions of the video element
*/

import React, { useRef, useEffect } from "react";

// External libraries
import useSetInterval from "use-set-interval";
import * as canvas from "canvas";

// FaceAPI
import * as faceapi from "face-api.js";

function FaceDetection({ video }) {
  // Video and Canvas
  const canvasRef = useRef();
  const videoRef = useRef(video);

  useEffect(() => {
    loadModels();
  }, []);

  // Load models
  const loadModels = async () => {
    const MODEL_URL = "./models";

    Promise.all([faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)]).then();
  };

  // Process Face Detection
  useSetInterval(async () => {
    if (canvasRef && canvasRef.current && videoRef && videoRef.current) {
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );

      let videoWidth = videoRef.current.videoWidth;
      let videoHeight = videoRef.current.videoHeight;

      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.SsdMobilenetv1Options()
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef &&
        canvasRef.current &&
        resizedDetections.length &&
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, videoWidth, videoHeight);
      canvasRef &&
        canvasRef.current &&
        resizedDetections.length &&
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    }
  }, 1);

  return (
    <canvas
      id="canvas"
      style={{ width: "100%", height: "100%" }}
      ref={canvasRef}
    />
  );
}

export default FaceDetection;
