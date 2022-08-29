import React, { useState } from "react";

import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import Close from "../assets/svgs/close";
const MainContainer = styled.div`
  width: 1000px;
  height: 613px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`;
const SubContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
`;
const Price = ({ open, setOpen, url }) => {
  console.log(url);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
      maxWidth={"1266px"}
    >
      <MainContainer>
        <iframe
          width="853"
          height="480"
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <SubContainer
          onClick={() => {
            setOpen(false);
          }}
        >
          <Close />
        </SubContainer>
      </MainContainer>
    </Dialog>
  );
};

export default Price;
