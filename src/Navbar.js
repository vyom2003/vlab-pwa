import React from 'react'
import logo from './vlab-logo.png';
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar is-hidden-desktop" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src={logo} width="100" height="50"/>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>{
                        if(document.getElementById("navbarBasicExample").className.includes("is-active"))
                        {
                            document.getElementById("navbarBasicExample").className="navbar-menu"
                        }
                        else{
                            document.getElementById("navbarBasicExample").className="navbar-menu is-active"
                        }
                    }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                        <AiFillStar />Popular
                        </a>

                        <a className="navbar-item">
                        <RxCounterClockwiseClock />Recents
                        </a>
                        <a className="navbar-item">
                        <AiFillExperiment />All Experiments
                        </a>
                        <a className="navbar-item">
                        <BsFillBookmarkStarFill />Starred
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
