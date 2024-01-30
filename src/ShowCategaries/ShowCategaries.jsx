 import BottomWear from "../MenData/bottomwear/BottomWear"
 
 function ShowCategaries (){
    return(
        <>
            {
    BottomWear.bottom.map((val, index) => {
      console.log('hello',val.img)
      return (
          <div className="bottomBoxWear" >
    
            <img className="bottomWear" src={val.img} />
            <div className="sideBorderBox">
              <div className="sideBorder"></div>
              <p className="bottoWearText">{val.name}</p>
            </div>
          </div>
          
      )
    })
  } 
        </>
    )
  
 
  
};



export default ShowCategaries