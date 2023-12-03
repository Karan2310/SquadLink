import React from "react";

const SelectedMembers = ({ form }) => {
  const members = form.values.members;

  if (members.length == 0) {
    return (
      <>
        <p
          className="mt-5 text-center"
          style={{ color: "#A7A8A9", fontWeight: 500 }}
        >
          No Members added
        </p>
      </>
    );
  }

  return (
    <div>
      <div className="inner-container" style={{ overflowY: "auto" }}>
        <table className="table mt-3 table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Domain</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {members &&
              members.map((e) => {
                return (
                  <tr>
                    <th scope="row">{e.id}</th>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>{e.domain}</td>
                    <td>{e.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedMembers;
