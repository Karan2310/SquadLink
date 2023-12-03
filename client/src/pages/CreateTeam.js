import React from "react";

const CreateTeam = () => {
  return (
    <div className="container-fluid">
      <div className="row gy-3">
        <div className="col-md-6 col-lg-8">
          <div className="container-fluid c-team rounded bg-white p-3">
            <h3>Create Team</h3>
          </div>
        </div>
        <div className="col-md-6 col-lg-4" style={{ height: "85vh" }}>
          <div className="container-fluid c-team rounded bg-white p-3 h-100">
            <h5> Team Members </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
