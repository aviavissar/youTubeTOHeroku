import React from "react";
import styled from "styled-components";
import { useStore } from "../state/YouTube.store";

const Option = ({ title, videoObj, setTrem, indx }) => {
  const { setSelectedVideo, setvideos } = useStore();

  const startPlay = () => {
    setSelectedVideo(videoObj);
    setvideos([]);
    setTrem();
  };
  return (
    <Box className={"box" + indx}>
      <Li>
        <A onClick={startPlay}>{title}</A>
      </Li>
    </Box>
  );
};
export default Option;

const Box = styled.div`
  position: relative;
`;

const Li = styled.li`
  line-height: 2.5;
  list-style: none;
`;

const A = styled.a`
  color: #000000;
`;
