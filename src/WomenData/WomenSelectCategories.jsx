import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../MenData/Men.css';
import { HoverCategory } from '../MenData/Categories';
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function WomenSelectCategories() {
    const [isFixed, setIsFixed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToasterWo = ()=> {
        // toast.info('Under Construction 🚧', {
        //     position: "top-center",
        //     autoClose: 1500,
        //     style: {
        //         backgroundColor: '#333',
        //         color: '#fff',
        //         fontSize: '14px',
        //         borderRadius: '8px',
        //         // padding: '10px',
        //       },
        //   });
          Swal.fire({
            // title: "Congratulations !",
            text: "'Under Construction 🚧'",
            showConfirmButton: false, 
            timer: 1500
            // icon: "info"
          });
          
    }
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
                
                <li onClick={handleToasterWo}>
                    <Link className='select'>ACCESSORIES</Link>
                </li>
                <li onClick={handleToasterWo} >
                    <Link className='select'>NEW ARRIVALS</Link>
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
    {/* <ToastContainer  /> */}

    </>
  )
}
