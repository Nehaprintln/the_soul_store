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
  const [selectSortValue, setSelectSortValue] = useState("");
  const [wishlistProduct, setWishlistProduct] = useState([]);
  // const [searchParam, setSeachParam] = useSearchParams();
  const navigate = useNavigate();

  // const sercg = setSeachParam({subCategory: 'jeans', size: 'XL'});
  // console.log('SEARCHPARAM==>',sercg);
 
  

console.log()
  const handleSortChange = (event) => {
    setSelectSortValue(event.target.value);
  };
  console.log('filterProduct ==>', filterProducts);
  console.log('WISHLIST ARRAT ID ==>', wishlistProduct);

   const fetchFilterProducts = async ()=> {
    console.log('page==> ', page);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"${gender}","subCategory":"${subCategory}"}&limit=20&page=${page}`,
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
      console.log('RESPONCE  FILTERPRODUCT RESULT =>', result)
      setFilterProducts((prevProducts) => [...prevProducts, ...result.data]);
      
    } catch (error) {
      console.log("FilterData ERROR==>", error);
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
        console.log('WISHLIST STORE ID ARRAY ERROR')
      }

      const result = await response.json();
      console.log('WISHLIST STORE ID ARRAY =>', result)
      const wishlistData = result?.data?.items;
      setWishlistProduct(wishlistData.map(item => item?.products?._id));
      
    } catch (error) {
      console.log("FilterData ERROR==>", error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlistProduct.includes(itemId);
  };

  const handleWishlistToggle = async (itemId) => {
    const userRegister = localStorage.getItem("authToken");
    try{
      if(isItemInWishlist(itemId)){
        // If the product is already in the wishlist, remove it
        const removeFromWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${itemId}`, {
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
        setWishlistProduct(wishlistProduct.filter((id) => id !== itemId))
      
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
          'productId': itemId,
        }),
        });

        if(!addToWishlist.ok){
          // navigate('/signup');
        console.error('Failed to add product to wishlist');
        return;
        }
        console.log('=============')
        setWishlistProduct([...wishlistProduct, itemId]);
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
    fetchFilterProducts();
    fetchWishlistProduct();
    
    console.log('pageCall', page);
  }, [page]);

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
                  <Button className="wishListfil" text='' onClick={()=> handleWishlistToggle(filterProduct._id)}>
                    {isItemInWishlist(filterProduct._id) ? <FaHeart  style={{color:'#117a7a'}} /> : <FaRegHeart style={{color:'#117a7a'}} />}
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
          <div style={{width: '100%',height: '100px', display: 'flex', alignItems: 'center'}}>
          <button onClick={()=> setPage(prevpage => prevpage + 1)} style={{alignContent: 'center', margin: 'auto', padding: '10px'}}> view more </button>

          </div>
        </div>
      )}
    </>
  );
}
