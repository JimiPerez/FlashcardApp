import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NotFound() {
  return (
    <>
      <div className="NotFound">
        <h1>Not Found</h1>
      </div>
      <Link className="btn btn-primary" to="/">Go Home</Link>
    </>
  );
}

export default NotFound;
