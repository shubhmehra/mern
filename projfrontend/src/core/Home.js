import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { isAuthenticated } from "../auth/helper";
import { AllUsers } from "./AllUsers";
import { Pagination } from "./Pagination";
import SearchBar from "./SearchBar";

const Home = () => {
  console.log("API IS", API);
  const {
    user: { name, lastname, email },
  } = isAuthenticated();

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUserData = () => {
      setLoading(true);
      fetch(`${API}user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setAllUsers(jsonData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    fetchUserData();
  }, []);

  //Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Base />
      <h3 className="text-white text-center">
        Hello {name} {lastname}
      </h3>
      <SearchBar users={currentUsers} loading={loading} />

      {/* <AllUsers users={currentUsers} loading={loading} /> */}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={allUsers.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
