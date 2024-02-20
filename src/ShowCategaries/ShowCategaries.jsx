import BottomWear from "../MenData/bottomwear/BottomWear";
import { Link } from "react-router-dom";
import {OuterMargin} from '../CommonLayout/OuterMargin/OuterMargin';
import { Children } from "react";

function ShowCategaries() {
  return (
    <>
      <OuterMargin  
        className="outer-container" 
      >
        <h2>CATEGORIES</h2>
        <div className="categories-card">
          {BottomWear.bottom.map((val, index) => {
            console.log("hello======", val.name);
            return (
              <div className="card-transition-div">
                <Link to={`/filterProducts/${val.name}/${val.gender}`} key={index}>
                  <img
                    className="categories-img card-transition"
                    src={val.img}
                    style={{
                      width: index < 3 ? "470px" : "350px",
                      height: index < 3 ? "470px" : "350px",
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
