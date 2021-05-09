import React, { useState, createContext, useContext, useEffect } from "react";
 import {findFromLocalStorageArray}  from "../service/utils"    
const YouTubeStore = createContext();
const { Provider } = YouTubeStore;

const useStore = () => {
  const context = useContext(YouTubeStore);
  if (!context) {
    throw new Error(`useStore must be used within a Provider`);
  }
  return context;
};

const YouTubeProvider = ({ children }) => {
  let [selectedVideo, setSelectedVideo] = useState(null);
  let [videos, setvideos] = useState([]);
  let [catagories, setCatagories] = useState(
    JSON.parse(localStorage.getItem("YTcatagories")) || []
  );
  let [selectedCategoryID, setSelectedCategoryID] = useState(null);
  let [listVideos, setListVideos] = useState([]);
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("YTuserProfile")) || {}
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem("YTuserToken") || null
  );
  const [isConnected, setIsConnected] = useState(
    JSON.parse(localStorage.getItem("YTisConnected")) || false
  );

  useEffect(() => {
    localStorage.setItem("YTisConnected", JSON.stringify(isConnected));
    if (isConnected) {
      localStorage.setItem("YTuserProfile", JSON.stringify(userProfile));
      localStorage.setItem("YTcatagories", JSON.stringify(catagories));
      localStorage.setItem("YTuserToken", userToken);
      const basicCategory=findFromLocalStorageArray("YTcatagories","cat_name","You Tube links")
      if(basicCategory){
        setSelectedCategoryID(basicCategory._id);
      }
      else{
        createCategory(userToken, {
          cat_name: "You Tube links",
          videos: [],
        });
      }
      
    } else {
      localStorage.clear();
    }
  }, [isConnected, userProfile, catagories, userToken]);

  

  
  console.log(catagories);

  // state = values to display
  const state = {
    selectedVideo,
    videos,
    catagories,
    selectedCategoryID,
    listVideos,
    isConnected,
    userProfile,
    userToken,
  };
  // actions = callbacks to invoke
  const actions = {
    setSelectedVideo,
    setvideos,
    setCatagories,
    setSelectedCategoryID,
    setListVideos,
    setUserToken,
    setIsConnected,
    setUserProfile,
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { YouTubeProvider, useStore };
