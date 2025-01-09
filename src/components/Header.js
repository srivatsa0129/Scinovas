import React from "react";
import "./Header.css";
import scinova from "../images/scinova.png";

const Header = () => {
  return (
    <header className="app-header">
      <div class="logo">
        <img
          src={scinova}
          alt="Scinova Scientifics Logo"
          className="logo-img"
        />
      </div>
      <div class="header-container">
        <h1>
          <b>Scinova Scientifics - Science as a Service</b>
        </h1>
      </div>
    </header>
  );
};

export default Header;
