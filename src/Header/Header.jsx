import React, {useState, useEffect} from 'react'
import './Header.css';
import logo from '../Image/logo_SouledStore.png';
import { NavLink, Link, Outlet} from 'react-router-dom';
import { FaMobileAlt,FaSearch, FaRegUser} from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";
import { useSearch } from '../Context/GlobleContext';
import { TbOvalFilled } from "react-icons/tb";
import Men from '../MenData/Men';


export default function Header() {
    const cartLenght = localStorage.getItem('cartLenght');
    const wishlistLength = localStorage.getItem('wishlistLength');
    console.log('cardList length ==>', cartLenght)
    
    const {handleSearchClick, searchInput, setSearchInput} = useSearch();
    const [isFixed, setIsFixed] = useState(false);
    const [gender, setGender] = useState('Men');
    const [isBlinking, setIsBlinking] = useState(false);
    // const {state} = useCart();
    // const [searchInput, setSearchInput] = useState('');
    
    // const addCartCount = state?.cartItems.length;
    // const wishListCount = state?.wishList.length;



    const handleSearchProduct = (event)=>{
        setSearchInput(event.target.value);
    console.log('Header search input  ==>', cartLenght)

    };

    const handleNavlinkClick = (event)=> {
        let gender = event.target.id;
        console.log('Navlink Click', event.target.id)
        // TODO: to store localstore
        localStorage.setItem("gender", gender);
    }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking(prevState => !prevState);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

    useEffect(() => {
		const selectedGender = localStorage.getItem('gender')
		if (selectedGender) {
			setGender(selectedGender)
		}
	}, [])

    useEffect(()=> {
    console.log('Header useeffect ==>', cartLenght)

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
         <div className='header-container'>
        <Link to='/'>
            <img src='https://www.thesouledstore.com/static/img/newlogo.8dcc6cc.png' className={`img ${isFixed ? ' imgfixed' : ''}`} />
            <div className={`blinkEye ${isFixed ? 'blinkEyeFixed' : ''} ${isBlinking ? 'blinkEyeClosed' : 'blinkEyeOpen'}`}>
            {/* <div className={`blinkEye ${isBlinking ? 'blinkEyeClosed ' : 'blinkEyeOpen'}`}> */}
                {/* {`blinkEye ${isFixed ? 'blinkEyeFixed' : ''} ${isBlinking ? 'blinkEyeClosed' : 'blinkEyeOpen'}`} */}
                <TbOvalFilled />
                <TbOvalFilled style={{width: '13px', height: '14px' }} />
            </div>
        </Link>
        <div className='nav-section'>
            <ul className='categories position'>
                 <li>
              <Link to='/women' id='Women'  className={
						gender === 'Women' ? 'active' : 'inActine'
					} onClick={handleNavlinkClick}>
                WOMEN
              </Link>
            </li>
            <li>
              <Link to='/men' id='Men' className={
						gender === 'Men' ? 'active' : 'inActine'
					} onClick={handleNavlinkClick}>
                MEN
              </Link>
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
                {/* '/filterProducts/:subCategory/:gender' */}
                <li>
                    <Link to={`/search/${searchInput}/${gender}`} className='icon-text'><FaSearch /*onClick={()=> handleSearchClick(searchInput)} */ /></Link>
                </li>
                <li>
                    <Link to='/signup' className='icon-text'><FaRegUser /></Link>
                </li>
                <li style={{position: 'relative'}}>
                    <Link to='/mywishlist' className='icon-text'>
                        <span style={{position: 'absolute', left: '15px', fontSize: '12px', background: 'red', color: '#fff', width: '20px', textAlign: 'center', borderRadius: '50%'}}>{wishlistLength}</span>
                         <MdFavoriteBorder  />
                    </Link>
                </li>
                <li style={{position: 'relative'}}>
                    <Link to='/cart' className='icon-text'>
                        <span style={{position: 'absolute', left: '15px', fontSize: '12px', background: 'red', color: '#fff', width: '20px', textAlign: 'center', borderRadius: '50%'}}>{cartLenght}</span>
                     <LuBaggageClaim  />
                        </Link>
                </li>
            </ul>
        </div>
    </div>
    {/* <Outlet /> */}
   {/* <Men /> */}
    </>
   
  )
};

