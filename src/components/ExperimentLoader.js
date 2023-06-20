import React, { useState } from 'react'
import 'bulma/css/bulma.min.css';
import '../sass/mystyles.css'
import 'bulma-divider'
import {TiTick} from 'react-icons/ti'
import {BiRename} from 'react-icons/bi'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-switch'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar, AiFillDelete } from 'react-icons/ai'
import { BsFillBookmarkStarFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { Bulma_component } from 'yatharth-super-lemon'
import { save } from 'fontawesome';
export default function ExperimentLoader(props) {
    const [Instis, setInstis] = useState(["option1-Insti", "option2-Insti"])
    const [Discipline, setDiscipline] = useState(["option1-discipline", "option2-dis"])
    const [Display, setDisplay] = useState([])
    const [SelectInstis, setSelectInstis] = useState([])
    const [SelectDisciplines, setSelectDiscipline] = useState([])
    const [History, setHistory] = useState([])
    const [saved, setSaved] = useState([])
    const [saved_filters, setSavedFilters] = useState(JSON.parse(localStorage.getItem("Saved_Filters")))
    const [apply, setApply] = useState(0);
    const disc = {
        "Civil Engineering": "CIVIL",
        "Computer Science and Engineering": "CSE",
        "Electronics and Communication Engineering": "ECE",
        "Electrical Engineering": "ELECTRICAL",
        "Mechanical Engineering": "MECHANICAL",
        "Biotechnology and Biomedical Engineering": "BIO-TECH",
        "Chemical Sciences": "CHEM-SCI",
        "Physical Sciences": "PHY-SCI",
        "Chemical Engineering": "CHEMICAL",
    }

    const IncludeDis = (element) => {
        let copy = [...SelectDisciplines]
        copy.push(element)
        setSelectDiscipline(copy)
    }
    const ExcludeDis = (element) => {
        let copy = [...SelectDisciplines]
        let idx = copy.indexOf(element)
        copy.splice(idx, 1)
        setSelectDiscipline(copy)
    }
    const IncludeInsti = (element) => {
        let copy = [...SelectInstis]
        copy.push(element)
        setSelectInstis(copy)
    }
    const ExcludeInsti = (element) => {
        let copy = [...SelectInstis]
        let idx = copy.indexOf(element)
        copy.splice(idx, 1)
        setSelectInstis(copy)
    }
    const CloseModal = () => {
        document.getElementById("filter-model").className = "modal is-hidden-tablet is-hidden-desktop";
    }
    const OpenLink = (link) => {
        let name
        for (let i of Display) {
            if (i["Experiment URL"] == link)
                name = i["Experiment Name"]
        }
        var a = localStorage.getItem("history");
        if (a === null) a = ""
        else a += ","
        a = a.replace(name, "")
        a += name
        let links = a.split(",");
        links = links.filter((ele) => {
            return ele != ""
        })
        links.reverse()
        setHistory(links.slice(0, 10))
        localStorage.setItem("history", a);
        var win = window.open("https://" + link, '_blank');
        win.focus();
    }
    const LoadRecents = () => {
        document.getElementById("recent-tab").className = document.getElementById("recent-tab").className.replace("primary", "info")
        document.getElementById("save-tab").className = document.getElementById("save-tab").className.replace("info", "primary")
        document.getElementById("all-tab").className = document.getElementById("all-tab").className.replace("info", "primary")
        document.getElementById("popular-tab").className = document.getElementById("popular-tab").className.replace("info", "primary")
        props.settp(Math.ceil(History.length / 8))
        props.setp(1)
        props.setNav(1);
    }
    const LoadSaved = () => {
        document.getElementById("save-tab").className = document.getElementById("save-tab").className.replace("primary", "info")
        document.getElementById("all-tab").className = document.getElementById("all-tab").className.replace("info", "primary")
        document.getElementById("popular-tab").className = document.getElementById("popular-tab").className.replace("info", "primary")
        document.getElementById("recent-tab").className = document.getElementById("recent-tab").className.replace("info", "primary")
        props.settp(Math.ceil(saved.length / 8))
        props.setp(1)
        props.setNav(2);
    }
    const LoadAll = () => {
        document.getElementById("all-tab").className = document.getElementById("all-tab").className.replace("primary", "info")
        document.getElementById("save-tab").className = document.getElementById("save-tab").className.replace("info", "primary")
        document.getElementById("popular-tab").className = document.getElementById("popular-tab").className.replace("info", "primary")
        document.getElementById("recent-tab").className = document.getElementById("recent-tab").className.replace("info", "primary")
        props.settp(Math.ceil(Display.length / 8))
        props.setp(1)
        props.setNav(0);
    }
    const LoadPop = () => {
        document.getElementById("popular-tab").className = document.getElementById("recent-tab").className.replace("primary", "info")
        document.getElementById("save-tab").className = document.getElementById("save-tab").className.replace("info", "primary")
        document.getElementById("all-tab").className = document.getElementById("all-tab").className.replace("info", "primary")
        document.getElementById("recent-tab").className = document.getElementById("popular-tab").className.replace("info", "primary")
        props.settp(Math.ceil(History.length / 8))
        props.setp(1)
        props.setNav(3);
    }
    const SaveFilter = () => {
        console.log(saved_filters);
        let a = {};
        if (saved_filters) a = JSON.parse(JSON.stringify(saved_filters))
        if (!a || !a["Filter1"]) {
            a["Filter1"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter1"
            }
            window.alert("Saved as Filter1")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else if (!a["Filter2"]) {
            a["Filter2"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter2"
            }
            window.alert("Saved as Filter2")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else if (!a["Filter3"]) {
            a["Filter3"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter3"
            }
            window.alert("Saved as Filter3")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else {
            window.alert("3 filters already saved. Delete some first")
        }
    }
    const ToggleSave = (exp) => {
        console.log(exp)
        if (saved.includes(exp)) {
            var a = localStorage.getItem("saved");
            a = a.replace(exp, "")
            let saves = a.split(",");
            saves = saves.filter((ele) => {
                return ele != ""
            })
            setSaved(saves)
            localStorage.setItem("saved", saves.join(","))
        }
        else {
            var a = localStorage.getItem("saved");
            a += "," + exp
            let saves = a.split(",");
            saves = saves.filter((ele) => {
                return ele != ""
            })
            setSaved(saves)
            localStorage.setItem("saved", saves.join(","))
        }
    }
    const ClearFilter = () => {
        setSelectDiscipline([])
        setSelectInstis([])
    }
    React.useEffect(() => {
        let arr = []
        let arr_dis = []
        for (let i of props.experiments) {
            if (!arr.includes(i["Insitute Name"]))
                arr.push(i["Insitute Name"])
            if (!arr_dis.includes(i["Discipline Name"]))
                arr_dis.push(i["Discipline Name"])
        }
        let a = ""
        if (localStorage.getItem("history") !== undefined && localStorage.getItem("history") !== null) {
            a = localStorage.getItem("history")
        }
        let links = a.split(",")
        links = links.filter((ele) => {
            return ele != ""
        })
        links.reverse()
        if (localStorage.getItem("saved") === null) {
            localStorage.setItem("saved", "")
        }
        else {
            setSaved(localStorage.getItem("saved").split(",").filter((ele) => {
                return ele != "";
            }))
        }
        setInstis(arr)
        setDiscipline(arr_dis)
        setDisplay(props.experiments)
        setHistory(links.slice(0, 10))
    }, [props.experiments]);

    React.useEffect(() => {
        let arr = []
        let arr_after_search = []
        if (props.word === "") {
            arr_after_search = [...props.experiments]
        }
        else {
            for (let i of props.experiments) {
                if (i["Experiment Name"].toLowerCase().includes(props.word.toLowerCase())) {
                    arr_after_search.push(i)
                }
            }
        }
        if (SelectDisciplines.length === 0 && SelectInstis.length === 0) {
            setDisplay(arr_after_search)
            props.setp(1);
            props.settp(Math.ceil(arr_after_search.length / 8))
            return;
        }
        for (let i of arr_after_search) {
            if (SelectDisciplines.includes(i["Discipline Name"]) || SelectInstis.includes(i["Insitute Name"])) {
                arr.push(i)
            }
        }
        setDisplay(arr)
        props.setp(1);
        props.settp(Math.ceil(arr.length / 8))
    }, [SelectDisciplines, SelectInstis, props.word]);
    return (
        <div>
            <div className="columns m-0 is-mobile">

                <div id="filter-set" className='column is-2 is-hidden-mobile is-hidden-desktop is-hidden-tablet' style={{ backgroundColor: "#AB987A" }}>
                    <div className="tabs is-centered is-boxed is-small">
                        <ul>
                            <li className="is-active">
                                <a>
                                    <span>Apply Filters</span>
                                </a>
                            </li>
                            <li className="is-acti">
                                <a>
                                    <span>Saved </span>
                                </a>

                            </li>
                        </ul>
                    </div>
                    {apply ? <>
                        <div className="field mb-4 ml-4">
                            <label className="label m-2 is-size-4 has-text-white">Institutes</label>
                            {
                                Instis.map((element) => {
                                    if (SelectInstis.includes(element))
                                        return (
                                            <>
                                                <button className="button is-rounded is-success has-text-light is-small is-focused m-2"
                                                    onClick={() => { ExcludeInsti(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{element}</button>
                                                <br />
                                            </>
                                        )
                                    else
                                        return (
                                            <>
                                                <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                    onClick={() => { IncludeInsti(element) }}
                                                    style={{
                                                        boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                        height: "max-content", whiteSpace: "inherit"
                                                    }}>{element}</button>
                                                <br />
                                            </>
                                        )
                                })
                            }
                        </div>
                        <div className="is-divider"></div>
                        <div className="field mb-4 ml-4">
                            <label className="label m-2 is-size-4 has-text-white">Discipline</label>
                            {
                                Discipline.map((element) => {
                                    if (SelectDisciplines.includes(element))
                                        return (
                                            <>
                                                <button className="button is-rounded is-success has-text-light is-small is-focused m-2"
                                                    onClick={() => { ExcludeDis(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{disc[element]}</button>
                                                <br />
                                            </>
                                        )
                                    else
                                        return (
                                            <>
                                                <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                    onClick={() => { IncludeDis(element) }}
                                                    style={{
                                                        boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                        height: "max-content", whiteSpace: "inherit"
                                                    }}>{disc[element]}</button>
                                                <br />
                                            </>
                                        )
                                })
                            }
                        </div>
                        <div className="is-divider"></div>
                        <div className='has-text-centered'>
                            <button className='button is-danger is-light is-rounded mr-4' style={{ padding: "10px" }} onClick={ClearFilter}><AiFillDelete /></button>
                            <button className='button is-info is-light is-rounded' style={{ padding: "10px" }} onClick={SaveFilter}><BsFillBookmarkPlusFill /></button>
                        </div>
                    </> : null}
                    {
                        apply == 0 ? <>
                            <ul className='m-4' style={{color:"black"}}>
                                {saved_filters && saved_filters["Filter1"] ?
                                <li className='mt-3'>
                                    <span style={{backgroundColor:"lightgreen",padding:"3px"}}>{saved_filters["Filter1"]["AltName"]}{" "}:</span>
                                    <br/>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><TiTick/>Apply</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><BiRename/>Rename</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><AiFillDelete/>Delete</button>
                                </li>:null}
                                {saved_filters && saved_filters["Filter2"] ?
                                    <li className='mt-5'>
                                    <span style={{backgroundColor:"lightgreen",padding:"3px"}}>{saved_filters["Filter2"]["AltName"]}{" "}:</span>
                                    <br/>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><TiTick/>Apply</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><BiRename/>Rename</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><AiFillDelete/>Delete</button>
                                </li>:null}
                                {saved_filters && saved_filters["Filter3"] ?
                                    <li className='mt-5'>
                                    <span style={{backgroundColor:"lightgreen",padding:"3px"}}>{saved_filters["Filter3"]["AltName"]}{" "}:</span>
                                    <br/>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><TiTick/>Apply</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><BiRename/>Rename</button>
                                    <button className='mt-2 ml-1 button is-small is-primary has-text-black is-light'><AiFillDelete/>Delete</button>
                                </li>:null}
                            </ul>
                        </> : null
                    }
                </div>
                <div id="filter-model" className="modal is-hidden-tablet is-hidden-desktop">
                    <div className="modal-background"></div>
                    <div className="modal-card " style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Filters</p>
                            <button className="delete" aria-label="close" onClick={CloseModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="field mb-4 ml-4">
                                <label className="label m-2 is-size-4 has-text-primary" style={{ textShadow: "0.15rem 0.15rem #D5F2D8" }}>Institutes</label>
                                {
                                    Instis.map((element) => {
                                        if (SelectInstis.includes(element))
                                            return (
                                                <>
                                                    <button className="button is-rounded is-success has-text-light is-small is-focused m-2"
                                                        onClick={() => { ExcludeInsti(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{element}</button>
                                                    <br />
                                                </>
                                            )
                                        else
                                            return (
                                                <>
                                                    <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                        onClick={() => { IncludeInsti(element) }}
                                                        style={{
                                                            boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                            height: "max-content", whiteSpace: "inherit"
                                                        }}>{element}</button>
                                                    <br />
                                                </>
                                            )
                                    })
                                }
                            </div>
                            <div className="is-divider"></div>
                            <div className="field mb-4 ml-4">
                                <label className="label m-2 is-size-4 has-text-primary" style={{ textShadow: "0.15rem 0.15rem #D5F2D8" }}>Discipline</label>
                                {
                                    Discipline.map((element) => {
                                        if (SelectDisciplines.includes(element))
                                            return (
                                                <>
                                                    <button className="button is-rounded is-success has-text-light is-small is-focused m-2"
                                                        onClick={() => { ExcludeDis(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{disc[element]}</button>
                                                    <br />
                                                </>
                                            )
                                        else
                                            return (
                                                <>
                                                    <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                        onClick={() => { IncludeDis(element) }}
                                                        style={{
                                                            boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                            height: "max-content", whiteSpace: "inherit"
                                                        }}>{disc[element]}</button>
                                                    <br />
                                                </>
                                            )
                                    })
                                }
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={CloseModal}>Done</button>
                        </footer>
                    </div>
                </div>
                <div className='column'>

                    <button id="popular-tab" className='button is-primary ml-5 has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }} onClick={LoadPop}><AiFillStar />Popular</button>

                    <button id="recent-tab" className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }} onClick={LoadRecents}><RxCounterClockwiseClock />Recents</button>

                    <button id="all-tab" className='button is-info has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }} onClick={LoadAll}><AiFillExperiment />All Experiments</button>

                    <button id="save-tab" className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }} onClick={LoadSaved}><BsFillBookmarkStarFill />Starred</button>

                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    {
                        props.nav == 0 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(Display.length / 8))
                            }
                            {
                                Display.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} onValueChange={() => { ToggleSave(exp["Experiment Name"]) }} UserData={{
                                                exp_name: exp["Experiment Name"],
                                                institute: exp["Insitute Name"],
                                                exp_link: exp["Experiment URL"],
                                                exp_img: exp["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + exp["Insitute Name"].toLowerCase() + ".png",
                                                card_content: exp["Description"],
                                                rating: '4.5',
                                                domain: exp["Discipline Name"],
                                                lab: exp["Lab Name"],
                                                saved: saved.includes(exp["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                    {
                        props.nav == 1 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(History.length / 8))
                            }
                            {
                                History.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    let a = {}
                                    for (let i of props.experiments) {
                                        if (i["Experiment Name"] === exp) {
                                            a = i;
                                            break;
                                        }
                                    }
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(a["Experiment URL"]) }} onValueChange={() => { ToggleSave(a["Experiment Name"]) }} UserData={{
                                                exp_name: a["Experiment Name"],
                                                institute: a["Insitute Name"],
                                                exp_link: a["Experiment URL"],
                                                exp_img: a["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + a["Insitute Name"].toLowerCase() + ".png",
                                                card_content: a["Description"],
                                                rating: '4.5',
                                                domain: a["Discipline Name"],
                                                lab: a["Lab Name"],
                                                saved: saved.includes(exp["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                    {
                        props.nav == 2 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(saved.length / 8))

                            }
                            {
                                console.log(typeof (saved))
                            }
                            {
                                saved.map((exp) => {
                                    let a = {}
                                    for (let i of props.experiments) {
                                        if (i["Experiment Name"] === exp) {
                                            a = i;
                                            break;
                                        }
                                    }
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(a["Experiment URL"]) }} onValueChange={() => { ToggleSave(a["Experiment Name"]) }} UserData={{
                                                exp_name: a["Experiment Name"],
                                                institute: a["Insitute Name"],
                                                exp_link: a["Experiment URL"],
                                                exp_img: a["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + a["Insitute Name"].toLowerCase() + ".png",
                                                card_content: a["Description"],
                                                rating: '4.5',
                                                domain: a["Discipline Name"],
                                                lab: a["Lab Name"],
                                                saved: saved.includes(a["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                    {
                        props.nav == 3 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(Math.min(10, props.experiments.length) / 8))
                            }
                            {
                                props.pop.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} onValueChange={() => { ToggleSave(exp["Experiment Name"]) }} UserData={{
                                                exp_name: exp["Experiment Name"],
                                                institute: exp["Insitute Name"],
                                                exp_link: exp["Experiment URL"],
                                                exp_img: exp["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + exp["Insitute Name"].toLowerCase() + ".png",
                                                card_content: exp["Description"],
                                                rating: '4.5',
                                                domain: exp["Discipline Name"],
                                                lab: exp["Lab Name"],
                                                saved: saved.includes(exp["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                </div>
            </div>
        </div>
    )
}
