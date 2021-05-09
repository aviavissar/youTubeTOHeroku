import React from "react";
import styled from "styled-components";
import { updateCategory } from "../service/fetchApi";

const Video = ({
  vid,
  cat,
  indx,
  setCatagories,
  setSelectedVideo,
  catagories,
  userToken,
}) => {
  const deleteVideo = (category, indx) => {
    let tmpAll = catagories.filter((cat) => cat._id !== category._id);
    let tmpCat = catagories.find((cat) => cat._id === category._id);
    tmpCat.videos.splice(indx, 1);
    setCatagories([tmpCat, ...tmpAll]);
    updateCategory(tmpCat, userToken);
  };
  return (
    <Box>
      <Li key={vid + indx}>
        <BtA onClick={() => setSelectedVideo(vid)}>{vid.snippet.title}</BtA>
        <BtDelete onClick={() => deleteVideo(cat, indx)}>delete</BtDelete>
      </Li>
    </Box>
  );
};
export default Video;

const Box = styled.div`
  position: relative;
`;
const BtDelete = styled.button`
  height: 22px;
  background-color: #e08585;
  margin-bottom: 4px;
  font-size: 14px;
  padding: 0 5px;
  min-width: 62px;
  @media only screen and (max-width: 414px) {
    font-size: 12px;
    padding: 1px;
    height: 20px;
  }
`;
const BtA = styled.button`
  width: 360px;
  font-size: 12px;
  padding: 1px;
  min-width: 62px;
  background-color: transparent;
  color: black;
  text-align: initial;
  text-decoration: underline;
  cursor: pointer;
  height: 20px;
  @media only screen and (max-width: 414px) {
    width: fit-content;
    font-size: 10px;
  }
`;

const Li = styled.li`
  margin-bottom: 8px;
  @media only screen and (max-width: 414px) {
    height: 17px;
  }
`;
