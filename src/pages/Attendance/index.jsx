import React, { useEffect, useState } from "react";

// Components
import Video from "../../components/Video";

function index() {
  // States
  const [loadVideo, setLoadVideo] = useState(false);

  // Handle Functions
  const handleVideoLoad = async () => {
    setLoadVideo(() => !loadVideo);
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl bold m-7">Track your attendance</h1>
      <div>
        <div className="text-center flex justify-center m-5">
          <div className="w-[60%]">
            {<Video load={loadVideo} loadFaceDetection loadFaceRecognition />}
          </div>
        </div>
        <button
          className="bg-lime-700 p-5 rounded-lg text-white "
          onClick={handleVideoLoad}
        >
          Click to start video
        </button>
      </div>
    </div>
  );
}
export default index;
