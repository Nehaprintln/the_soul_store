import React from 'react'
import './Header.css';
import logo from '../Image/logo_SouledStore.png';
import { NavLink, Link} from 'react-router-dom';
import { FaMobileAlt,FaSearch, FaRegUser} from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";

export default function Header() {

  return (
    <div className='header-container'>
        <Link to='/'>
            <img src={logo} className='img' />
        </Link>
        <div className='nav-section'>
            <ul className='categories position'>
                <li>
                    <NavLink to='/women' activeClassName='active remove' id='women'>WOMEN</NavLink>
                </li>
                <li>
                    <NavLink to='/men' activeClassName='active' id='men'>MEN</NavLink>
                </li>
            </ul>
        </div>
        <div className='tracking-section'>
            <ul className='tracking position'>
                <li>
                    <Link className='textDecoration'>TRACK ORDER</Link>
                </li>
                <li>
                    <Link className='textDecoration'>CONTACT US</Link>
                </li>
                <li>
                    <Link className='textDecoration'><FaMobileAlt /> DOWNLOAD APP</Link>
                </li>
            </ul>
        </div>
        <div className='icon-section'>
            <ul className='icon-style'>
                <li>
                    <input type='text' id='input' />
                </li>
                <li>
                    <Link className='icon-text'><FaSearch /></Link>
                </li>
                <li>
                    <Link to='/signup' className='icon-text'><FaRegUser /></Link>
                </li>
                <li>
                    <Link className='icon-text'><MdFavoriteBorder /></Link>
                </li>
                <li>
                    <Link className='icon-text'><LuBaggageClaim /></Link>
                </li>
            </ul>
        </div>
    </div>
  )
};

