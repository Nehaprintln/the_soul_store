import React, { Children } from 'react'
import './OuterMargin.css';


function OuterMargin(props) {
    let {className} = props;
    console.log('OUTER laypot', className)
  return (
    <div className={className} > 
        {props.children}
    </div>
  )
}

export {OuterMargin}