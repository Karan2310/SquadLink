import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard/ProfileCard.js"; // Adjust the import path as needed

const Members = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div>
      <div className="conatiner-fluid">
        <div className="row gy-4">
          {users &&
            users.map((user) => {
              return (
                <>
                  <div className="col-12 col-md-6 col-lg-4">
                    <ProfileCard key={user.id} user={user} />
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Members;
