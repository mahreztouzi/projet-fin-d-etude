import "../index.css";
import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="w-full h-3/7   bg-dark absolute">
        <div className="w-full grid grid-rows-4 justify-center py-5 px-10">
          <h1 className="text-sm  font-medium text-center antialiased text-subtle mt-6 mb-2">
            Are you ready?
          </h1>
          <h1 className="text-xl font-medium text-white text-center antialiased mb-4 ">
            Let’s get started
          </h1>

          <h1 className="text-sm font-medium text-center antialiased text-subtle mt-8">
            Copyright © 2023. Edu Tech Pro. Tout droits reservés.
          </h1>
        </div>
      </div>
    );
  }
}

export default Footer;
