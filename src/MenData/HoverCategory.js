import React from 'react'
import { Link } from 'react-router-dom'

export default function HoverCategory({categories}) {
  return (
    <>
        <ul className='sub-menu'>
            {categories.forEach((item)=>{
                <li>
                    <Link>{item}</Link>
                </li>
            })}  
        </ul>
    </>
  )
}
