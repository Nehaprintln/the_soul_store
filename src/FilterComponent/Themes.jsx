import React from 'react'
import Swal from 'sweetalert2'


export default function Themes({handleThemeChecked}) {
  const themes = ["OFFICIAL MARVEL MERCHANDISE", "Bewakoof®", "OFFICIAL TOM & JERRY MERCHANDISE", "BEWAKOOF X STREETWEAR", "Bewakoof American Pima"]
  
  const handleUnderConstuctor = ()=>{
    Swal.fire({
      // title: 'Under Construction',
      text: 'This feature is currently under construction. Please check back later.',
      icon: 'warning',
      showConfirmButton: false, // Set to false if you don't want to show the confirm button
      timer: 1000 
      // confirmButtonText: 'OK'
    });
  }
  return (
    <>
      <div style={{borderRight: "1px solid #717171", marginTop: '30px'}}>
        <h6>THEMES</h6>
        <div className="themes-filter">
          <div className='themes-container' >
            {themes.map((theme) => (
              <div className='themes-map'>
                <input type="radio" name="themes" value={theme}
                  // onChange={handleThemeChecked}
                  onClick={handleUnderConstuctor}
                />
                <label name="themes">
                  {theme}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
