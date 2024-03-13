
import Swal from "sweetalert2";
import { fetchWishlistResponse,addToCart, wishlistDelet, wishlistAdd  } from "../APIData/fetchAPI";


// TODO: DONE  checkProductStatusInWishlist****
const checkProductStatusInWishlist = async (id, setIsInWishlist)=> {
    try{

      const {data} = await fetchWishlistResponse();
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

//   TODO: Done
const handleAddToCart = (id, selectValue, selectedSize)=> {
    if(selectValue && selectedSize){
        addToCart(id, selectValue, selectedSize);

        Swal.fire({
          title: "Congratulations !",
          text: "Your data added successfully !",
          icon: "success"
        });
    }else{
      Swal.fire({
        text: "Please Select Size and quantity",
        // position: "top-end", // You can use other positions like "top-start", "top", "top-end", "center", "center-start", "center-end", "bottom-start", "bottom", or "bottom-end"
        showConfirmButton: false, // Set to false if you don't want to show the confirm button
        timer: 1500 // Set a timer to automatically close the modal after a certain time (in milliseconds)
      });
      // Swal.fire("Please Select Size and quantity");
      // alert('Please Select Size and quantity')
    }
    
  };

// ======================


  const handleWishlistProduct = async (productDetails, setIsInWishlist, value)=> {
    // console.log('wish LIST mount ==ID==', id)

    try{
    //   const url = 'https://academics.newtonschool.co/api/v1/ecommerce/wishlist/';
    //   const userRegister = localStorage.getItem("authToken");

      if(value === 'remove'){
        // If the product is already in the wishlist, remove it
        await wishlistDelet(productDetails);
        setIsInWishlist(false);
        // Swal.fire("Product removed from your wishlist");
        Swal.fire({
          text: "Product removed from your wishlist",
          // position: "top-end", // You can use other positions like "top-start", "top", "top-end", "center", "center-start", "center-end", "bottom-start", "bottom", or "bottom-end"
          showConfirmButton: false, // Set to false if you don't want to show the confirm button
          timer: 1500 // Set a timer to automatically close the modal after a certain time (in milliseconds)
        });
      }
      
      else if(value === 'add'){
        // If the product is not in the wishlist, add it
        await wishlistAdd(productDetails)
        setIsInWishlist(true);
        Swal.fire({
          text: "Product added to your wishlist",
          // position: "top-end", // You can use other positions like "top-start", "top", "top-end", "center", "center-start", "center-end", "bottom-start", "bottom", or "bottom-end"
          showConfirmButton: false, // Set to false if you don't want to show the confirm button
          timer: 1500 // Set a timer to automatically close the modal after a certain time (in milliseconds)
        });
        // Swal.fire("Product added to your wishlist");
        
      }

    }catch(error){
        console.log('Error handling wishlist:', error)
      }

  //       // dispatch({type: 'ADD_TO_CART', payload: updatedCartData});
  //     // console.log('Add button click')
   };

  export  {checkProductStatusInWishlist, handleAddToCart, handleWishlistProduct};

