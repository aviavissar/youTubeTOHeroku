import React, { useState ,useEffect} from "react";

import VideoScreen from "./VideoScreen";
import styled from "styled-components/macro";
import Search from "./Search";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import VideoList from "./VideoList";
import CategoryCreator from "./CategoryCreator";
import { BACKGROUND, FOOTER_BACKGROUND, BORDER } from "../styles/colors";
import { useStore } from "../state/YouTube.store";
import {
  login,
  logout,
  getCatagories,
  createCategory,
} from "../service/fetchApi";

const App = () => {
  const {
    videos,
    setvideos,
    selectedVideo,
    setCatagories,
    catagories,
    setSelectedVideo,
    selectedCategoryID,
    setSelectedCategoryID,
    userProfile,
    isConnected,
    userToken,
    setUserToken,
    setIsConnected,
    setUserProfile,
  } = useStore();

  const [errMesg, setErrMesg] = useState("");

  

  const doLogIn = async (email, password) => {
    const res = await login(email, password);
    if (res.data) {
      const { data, status } = await res;
      setUserToken(data.token);
      setUserProfile({ ...data.user });
      setIsConnected(status === 200);
      setErrMesg("");

      let catArr = await getCatagories(data.token);

      if (catArr.length === 0) {
        await createCategory(data.token, {
          cat_name: "You Tube links",
          videos: [],
        });
        catArr = await getCatagories(data.token);
      }

    
      setCatagories(catArr);
      console.log(catArr);
      setSelectedCategoryID(catArr[0]._id);
      return true;
    } else {
      setErrMesg(res.message);
      return false;
    }
  };

  const doLogout = async () => {
    await logout(userToken);
    setIsConnected(false);
    localStorage.setItem("YTisConnected",false);
    setUserToken(null);
    setUserProfile(null);
    setCatagories([]);
  };

  return (
    <Page>
      <Header>
        <LoginPanel>
          {isConnected ? null : (
            <SignIn
              {...{
                doLogIn,
                isConnected: false,
                title: "SignUp",
                setUserProfile,
              }}
            />
          )}

          <LogIn
            {...{
              userProfile,
              isConnected,
              userToken,
              setUserToken,
              setIsConnected,
              setUserProfile,
              doLogIn,
              doLogout,
              errMesg,
            }}
          />
          {isConnected ? (
            <SignIn
              {...{
                doLogIn,
                isConnected: true,
                title: "edit profile",
                userProfile,
                userToken,
                setUserProfile,
              }}
            />
          ) : null}
        </LoginPanel>
        <SearchDiv>
          <Search />
        </SearchDiv>

        <Logo>
          AviTube<span>everywhere</span>
        </Logo>
      </Header>
      <Content>
        <Screen>
          <VideoScreen
            {...{
              selectedVideo,
              setCatagories,
              selectedCategoryID,
              catagories,
              userToken,
              isConnected,
            }}
          ></VideoScreen>
        </Screen>
        <ListBox>
          <VideoList
            {...{
              catagories,
              setSelectedVideo,
              setCatagories,
              userToken,
              isConnected,
            }}
          />
        </ListBox>
      </Content>
      <Footer>
        <CategoryDiv>
          <CategoryCreator
            {...{
              catagories,
              setCatagories,
              selectedCategoryID,
              setSelectedCategoryID,
              userToken,
              isConnected,
              selectedVideo,
            }}
          />
        </CategoryDiv>
      </Footer>
    </Page>
  );
};

export default App;

const Page = styled.div`
  margin: 0px auto 0 auto;

  height: 100%;
  width: 1200px;
  @media only screen and (max-width: 414px) {
    width: 394px;
  }
  @media only screen and (max-width: 375px) {
    width: 355px;
  }
  @media only screen and (max-width: 360px) {
    width: 340px;
  }
`;
const Logo = styled.div`
  padding: 10px;
  font-family: fantasy;
  letter-spacing: 5px;
  color: red;
  font-size: 30px;
  span {
    color: #000;
  }
  @media only screen and (max-width: 414px) {
    display: flex;
    flex-direction: column;
    font-size: 0.55em;
    letter-spacing: 1px;
    padding: 3px;
    padding-top: 10px;
    font-weight: bold;
    margin: 4px -1px 4px 2px;
    padding-right: 10px;
    line-height: 1;
    font-family: monospace;
    span {
      color: #000;
      font-size: 8px;
      font-weight: normal;
    }
  }
`;
const Header = styled.div`
  height: 64px;
  padding: 14px 20px 7px 20px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 414px) {
    height: 50px;
    padding: 10px 5px;
    border-bottom: 1px solid ${BORDER};
  }
  @media only screen and (max-width: 360px) {
  }
`;
const Footer = styled.div`
  height: 90px;
  padding: 10px 20px 10px 20px;
  display: flex;
  bottom: 20px;
  background: ${FOOTER_BACKGROUND};
  @media only screen and (max-width: 414px) {
    height: 154px;
    padding: 5px;
  }
`;
const SearchDiv = styled.div`
  width: 80%;
  display: flex;
  margin-right: 10px;
  margin-top: 5px;
  justify-content: flex-start;
  @media only screen and (max-width: 414px) {
    margin-right: 0px;
    width: initial;
  }
`;
const LoginPanel = styled.div`
  width: 30%;
  display: flex;
  @media only screen and (max-width: 414px) {
    margin-left: -13px;
    width: initial;
    padding: 2px;
  }
`;
const CategoryDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  @media only screen and (max-width: 414px) {
    padding: 1px;
    justify-content: space-around;
  }
`;
const Content = styled.div`
  display: flex;
  border: 1px solid ${BORDER};

  @media only screen and (max-width: 414px) {
    height: initial;
    flex-direction: column;
    border: none;
  }
`;
const Screen = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding-bottom: 24px;
  width: 60%;
  @media only screen and (max-width: 414px) {
    padding-bottom: 4px;
    width: 100%;
  }
`;
const ListBox = styled.div`
  width: 40%;
  background: ${BACKGROUND};
  display: flex;
  @media only screen and (max-width: 414px) {
    padding-bottom: 4px;
    width: 100%;
  }
`;
