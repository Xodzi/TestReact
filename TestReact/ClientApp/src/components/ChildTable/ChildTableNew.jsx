import React, { useEffect, useState, useMemo } from "react";
import "../../custom.css";
import cl from "./ChildTable.module.css"
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';





export default function ChildTableNew() {

  const [change_arr, setChange] = useState({
    name:"",
    surname: "",
    fathername: "",
    birthDate: "",
    sex: "",
    polis: "",
    adress: "",
    health: "",
    diagnosis: "",
    benefits: false,
    other: ""
  });
  const [updateModal, setUpdateModal] = useState(false);

  const [childrens, setChildrens] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
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
    var arr3 = childrens.filter(child => child.childId == search)
    return arr1.concat(arr2).concat(arr3);
  }, [search,childrens])

  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      <option value="мужской">мужской</option>
      <option value="женский">женский</option>
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
      <option value="мужской" selected={change_arr.sex=="мужской"}>мужской</option>
      <option value="женский" selected={change_arr.sex=="женский"}>женский</option>
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
        Добавить
      </button>
      <button type="button" class="btn btn-update" onClick={() => {setChange(searchSelected()); setUpdateModal(true)}}>
        Редактировать
      </button>
      <button type="button" class="btn btn-delete" onClick={Delete}>
        Удалить 
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
            <TableCell align="justify"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? searchedChildrens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : searchedChildrens
          ).map((row) => (
            <Row key={row.childId} row={row} selectedRow={selectedRow} setSelectedRow={setSelectedRow} Update={Update} />
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
  );
  //endregion

  //#region stuff
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

    console.log(childrens[childrens.length-1].childId+1)
    
    const data = {
      "childId": childrens[childrens.length-1].childId+1,
      "surname": surname,
      "name": name,
      "fathername": fathername,
      "birthDate": date,
      "sex": sex,
      "polisOms": polis,
      "adress": adress,
      "healthGroup": null,
      "diagnosis": null,
      "benefits": null,
      "other": null
    }

    const response = await fetch("api/Children",{
      headers: {
        'Content-Type': 'application/json'
      },  
      method: 'POST',
      body: JSON.stringify(data)
    });
    Get()
    setCreateModal(false)
  }

  async function Update(){
    const data = {
      "ChildId": selectedRow,
      "Surname": change_arr.surname,
      "Name": change_arr.name,
      "Fathername": change_arr.fathername,
      "BirthDate": change_arr.date,
      "Sex": change_arr.sex,
      "PolisOms": change_arr.polis,
      "Adress": change_arr.adress,
      "HealthGroup": "",
      "Diagnosis": "",
      "Benefits": false,
      "Other": ""
    }
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
    const response = await fetch("api/Children/"+selectedRow,{ 
      method: 'Delete',
    }).then((response)=>{
      if(response.ok){
      for(let i=0;i<childrens.length;i++){
        if(childrens[i].childId==selectedRow){
          childrens.slice(i,1)
          const res = childrens
          console.log(res)
          setChildrens(res)
          Get()
        }
      }
      }
      else{
        alert("error delete")
      }
    });
    
  }
  async function Get() {
    const response = await fetch("api/Children/");
    const data = await response.json();
    console.log(data)
    setTotalCount(Math.ceil(data.length/10));
    setChildrens(data);
    setLoading(false);
  }

  //#endregion
}
//#region Row
function Row(props) {

  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow
      onClick={() => {
        props.setSelectedRow(row.childId);
        console.log(props.selectedRow);
      }} className={props.selectedRow === row.childId ? "row selected" : "row"}
      sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="justify">{row.surname}</TableCell>
        <TableCell align="justify">{row.name}</TableCell>
        <TableCell align="justify">{row.fathername}</TableCell>
        <TableCell align="justify">{new Date(row.birthDate).toLocaleDateString()}</TableCell>
        <TableCell align="justify">{row.sex}</TableCell>
        <TableCell align="justify">{row.polisOms}</TableCell>
        <TableCell align="justify">{row.adress}</TableCell>
        <TableCell align="justify">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Группа здоровья: <textarea value={row.health}
                    style={{marginRight: "5px"}}
                    /></TableCell>
                    <TableCell>Диагноз: <textarea value={row.diagnosis}
                    style={{marginRight: "5px"}} /></TableCell>
                    <TableCell align="justify">Льгота: <textarea value={row.benefits} /></TableCell>
                    <TableCell align="justify">Прочее: <textarea value={row.other} /></TableCell>
                    <TableCell align="justify">
                      <button type="button"  class="btn btn-add" onClick={()=>console.log(row)}>
                        Сохранить
                      </button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
  //#endregion
}