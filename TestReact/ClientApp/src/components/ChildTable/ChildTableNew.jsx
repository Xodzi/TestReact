import React, { useEffect, useState, useMemo } from "react";
import "../../custom.css";
import ChildInput from "../ChildInput/ChildInput";
import ChildModal from "../ChildModal/ChildModal";
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





export default function ChildTableNew() {

  const [change_arr, setChange] = useState({
    name:"",
    surname: "",
    fathername: "",
    birthDate: "",
    sex: "",
    polis: "",
    adress: ""
  });
  const [updateModal, setUpdateModal] = useState(false);

  const [childrens, setChildrens] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [sort, setSort] = useState("asc")
  const [search, setSearch] = useState('')

  const [totalCount,setTotalCount] = useState(0);
  const [page, setPage] = useState(0);



  let pages = useMemo(() => {
    let pagesArray = []
    for(let i=0;i<totalCount;i++){
      pagesArray.push(i+1);
  }
    return pagesArray
  }, [totalCount])
  
  const searchedChildrens = useMemo(() => {
    var arr1 = childrens.filter(child => child.surname.toLowerCase().includes(search.toLowerCase()))
    var arr2 = childrens.filter(child => child.polisOms == search)
    return arr1.concat(arr2);
  }, [search,childrens])

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchedChildrens.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };  

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [fathername, setFathername] = useState("");
  const [date, setDate] = useState();
  const [sex, setSex] = useState("мужской");
  const [polis, setPolis] = useState("");
  const [adress, setAdress] = useState("");

  const onChangeDate = e => {
    const newDate = new Date(e.target.value).format('YYYY-MM-DD');
    setChange({
      ...change_arr,
      date: e.target.value
    })
    console.log(newDate); //value picked from date picker
  };

  useEffect(() => {
    Get();
  }, []);
  
  return (
    loading? 
    <p>
      <em>Loading...</em>
    </p> : 
    
  <div>
    <div>
  <ChildModal visible={createModal} setVisible={setCreateModal}>
    <form>
      <h5>Создание и добавление</h5>
      <ChildInput 
        value={surname} 
        onChange={e => setSurname(e.target.value)} 
        type="text" 
        placeholder="Фамилия"/>

      <ChildInput value={name} type="text" placeholder="Имя" 
      onChange={e => setName(e.target.value)} 
      />
      <ChildInput value = {fathername} type="text" placeholder="Отчество" 
      onChange={e => setFathername(e.target.value)} 
      />
      <ChildInput type="date" placeholder="Дата рождения" 
      onChange={e => setDate(e.target.value)} 
      />
      <select className="sex" value={sex} onChange={e => setSex(e.target.value)}>
      <option disabled> Пол </option>
      <option value="мужской"> мужской </option>
      <option value="женский"> женский </option>
      </select>
      <ChildInput type="text" placeholder="Полис" 
      onChange={e => setPolis(e.target.value)}
      />
      <ChildInput type="text" placeholder="Адрес" 
      onChange={e => setAdress(e.target.value)}
      />
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
  </div>

  <div>
  <ChildModal visible={updateModal} setVisible={setUpdateModal}>
    <form>
      <h5>Редактирование</h5>
      <ChildInput 
        value={change_arr.surname} 
        onChange={e => setChange({
          ...change_arr,
          surname: e.target.value
        })} 
        type="text" 
        placeholder="Фамилия"/>

      <ChildInput type="text" placeholder="Имя"
      value={change_arr.name} 
      onChange={e => setChange({
        ...change_arr,
        name: e.target.value
      })} 
      />
      <ChildInput type="text" placeholder="Отчество"
      value={change_arr.fathername} 
      onChange={e => setChange({
        ...change_arr,
        fathername: e.target.value
      })} 
      />
      <ChildInput type="date" placeholder="Дата рождения"
      value={change_arr.birthDate.substring(0,10)}
      onChange={e => setChange({
        ...change_arr,
        birthDate: e.target.value
      })} 
      />
      <select className="sex" onChange={e => setChange({
        ...change_arr,
        date: e.target.value
      })}>
      <option disabled> Пол </option>
      <option value="мужской"> мужской </option>
      <option value="женский"> женский </option>
      </select>
      <ChildInput type="text" placeholder="Полис" 
      value={change_arr.polisOms}
      onChange={e => setChange({
        ...change_arr,
        polis: e.target.value
      })}
      />
      <ChildInput type="text" placeholder="Адрес"
      value={change_arr.adress} 
      onChange={e => setChange({
        ...change_arr,
        adress: e.target.value
      })}
      />
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-add" onClick={Update}>
          Сохранить
        </button>
        <button type="button" class="btn btn-delete" onClick={() => setUpdateModal(false)}>
          Закрыть
        </button>
      </div>
    </form>
  </ChildModal>
  </div>

  <div class="btn-toolbar justify-content-between" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
      <button type="button" class="btn btn-add" onClick={() => setCreateModal(true)}>
        Add
      </button>
      <button type="button" class="btn btn-update" onClick={() => {setChange(searchSelected()); setUpdateModal(true)}}>
        Update
      </button>
      <button type="button" class="btn btn-delete" onClick={Delete}>
        Delete
      </button>
    </div>
    <div class="input-group">
      <ChildInput 
      value={search}
      onChange={e => setSearch(e.target.value)}
      type="text"
      placeholder="Поиск"
      />
    </div>
  </div>
  <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell align="justify">Фамилия</TableCell>
            <TableCell align="justify">Имя</TableCell>
            <TableCell align="justify">Отчество</TableCell>
            <TableCell align="justify">Дата</TableCell>
            <TableCell align="justify">Пол</TableCell>
            <TableCell align="justify">Полис</TableCell>
            <TableCell align="justify">Адрес</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? searchedChildrens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : searchedChildrens
          ).map((row) => (
            <TableRow key={row.childId} onClick={() => {
              setSelectedRow(row.childId);
              console.log(selectedRow);
            }} className={selectedRow === row.childId ? "row selected" : "row"}>
              <TableCell align="justify" >
                {row.surname}
              </TableCell>
              <TableCell align="justify" >
                {row.name}
              </TableCell>
              <TableCell align="justify">
                {row.fathername}
              </TableCell>
              <TableCell align="justify">
                {new Date(row.birthDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="justify">
                {row.sex}
              </TableCell>
              <TableCell align="justify">
                {row.polisOms}
              </TableCell>
              <TableCell align="justify">
                {row.adress}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination className="pagination"
              rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
              colSpan={0}
              count={searchedChildrens.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </div>
  //endregion
  );

  //region stuff
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
  function searchSelected () {
    for(let i=0; i < childrens.length; i++){
      if(childrens[i].childId==selectedRow){
        return childrens[i];
      }
    }
    console.log("error")
    setSelectedRow(childrens[0].childId)
    return childrens[0];
  }

  //endregion
  
  //#region CRUD

  async function Add(e){
    
    const data = {
      "ChildId": childrens[childrens.length].ChildId+1,
      "Surname": surname,
      "Name": name,
      "Fathername": fathername,
      "BirthDate":date,
      "Sex": sex,
      "PolisOms": polis,
      "Adress": adress 
    }
    const response = await fetch("api/Children/",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      method: 'POST',
      body: JSON.stringify(data)
    });
    console.log(data)
    setCreateModal(false)
  }
  async function Update(){
    console.log('update')
    const data = {
      "ChildId": selectedRow,
      "Surname": change_arr.surname,
      "Name": change_arr.name,
      "Fathername": change_arr.fathername,
      "BirthDate": change_arr.date,
      "Sex": change_arr.sex,
      "PolisOms": change_arr.polis,
      "Adress": change_arr.adress 
    }
    console.log(data.ChildId)
    const response = await fetch("api/Children/"+data.ChildId,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      method: 'PUT',
      body: JSON.stringify(data)
    }).then((response)=>{
      if(response.ok){
        
      }
      else{
        alert("error update")
      }
    });
  }
  async function Delete(){
    console.log(change_arr.name)
    console.log(change_arr.surname)
  }

  //#endregion
  
  async function Get() {
    const response = await fetch("api/Children/");
    const data = await response.json();
    console.log(data.length)
    setTotalCount(Math.ceil(data.length/10));
    setChildrens(data);
    setLoading(false);
  }
}
