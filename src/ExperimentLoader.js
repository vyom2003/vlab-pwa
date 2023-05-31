import React from 'react'
import { Bulma_component } from 'yatharth-super-lemon'
export default function ExperimentLoader(props) {


    return (
        <div className='columns is-multiline is-mobile'>
            
            {
                props.experiments.map((exp) => {
                    return (
                        <>
                            <div className='column is-one-quarter-desktop'>
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
                                    tags: ["tag1"],
                                    domain: exp["Discipline Name"],
                                    lab: exp["Lab Name"],
                                    saved: true
                                }} />
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}
