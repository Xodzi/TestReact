import React, { useEffect, useState, useMemo } from "react";
import "../../custom.css";
import ChildInput from "../ChildInput/ChildInput";
import ChildModal from "../ChildModal/ChildModal";

export default function ChildTableNew() {

  const [childrens, setChildrens] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [sort, setSort] = useState("asc")
  const [search, setSearch] = useState('')

  const searchedChildrens = useMemo(() => {
    console.log(1);
    return childrens.filter(child => child.surname.toLowerCase().includes(search.toLowerCase()))
  }, [search,childrens])

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
      <option value="мальчик"> мужской </option>
      <option value="девочка"> женский </option>
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

  <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
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
    <div class="input-group">
    <div class="input-group-text" id="btnGroupAddon2">@</div>
      <ChildInput 
      value={search}
      onChange={e => setSearch(e.target.value)}
      type="text"
      placeholder="Поиск"

      />
      <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
    </div>
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
          {searchedChildrens.map((children) => (
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
              <td>{new Date(children.birthDate).toLocaleDateString()}</td>
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
