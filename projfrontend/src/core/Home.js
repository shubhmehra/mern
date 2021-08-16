import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { isAuthenticated } from "../auth/helper";

const Home = () => {
  console.log("API IS", API);
  const {
    user: { name, lastname, email },
  } = isAuthenticated();

  const userData = () => {
    fetch(`${API}/user`)
      .then((response) => console.log(response.body))
      .catch((err) => console.log(err));
    return;
  };
  return (
    <div>
      <Base />
      <h1 className="text-white">
        Hello {name} {lastname}
      </h1>
      {userData()}
    </div>
  );
};

export default Home;
