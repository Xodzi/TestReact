import React, { useEffect, useState } from "react";

export default function ChildTableNew() {
  const [childrens, setChildrens] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);

  useEffect(() => {
    Get();
  }, []);

  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Surname</th>
        </tr>
      </thead>
      <tbody>
        {childrens.map((children) => (
          <tr
            key={children.id}
            onClick={() => {
              setSelectedRow(children.id);
              console.log(selectedRow);
            }}
            className={selectedRow === children.id ? "selected" : ""}
          >
            <td>{children.id}</td>
            <td>{children.name}</td>
            <td>{children.surname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  async function Get() {
    const response = await fetch("api/Children");
    const data = await response.json();
    setChildrens(data);
  }
}
