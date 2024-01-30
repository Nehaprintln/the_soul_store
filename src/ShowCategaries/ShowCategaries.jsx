import BottomWear from "../MenData/bottomwear/BottomWear";

function ShowCategaries() {
  return (
    <>
    <div className="categories-container" style={{textAlign: 'center', marginTop: '30px'}}>
    <h2>CATEGORIES</h2>
    <div className="categories-card">
      {BottomWear.bottom.map((val, index) => {
        // console.log("hello", val.img);
        return (
          <div className="card-transition-div">
            <img key={index} className="categories-img card-transition" src={val.img} 
            style={{
            'width': index < 3 ? '470px' : '350px',
            'height': index < 3 ? '470px' : '350px',
          }} />
            {/* <div className="sideBorderBox">
              <div className="sideBorder"></div>
              <p className="bottoWearText">{val.name}</p>
            </div> */}
          </div>     
        );
      })}
      </div>
      </div>
    </>
  );
}

export default ShowCategaries;
