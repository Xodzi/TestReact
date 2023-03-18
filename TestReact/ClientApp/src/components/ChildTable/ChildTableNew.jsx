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
    date: Date,
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
    return childrens.filter(child => child.surname.toLowerCase().includes(search.toLowerCase()))
  }, [search,childrens])

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchedChildrens.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
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
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };  
    const handleSelectRow = (event) => {

    };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [fathername, setFathername] = useState("");
  const [date, setDate] = useState();
  const [sex, setSex] = useState("");
  const [polis, setPolis] = useState("");
  const [adress, setAdress] = useState("");

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
        value={name} 
        onChange={e => setSurname(e.target.value)} 
        type="text" 
        placeholder="Фамилия"/>

      <ChildInput type="text" placeholder="Имя" 
      onChange={e => setName(e.target.value)} 
      />
      <ChildInput type="text" placeholder="Отчество" 
      onChange={e => setFathername(e.target.value)} 
      />
      <ChildInput type="date" placeholder="Дата рождения" 
      onChange={e => setDate(e.target.value)} 
      />
      <select className="sex" onChange={e => setSex(e.target.value)}>
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
     
      onChange={e => setChange({
        ...change_arr,
        date: e.target.value
      })} 
      />
      <select className="sex" onChange={e => setChange({
          ...change_arr,
          surname: e.target.value
        })}>
      <option disabled> Пол </option>
      <option value="мужской"> мужской </option>
      <option value="женский"> женский </option>
      </select>
      <ChildInput type="text" placeholder="Полис" 
      value={change_arr.polisOms}
      onChange={e => setChange({
        ...change_arr,
        polisOms: e.target.value
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
        <button type="button" class="btn btn-add" onClick={SaveChange}>
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
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Фамилия</TableCell>
            <TableCell align="right">Имя</TableCell>
            <TableCell align="right">Отчество</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Пол</TableCell>
            <TableCell align="right">Полис</TableCell>
            <TableCell align="right">Адрес</TableCell>
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
              
              <TableCell >
                {row.childId}
              </TableCell>
              <TableCell align="right" >
                {row.surname}
              </TableCell>
              <TableCell align="right" >
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.fathername}
              </TableCell>
              <TableCell align="right">
                {new Date(row.birthDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {row.sex}
              </TableCell>
              <TableCell align="right">
                {row.polisOms}
              </TableCell>
              <TableCell align="right">
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
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
    const formData = new FormData();
    formData.append("surname",surname);
    console.log(formData);
    console.log(name)
    console.log(surname)
    console.log(fathername)
    console.log(date)
    console.log(sex)
    console.log(polis)
    console.log(adress)
    setCreateModal(false)
  }
  async function Delete(){
    console.log(change_arr.name)
    console.log(change_arr.surname)
  }
  async function SaveChange(e){
    console.log(change_arr)
  }
  
  async function Get() {
    const response = await fetch("api/Children/");
    const data = await response.json();
    console.log(data.length)
    setTotalCount(Math.ceil(data.length/10));
    setChildrens(data);
    setLoading(false);
  }
 /* <table className="table table-striped" aria-labelledby="tabelLabel">
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
          {searchedChildrens.slice(10*page,10*page+10).map((children) => (
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
      <div className="pagination">
        <Pagination count={10} page={page} variant="outlined" shape="rounded" onChange={handleChangePage}/>
      </div>
    </div> */
}
