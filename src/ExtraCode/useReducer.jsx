import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import MenSelectCategories from '../MenData/MenSelectCategories'
import { useContext } from 'react'
// import { useCart } from '../Context/GlobleContext'

export default function WishList() {
    // const {state} = useCart(useContext);
    // const wishLists = state?.wishList;
    // console.log('WISHLIST PRODUCT',wishLists);

    const [wishlistDataDisplay, setWishlistDataDisplay] = useState([]);

    const checkProductStatusInWishlist = async ()=> {
        try{
          const userRegister = localStorage.getItem("authToken");
          console.log('userRegisterAuth==> ',userRegister)
    
          // Fetch the current wishlist
          const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
            method: 'GET',
            headers: {
              projectID: "rhxg8aczyt09",
              'Authorization': `Bearer ${userRegister}`,
            },
          });
    
          if(!response.ok){
            console.log('Failed to fetch wishlist');
            return;
          };
    
          const {data} = await response.json();
          const wishListData = data.items;
          console.log('whishlist product ALL DATA ==>', wishListData)

          setWishlistDataDisplay(wishListData)
    
        }catch(error){
          console.log('WISHLIST Display ++>', error);
        }
      };
    
      useEffect(()=> {
        checkProductStatusInWishlist();
      }, [])



    
  return (
    <>
        <Header />
        <MenSelectCategories />

        {/* <div style={{display: 'flex', padding: '20px'}}>
            {wishLists.map((list)=> (
                <div key={list.id} style={{width: '40%'}}>
                    <img src={list?.image} alt={list.name} style={{width: '50%'}} />
                    <p>{list.name}</p>
                    <p>{list.price}</p>
                </div>
            ))}
        </div> */}
    </>
  )
}
