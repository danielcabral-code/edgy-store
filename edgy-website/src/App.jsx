import React from "react";
import "./global.css";
import centerImage from "./images/tempimage.png";

function App() {
  return (
    <>
      <div style={divAlignItems}>
        <label style={edgyTitle}>Edgy</label>

        <div style={divAlignCenterItems}>
          <img src={centerImage} style={centerImageStyle}></img>
          <label style={sloganPart1}>edgy is the</label>
          <label style={sloganPart2}>new normal</label>
        </div>
      </div>
    </>
  );
}

const divAlignItems = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const divAlignCenterItems = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const edgyTitle = {
  fontFamily: "Jacksilver",
  color: "White",
  fontSize: 40,
  marginTop: 20,
  alignSelf: "center",
};

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

export default App;
