import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //odma na mount da se izvrshit
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const res = response.data;
          setUserData(res);
        } else {
          console.log("Data not loaded");
        }
      });
  }, []);
  const nameInitials = function () {
    let inits = userData.name.split(" ");
    inits = inits.map((item) => item[0]).join("");
    return inits;
  };

  if (userData === null) {
    return <>Still loading...</>;
  }

  return (
    <div className="userContainer">
      <div className="userCard">
        <div className="avatar">
          <p className="avatarIcon">{nameInitials()}</p>
        </div>
        <div className="userDetails">
          <p>{userData.username}</p>
          <p>
            {userData.address.street}, {userData.address.city}
          </p>
          <a href={`mailto:${userData.email}`}>{userData.email}</a>
        </div>
      </div>
      <Link className="backBtn" to="/">
        Back
      </Link>
    </div>
  );
}

export default UserDetails;
