import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import posterImg from "./FilterAPIData";
import "./FilterData.css";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FilterData() {
  const { subCategory } = useParams();
  const [page, setPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectSortValue, setSelectSortValue] = useState("");
  const [wishlistStatus, setWishlistStatus] = useState({});

  const navigate = useNavigate();

  const handleSortChange = (event) => {
    setSelectSortValue(event.target.value);
  };

  const handleWishList = (productId) => {
    setWishlistStatus((prevStatus) => {
      return { ...prevStatus, [productId]: !prevStatus[productId] };
    });
  };

  async function fetchFilterProducts() {
    console.log('page==> ', page);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"Men","subCategory":"${subCategory}"}&limit=20&page=${page}`,
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
          },
        }
      );

      if (!response.ok) {
        navigate("/commingSoon");
      }

      const result = await response.json();
      setFilterProducts((prevProducts) => [...prevProducts, ...result.data]);
    } catch (error) {
      console.log("FilterData ERROR==>", error);
    }
  }

  useEffect(() => {
    fetchFilterProducts();
    console.log('pageCall', page);

    // const handleScroll = () => {
    //   if (
    //     window.innerHeight + document.documentElement.scrollTop ===
    //     document.documentElement.offsetHeight
    //   ) {
    //     setPage((prevPage) => prevPage + 1);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [page]);

  return (
    <>
      <Header />
      <MenSelectCategories />
      <div style={{ width: "99%", overflow: "hidden", margin: "auto" }}>
        {posterImg
          .filter((image) => subCategory === image.name)
          .map((filteredImage, index) => (
            <img
              key={index}
              src={filteredImage.img}
              style={{ width: "100%", objectFit: "cover" }}
              alt={filteredImage.name}
            />
          ))}
      </div>
      {filterProducts.length < 1 ? (
        <div className="loader" style={{width: '100%', textAlign:'center', marginTop: '30px'}}>
          <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
        
      ) : (
        <div className="top-filter-comtainer" style={{ padding: "0 20px" }}>
          <div className="filter-container">
            <div
              className="sorting-container"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div className="div-sorting">
                <div className="sorting">
                  <select
                    value={selectSortValue}
                    onChange={handleSortChange}
                  >
                    <option value="">Select Sorting Option</option>
                    <option value="hightolow">Price-High to Low</option>
                    <option value="lowtohigh">Price-Low to High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              style={{
                border: "1px solid brown",
                width: "21%",
                padding: "10px",
              }}
            >
              <div>
                <div>SIZE</div>
              </div>
            </div>
            <div className="div-sorting1">
              {filterProducts.map((filterProduct) => (
                <div
                  key={filterProduct._id}
                  style={{
                    width: "24%",
                    padding: "10px",
                    position: "relative",
                  }}
                >
                  {wishlistStatus[filterProduct._id] ? (
                    <FaHeart
                      onClick={() => handleWishList(filterProduct._id)}
                      style={{
                        width: '10%',
                        height: '25px',
                        position: "absolute",
                        left: "90%",
                        top: "5%",
                        fontSize: "22px",
                        color: "#117a7a",
                        // background: '#fff',
                        borderRadius: "10px",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => handleWishList(filterProduct._id)}
                      style={{
                        width: '10%',
                        height: '25px',
                        position: "absolute",
                        left: "90%",
                        top: "5%",
                        fontSize: "22px",
                        color: "white",
                        background: "lightgray",
                        borderRadius: "10px",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    />
                  )}
                  <Link
                    to={`/filterProducts/${filterProduct.subCategory}/${filterProduct._id}`}
                  >
                    <img
                      src={filterProduct.displayImage}
                      style={{ width: "275px" }}
                    />
                  </Link>
                  <div
                    style={{
                      borderBottom: "0.5px solid gray",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {filterProduct.name}
                  </div>
                  <span>{filterProduct.gender} </span>
                  <span> {filterProduct.subCategory}</span>
                  <div>₹ {filterProduct.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{width: '100%',height: '100px', display: 'flex', alignItems: 'center'}}>
          <button onClick={()=> setPage(prevpage => prevpage + 1)} style={{alignContent: 'center', margin: 'auto', padding: '10px'}}> view more </button>

          </div>
        </div>
      )}
    </>
  );
}
