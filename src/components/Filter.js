import React, { useState } from 'react'
import 'bulma/css/bulma.min.css';
import '../sass/mystyles.css'
import 'bulma-divider'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-switch'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { Bulma_component } from 'yatharth-super-lemon'
export default function Filter(props) {
    const [Instis, setInstis] = useState(["option1-Insti", "option2-Insti"])
    const [Discipline, setDiscipline] = useState(["option1-discipline", "option2-dis"])
    const [Display, setDisplay] = useState([])
    const [SelectInstis, setSelectInstis] = useState([])
    const [SelectDisciplines, setSelectDiscipline] = useState([])
    const [History, setHistory] = useState([])
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
        a=a.replace(name, "")
        a += name
        let links=a.split(",");
        links=links.filter((ele) => {
            return ele!=""
        })
        links.reverse()
        setHistory(links.slice(0,10))
        localStorage.setItem("history", a);
        var win = window.open("https://" + link, '_blank');
        win.focus();
    }
    const LoadRecents = () => {
        props.settp(Math.ceil(History.length/8))
        props.setp(1)
        props.setNav(1);
    }
    const LoadAll = () => {
        props.settp(Math.ceil(Display.length/8))
        props.setp(1)
        props.setNav(0);
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
        links = links.filter((ele)=>{
            return ele!=""
        })
        links.reverse()
        setInstis(arr)
        setDiscipline(arr_dis)
        setDisplay(props.experiments)
        setHistory(links.slice(0,10))
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
                {props.nav!=1?(
                <><div id="filter-set" className='column is-2 is-hidden-mobile is-hidden-desktop is-hidden-tablet'>
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
                <div id="divider" className="is-divider-vertical is-hidden-mobile is-hidden-desktop is-hidden-tablet"></div></>):null}
                <div className='column'>

                    <button className='button is-primary ml-5 has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}><AiFillStar />Popular</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }} onClick={LoadRecents}><RxCounterClockwiseClock />Recents</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }} onClick={LoadAll}><AiFillExperiment />All Experiments</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}><BsFillBookmarkStarFill />Starred</button>

                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    {
                        props.nav == 0 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(Display.length/8))
                            }
                            {
                                Display.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} UserData={{
                                                exp_name: exp["Experiment Name"],
                                                collage: exp["Institute Name"],
                                                exp_link: exp["Experiment URL"],
                                                exp_img: exp["Image"],
                                                collage_img: exp["Image"],
                                                card_content: exp["Description"],
                                                rating: '4.5',
                                                modal_content: exp["Description"],
                                                modal_img: exp["Image"],
                                                tags: exp["Tags"].split(",").join('"').split('"').join("[").split("[").join("]").split("]").filter((elem) => {
                                                    return elem !== "";
                                                }),
                                                domain: exp["Discipline Name"],
                                                lab: exp["Lab Name"],
                                                saved: false
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                    {
                        props.nav == 1 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(History.length/8))
                            }
                            {
                                History.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    let a={}
                                    for(let i of props.experiments)
                                    {
                                        if(i["Experiment Name"] === exp)
                                        {
                                            a=i;
                                            break;
                                        }
                                    }
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <Bulma_component onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} UserData={{
                                                exp_name: a["Experiment Name"],
                                                collage: a["Institute Name"],
                                                exp_link: a["Experiment URL"],
                                                exp_img: a["Image"],
                                                collage_img: a["Image"],
                                                card_content: a["Description"],
                                                rating: '4.5',
                                                modal_content: a["Description"],
                                                modal_img: a["Image"],
                                                
                                                domain: a["Discipline Name"],
                                                lab: a["Lab Name"],
                                                saved: false
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
