import BottomWear from "../MenData/bottomwear/BottomWear";
import { Link } from "react-router-dom";

function ShowCategaries() {
  return (
    <>
      <div
        className="categories-container"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        <h2>CATEGORIES</h2>
        <div className="categories-card">
          {BottomWear.bottom.map((val, index) => {
            console.log("hello======", val.name);
            return (
              <div className="card-transition-div">
                <Link to={`/filterProducts/${val.name}`} key={index}>
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
      </div>
    </>
  );
}
// <Link to=`/${val.name}`  ></Link> "/val.name"=> categories name
export default ShowCategaries;
