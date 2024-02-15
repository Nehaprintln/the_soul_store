import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import { RotatingLines } from "react-loader-spinner";

export default function WishList() {
  const [wishlistDataDisplay, setWishlistDataDisplay] = useState([]);

  const checkProductStatusInWishlist = async () => {
    try {
      const userRegister = localStorage.getItem("authToken");
      console.log("userRegisterAuth==> ", userRegister);

      // Fetch the current wishlist
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
            Authorization: `Bearer ${userRegister}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch wishlist");
        return;
      }

      const { data } = await response.json();
      const wishListData = data.items;
      console.log("whishlist product ALL DATA ==>", wishListData);

      setWishlistDataDisplay(wishListData);
    } catch (error) {
      console.log("WISHLIST Display ++>", error);
    }
  };

  useEffect(() => {
    checkProductStatusInWishlist();
  }, []);

  return (
    <>
      <Header />
      <MenSelectCategories />
      
      {wishlistDataDisplay.length === 0 ? (
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
        <>
        <div style={{width: '100%'}}>
            <ul style={{width: '75%', margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {wishlistDataDisplay.map((wishlistData)=> (
                <li style={{width: '24%', border: '1px solid grey', position: 'relative'}}>
                    <div>
                        <div style={{position: 'absolute'}}>X</div>
                    </div>
                    <div>
                        <img src={wishlistData?.products?.displayImage} style={{width: '100%'}} />
                    </div>
                    <div style={{padding: '10px'}}>
                    <div style={{whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",}}>
                        {wishlistData?.products?.name}
                    </div>
                    <div>
                    ₹ {wishlistData?.products?.price}
                    </div>
                    </div>
                    <div style={{textAlign: 'center', borderTop: '1px solid grey', paddingTop: '10px'}}>
                        <p>MOVE TO CART</p>
                    </div>
                    
                </li>
            ))}
            </ul>
        </div>
        </>
      )}
    </>

  );
}
