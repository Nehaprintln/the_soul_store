import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Men.css';
import { HoverCategory } from './Categories';
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";



export default function MenSelectCategories() {
    const [isFixed, setIsFixed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log('MenSelectCategories Render')
    console.log('isMenuOpen', isMenuOpen)


    const toggleMenu = () =>{
        console.log('menuToggle')
        setIsMenuOpen(!isMenuOpen);
    }

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
    <>
    {/* <div className={`select-categories ${isMenuOpen ? 'open' : ''}`}> */}
    <div className={`men-categories ${isFixed ? ' fixed' : ''}`}>
        <div id='div'></div>
        <div className={`select-categories ${isMenuOpen ? ' open' : ''}`} >
            <ul className='categorirs-list'>
                <li className='menu-item'>
                    <Link className='select'>CATEGORIES</Link>
                    <div className='dropdown-content'>
                        <HoverCategory />
                    </div>
                </li>
                <li>
                    <Link className='select'>TOPWEAR</Link>
                </li>
                <li>
                    <Link className='select'>BOTTOMWEAR</Link>
                </li>
                <li>
                    <Link className='select'>UNISEX</Link>
                </li>
            </ul>
        </div>
        <div className='menu-humburger' onClick={toggleMenu}>
            <TiThMenu />
        </div>
        <div className='menu-cross' onClick={toggleMenu}>
            <RxCross2 />
        </div>
        <div id='div'></div>
    </div>
    </>
  )
}
