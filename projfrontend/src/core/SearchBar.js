import React, { useState } from "react";
import { AllUsers } from "./AllUsers";

const SearchBar = ({ users, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="col-6 offset-3">
      <input
        type="text"
        class="form-control mt-5 mb-2"
        placeholder="search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <AllUsers users={users} loading={loading} searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBar;
