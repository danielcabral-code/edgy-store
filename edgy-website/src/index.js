import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/app";

import "./global.css";
import "./fonts/Jacksilver.ttf";

import reportWebVitals from "./reportWebVitals";

// Use your config values here.
firebase.initializeApp({
  apiKey: "AIzaSyCnQ1vZxrTICUAh0ixrmGcJrcMjRuBbhxw",
  authDomain: "edgy-website.firebaseapp.com",
  projectId: "edgy-website",
  storageBucket: "edgy-website.appspot.com",
  messagingSenderId: "678989657687",
  appId: "1:678989657687:web:b18f5d9563ac6a10691512",
  measurementId: "G-F7XEZTGE7R",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
