import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Men.css';
import HoverCategory from './HoverCategory';

export default function MenSelectCategories({categories}) {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleHover = ()=> {
    setDropdownVisible(true);
  };
  const handleLeave = ()=> {
    setDropdownVisible(false);
  }

  return (
    <>
    <div className='men-categories'>
        <div></div>
        <div className='select-categories'>
            <ul className='categorirs-list'>
                <li className='menu-item' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                    <Link className='select'>WINTERWEAR'24
                    {/* {isDropdownVisible && (
                        <HoverCategory className='dropdown-content' /> 
                    )} */}
                    {/* <HoverCategory categories={categories} /> */}
                    </Link>

                    
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
                <li>
                    <Link className='select'>SHOES & ACCESSORIES</Link>
                </li>
                <li>
                    <Link className='select'>SHOP BY THEAMS</Link>
                </li>
            </ul>
        </div>
        <div id='div'></div>
    </div>
    {/* <HoverCategory categories={categories} /> */}
     {/* <HoverCategory className='hover-select' /> */}
    </>
  )
}
