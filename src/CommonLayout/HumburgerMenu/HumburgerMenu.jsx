import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

export default function HumburgerMenu() {
    const [menu, setMenu] = useState(false);

    const handleMenu = () =>{
        setMenu(!menu);
    }

  return (
    <>
        <div className='humburger-menu' onClick={handleMenu}>  
            {menu ? <RxCross2 /> : <TiThMenu />}  
        </div>
    </>
  )
}
