import "./FilterData.css";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import posterImg from "./FilterAPIData";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OuterMargin } from "../CommonLayout/OuterMargin/OuterMargin";
import Button from "../CommonLayout/Button/Button";
// import { useSearchParams } from "react-router-dom";


export default function FilterData() {
  const { subCategory, gender } = useParams();
  const [page, setPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [selectSortValue, setSelectSortValue] = useState(null);
  const [selectedFilterSize, setSelectedFilterSize] = useState(null);
  const navigate = useNavigate();
  const filterSize = ['S', 'M', 'L', 'X', 'XL', 'XXL'];


  //TODO: make pagination prev page
   

console.log('FILTER PRODUCT==>',filterProducts)
  const handleSortChange = (event) => {
    setSelectSortValue(event.target.value);
    console.log("123==>event SORTING LOW TO HIGH",event.target.value);
  };

  const handleFilterSizeChange = (event) => {
    // console.log("event happend");
    setSelectedFilterSize(event.target.value);
    console.log("event",event.target.value);
  };

  // const lowToHigh = async () => {
  //   try{
  //     const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"price":1}&filter={"gender":"${gender}","subCategory":"${subCategory}"}&limit=20&page=1`, {
  //         method: "GET",
  //         headers: {
  //           projectID: "rhxg8aczyt09",
  //         },
  //     }
  //     )
      
  //     if(!response.ok){
  //       console.log('FIX SORTING URL');
  //     }

  //     const result = await response.json();
  //     const sortedData = result.data.sort((a, b) => a.price - b.price);
  //     setFilterProducts(sortedData);
  //   }
  //   catch(error){
  //     console.log('SORTING ERROR', error);
  //   }
  // };

  // const highToLow = async () => {
  //   try{
  //     const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"price":-1}&filter={"gender":"${gender}","subCategory":"${subCategory}"}&limit=20&page=1`, {
  //       method: "GET",
  //       headers: {
  //         projectID: "rhxg8aczyt09",
  //       },
  //     });
      
  //     if(!response.ok){
  //       console.log('FIX SORTING URL');
  //     }

  //     const result = await response.json();
  //     const sortedData = result.data.sort((a, b) => b.price - a.price);
  //     setFilterProducts(sortedData);
  //   }
  //   catch(error){
  //     console.log('SORTING ERROR', error);
  //   }
  // }

  // console.log('filterProduct ==>', filterProducts);
  // console.log('WISHLIST ARRAT ID ==>', wishlistProduct);

  
   const fetchFilterProducts = async ()=> {
    console.log('page==> ', page);
    try {

      let sortAPIValue = null;

      if(selectSortValue){
        if(selectSortValue === 'lowtohigh'){
          sortAPIValue = `{"price": 1}`;
        }else{
          sortAPIValue = `{"price": -1}`
        }
      }

      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"${gender}","subCategory":"${subCategory}"${
          selectedFilterSize ? `,"size":"${selectedFilterSize}"` : ""
        }}&${sortAPIValue ? `sort=${sortAPIValue}` : ""}
        &limit=20&page=${page}`,
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
          },
        }
      );

      if (!response.ok) {
        navigate("/comingSoon");
      }

      const result = await response.json();
      // console.log('RESPONCE  FILTERPRODUCT RESULT =>', result)
      const filterProductResponse = result.data;
      filterProductResponse.forEach((product) => {
        if(wishlistProduct.includes(product._id)){
          product.isWishlist = true;
         }else{
          product.isWishlist = false;
         }
      })
      setFilterProducts(filterProductResponse);
      // setFilterProducts((prevProducts) => [...prevProducts, ...result.data]);
      
    } catch (error) {
      // console.log("FilterData ERROR==>", error);
    }
  };

  const fetchWishlistProduct = async()=> {
    try {
      const userRegister = localStorage.getItem("authToken");
      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/ecommerce/wishlist',
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
            Authorization: `Bearer ${userRegister}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // navigate("/commingSoon");
        // console.log('WISHLIST STORE ID ARRAY ERROR')
      }

      const result = await response.json();
      // console.log('WISHLIST STORE ID ARRAY =>', result)
      const wishlistData = result?.data?.items;
      setWishlistProduct(wishlistData.map(item => item?.products?._id));
      
    } catch (error) {
      // console.log("FilterData ERROR==>", error);
    }
  };

  // const isItemInWishlist = (filterProduct) => {
     
  // };

  const handleWishlistToggle = async (filterProduct) => {
    // console.log('WISHLIST PRODUCT=> ', filterProduct)
    // console.log('WISHLIST PRODUCT=> ', filterProduct._id)
    const userRegister = localStorage.getItem("authToken");
    try{
      if(filterProduct.isWishlist){
        // If the product is already in the wishlist, remove it
        const removeFromWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${filterProduct._id}`, {
          method: 'DELETE',
          headers: {
            projectID: "rhxg8aczyt09",
            'Authorization': `Bearer ${userRegister}`,
          },
        });

        if(!removeFromWishlist.ok){
          // navigate('/signup');
          console.error('Failed to remove product from wishlist');
          return;
        }
        console.log('=====REMOVE========')
        // setIsInWishlist(false);
        filterProduct.isWishlist = false;
        setWishlistProduct(wishlistProduct.filter((id) => id !== filterProduct._id))
      
    }else{
        // If the product is not in the wishlist, add it
        const addToWishlist = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist/', {
          method: 'PATCH',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'productId': filterProduct._id,
        }),
        });

        if(!addToWishlist.ok){
          // navigate('/signup');
        console.log('Failed to add product to wishlist');
        return;
        }
        console.log('=============')
        filterProduct.isWishlist = true;
        setWishlistProduct([...wishlistProduct, filterProduct._id]);
      }
    }catch(error){
      console.log('WISHLIST ERROR', error)
    }
    
  }


  useEffect(() => {
    
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
    fetchWishlistProduct();
    fetchFilterProducts();
   
    if(selectSortValue === 'lowtohigh'){
      const sortedData = filterProducts.sort((a,b) => a.price - b.price)
      setFilterProducts(sortedData);
    }else{
      const sortedData = filterProducts.sort((a,b) => b.price - a.price)
      setFilterProducts(sortedData);
    }
    console.log('pageCall', page);

  }, [page, selectSortValue, selectedFilterSize]);

  


  return (
    <>
      <Header />
      <MenSelectCategories />
      <OuterMargin className='outer-container'>
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
      </OuterMargin>
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
                borderRight: "1px dotted #58595b",
                width: "21%",
                padding: "10px",
              }}
            >
              <div>
                <div style={{textAlign: 'center'}}>SIZE</div>
                <div className="size-chartFilter">
            <ul>
              {filterSize.map((size) => (
                <li>
                  <input
                    type="radio"
                    id={`size${size}`}
                    name="size"
                    value={size}
                    onChange={handleFilterSizeChange}
                    checked={selectedFilterSize === size}
                  />
                  <label
                    style={{
                      border: 
                        selectedFilterSize === size
                          ? "2px solid #117a7a"
                          : "2px solid #b3b3b3",
                    }}
                  >
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>
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
                  <Button className="wishListfil" text='' onClick={()=> handleWishlistToggle(filterProduct)}>
                    {filterProduct.isWishlist ? <FaHeart  style={{color:'#117a7a'}} /> : <FaRegHeart style={{color:'#117a7a'}} />}
                    </Button>
                  <Link
                    to={`/filterProducts/${filterProduct.subCategory}/${filterProduct.gender}/${filterProduct._id}`}
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
          <div style={{width: '20%',height: '100px',margin: 'auto', display: 'flex', alignItems: 'center', border: '2px solid green', justifyContent: 'space-evenly'}}>
          <button onClick={() => setPage((prevPage) => prevPage >= 1 ? page - 1 : 1)} style={{alignContent: 'center', padding: '7px', width: '100px', border: '1px solid gray', borderRadius: '10px'}}>Previous</button>
          <button onClick={()=> setPage(prevpage => prevpage + 1)} style={{alignContent: 'center', padding: '7px', width: '100px', border: '1px solid gray', borderRadius: '10px'}}> Next  </button>

          </div>
        </div>
      )}
    </>
  );
}



 // const lowToHigh = async () => {
  //   try{
  //     const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"price":1}&filter={"gender":"${gender}","subCategory":"${subCategory}"}&limit=20&page=1`, {
  //         method: "GET",
  //         headers: {
  //           projectID: "rhxg8aczyt09",
  //         },
  //     }
  //     )
      
  //     if(!response.ok){
  //       console.log('FIX SORTING URL');
  //     }

  //     const result = await response.json();
  //     const sortedData = result.data.sort((a, b) => a.price - b.price);
  //     setFilterProducts(sortedData);
  //   }
  //   catch(error){
  //     console.log('SORTING ERROR', error);
  //   }
  // };

  // const highToLow = async () => {
  //   try{
  //     const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"price":-1}&filter={"gender":"${gender}","subCategory":"${subCategory}"}&limit=20&page=1`, {
  //       method: "GET",
  //       headers: {
  //         projectID: "rhxg8aczyt09",
  //       },
  //     });
      
  //     if(!response.ok){
  //       console.log('FIX SORTING URL');
  //     }

  //     const result = await response.json();
  //     const sortedData = result.data.sort((a, b) => b.price - a.price);
  //     setFilterProducts(sortedData);
  //   }
  //   catch(error){
  //     console.log('SORTING ERROR', error);
  //   }
  // }

  // console.log('filterProduct ==>', filterProducts);
  // console.log('WISHLIST ARRAT ID ==>', wishlistProduct);