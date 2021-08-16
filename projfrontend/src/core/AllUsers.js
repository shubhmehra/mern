import React from "react";
import SearchBar from "./SearchBar";

export const AllUsers = ({ users, loading, searchTerm }) => {
  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (searchTerm == "") {
                return user;
              } else if (
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user) => (
              <tr>
                <th scope="row"> {user.name}</th>
                <td> {user.lastname}</td>
                <td> {user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
