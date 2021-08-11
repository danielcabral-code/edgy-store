import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "./global.css";

import centerImage from "./images/tempimage.png";
import instagramLogo from "./images/instagramLogo.png";
import graphicDetailsLines from "./images/graphicDetailsLines.png";

function App() {
  const [mainPageVisibility, setMainPageVisibility] = useState(true);

  function openProductsPage() {
    setMainPageVisibility(false);
  }

  function openHomePage() {
    setMainPageVisibility(true);
  }

  return (
    <>
      <MainDiv>
        <EdgyTitle onClick={openHomePage}>Edgy</EdgyTitle>

        {mainPageVisibility && (
          <>
            <CenterAlignDiv>
              <img
                src={centerImage}
                style={centerImageStyle}
                draggable={false}
              ></img>
              <label style={sloganPart1}>edgy is the</label>
              <label style={sloganPart2}>new normal</label>
              <img
                src={graphicDetailsLines}
                style={alignGraphicDetailsLines}
                draggable={false}
              ></img>
            </CenterAlignDiv>

            <CenterAlignDiv>
              <a href={"https://instagram.com"} target={"_blank"}>
                <InstagramLogo
                  src={instagramLogo}
                  draggable={false}
                ></InstagramLogo>
              </a>
              <ProductsButton onClick={openProductsPage}>
                products
              </ProductsButton>
            </CenterAlignDiv>
          </>
        )}
      </MainDiv>
    </>
  );
}

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CenterAlignDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EdgyTitle = styled.label`
  font-family: Jacksilver;
  color: white;
  font-size: 40px;
  margin-top: 20px;
  align-self: center;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const centerImageStyle = {
  alignSelf: "center",
};

const sloganPart1 = {
  fontFamily: "Righteous",
  color: "White",
  fontSize: 170,
  position: "absolute",
  alignSelf: "flex-start",
  marginTop: -140,
  marginLeft: 40,
};

const sloganPart2 = {
  fontFamily: "Righteous",
  color: "White",
  fontSize: 170,
  position: "absolute",
  alignSelf: "flex-end",
  marginBottom: -140,
  marginRight: 40,
};

const alignGraphicDetailsLines = {
  position: "absolute",
  alignSelf: "center",
  marginTop: 282,
  marginLeft: 474,
};

const InstagramLogo = styled.img`
  position: absolute;
  align-self: flex-start;
  bottom: 0px;
  margin-bottom: 20px;
  margin-left: 40px;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const ProductsButton = styled.label`
  font-family: Righteous;
  color: white;
  font-size: 30px;
  position: absolute;
  align-self: center;
  bottom: 0px;
  margin-bottom: 20px;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
`;

export default App;
