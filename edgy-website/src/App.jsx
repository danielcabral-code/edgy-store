import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import styled from "styled-components";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";

import "./global.css";

import centerImage from "./images/bigImage.png";
import instagramLogo from "./images/instagramLogo.svg";
import termsAndPolicies from "./images/termsAndPolicies.svg";
import graphicDetailsLines from "./images/graphicDetailsLines.png";

import prod1Front from "./images/prod1Front.png";
import prod2Front from "./images/prod2Front.png";

import prod1Back from "./images/prod1Back.png";
import prod2Back from "./images/prod2Back.png";

import purchaseButton from "./images/purchaseButton.svg";

import termsAndPoliciesPDF from "./files/politicasEdgy.pdf";

Modal.setAppElement("#root");

function App() {
  const db = firebase.firestore();

  useEffect(() => {
    getStock();
  }, []);

  let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
  const [homePaymentClicked, setHomePaymentClicked] = useState(false);

  const [whiteModelsData, setWhiteModelsData] = useState();
  const [blackModelsData, setBlackModelsData] = useState();

  const [paymentType, setPaymentType] = useState("");

  function getStock() {
    db.collection("models")
      .doc("white")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setWhiteModelsData(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {});

    db.collection("models")
      .doc("black")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBlackModelsData(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {});
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

  function validateFields(paymentType) {
    if (paymentType == "cardPayment") {
      setPaymentType("stripe");
      setValidateFieldsClicked(true);
    } else if (paymentType == "homePayment") {
      setPaymentType("ato de entrega");
      setHomePaymentClicked(true);
    }

    if (nameValue.length < 1) {
      setNameError(true);
      setNameHelperText("Mandatory field");
    } else {
      setNameError(false);
      setNameHelperText("");
    }

    if (phoneValue.length < 1) {
      setPhoneError(true);
      setPhoneHelperText("Mandatory field");
    } else if (!Number(phoneValue)) {
      setPhoneError(true);
      setPhoneHelperText("Must be numeric");
    } else if (phoneValue.length < 6 || phoneValue.length > 14) {
      setPhoneError(true);
      setPhoneHelperText("Invalid");
    } else {
      setPhoneError(false);
      setPhoneHelperText("");
    }

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValue.length < 1) {
      setEmailError(true);
      setEmailHelperText("Mandatory field");
    } else if (!re.test(emailValue)) {
      setEmailError(true);
      setEmailHelperText("Invalid");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (streetValue.length < 1) {
      setStreetError(true);
      setStreetHelperText("Mandatory field");
    } else {
      setStreetError(false);
      setStreetHelperText("");
    }

    if (doorValue.length < 1) {
      setDoorError(true);
      setDoorHelperText("Mandatory field");
    } else if (!Number(doorValue)) {
      setDoorError(true);
      setDoorHelperText("Must be numeric");
    } else {
      setDoorError(false);
      setDoorHelperText("");
    }

    if (zipcodeValue.length < 1) {
      setZipcodeError(true);
      setZipcodeHelperText("Mandatory field");
    } else if (!Number(zipcodeValue) && !zipcodeValue.includes("-")) {
      setZipcodeError(true);
      setZipcodeHelperText("Must be numeric");
    } else if (zipcodeValue.length != 8) {
      setZipcodeError(true);
      setZipcodeHelperText("Invalid (Formatting: XXXX-XXX)");
    } else if (
      parseInt(zipcodeValue.substring(0, 4), 10) < 4000 ||
      parseInt(zipcodeValue.substring(0, 4), 10) > 4500
    ) {
      setZipcodeError(true);
      setZipcodeHelperText("Invalid zone (exclusive to Porto)");
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
        date: Date(),
        paymentType: paymentType,
      })
      .then(() => {
        if (homePaymentClicked) {
          alert("Thank you for your order! You will receive an email soon confirming your purchase and notifying you of your package's delivery date.");
        }

        window.location.reload(false);

        /*let whiteQuantity;

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
        }*/
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function openStripePayment() {
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

    if (whiteSize != "" && blackSize == "") {
      window.open("https://buy.stripe.com/00g3es3Jt1qpes0bII", "_blank");
    } else if (whiteSize == "" && blackSize != "") {
      window.open("https://buy.stripe.com/6oEaGU4Nxd97fw4bIJ", "_blank");
    } else if (whiteSize != "" && blackSize != "") {
      window.open("https://buy.stripe.com/4gw6qE6VF1qpes09AC", "_blank");
    }
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
        (validateFieldsClicked || homePaymentClicked)
      ) {
        if (validateFieldsClicked) {
          openStripePayment();
        }
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
    homePaymentClicked,
  ]);

  return (
    <>
      {isSafari && (
        <MainDiv>
          <EdgyTitleSafari>Edgy</EdgyTitleSafari>

          <SafariErrorMessage>
            Our website is not available on this browser.
          </SafariErrorMessage>
          <SafariErrorMessage>
            Please try using a different one, like Chrome, or order directly
            from our Instagram.
          </SafariErrorMessage>

          <AForInstagramSafari
            href={"https://www.instagram.com/edgytshirts/"}
            target={"_blank"}
          >
            <InstagramLogoEdgy
              src={instagramLogo}
              draggable={false}
            ></InstagramLogoEdgy>
          </AForInstagramSafari>
        </MainDiv>
      )}

      {!isSafari && (
        <MainDiv>
          <EdgyTitle onClick={openHomePage}>Edgy</EdgyTitle>

          {mainPageVisibility && (
            <>
              <CenterAlignDiv>
                <MainCenterImage
                  src={centerImage}
                  draggable={false}
                ></MainCenterImage>
                <SloganPart1>edgy is the</SloganPart1>
                <SloganPart2>new normal</SloganPart2>
                <GraphicLines
                  src={graphicDetailsLines}
                  draggable={false}
                ></GraphicLines>
              </CenterAlignDiv>

              <CenterAlignDiv>
                <AForTerms href={termsAndPoliciesPDF} target={"_blank"}>
                  <TermsAndPolicies
                    src={termsAndPolicies}
                    draggable={false}
                  ></TermsAndPolicies>
                </AForTerms>

                <AForInstagram
                  href={"https://www.instagram.com/edgytshirts/"}
                  target={"_blank"}
                >
                  <InstagramLogo
                    src={instagramLogo}
                    draggable={false}
                  ></InstagramLogo>
                </AForInstagram>
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
                    src={[product1Hovered ? prod1Back : prod1Front]}
                    /*style={centerImageStyle}*/
                    draggable={false}
                    onMouseOver={checkProd1Hover}
                    onMouseOut={uncheckProd1Hover}
                  ></img>

                  <EdgyWhite>edgy money</EdgyWhite>
                  <PriceTagWhite>€12.99</PriceTagWhite>
                </Product1>

                <Product2
                  style={product2Clicked ? Product2ClickedStyle : null}
                  onClick={product2Click}
                >
                  <img
                    src={[product2Hovered ? prod2Front : prod2Back]}
                    /*style={centerImageStyle}*/
                    draggable={false}
                    onMouseOver={checkProd2Hover}
                    onMouseOut={uncheckProd2Hover}
                  ></img>

                  <EdgyBlack>edgy japan</EdgyBlack>
                  <PriceTagBlack>€12.99</PriceTagBlack>
                </Product2>

                <InvisibleDiv></InvisibleDiv>

                {product1Clicked && (
                  <Product1SizesDiv>
                    <CenterAlignSizesDiv>
                      <SizeIndicatorWhite>size:</SizeIndicatorWhite>

                      {whiteModelsData.m == true ? (
                        <SizeWhite
                          style={mWhiteClicked ? whiteClickedStyle : null}
                          onClick={mWhiteClick}
                        >
                          M
                        </SizeWhite>
                      ) : (
                        <SizeWhiteNoStock>M</SizeWhiteNoStock>
                      )}

                      {whiteModelsData.l == true ? (
                        <SizeWhite
                          style={lWhiteClicked ? whiteClickedStyle : null}
                          onClick={lWhiteClick}
                        >
                          L
                        </SizeWhite>
                      ) : (
                        <SizeWhiteNoStock>L</SizeWhiteNoStock>
                      )}

                      {whiteModelsData.xl == true ? (
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
                      <SizeIndicatorBlack>size:</SizeIndicatorBlack>

                      {blackModelsData.m == true ? (
                        <SizeBlack
                          style={mBlackClicked ? blackClickedStyle : null}
                          onClick={mBlackClick}
                        >
                          M
                        </SizeBlack>
                      ) : (
                        <SizeBlackNoStock>M</SizeBlackNoStock>
                      )}

                      {blackModelsData.l == true ? (
                        <SizeBlack
                          style={lBlackClicked ? blackClickedStyle : null}
                          onClick={lBlackClick}
                        >
                          L
                        </SizeBlack>
                      ) : (
                        <SizeBlackNoStock>L</SizeBlackNoStock>
                      )}

                      {blackModelsData.xl == true ? (
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
                  <FinalizePurchase>Complete Order</FinalizePurchase>

                  <AlignInputSectionsDiv>
                    <AlignInputsDiv>
                      <TextField
                        style={inputStyle}
                        label="Name*"
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
                        label="Mobile Phone*"
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
                        label="Street*"
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
                        label="Door*"
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
                        label="Floor"
                        name="floor"
                        type="text"
                        color="secondary"
                        variant="outlined"
                        onChange={(event) => setFloorValue(event.target.value)}
                      ></TextField>

                      <TextField
                        style={inputStyle}
                        label="ZIP Code*"
                        name="zipcode"
                        type="text"
                        color="secondary"
                        variant="outlined"
                        error={zipcodeError}
                        helperText={zipcodeHelperText}
                        onChange={(event) =>
                          setZipcodeValue(event.target.value)
                        }
                      ></TextField>
                    </AlignInputsDiv>
                  </AlignInputSectionsDiv>

                  <FinalizePurchaseButton1
                    onClick={() => validateFields("cardPayment")}
                  >
                    Proceed to payment
                  </FinalizePurchaseButton1>

                  <FinalizePurchaseButton2
                    onClick={() => validateFields("homePayment")}
                  >
                    Complete order (payment upon delivery, max 20€ in cash)
                  </FinalizePurchaseButton2>
                </Modal>
              </CenterAlignProductsDiv>
            </>
          )}
        </MainDiv>
      )}
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
  overflow: hidden;
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
  },
`;

const FinalizePurchase = styled.label`
  font-family: Righteous;
  color: #f3a7a7;
  font-size: 36px;
  align-self: center;
  margin-bottom: 14px;
  text-align: center;
  @media (max-height: 680px) {
    margin-top: 20px;
  }
  @media (max-height: 650px) {
    margin-top: 40px;
  }
  @media (max-height: 620px) {
    margin-top: 80px;
  }
  @media (max-height: 580px) {
    margin-top: 120px;
  }
  @media (max-height: 530px) {
    margin-top: 160px;
  }
  @media (max-height: 490px) {
    margin-top: 200px;
  }
  @media (max-height: 430px) {
    margin-top: 240px;
  }
  @media (max-height: 380px) {
    margin-top: 300px;
  }
  @media (max-height: 290px) {
    margin-top: 350px;
  }
  @media (max-height: 240px) {
    margin-top: 390px;
  }
  @media (max-width: 420px) {
    font-size: 28px;
  }
  @media (max-width: 360px) {
    font-size: 22px;
  }
  @media (max-width: 300px) {
    font-size: 18px;
  }
  @media (max-width: 730px) and (max-height: 850px) {
    margin-top: 200px;
  }
  @media (max-width: 730px) and (max-height: 840px) {
    margin-top: 240px;
  }
  @media (max-width: 730px) and (max-height: 800px) {
    margin-top: 280px;
  }
  @media (max-width: 730px) and (max-height: 760px) {
    margin-top: 320px;
  }
  @media (max-width: 730px) and (max-height: 730px) {
    margin-top: 360px;
  }
  @media (max-width: 730px) and (max-height: 690px) {
    margin-top: 400px;
  }
  @media (max-width: 730px) and (max-height: 640px) {
    margin-top: 440px;
  }
  @media (max-width: 730px) and (max-height: 600px) {
    margin-top: 480px;
  }
  @media (max-width: 730px) and (max-height: 600px) {
    margin-top: 480px;
  }
  @media (max-width: 730px) and (max-height: 570px) {
    margin-top: 520px;
  }
  @media (max-width: 730px) and (max-height: 530px) {
    margin-top: 560px;
  }
  @media (max-width: 730px) and (max-height: 490px) {
    margin-top: 600px;
  }
  @media (max-width: 730px) and (max-height: 450px) {
    margin-top: 640px;
  }
  @media (max-width: 730px) and (max-height: 370px) {
    margin-top: 680px;
  }
  @media (max-width: 730px) and (max-height: 330px) {
    margin-top: 720px;
  }
  @media (max-width: 730px) and (max-height: 290px) {
    margin-top: 820px;
  }
`;

const MainCenterImage = styled.img`
  align-self: center;
  @media (max-width: 1110px) {
    width: 700px;
  }
  @media (max-width: 770px) {
    width: 540px;
  }
  @media (max-width: 610px) {
    width: 500px;
    transform: translateX(0%);
  }
  @media (max-width: 535px) {
    margin-top: 40px;
  }
  @media (max-width: 535px) and (max-height: 570px) {
    margin-top: 10px;
  }
`;

const SloganPart1 = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 170px;
  position: absolute;
  align-self: flex-start;
  margin-top: -140px;
  margin-left: 40px;
  @media (max-width: 1110px) {
    font-size: 100px;
    margin-top: -90px;
    margin-left: 30px;
  }
  @media (max-width: 610px) {
    font-size: 60px;
    margin-top: -60px;
    margin-left: 20px;
  }
  @media (max-width: 430px) {
    font-size: 45px;
    margin-top: 110px;
    margin-left: 10px;
  }
  @media (max-width: 275px) {
    font-size: 30px;
    margin-top: 140px;
    margin-left: 10px;
  }
`;

const SloganPart2 = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 170px;
  position: absolute;
  align-self: flex-end;
  margin-bottom: -140px;
  margin-right: 40px;
  @media (max-width: 1110px) {
    font-size: 100px;
    margin-bottom: -90px;
    margin-right: 30px;
  }
  @media (max-width: 610px) {
    font-size: 60px;
    margin-bottom: -60px;
    margin-right: 20px;
  }
  @media (max-width: 430px) {
    font-size: 45px;
    margin-bottom: -200px;
    margin-right: 10px;
  }
  @media (max-width: 275px) {
    font-size: 30px;
    margin-bottom: -200px;
    margin-right: 10px;
  }
`;

const GraphicLines = styled.img`
  position: absolute;
  align-self: center;
  margin-top: 282px;
  margin-left: 474px;
  @media (max-width: 1110px) {
    margin-top: 186px;
    margin-left: 316px;
  }
  @media (max-width: 770px) {
    margin-top: 144px;
    margin-left: 244px;
    width: 90px;
  }
  @media (max-width: 610px) {
    margin-top: 136px;
    margin-left: 230px;
    width: 70px;
  }
  @media (max-width: 535px) {
    display: none;
  }
`;

const AForTerms = styled.a`
  @media (max-width: 535px) {
    align-self: center;
  }
`;

const AForInstagram = styled.a`
  @media (max-width: 535px) {
    align-self: center;
  }
`;

const InstagramLogo = styled.img`
  position: absolute;
  align-self: flex-start;
  bottom: 0px;
  margin-bottom: 20px;
  margin-left: 40px;
  width: 34px;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
  @media (max-width: 535px) {
    align-self: center;
    margin-left: -50px;
    margin-bottom: 20px;
  }
  @media (max-height: 860px) and (min-width: 536px) {
    bottom: auto;
    margin-top: 20px;
  }
`;

const TermsAndPolicies = styled.img`
  position: absolute;
  align-self: flex-start;
  bottom: 0px;
  margin-bottom: 20px;
  margin-left: 90px;
  width: 34px;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
  @media (max-width: 535px) {
    align-self: center;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  @media (max-height: 860px) and (min-width: 536px) {
    bottom: auto;
    margin-top: 20px;
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
  @media (max-width: 535px) {
    align-self: center;
    font-size: 30px;
    margin-bottom: 80px;
  }
  @media (max-height: 860px) and (min-width: 536px) {
    bottom: auto;
    margin-top: 92px;
  }
`;

const CenterAlignProductsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  @media (max-width: 940px) {
    display: flex;
    justify-content: center;
  }
`;

const Product1 = styled.div`
  position: absolute;
  margin-right: 450px;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
    cursor: pointer;
    transition-timing-function: ease-in;
  }
  @media (max-width: 940px) {
    margin-right: 0px;
  }
  @media (max-width: 580px) {
    width: 200px;
  }
`;

const Product2 = styled.div`
  position: absolute;
  margin-left: 450px;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
    cursor: pointer;
  }
  @media (max-width: 940px) {
    margin-left: 0px;
    margin-top: 720px;
  }
  @media (max-width: 580px) {
    width: 200px;
    margin-top: 410px;
  }
`;

const Product1ClickedStyle = {
  transform: "scale(1.05)",
};

const Product2ClickedStyle = {
  transform: "scale(1.05)",
};

const EdgyWhite = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 30px;
  @media (max-width: 580px) {
    font-size: 20px;
  }
`;

const EdgyBlack = styled.label`
  font-family: Righteous;
  color: Black;
  font-size: 30px;
  @media (max-width: 580px) {
    font-size: 20px;
  }
`;

const PriceTagWhite = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 18px;
  margin-top: 6px;
  @media (max-width: 580px) {
    font-size: 12px;
  }
`;

const PriceTagBlack = styled.label`
  font-family: Righteous;
  color: Black;
  font-size: 18px;
  margin-top: 6px;
  @media (max-width: 580px) {
    font-size: 12px;
  }
`;

const Product1SizesDiv = styled.div`
  position: absolute;
  margin-right: 625px;
  margin-top: 590px;
  display: flex;
  flex-direction: column;
  @media (max-width: 940px) {
    margin-right: 0px;
    margin-left: -178px;
  }
  @media (max-width: 580px) {
    margin-left: -66px;
    margin-top: 284px;
  }
`;

const Product2SizesDiv = styled.div`
  position: absolute;
  margin-left: 275px;
  margin-top: 590px;
  display: flex;
  flex-direction: column;
  @media (max-width: 940px) {
    margin-left: -178px;
    margin-top: 1310px;
  }
  @media (max-width: 580px) {
    margin-left: -66px;
    margin-top: 693px;
  }
`;

const InvisibleDiv = styled.div`
  margin-top: 720px;
  @media (max-width: 940px) {
    margin-top: 1440px;
  }
  @media (max-width: 580px) {
    margin-top: 800px;
  }
`;

const CenterAlignSizesDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const SizeIndicatorWhite = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 24px;
  margin-top: 5px;
  @media (max-width: 580px) {
    font-size: 16px;
    margin-top: 3px;
  }
`;

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
  @media (max-width: 580px) {
    font-size: 20px;
    margin-left: 20px;
  }
`;

const SizeWhiteNoStock = styled.label`
  font-family: Righteous;
  color: black;
  opacity: 0.4;
  font-size: 30px;
  margin-left: 40px;
  @media (max-width: 580px) {
    font-size: 20px;
    margin-left: 20px;
  }
`;

const SizeIndicatorBlack = styled.label`
  font-family: Righteous;
  color: Black;
  font-size: 24px;
  margin-top: 5px;
  @media (max-width: 580px) {
    font-size: 16px;
    margin-top: 3px;
  }
`;

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
  @media (max-width: 580px) {
    font-size: 20px;
    margin-left: 20px;
  }
`;

const SizeBlackNoStock = styled.label`
  font-family: Righteous;
  color: black;
  opacity: 0.4;
  font-size: 30px;
  margin-left: 40px;
  @media (max-width: 580px) {
    font-size: 20px;
    margin-left: 20px;
  }
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
  @media (max-width: 940px) {
    margin-top: 1430px;
  }
  @media (max-width: 580px) {
    margin-top: 810px;
    margin-left: -2px;
    width: 204px;
  }
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
    backgroundColor: "white",
  },
};

const AlignInputSectionsDiv = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 730px) {
    flex-direction: column;
  }
`;

const AlignInputsDiv = styled.div`
  width: 280px;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  @media (max-width: 420px) {
    width: 240px;
  }
  @media (max-width: 360px) {
    width: 200px;
  }
  @media (max-width: 340px) {
    width: 170px;
  }
`;

const inputStyle = {
  marginTop: 20,
  color: "black",
};

const FinalizePurchaseButton1 = styled.label`
  font-family: Righteous;
  color: black;
  font-size: 14px;
  align-self: center;
  margin-top: 30px;
  text-align: center;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const FinalizePurchaseButton2 = styled.label`
  font-family: Righteous;
  color: black;
  font-size: 14px;
  align-self: center;
  margin-top: 30px;
  text-align: center;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const EdgyTitleSafari = styled.label`
  font-family: Jacksilver;
  color: white;
  font-size: 40px;
  margin-top: 60px;
  align-self: center;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  },
`;

const SafariErrorMessage = styled.label`
  font-family: Righteous;
  color: White;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
  align-self: center;
  text-align: center;
`;

const InstagramLogoEdgy = styled.img`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 34px;
  &:hover {
    transform: scale(1.1);
    transition: 0.4s;
    cursor: pointer;
  }
`;

const AForInstagramSafari = styled.a`
  align-self: center;
`;

export default App;
