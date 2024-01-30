import React, {useState, useEffect} from 'react'
import './Header.css';
import logo from '../Image/logo_SouledStore.png';
import { NavLink, Link} from 'react-router-dom';
import { FaMobileAlt,FaSearch, FaRegUser} from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";
import SearchProduct from '../Search/SearchProduct';
import { useSearch } from '../Context/SearchContext';
// import { IoMdMic } from "react-icons/io";

export default function Header() {
    const {handleSearchClick, searchInput, setSearchInput} = useSearch();
    const [isFixed, setIsFixed] = useState(false);
    // const [searchInput, setSearchInput] = useState('');
    

    const handleSearchProduct = (event)=>{
        setSearchInput(event.target.value);
    };

    

    useEffect(()=> {
        const handleScroll = ()=> {
            const scrollPosition = window.scrollY;
            setIsFixed(scrollPosition >50);
        };
          // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className='header-container'>
        <Link to='/'>
            <img src={logo} className={`img ${isFixed ? ' imgfixed' : ''}`} />
        </Link>
        <div className='nav-section'>
            <ul className='categories position'>
                <li>
                    <NavLink to='/women' id='women'>WOMEN</NavLink>
                </li>
                <li>
                    <NavLink to='/men' id='men'>MEN</NavLink>
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
        <div className={`icon-section ${isFixed ? ' icon-sectionfixed' : ''}`}>
            <ul className='icon-style'>
                <li>
                    <input type='text' id='input' placeholder='what are you looking for ?' value={searchInput} onChange={handleSearchProduct} />
                </li>
                <li>
                    <Link to='/search' className='icon-text'><FaSearch onClick={handleSearchClick} /></Link>
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

