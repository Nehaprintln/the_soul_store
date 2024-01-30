import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Men.css';
import { HoverCategory } from './Categories';

export default function MenSelectCategories({categories}) {
    const [isFixed, setIsFixed] = useState(false);

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
    <div className={`men-categories ${isFixed ? ' fixed' : ''}`}>
        <div></div>
        <div className='select-categories'>
            <ul className='categorirs-list'>
                <li className='menu-item'>
                    <Link className='select'>CATEGORIES</Link>
                    <div className='dropdown-content'>
                        <HoverCategory categories={categories} />
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
    </>
  )
}
