import React, { useContext, useReducer } from "react";
import { createContext, useState } from "react";

const MySearchContext = createContext();
// const MyCartContext = createContext();
const MyWishlistContext = createContext();

// const initialState = {
//     cartItems: [],
//     wishList: []
// };


export const SearchProvide = ({children})=> {
    const [searchInput, setSearchInput] = useState('');
    const [fetchProducts, setFetchProducts] = useState({});
    const [ isAdd, setIsAdd] = useState(false);

    const handleSearchClick = async ()=> {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${searchInput}"}`, {
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
            console.log('result',result);
            console.log('resultData',result.data);
            setFetchProducts(result.data); // Update state with fetched data
        } catch (error) {
            alert(error);
        } 
    };
    return(    
        <MySearchContext.Provider value={{handleSearchClick, searchInput, setSearchInput, fetchProducts, setFetchProducts, setIsAdd, isAdd}}>
             {children}
        </MySearchContext.Provider>   
    )
};

// const cartReducer = (state, action)=> {
//     switch(action.type){
//         case 'ADD_TO_CART': 
//             return {...state, cartItems: [...state.cartItems, action.payload]};
//         case 'ADD_TO_WITSHLIST': 
//             return {...state, wishList: [...state.wishList, action.payload]};
        
//         default: 
//             return state;
//     }
// };

// export const CardProvider = ({children})=> {
//     const [state, dispatch] = useReducer(cartReducer, initialState);
//     console.log('count of ADDCART',state.cartItems[0])
//     console.log('count of WISHLISTCART',state.wishList[0])
//     return (
//         <MyCartContext.Provider value={{state, dispatch}}>
//             {children}
//         </MyCartContext.Provider>
//     )
// }


export const WishlistProvider = ({children})=> {

    const [isInWishlist, setIsInWishlist] = useState(false);

    const checkProductStatusInWishlist = async (id)=> {
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
    
          // Check if the product is already in the wishlist
          const isProductInWishlist = wishListData.find(item => item.products._id === id);
          console.log('whishlist product by ID ==>', isProductInWishlist, id)
          
    
          if(isProductInWishlist){
            setIsInWishlist(true);
            console.log('found WISHLIST ID DATA by GEt')
          }
    
        }catch(error){
          console.log('WISHLIST ERROR ++>', error);
        }
      };

      const handleWishlistProduct = async (value, id)=> {
        console.log('wish LIST mount ==ID==', id)
    
        try{
          const url = 'https://academics.newtonschool.co/api/v1/ecommerce/wishlist/';
          const userRegister = localStorage.getItem("authToken");
    
          if(value === 'remove'){
            // If the product is already in the wishlist, remove it
            const removeToWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`, {
              method: 'DELETE',
              headers: {
                projectID: "rhxg8aczyt09",
                'Authorization': `Bearer ${userRegister}`,
              },
            });
    
            if(!removeToWishlist.ok){
              // navigate('/signup');
              console.error('Failed to remove product from wishlist');
              return;
            }
            console.log('=====REMOVE========')
            setIsInWishlist(false);
          }
          
          else if(value === 'add'){
            // If the product is not in the wishlist, add it
            const addToWishlist = await fetch(url, {
              method: 'PATCH',
            headers: {
              projectID: "rhxg8aczyt09",
              'Authorization': `Bearer ${userRegister}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'productId': id,
            }),
            });
    
            if(!addToWishlist.ok){
              // navigate('/signup');
            console.error('Failed to add product to wishlist');
            return;
            }
            console.log('=============')
            setIsInWishlist(true);
          }
    
        }catch(error){
            console.log('Error handling wishlist:', error)
          }
    
      //       // dispatch({type: 'ADD_TO_CART', payload: updatedCartData});
      //     // console.log('Add button click')
       };


  return (
    <MyWishlistContext.Provider value={{checkProductStatusInWishlist, setIsInWishlist, isInWishlist, handleWishlistProduct}}>
        {children}
    </MyWishlistContext.Provider>
  )
}


 export const useSearch = ()=> {
    return useContext(MySearchContext);  
 };

 export const useWishlist = ()=> {
    return useContext(MyWishlistContext);
 }

//  export const useCart = ()=> {
//     return useContext(MyCartContext);
//  }






