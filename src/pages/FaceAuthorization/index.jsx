import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Video from "../../components/Video";

// Redux
import { useSelector } from "react-redux";
import { selectFaceRecognized } from "../../redux/slices/FaceRecognized";

// MUI
import { Button } from "@mui/material";

// Assets
import FaceRecognized from "../../assets/faceRecognized.jpg";

function index() {
  const faceRecognized = useSelector(selectFaceRecognized);
  let navigate = useNavigate();

  // State
  const [loadVideo, setLoadVideo] = useState(true);

  useEffect(() => {
    setTimeout(() => {}, 1000);
    if (faceRecognized.faceRecognized) setLoadVideo(false);
    console.log(loadVideo);
  }, [faceRecognized]);

  // Handle Functions
  const handleContinue = () => {
    navigate("/attendance");
  };
  return (
    <React.Fragment>
      <h1 className="font-bold text-5xl text-center mt-8 mb-10">
        {faceRecognized.faceRecognized
          ? "Face Unlock Successfull"
          : "Face Unlock"}
      </h1>
      {!faceRecognized.faceRecognized && (
        <div>
          <h1 className="text-2xl text-center mt-8 mb-10">
            Your face will be used for secure login. Keep your face in front of
            camera and try to sit in a well-lit environment.
          </h1>
          <h1 className="text-2xl text-center mt-8 mb-10">
            This may take upto 5-10 secs if your face is well-lit.
          </h1>
        </div>
      )}
      <div className="text-center flex justify-center m-5">
        <div className="w-[100%] md:w-[60%]">
          <Video load={loadVideo} loadFaceRecognition faceUnlock />
        </div>
      </div>
      {faceRecognized.faceRecognized && (
        <div className="text-center flex justify-center items-center flex-col w-full">
          <img src={FaceRecognized} className="md:w-[35%]" />
          <div>
            <h1 className="text-2xl text-center mt-8 mb-10">
              You have successfully logged into your account. Click on Continue
              to enter your account
            </h1>
          </div>
          <div className="mb-10">
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default index;
