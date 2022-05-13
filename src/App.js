import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    };
    getUsers();
  }, []);
  const onChangeHandler = (searchValue) => {
    let matchs = [];
    if (searchValue.length > 0) {
      matchs = users.filter((user) => {
        const regex = new RegExp(`${searchValue}`, "gi");
        return user.name.match(regex);
      });
    }

    setMatchedUsers(matchs);
    setSearchValue(searchValue);
  };
  return (
    <div className="searchbar">
      <div className="searchbar__type">
        <input
          className="searchbar__input"
          type="text"
          onChange={(e) => onChangeHandler(e.target.value)}
          value={searchValue}
        />
      </div>
      <div className="results">
        {matchedUsers &&
          matchedUsers.map((matchedUser, index) => {
            return (
              <div
                className="result"
                onClick={() => {
                  return setSearchValue(matchedUser.name), setMatchedUsers([]);
                }}
                key={index}
              >
                {matchedUser.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
