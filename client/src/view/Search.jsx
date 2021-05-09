import React, { useState, useEffect } from "react";
import searchYoutube from "youtube-api-v3-search";
import { useStore } from "../state/YouTube.store";
import styled from "styled-components/macro";
import { BACKGROUND, BORDER } from "../styles/colors";
import Option from "./Option";
import useDebounce from "../service/useDebounce";

const Search = () => {
  const KEY = process.env.REACT_APP_YOUTUBE_KEY;
  const { setvideos, videos } = useStore();
  const [display, setDisplay] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisplay, setselectedDisplay] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleFetch();
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }, [debouncedSearchTerm]);

  const handleFetch = async () => {
    const options = {
      q: debouncedSearchTerm,
      part: "snippet",
      type: "video",
      maxResults: 10,
    };

    try {
      let result = await searchYoutube(KEY, options);
      setvideos(result.items);
    } catch (e) {
      if (e.code === 403) {
        alert("you exceeded your search try tomorrow ");
      }
    }
  };

  return (
    <div>
      <form>
        <SearchInput
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setselectedDisplay(event.target.value);
          }}
          type="text"
          label="WHERE"
          placeholder="find..."
          value={selectedDisplay}
        />
        <Ul style={{ display: display }}>
          {videos.map((vid, indx) => {
            return (
              <Option
                key={indx}
                title={vid.snippet.title}
                setTrem={() => setSearchTerm("")}
                videoObj={vid}
                indx={indx}
              />
            );
          })}
        </Ul>
      </form>
    </div>
  );
};

export default Search;

const SearchInput = styled.input`
  border: 1px solid ${BORDER};
  @media only screen and (max-width: 414px) {
    min-width: initial;
    margin: 5px;
    padding: 1px 5px;
    height: 30px;
    color: black;
    font-size: 0.8rem;
    width: 130px;
  }
`;
const Ul = styled.ul`
  background-color: ${BACKGROUND};
  width: 100%;
  position: relative;
  font-size: 12px;
  top: 23px;
  padding: 0 1.5vw 0 1.5vw;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid ${BORDER};
  border-top: none;
  left: -85px;
  @media only screen and (max-width: 414px) {
    min-width: initial;
    margin: 0px;
    height: initial;
    color: black;
    font-size: 0.62rem;
    width: 200%;
    top: 11px;
    left: -115px;
  }
`;
