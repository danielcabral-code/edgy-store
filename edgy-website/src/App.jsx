import React, { useState, useEffect } from "react";
import firebase from "firebase";

import styled from "styled-components";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";

import "./global.css";

import centerImage from "./images/tempimage.png";
import instagramLogo from "./images/instagramLogo.png";
import graphicDetailsLines from "./images/graphicDetailsLines.png";
import tempProd1 from "./images/tempProd1.png";
import tempProd2 from "./images/tempProd2.png";
import purchaseButton from "./images/purchaseButton.png";

Modal.setAppElement("#root");

function App() {
  const db = firebase.firestore();

  useEffect(() => {
    getStock();
  }, []);

  const [mainPageVisibility, setMainPageVisibility] = useState(true);

  const [product1Hovered, setProduct1Hovered] = useState(false);
  const [product2Hovered, setProduct2Hovered] = useState(false);

  const [product1Clicked, setProduct1Clicked] = useState(false);
  const [product2Clicked, setProduct2Clicked] = useState(false);

  const [mWhiteClicked, setMWhiteClicked] = useState(false);
  const [lWhiteClicked, setLWhiteClicked] = useState(false);
  const [xlWhiteClicked, setXlWhiteClicked] = useState(false);

  const [mBlackClicked, setMBlackClicked] = useState(false);
  const [lBlackClicked, setLBlackClicked] = useState(false);
  const [xlBlackClicked, setXlBlackClicked] = useState(false);

  const [anySizeSelected, setAnySizeSelected] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [doorError, setDoorError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [doorValue, setDoorValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [zipcodeValue, setZipcodeValue] = useState("");

  const [nameHelperText, setNameHelperText] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [streetHelperText, setStreetHelperText] = useState("");
  const [doorHelperText, setDoorHelperText] = useState("");
  const [zipcodeHelperText, setZipcodeHelperText] = useState("");

  const [validateFieldsClicked, setValidateFieldsClicked] = useState(false);

  const [whiteModelsData, setWhiteModelsData] = useState();
  const [blackModelsData, setBlackModelsData] = useState();

  function getStock() {
    db.collection("models")
      .doc("white")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setWhiteModelsData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    db.collection("models")
      .doc("black")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBlackModelsData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  function openProductsPage() {
    setMainPageVisibility(false);
  }

  function openHomePage() {
    setMainPageVisibility(true);
  }

  function checkProd1Hover() {
    setProduct1Hovered(true);
  }

  function checkProd2Hover() {
    setProduct2Hovered(true);
  }

  function uncheckProd1Hover() {
    setProduct1Hovered(false);
  }

  function uncheckProd2Hover() {
    setProduct2Hovered(false);
  }

  function product1Click() {
    setProduct1Clicked(!product1Clicked);

    if (product1Clicked) {
      setMWhiteClicked(false);
      setLWhiteClicked(false);
      setXlWhiteClicked(false);
    }
  }

  function product2Click() {
    setProduct2Clicked(!product2Clicked);

    if (product2Clicked) {
      setMBlackClicked(false);
      setLBlackClicked(false);
      setXlBlackClicked(false);
    }
  }

  function mWhiteClick() {
    setMWhiteClicked(true);
    setLWhiteClicked(false);
    setXlWhiteClicked(false);

    if (mWhiteClicked) {
      setMWhiteClicked(false);
    }
  }

  function lWhiteClick() {
    setMWhiteClicked(false);
    setLWhiteClicked(true);
    setXlWhiteClicked(false);

    if (lWhiteClicked) {
      setLWhiteClicked(false);
    }
  }

  function xlWhiteClick() {
    setMWhiteClicked(false);
    setLWhiteClicked(false);
    setXlWhiteClicked(true);

    if (xlWhiteClicked) {
      setXlWhiteClicked(false);
    }
  }

  function mBlackClick() {
    setMBlackClicked(true);
    setLBlackClicked(false);
    setXlBlackClicked(false);

    if (mBlackClicked) {
      setMBlackClicked(false);
    }
  }

  function lBlackClick() {
    setMBlackClicked(false);
    setLBlackClicked(true);
    setXlBlackClicked(false);

    if (lBlackClicked) {
      setLBlackClicked(false);
    }
  }

  function xlBlackClick() {
    setMBlackClicked(false);
    setLBlackClicked(false);
    setXlBlackClicked(true);

    if (xlBlackClicked) {
      setXlBlackClicked(false);
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function validateFields() {
    setValidateFieldsClicked(true);

    if (nameValue.length < 1) {
      setNameError(true);
      setNameHelperText("Preenchimento obrigatório");
    } else {
      setNameError(false);
      setNameHelperText("");
    }

    if (phoneValue.length < 1) {
      setPhoneError(true);
      setPhoneHelperText("Preenchimento obrigatório");
    } else if (!Number(phoneValue)) {
      setPhoneError(true);
      setPhoneHelperText("Deve ser numérico");
    } else if (phoneValue.length < 6 || phoneValue.length > 14) {
      setPhoneError(true);
      setPhoneHelperText("Não é válido");
    } else {
      setPhoneError(false);
      setPhoneHelperText("");
    }

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValue.length < 1) {
      setEmailError(true);
      setEmailHelperText("Preenchimento obrigatório");
    } else if (!re.test(emailValue)) {
      setEmailError(true);
      setEmailHelperText("Não é válido");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (streetValue.length < 1) {
      setStreetError(true);
      setStreetHelperText("Preenchimento obrigatório");
    } else {
      setStreetError(false);
      setStreetHelperText("");
    }

    if (doorValue.length < 1) {
      setDoorError(true);
      setDoorHelperText("Preenchimento obrigatório");
    } else if (!Number(doorValue)) {
      setDoorError(true);
      setDoorHelperText("Deve ser numérico");
    } else {
      setDoorError(false);
      setDoorHelperText("");
    }

    if (zipcodeValue.length < 1) {
      setZipcodeError(true);
      setZipcodeHelperText("Preenchimento obrigatório");
    } else if (!Number(zipcodeValue) && !zipcodeValue.includes("-")) {
      setZipcodeError(true);
      setZipcodeHelperText("Deve ser numérico");
    } else if (zipcodeValue.length != 8) {
      setZipcodeError(true);
      setZipcodeHelperText("Não é válido (Formato XXXX-XXX)");
    } else if (
      parseInt(zipcodeValue.substring(0, 4), 10) < 4000 ||
      parseInt(zipcodeValue.substring(0, 4), 10) > 4500
    ) {
      setZipcodeError(true);
      setZipcodeHelperText("Zona inválida (exclusivo Porto)");
    } else {
      setZipcodeError(false);
      setZipcodeHelperText("");
    }
  }

  function sendOrderToDatabase() {
    let whiteSize = "";
    let blackSize = "";

    if (mWhiteClicked) {
      whiteSize = "m";
    } else if (lWhiteClicked) {
      whiteSize = "l";
    } else if (xlWhiteClicked) {
      whiteSize = "xl";
    }

    if (mBlackClicked) {
      blackSize = "m";
    } else if (lBlackClicked) {
      blackSize = "l";
    } else if (xlBlackClicked) {
      blackSize = "xl";
    }

    // Add a new document in collection "orders"
    db.collection("orders")
      .doc()
      .set({
        models: {
          white: whiteSize,
          black: blackSize,
        },
        name: nameValue,
        cellphone: phoneValue,
        email: emailValue,
        street: streetValue,
        door: doorValue,
        floor: floorValue,
        zipcode: zipcodeValue,
      })
      .then(() => {
        console.log("Document successfully written!");

        let whiteQuantity;

        if (whiteSize == "m") {
          db.collection("models")
            .doc("white")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                whiteQuantity = documentSnapshot.get(whiteSize);
                console.log(whiteQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (white)
              db.collection("models")
                .doc("white")
                .update({
                  m: whiteQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }

        if (whiteSize == "l") {
          db.collection("models")
            .doc("white")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                whiteQuantity = documentSnapshot.get(whiteSize);
                console.log(whiteQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (white)
              db.collection("models")
                .doc("white")
                .update({
                  l: whiteQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }

        if (whiteSize == "xl") {
          db.collection("models")
            .doc("white")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                whiteQuantity = documentSnapshot.get(whiteSize);
                console.log(whiteQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (white)
              db.collection("models")
                .doc("white")
                .update({
                  xl: whiteQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }

        let blackQuantity;

        if (blackSize == "m") {
          db.collection("models")
            .doc("black")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                blackQuantity = documentSnapshot.get(blackSize);
                console.log(blackQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (black)
              db.collection("models")
                .doc("black")
                .update({
                  m: blackQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }

        if (blackSize == "l") {
          db.collection("models")
            .doc("black")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                blackQuantity = documentSnapshot.get(blackSize);
                console.log(blackQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (black)
              db.collection("models")
                .doc("black")
                .update({
                  l: blackQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }

        if (blackSize == "xl") {
          db.collection("models")
            .doc("black")
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                blackQuantity = documentSnapshot.get(blackSize);
                console.log(blackQuantity);
              }
            })
            .then(() => {
              // Changes quantity of product on order (black)
              db.collection("models")
                .doc("black")
                .update({
                  xl: blackQuantity - 1,
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        }
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  useEffect(() => {
    if (
      mWhiteClicked ||
      lWhiteClicked ||
      xlWhiteClicked ||
      mBlackClicked ||
      lBlackClicked ||
      xlBlackClicked
    ) {
      setAnySizeSelected(true);
    } else {
      setAnySizeSelected(false);
    }
  }, [
    mWhiteClicked,
    lWhiteClicked,
    xlWhiteClicked,
    mBlackClicked,
    lBlackClicked,
    xlBlackClicked,
  ]);

  const [preventRefreshAutoOrder, setPreventRefreshAutoOrder] = useState(0);

  useEffect(() => {
    if (preventRefreshAutoOrder == 0) {
      setPreventRefreshAutoOrder(1);
    } else if (preventRefreshAutoOrder == 1) {
      if (
        !nameError &&
        !phoneError &&
        !emailError &&
        !streetError &&
        !doorError &&
        !zipcodeError &&
        validateFieldsClicked
      ) {
        sendOrderToDatabase();
      }
    }
  }, [
    nameError,
    phoneError,
    emailError,
    streetError,
    doorError,
    zipcodeError,
    validateFieldsClicked,
  ]);

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

        {!mainPageVisibility && (
          <>
            <CenterAlignProductsDiv>
              <Product1
                style={product1Clicked ? Product1ClickedStyle : null}
                onClick={product1Click}
              >
                <img
                  src={[product1Hovered ? tempProd2 : tempProd1]}
                  style={centerImageStyle}
                  draggable={false}
                  onMouseOver={checkProd1Hover}
                  onMouseOut={uncheckProd1Hover}
                ></img>

                <label style={edgyWhite}>edgy white</label>
                <label style={priceTagWhite}>€12.99</label>
              </Product1>

              <Product2
                style={product2Clicked ? Product2ClickedStyle : null}
                onClick={product2Click}
              >
                <img
                  src={[product2Hovered ? tempProd1 : tempProd2]}
                  style={centerImageStyle}
                  draggable={false}
                  onMouseOver={checkProd2Hover}
                  onMouseOut={uncheckProd2Hover}
                ></img>

                <label style={edgyBlack}>edgy black</label>
                <label style={priceTagBlack}>€12.99</label>
              </Product2>

              {product1Clicked && (
                <Product1SizesDiv>
                  <CenterAlignSizesDiv>
                    <label style={sizeIndicatorWhite}>size:</label>

                    {whiteModelsData.m > 0 ? (
                      <SizeWhite
                        style={mWhiteClicked ? whiteClickedStyle : null}
                        onClick={mWhiteClick}
                      >
                        M
                      </SizeWhite>
                    ) : (
                      <SizeWhiteNoStock>M</SizeWhiteNoStock>
                    )}

                    {whiteModelsData.l > 0 ? (
                      <SizeWhite
                        style={lWhiteClicked ? whiteClickedStyle : null}
                        onClick={lWhiteClick}
                      >
                        L
                      </SizeWhite>
                    ) : (
                      <SizeWhiteNoStock>L</SizeWhiteNoStock>
                    )}

                    {whiteModelsData.xl > 0 ? (
                      <SizeWhite
                        style={xlWhiteClicked ? whiteClickedStyle : null}
                        onClick={xlWhiteClick}
                      >
                        XL
                      </SizeWhite>
                    ) : (
                      <SizeWhiteNoStock>XL</SizeWhiteNoStock>
                    )}
                  </CenterAlignSizesDiv>
                </Product1SizesDiv>
              )}

              {product2Clicked && (
                <Product2SizesDiv>
                  <CenterAlignSizesDiv>
                    <label style={sizeIndicatorBlack}>size:</label>

                    {blackModelsData.m > 0 ? (
                      <SizeBlack
                        style={mBlackClicked ? blackClickedStyle : null}
                        onClick={mBlackClick}
                      >
                        M
                      </SizeBlack>
                    ) : (
                      <SizeBlackNoStock>M</SizeBlackNoStock>
                    )}

                    {blackModelsData.l > 0 ? (
                      <SizeBlack
                        style={lBlackClicked ? blackClickedStyle : null}
                        onClick={lBlackClick}
                      >
                        L
                      </SizeBlack>
                    ) : (
                      <SizeBlackNoStock>L</SizeBlackNoStock>
                    )}

                    {blackModelsData.xl > 0 ? (
                      <SizeBlack
                        style={xlBlackClicked ? blackClickedStyle : null}
                        onClick={xlBlackClick}
                      >
                        XL
                      </SizeBlack>
                    ) : (
                      <SizeBlackNoStock>XL</SizeBlackNoStock>
                    )}
                  </CenterAlignSizesDiv>
                </Product2SizesDiv>
              )}

              {anySizeSelected && (
                <PurchaseButton
                  src={purchaseButton}
                  draggable={false}
                  onClick={openModal}
                ></PurchaseButton>
              )}

              <Modal
                style={modalStyle}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
              >
                <AlignInputSectionsDiv>
                  <AlignInputsDiv>
                    <TextField
                      style={inputStyle}
                      label="Nome*"
                      name="name"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      error={nameError}
                      helperText={nameHelperText}
                      onChange={(event) => setNameValue(event.target.value)}
                    ></TextField>

                    <TextField
                      style={inputStyle}
                      label="Telemóvel*"
                      name="phone"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      error={phoneError}
                      helperText={phoneHelperText}
                      onChange={(event) => setPhoneValue(event.target.value)}
                    ></TextField>

                    <TextField
                      style={inputStyle}
                      label="Email*"
                      name="email"
                      type="email"
                      color="secondary"
                      variant="outlined"
                      error={emailError}
                      helperText={emailHelperText}
                      onChange={(event) => setEmailValue(event.target.value)}
                    ></TextField>
                  </AlignInputsDiv>

                  <AlignInputsDiv>
                    <TextField
                      style={inputStyle}
                      label="Rua*"
                      name="street"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      error={streetError}
                      helperText={streetHelperText}
                      onChange={(event) => setStreetValue(event.target.value)}
                    ></TextField>

                    <TextField
                      style={inputStyle}
                      label="Porta*"
                      name="door"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      error={doorError}
                      helperText={doorHelperText}
                      onChange={(event) => setDoorValue(event.target.value)}
                    ></TextField>

                    <TextField
                      style={inputStyle}
                      label="Andar"
                      name="floor"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      onChange={(event) => setFloorValue(event.target.value)}
                    ></TextField>

                    <TextField
                      style={inputStyle}
                      label="Código Postal*"
                      name="zipcode"
                      type="text"
                      color="secondary"
                      variant="outlined"
                      error={zipcodeError}
                      helperText={zipcodeHelperText}
                      onChange={(event) => setZipcodeValue(event.target.value)}
                    ></TextField>
                  </AlignInputsDiv>
                </AlignInputSectionsDiv>

                <label style={tempTestButtonLabel} onClick={validateFields}>
                  BOTÃO TESTE
                </label>
              </Modal>
            </CenterAlignProductsDiv>
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

const CenterAlignProductsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const Product1 = styled.div`
  position: absolute;
  self-align: center;
  margin-right: 450px;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const Product1ClickedStyle = {
  transform: "scale(1.05)",
};

const Product2ClickedStyle = {
  transform: "scale(1.05)",
};

const Product2 = styled.div`
  position: absolute;
  self-align: center;
  margin-left: 450px;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const edgyWhite = {
  fontFamily: "Righteous",
  color: "White",
  fontSize: 30,
};

const edgyBlack = {
  fontFamily: "Righteous",
  color: "Black",
  fontSize: 30,
};

const priceTagWhite = {
  fontFamily: "Righteous",
  color: "White",
  fontSize: 18,
  marginTop: 6,
};

const priceTagBlack = {
  fontFamily: "Righteous",
  color: "Black",
  fontSize: 18,
  marginTop: 6,
};

const Product1SizesDiv = styled.div`
  position: absolute;
  self-align: center;
  margin-right: 625px;
  margin-top: 590px;
  display: flex;
  flex-direction: column;
`;

const Product2SizesDiv = styled.div`
  position: absolute;
  self-align: center;
  margin-left: 275px;
  margin-top: 590px;
  display: flex;
  flex-direction: column;
`;

const CenterAlignSizesDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const sizeIndicatorWhite = {
  fontFamily: "Righteous",
  color: "White",
  fontSize: 24,
  marginTop: 5,
};

const SizeWhite = styled.label`
  font-family: Righteous;
  color: white;
  font-size: 30px;
  margin-left: 40px;
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const SizeWhiteNoStock = styled.label`
  font-family: Righteous;
  color: black;
  opacity: 0.4;
  font-size: 30px;
  margin-left: 40px;
`;

const sizeIndicatorBlack = {
  fontFamily: "Righteous",
  color: "Black",
  fontSize: 24,
  marginTop: 5,
};

const SizeBlack = styled.label`
  font-family: Righteous;
  color: black;
  font-size: 30px;
  margin-left: 40px;
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const SizeBlackNoStock = styled.label`
  font-family: Righteous;
  color: black;
  opacity: 0.4;
  font-size: 30px;
  margin-left: 40px;
`;

const whiteClickedStyle = {
  transform: "scale(1.3)",
  color: "Black",
};

const blackClickedStyle = {
  transform: "scale(1.3)",
  color: "White",
};

const PurchaseButton = styled.img`
  position: absolute;
  self-align: center;
  margin-top: 726px;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
  content: {
    position: "absolute",
    top: "140px",
    left: "300px",
    right: "300px",
    bottom: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const AlignInputSectionsDiv = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  justify-content: center;
`;

const AlignInputsDiv = styled.div`
  width: 280px;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const inputStyle = {
  marginTop: 20,
};

const tempTestButtonLabel = {
  alignSelf: "center",
  marginTop: 20,
};

export default App;
