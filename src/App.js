import 'bulma/css/bulma.min.css';
import logo from './vlab-logo.png';
import { FcSearch } from 'react-icons/fc';
import './sass/mystyles.css'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import Filter from './Filter';
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'
import Navbar from './Navbar';
function App() {
  const [experiments, setExperiments] = React.useState([]);
  const [word, setWord] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, setTotal] = useState(1)
  const PrevPage = ()=>{
    setPage(page-1)
  }
  const NextPage = ()=>{
    setPage(page+1)
  }
  React.useEffect(() => {
    fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setExperiments(data);
        setTotal(Math.ceil(data.length / 8))
      });
  }, []);
  const SearchExp = (e) => {
    setWord(e.target.value)
  }
  const ToggleFilter = () => {
    console.log(document.getElementById("filter-set").className)
    if (!document.getElementById("filter-set").className.includes("is-hidden-desktop is-hidden-tablet")) {
      document.getElementById("filter-set").className = document.getElementById("filter-set").className + " is-hidden-desktop is-hidden-tablet";
      document.getElementById("divider").className = document.getElementById("divider").className + " is-hidden-desktop is-hidden-tablet";
    }
    else {
      document.getElementById("filter-set").className = 'column is-one-fifth is-hidden-mobile';
      document.getElementById("divider").className = "is-divider-vertical is-hidden-mobile";
    }
    document.getElementById("filter-model").className=document.getElementById("filter-model").className+" is-active"
  }
  return (
    <>
      <Navbar />
      <div className='columns is-vcentered is-mobile mt-4 '>
        <div className='column is-half-desktop is-offset-one-quarter-desktop'>
          <div className="field has-addons m-4">
            <div className='control'>
              <p className="control has-icons-left">
                <input className="input is-large" size="200" placeholder="Search For Experiments..." style={{ borderRadius: "290000px" }} onChange={SearchExp} />
                <span className="icon is-small is-left">
                  <FcSearch />
                </span>
              </p>
            </div>
            <div className="control">
              <button className="button is-info ml-4 has-text-black is-large" style={{ borderRadius: "290000px", backgroundColor: "yellowgreen" }} onClick={ToggleFilter}>
                <HiFilter /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Filter experiments={experiments} word={word} pagenum={page} setp={setPage} settp={setTotal}/>
      <footer className="footer" style={{padding:"2%",backgroundColor:"#575266"}}>
        <div className="content has-text-centered">
          <button className=' button is-dark has-text-white is-pulled-left ml-1' style={{fontSize:'20px'}} 
          disabled={page===1} onClick={PrevPage}>
            <AiOutlineArrowLeft/>&nbsp;Previous
          </button>
          <button className='button is-dark has-text-white is-pulled-right mr-1' style={{fontSize:'20px'}} 
          disabled={page===totalPage} onClick={NextPage}>
            Next&nbsp;<AiOutlineArrowRight/>
          </button>
          <p className='has-text-white is-size-4'>
            Page {page} of {totalPage}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;




