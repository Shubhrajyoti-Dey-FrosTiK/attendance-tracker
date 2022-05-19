/*
This Component is responsible for rendering the live video stream from the webcam
*/

import React, { useRef, useEffect, useState, Suspense } from "react";

// Dynamic import of the face detection and face recognition modules
// to avoid the loading of the entire app
const FaceDetection = React.lazy(() => import("../../video/FaceDetection"));
const FaceRecognition = React.lazy(() => import("../../video/FaceRecognition"));

function index({ load, loadFaceDetection, loadFaceRecognition, faceUnlock }) {
  // Initialize the video player
  const videoRef = useRef();

  // State
  const [videLoaded, setVideoLoaded] = useState(false);

  // Render Function
  useEffect(() => {
    if (load) {
      handleLoadVideo();
    } else {
      handleStopVideo();
    }
  });

  // Handle Functions
  const handleStopVideo = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setVideoLoaded(false);
    }
  };

  const handleLoadVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setVideoLoaded(true);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <React.Fragment>
      <div style={{ display: `${!load ? "none" : ""}` }} className="relative">
        <video
          ref={videoRef}
          className="rounded-md h-full w-full"
          id="video"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          }}
          // onPlay={() => setVideoLoaded(true)}
        ></video>
        {load && videLoaded && (
          <div
            className="absolute top-0 left-0"
            style={{ width: "100%", height: "100%" }}
          >
            {loadFaceDetection && (
              <Suspense fallback={<div></div>}>
                <FaceDetection video={videoRef.current} />
              </Suspense>
            )}
            {loadFaceRecognition && (
              <Suspense fallback={<div></div>}>
                <FaceRecognition video={videoRef.current} faceUnlock />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default index;
