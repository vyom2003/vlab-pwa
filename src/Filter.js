import React, { useState } from 'react'
import 'bulma/css/bulma.min.css';
import './sass/mystyles.css'
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
    React.useEffect(() => {
        let arr = []
        let arr_dis = []
        for (let i of props.experiments) {
            if (!arr.includes(i["Insitute Name"]))
                arr.push(i["Insitute Name"])
            if (!arr_dis.includes(i["Discipline Name"]))
                arr_dis.push(i["Discipline Name"])
        }
        setInstis(arr)
        setDiscipline(arr_dis)
        setDisplay(props.experiments)
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
                <div id="filter-set" className='column is-one-fifth is-hidden-mobile'>
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
                                                onClick={() => { ExcludeDis(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{element}</button>
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
                                                }}>{element}</button>
                                            <br />
                                        </>
                                    )
                            })
                        }
                    </div>
                </div>
                <div id="divider" className="is-divider-vertical is-hidden-mobile"></div>
                <div className='column'>

                    <button className='button is-primary ml-5 has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}><AiFillStar />Popular</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }}><RxCounterClockwiseClock />Recents</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black" }}><AiFillExperiment />All Experiments</button>

                    <button className='button is-primary has-text-black is-medium is-hidden-mobile is-hidden-tablet-only'
                        style={{ border: "2px solid black", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}><BsFillBookmarkStarFill />Starred</button>

                    <br className='is-hidden-mobile is-hidden-tablet-only'/>
                    <br className='is-hidden-mobile is-hidden-tablet-only'/>
                    <div className='columns is-multiline is-mobile'>
                        {
                            Display.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                return (
                                    <div className='column is-one-quarter-desktop' key={Math.random()}>
                                        <Bulma_component UserData={{
                                            exp_name: exp["Experiment Name"],
                                            collage: exp["Institute Name"],
                                            exp_link: exp["Experiment URL"],
                                            exp_img: exp["Image"],
                                            collage_img: exp["Image"],
                                            card_content: exp["Discipline Name"],
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
                    </div>
                </div>
            </div>
        </div>
    )
}
