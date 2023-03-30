import React, { useEffect, useState } from "react";
import "../custom.css";
import ChildInput from "./ChildInput/ChildInput";
import ChildModal from "./ChildModal/ChildModal";

export default function FetchData() {
  const [childrens, setChildrens] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [sort, setSort] = useState("asc")

  const [name, setName] = useState("");

  useEffect(() => {
    Get();
  }, []);
  

  return (
    loading? 
    <p>
      <em>Loading...</em>
    </p> : 
    <div>

<ChildModal visible={createModal} setVisible={setCreateModal}>
      <form>
        <ChildInput 
        value={name} 
        onChange={e => setName(e.target.value)} 
        type="text" 
        placeholder="Имя"/>

        <ChildInput type="text" placeholder="Фамилия" />
        <ChildInput type="text" placeholder="Отчество" />
        <ChildInput type="date" placeholder="Дата рождения" />
        <select className=".sex" >
        <option disabled> Пол </option>
        <option value="мальчик"> мальчик </option>
        <option value="девочка"> девочка </option>
        </select>
        <ChildInput type="text" placeholder="Полис" />
        <ChildInput type="text" placeholder="Адрес" />
        <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-add" onClick={Add}>
          Создать
        </button>
        <button type="button" class="btn btn-delete" onClick={() => setCreateModal(false)}>
          Закрыть
        </button>
        </div>
      </form>
      </ChildModal>

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-add" onClick={() => setCreateModal(true)}>
          Add
        </button>
        <button type="button" class="btn btn-update">
          Update
        </button>
        <button type="button" class="btn btn-delete" onClick={Delete}>
          Delete
        </button>
      </div>
      
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th onClick={()=>sorting("childId")}>id</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Полис</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {childrens.map((children) => (
            <tr
              key={children.childId}
              onClick={() => {
                setSelectedRow(children.childId);
                console.log(selectedRow);
              }}
              className={selectedRow === children.childId ? "selected" : ""}
            >
              <td>{children.childId}</td>
              <td>{children.name}</td>
              <td>{children.surname}</td>
              <td>{children.fathername}</td>
              <td>{children.birthDate}</td>
              <td>{children.sex}</td>
              <td>{children.polisOms}</td>
              <td>{children.adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function sorting(col){  
    if(sort==="asc"){
      const sorted = [...childrens].sort((a,b)=>
      a[col] > b[col] ? 1 : -1
      );
      setChildrens(sorted);
      setSort("desc");
      return;
    }
    const sorted = [...childrens].sort((a,b)=>
      a[col] < b[col] ? 1 : -1
      );
      setChildrens(sorted);
      setSort("asc");
      return;
  }

  async function Add(e){
    e.preventDefault()
    console.log(name)
    setCreateModal(false)
  }
  async function Delete(){

  }
  
  async function Get() {
    const response = await fetch("api/Children");
    const data = await response.json();
    setChildrens(data);
    setLoading(false);
  }
}
