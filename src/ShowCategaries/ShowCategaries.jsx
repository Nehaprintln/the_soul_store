import MensWear from "../MenData/MensWear/MensWear";
import { Link } from "react-router-dom";
import {OuterMargin} from '../CommonLayout/OuterMargin/OuterMargin';
import { Children } from "react";

function ShowCategaries() {
  return (
    <>
      <OuterMargin  
        className="outer-container" 
      >
        <div className="categories-card">
          {MensWear.cloth.map((val, index) => {
            console.log("hello======", val.name);
            return (
              <div className="card-transition-div" style={{borderRadius: '8px',}}>
                <Link to={`/filterProducts/${val.name}/${val.gender}`} key={index}>
                  <img
                    className="categories-img card-transition"
                    src={val.img}
                    style={{
                      width: index < 3 ? "470px" : "350px",
                      height: index < 3 ? "470px" : "350px",
                      borderRadius: '8px',marginBottom: '7px' 
                    }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </OuterMargin>
    </>
  );
}
// <Link to=`/${val.name}`  ></Link> "/val.name"=> categories name
export default ShowCategaries;
