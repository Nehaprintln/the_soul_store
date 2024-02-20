import React, {useState, useEffect} from 'react'
import { useSearch } from '../Context/GlobleContext'
import Header from "../Header/Header";
import "../FilterComponent/FilterData";
import { RotatingLines } from "react-loader-spinner";
import { FaRegHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
// import { useParams } from 'react-router-dom';


export default function SearchProduct() {
    // const {fetchProducts, setFetchProducts} = useSearch();
    // console.log('fetchdata', fetchProducts);
    const [selectSortValue, setSelectSortValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const { query } = useParams();
   

    const searchAPI = async ()=> {
      try {
          const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}`, {
          method: 'GET',
          headers: {
              // 'Content-Type': 'application/json',
              projectID: 'rhxg8aczyt09'
          }
          });
  
          if (!response.ok) {
          alert('Failed to fetch data');
          }
  
          const result = await response.json();
          console.log('SEARCH +>result',result);
          console.log('SEARCH=>resultData',result.data);
          setSearchData(result.data); // Update state with fetched data
      } catch (error) {
          alert(error);
      } 
  };

    const handleSortChange = (event)=> {
      setSelectSortValue(event.target.value);
    }

    // Fetch data from localStorage on component mount

  useEffect(() => {
    // const storedData = localStorage.getItem('fetchProducts');
    // if (storedData) {
    //   setFetchProducts(JSON.parse(storedData));
    // }
    searchAPI();
  }, [query]);

  // Update localStorage whenever fetchProducts changes
  // useEffect(() => {
  //   localStorage.setItem('fetchProducts', JSON.stringify(fetchProducts));
  // }, [fetchProducts]);

    // console.log('fetchData', fetchProducts)
    return (
      <>
        <Header />
        {/* <MenSelectCategories /> */}
        {searchData.length === 0 ? (
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
                    <select value={selectSortValue} onChange={handleSortChange}>
                      <option value="">Select Sorting Option</option>
                      <option value="hightolow">Price-High to Low</option>
                      <option value="lowtohigh">Price-Low to High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* left site */}
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
              {/* rigth Site */}
              <div className="div-sorting1">
                {/*Array.isArray(fetchProducts) &&*/searchData.map((searchProduct) => (
                  <div
                    style={{
                      width: "24%",
                      padding: "10px",
                      position: "relative",
                    }}
                  >
                    <FaRegHeart
                      style={{
                        position: "absolute",
                        left: "93%",
                        top: "5%",
                        fontSize: "22px",
                        color: "white",
                        background: "lightgray",
                        borderRadius: "40%",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    />
                    <Link
                      to={`/filterProducts/${searchProduct.subCategory}/${searchProduct.gender}/${searchProduct._id}`}
                      key={searchProduct._id}
                    >
                      <img
                        src={searchProduct.displayImage}
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
                      {searchProduct.name}
                    </div>
                    <span>{searchProduct.gender} </span>
                    <span> {searchProduct.subCategory}</span>
                    <div>₹ {searchProduct.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
}
