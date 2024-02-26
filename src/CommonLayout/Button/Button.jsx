import React from 'react'
import './button.css';

export default function Button(props) {
    let {className, text, onClick} = props;
  return (
    <button className={className} onClick={onClick}>{props.children}{text}</button>
  )
}

