import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [dataResponse, setDataResponse] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [parkingTotalFloor, setParkingTotalFloor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.github.com/users");
      setDataResponse(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setParkingTotalFloor(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    console.log(parkingTotalFloor);
  }, [parkingTotalFloor]);

  const handleChange = (event) => {
    const selected = dataResponse.find(
      (user) => user.login === event.target.value
    );
    setSelectedUser(selected);
  };

  return (
    <div>
      <select onChange={handleChange}>
        {dataResponse.map((user) => (
          <option key={user.id} value={user.login}>
            {user.login}
          </option>
        ))}
      </select>
      {selectedUser ? <p>ID: {selectedUser.id}</p> : null}

      {Array.from({ length: parkingTotalFloor }, (_, index) => (
      <input key={index} type="text" />
      ))}
    </div>
  );
};

export default App;