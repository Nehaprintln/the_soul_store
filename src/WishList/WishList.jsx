import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import { RotatingLines } from "react-loader-spinner";
import Button from "../CommonLayout/Button/Button";
import Modal from '../Modal/Modal';
import { fetchWishlistResponse, removeFromWishlist } from "../APIData/fetchAPI";

// TODO: ==> React reconciliation <=== TODO:
export default function WishList() {
  const [wishlistDataDisplay, setWishlistDataDisplay] = useState([]);
 const [modalProductId, setModalProductId] = useState(null);

  const wishlistData = async () => {
    try {
      const { data } = await fetchWishlistResponse();
      const wishListData = data.items;

      console.log("whishlist product ALL DATA ==>", wishListData);

      setWishlistDataDisplay(wishListData);
      localStorage.setItem('wishlistLength', wishListData.length.toString());
    } catch (error) {
      console.log("WISHLIST Display ++>", error);
    }
  };

  const moveTocart = (modalId) => {
    setModalProductId(modalId);
  };

  const handleRemoveFromWishlist = async (productId) => {
    try{
      await removeFromWishlist(productId);
       // Remove the item from the display list without fetching the entire wishlist again
      setWishlistDataDisplay((prevWishlistData) => prevWishlistData.filter(item => item?.products?._id !== productId))
      }catch(error){
      console.log("Error removing from wishlist:", error);
    }
  }


  useEffect(() => {
    wishlistData();
  }, [modalProductId]);



  return (
    <>
      {/* <Header /> */}
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
        <div style={{width: '100%', padding: '20px'}}>
          <div style={{margin: 'auto', width: '75%'}}>
            <h6>My Wishlist <span>({wishlistDataDisplay.length} items )</span></h6>
          </div>
            <ul style={{width: '80%', margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
            {wishlistDataDisplay.map((wishlistData)=> (
                <li style={{width: '20%', border: '1px solid grey', position: 'relative'}}>
                    <div>
                        <div onClick={() => handleRemoveFromWishlist(wishlistData?.products?._id)}
                        style={{position: 'absolute', left: '87%', top: '2%', background: 'rgba(255, 255, 255, 0.8)', width: '10%', textAlign: 'center', borderRadius: '10px', cursor: 'pointer'}}>
                          X
                        </div>
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
                   <Button className="moveToCart" text="MOVE TO CART" onClick={() => {moveTocart(wishlistData?.products?._id)}} />
                   {modalProductId && <Modal modalProductId={modalProductId} closeModal={() => setModalProductId(null)} />}
                   {/* <div onClick={() => navigate('/modal')}>s</div> */}
                </li>
            ))}
            </ul>
        </div>
        </>
      )}
    </>
  );
}
