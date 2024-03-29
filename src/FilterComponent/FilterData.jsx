import React, { useEffect, useState } from "react";
import "./FilterData.css";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import {menposterImg, womenposterImg} from "./FilterAPIData";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { OuterMargin } from "../CommonLayout/OuterMargin/OuterMargin";
import Button from "../CommonLayout/Button/Button";
import SizeChart from "./SizeChart";
import SortValue from "./SortValue";
import Themes from "./Themes";
import { fetchWishlistResponse,wishlistDelet, wishlistAdd } from "../APIData/fetchAPI";
import { Category } from "@mui/icons-material";



export default function FilterData() {
  const { subCategory, gender } = useParams();
  const [category, setCategory] = useState(subCategory);
  console.log('subCategory Testing==>  ',subCategory, category)
  if(category != subCategory){
    setCategory(subCategory);
  }
  // setCategory(subCategory);
  console.log({category})
  const [page, setPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [selectSortValue, setSelectSortValue] = useState(null);
  const [selectedFilterSize, setSelectedFilterSize] = useState(null);
  const [themes, setThemes] = useState(null);

  const navigate = useNavigate();

  console.log(themes, 'THEME SINGLE VALUE');
  // console.log(isChecked, "123456");
  
  // const [genders, setGender] = useState(localStorage.getItem('gender'));

  // const history = useHistory();
  // const history = useHistory();


   

console.log('WISHLIST PRODUCT==>',wishlistProduct)


  const handleSortChange = (event) => {
    setSelectSortValue(event.target.value);
    localStorage.setItem("selectSortValue",event.target.value);
    console.log("123==>event SORTING LOW TO HIGH",event.target.value);
  };

  const handleFilterSizeChange = (event) => {
    setSelectedFilterSize(event.target.value);
    localStorage.setItem("selectedFilterSize", event.target.value);
    console.log("event",event.target.value);
  };

  const handleThemeChecked = (event) => {
    const themeValue = event.target.value;
    console.log(themeValue, "VALUE CHECKED THEMES");
      setThemes(themeValue);
  };

  
   const fetchFilterProducts = async (wishlistProduct)=> {
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
      // {,"size":"X","brand":"Bewakoof American Pima"}

      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"${gender}","subCategory":"${category}"${
          selectedFilterSize ? `,"size":"${selectedFilterSize}"` : ""
        }${themes ? `,"brand":"${themes}"` : ""}}&${sortAPIValue ? `sort=${sortAPIValue}` : ""}
        &limit=20&page=${page}`,
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
          },
        }
      );

      if (!response.ok) {
        navigate('/comingSoon');
      }

      const result = await response.json();
      const filterProductResponse = result.data;
      console.log('category insite API call ==>',category);
      console.log("filterProductResponse ==> ",filterProductResponse)
    
      filterProductResponse.forEach((product) => {
        if(wishlistProduct.includes(product._id)){
          product.isWishlist = true;
         }else{
          product.isWishlist = false;
         }
      })

      return filterProductResponse
      
    } catch (error) {
      console.log("FilterData ERROR==>", error);
    }
  };

// TODO: here work==
  const fetchWishlistProduct = async()=> {
    try {
      const result = await fetchWishlistResponse();
      const wishlistData = await result?.data?.items;
      return wishlistData.map(item => item?.products?._id)

    //  setWishlistProduct(wishlistIds);
      
    } catch (error) {
      console.log("FilterData ERROR==>", error);
    }
  };
  // TODO: done above


// TODO: work here==
  const handleWishlistToggle = async (filterProduct) => {
    console.log('Toggle work')
    try{
      if(filterProduct.isWishlist){
        await wishlistDelet(filterProduct);
        setWishlistProduct(wishlistProduct.filter((id) => id !== filterProduct._id))
      
    }else{
        await wishlistAdd(filterProduct);
        setWishlistProduct([...wishlistProduct, filterProduct._id]);
      }
    }catch(error){
      console.log('WISHLIST ERROR', error)
    }
    
  };

  
  // TODO: DONE==

// TODO: 1) how useEffect work
// TODO: 2) when call method within useEffect, not work with global value or variable
// TODO: 3) all concept of useEffect mount etc. what happend when page mount and flow of code
// TODO: 4) why not use within useState variable within function

  useEffect(() => {
    console.log('StRAT PAGE OF FILTERDATA')
    const storedFilterSize = localStorage.getItem("selectedFilterSize");
    const storedSortValue = localStorage.getItem("selectSortValue");

    if (storedFilterSize) {
      setSelectedFilterSize(storedFilterSize);
   }
   if (storedSortValue) {
      setSelectSortValue(storedSortValue);
    }
    
    if(selectSortValue === 'lowtohigh'){
      const sortedData = filterProducts.sort((a,b) => a.price - b.price)
      setFilterProducts(sortedData);
    }else{
      const sortedData = filterProducts.sort((a,b) => b.price - a.price)
      setFilterProducts(sortedData);
    }
    console.log('pageCall', page);
    
    async function fetch2 (){
      const wishlist2 = await fetchWishlistProduct();
     const reponse2 = await fetchFilterProducts(wishlist2);
     setWishlistProduct(wishlist2);
     setFilterProducts(reponse2);
    }
    console.log('FilerData Entery Exit', category);
    
    fetch2();
    
  }, [page, selectSortValue, selectedFilterSize, themes, category]);

  console.log('Outesite UseEffeect');
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      {/* <Header /> */}
      <MenSelectCategories />
      <OuterMargin className='outer-container'>
        {(gender === 'Men' ? menposterImg : womenposterImg)
          .filter((image) => subCategory === image.name)
          .map((filteredImage, index) => (
            <img
              key={index}
              src={filteredImage.img}
              style={{ width: "100%", objectFit: "cover", height: '350px' }}
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
          <SortValue handleSortChange={handleSortChange} selectSortValue={selectSortValue} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="div-size">
              <SizeChart handleFilterSizeChange={handleFilterSizeChange} selectedFilterSize={selectedFilterSize} />
              <Themes handleThemeChecked={handleThemeChecked}  />
            </div>
            <div className="div-sorting1">
              {filterProducts.map((filterProduct) => (
                <div className="filter-display-card"
                  key={filterProduct._id}
                 
                >
                  <Button className="wishListfil" text='' onClick={()=> handleWishlistToggle(filterProduct)}>
                    {filterProduct.isWishlist ? <FaHeart  style={{color:'#117a7a'}} /> : <FaRegHeart style={{color:'#117a7a'}} />}
                    </Button>
                  <Link
                    to={`/filterProducts/${filterProduct.subCategory}/${filterProduct.gender}/${filterProduct._id}`}
                  >
                    <img
                      src={filterProduct.displayImage}
                      style={{ width: "100%" }}
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
          <div style={{width: '20%',height: '100px',margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          {/* <button onClick={() => setPage((prevPage) => prevPage >= 1 ? page - 1 : 1)} style={{alignContent: 'center', padding: '7px', width: '100px', border: '1px solid gray', borderRadius: '10px'}}>Previous</button> */}
          {/* <button onClick={()=> setPage(prevpage => prevpage + 1)} style={{alignContent: 'center', padding: '7px', width: '100px', border: '1px solid gray', borderRadius: '10px'}}> Next  </button> */}
          <Button className="viewMore" text="View more" onClick={()=> setPage(prevpage => prevpage + 1)} />
          </div>
        </div>
      )}
    </>
  );
}


