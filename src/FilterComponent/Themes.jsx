import React from 'react'

export default function Themes({handleThemeChecked}) {
  const themes = ["OFFICIAL MARVEL MERCHANDISE", "Bewakoof®", "OFFICIAL TOM & JERRY MERCHANDISE", "BEWAKOOF X STREETWEAR", "Bewakoof American Pima"]
  
  return (
    <>
      <div style={{borderRight: "1px solid #717171", marginTop: '30px'}}>
        <h6>THEMES</h6>
        <div className="themes-filter">
          <div className='themes-container' >
            {themes.map((theme) => (
              <div className='themes-map'>
                <input type="checkbox" name="themes" value={theme}
                  onChange={handleThemeChecked}
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
