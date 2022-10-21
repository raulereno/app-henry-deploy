import React from "react";
import { Link } from "react-router-dom";

const LadingPage = () => {
  return (
    <div className="container_Home">
      <Link to={"/dogs"}>
        <button>START</button>
      </Link>
    </div>
  );
};

export default LadingPage;
