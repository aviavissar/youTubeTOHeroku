import React from "react";
import styled from "styled-components/macro";
import { BACKGROUND } from "../styles/colors";
import { createList } from "../service/fetchApi";
import Video from "./Video";

const VideoList = ({
  catagories,
  setSelectedVideo,
  setCatagories,
  userToken,
  isConnected,
}) => {
  const saveJson = () => {
    if (isConnected) {
      try {
        createList(userToken, catagories);
        alert(
          "success! the file been create and sended to your mail and download folder"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ListDiv>
      <List>
        {catagories.length > 0 && (
          <div>
            {catagories.map((cat, inx) => {
              return (
                <div key={cat + inx}>
                  <H>{cat.videos.length > 0 ? cat.cat_name : ""}</H>
                  <ul>
                    {cat.videos.map((vid, indx) => {
                      return (
                        <Video
                          key={vid.snippet.title + indx}
                          {...{
                            vid,
                            cat,
                            indx,
                            userToken,
                            catagories,
                            setCatagories,
                            setSelectedVideo,
                          }}
                        />
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </List>
      <div className="buttonDiv">
        <button className={isConnected ? "" : "disable"} onClick={saveJson}>
          save the list
        </button>
      </div>
    </ListDiv>
  );
};

export default VideoList;

const ListDiv = styled.div`
  width: 500px;
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
`;
const List = styled.div`
  height: 48vh;
  background-color: ${BACKGROUND};
  margin-bottom: 10px;
  font-size: 12px;
  padding: 20px;
  @media only screen and (max-width: 414px) {
    div {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: 20px;
      }
    }
  }
`;

const H = styled.h2`
  font-weight: bold;
  margin: 10px 0 4px 0;
  font-size: 16px;
  @media only screen and (max-width: 414px) {
    margin: 10px 0 0px 0;
    font-size: 16px;
  }
`;
