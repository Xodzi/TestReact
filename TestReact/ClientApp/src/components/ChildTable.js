import React, { Component } from "react";
import "../custom.css";
import { ButtonGroup } from "./ButtonMenu";

export class ChildTable extends Component {
  constructor(props) {
    super(props);
    this.state = { childrens: [], loading: true, selectedRow: -1 };
  }

  componentDidMount() {
    this.Get();
  }

  static renderChildsTable(childrens, selectedRow) {
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
                selectedRow = children.id;
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
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      ChildTable.renderChildsTable(this.state.childrens, this.state.selectedRow)
    );

    return (
      <div>
        <h1 id="tabelLabel">Таблица детей</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <ButtonGroup></ButtonGroup>
        {contents}
      </div>
    );
  }

  async Get() {
    const response = await fetch("api/Children");
    const data = await response.json();
    this.setState({ childrens: data, loading: false });
    console.log(this.state.selectedRow);
  }
}
export default ChildTable;
