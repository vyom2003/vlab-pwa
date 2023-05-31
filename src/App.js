import 'bulma/css/bulma.min.css';
import logo from './vlab-logo.png';
import { FcSearch } from 'react-icons/fc';
import './sass/mystyles.css'
import Filter from './Filter';
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'
import Navbar from './Navbar';
function App() {
  const [experiments, setExperiments] = React.useState([]);
  const [word, setWord] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, setTotal] = useState(1)
  React.useEffect(() => {
    fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
      .then((resp) => resp.json())
      .then((data) => {
        setExperiments(data);
        setTotal(Math.ceil(data.length / 5))
      });
  }, []);
  const SearchExp = (e) => {
    setWord(e.target.value)
  }
  const ToggleFilter = () => {
    if (!document.getElementById("filter-set").className.includes("is-hidden-desktop is-hidden-tablet")) {
      document.getElementById("filter-set").className = document.getElementById("filter-set").className + "is-hidden-desktop is-hidden-tablet";
      document.getElementById("divider").className = document.getElementById("divider").className + "is-hidden-desktop is-hidden-tablet";
    }
    else {
      document.getElementById("filter-set").className = 'column is-one-fifth is-hidden-mobile';
      document.getElementById("divider").className = "is-divider-vertical is-hidden-mobile";
    }
  }
  return (
    <>
      <Navbar />
      <div className='columns is-vcentered is-mobile mt-6 '>
        <div className='column is-half-desktop is-offset-one-quarter-desktop'>
          <div className="field has-addons m-4">
            <div className='control'>
              <p className="control has-icons-left">
                <input className="input" size="200" placeholder="Search For Experiments..." style={{ borderRadius: "290000px"}} onChange={SearchExp} />
                <span className="icon is-small is-left">
                  <FcSearch />
                </span>
              </p>
            </div>
            <div className="control">
              <button className="button is-info ml-4 has-text-black" style={{ borderRadius: "290000px",backgroundColor:"yellowgreen"}} onClick={ToggleFilter}>
                <HiFilter/> Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Filter experiments={experiments} word={word} />
    </>
  );
}

export default App;




