import React from "react";
import {Link} from "react-router-dom";

const TopNav = () => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">React App</Link>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Se connecter</Link>
        <Link to="/signup">S'inscrire</Link>
      </div>

    </div>
  </div>
);
export default TopNav