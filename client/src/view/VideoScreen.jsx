import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { isMobile } from "react-device-detect";
import { updateCategory } from "../service/fetchApi";

const VideoScreen = ({
  selectedVideo,
  setCatagories,
  selectedCategoryID,
  catagories,
  userToken,
  isConnected,
}) => {
  const checkvh = () => {
    if (window.innerHeight < 600) return 250;
    if (window.innerHeight < 750) return 300;
    if (window.innerHeight < 1080) return 360;
    if (window.innerHeight < 2000) return 400;
  };
  console.log(window.innerHeight);
  const opts = {
    height: isMobile ? "200" : checkvh(),
    width: isMobile ? "300" : "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const [disabledBt, setdisabledBt] = useState(false);

  useEffect(() => {
    setdisabledBt(selectedVideo && isConnected);
  }, [selectedVideo, isConnected]);

  const addVideo = (video, selectedCategoryID) => {
    let catObj = catagories.find(
      (existsCategory) => existsCategory._id === selectedCategoryID
    );
    let catagoriesArray = catagories.filter(
      (existsCategory) => existsCategory._id !== selectedCategoryID
    );
    catObj.videos.push(video);
    setCatagories([catObj, ...catagoriesArray]);
    updateCategory(catObj, userToken);
  };

  return (
    <Box>
      <Screen>
        {selectedVideo && (
          <div>
            <Title>{selectedVideo.snippet.title}</Title>
            <YouTube
              videoId={selectedVideo.id.videoId}
              opts={opts}
              onReady={YouTube._onReady}
            />
          </div>
        )}
      </Screen>
      <div className="buttonDiv">
        <button
          disabled={!disabledBt}
          onClick={() => addVideo(selectedVideo, selectedCategoryID)}
          className={isConnected ? "" : "disable"}
        >
          add video
        </button>
      </div>
    </Box>
  );
};

export default VideoScreen;

const Box = styled.div`
  padding: 0.1rem;

  @media only screen and (max-width: 414px) {
    height: 54vh;
    padding: 10px 16px;
    width: 93%;
  }
  @media only screen and (max-width: 360px) {
    height: 54vh;
    padding: 10px 16px;
    width: 90%;
  }
`;

const Screen = styled.div`
  width: 640px;
  height: 48vh;
  margin-bottom: 10px;
  font-size: 12px;
  padding: 20px;
  @media only screen and (max-width: 414px) {
    width: 100%;
    height: 35vh;
    padding: 0;
  }
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-bottom: 11px;
  font-weight: 600;
  @media only screen and (max-width: 414px) {
    font-size: 0.65rem;
    line-height: 1rem;
  }
`;
