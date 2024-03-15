// TODO: cartProductData done==**
const cartProductData = async () => {
    try {
      const userRegister = localStorage.getItem("authToken");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
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
        console.log("CartPatch Data ==");
        return;
      }

      // const updatedCartData = await response.json();
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  // DONE****
// ==========================
// TODO: removeFromCart DONE==***
const removeFromCart = async (productId) => {
  try {
    const userRegister = localStorage.getItem("authToken");
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          projectID: "rhxg8aczyt09",
          Authorization: `Bearer ${userRegister}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("CartPatch Data ==");
      return;
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};
// DONE==***

// =================
const addToCart = async (id, selectValue, selectedSize)=> {
    try{
      const userRegister = localStorage.getItem("authToken");
      console.log('userRegisterAuth==> ',userRegister)
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,{
        method: 'PATCH',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'quantity': selectValue,
           'size': selectedSize,
        })
      });

      if(!response.ok){
        console.log('CartPatch Data ==')
        return;
      }     

      }catch(error){
        console.log('Error CartItem==', error)
      }  
};

//   =======================================
// TODO: wishlist Product=====
// DONE ****
  const fetchWishlistResponse = async () => {
    try{
      const userRegister = localStorage.getItem('authToken');
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
        method: 'GET',
        headers: {
          projectID: "rhxg8aczyt09",
          Authorization: `Bearer ${userRegister}`,
          "Content-Type": "application/json",
        }
      });

      if(!response.ok){
        console.log('WISHLIST DATA =>  ERROR')
      }

      return await response.json();
      
    }catch(error){

    }
  };
// ********

// TODO: DELET WISHLIST
const wishlistDelet = async (filterProduct) => {
  try{
    const userRegister = localStorage.getItem("authToken");
      // If the product is already in the wishlist, remove it
      const removeFromWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${filterProduct._id}`, {
        method: 'DELETE',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
        },
      });

      if(!removeFromWishlist.ok){
        console.error('Failed to remove product from wishlist');
        return;
      }
      console.log('=====REMOVE========')
      // setIsInWishlist(false);
      filterProduct.isWishlist = false;
    
      // ===***\\\\\\\\\\\

      // If the product is not in the wishlist, add it
  }catch(error){
    console.log('WISHLIST ERROR', error)
  }
  
};

// TODO:WishlistDelet
const removeFromWishlist = async (modalId) => {
  const userRegister = localStorage.getItem("authToken");
try{
  // If the product is already in the wishlist, remove it
  const removeFromWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${modalId}`, {
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

  }catch(error){
      console.log('ERROR MODAL', error);
  }
};
// DONE*************

// TODO: wishlistAdd
const wishlistAdd = async (filterProduct) => {
  try{
    const userRegister = localStorage.getItem("authToken");
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
  }catch(error){
    console.log('WISHLIST ERROR', error)
  }
  
}
// DONE**

// TODO: indivisualProductDetails
async function fetchProductDetails(id) {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
      {
        method: "GET",
        headers: {
          projectID: "rhxg8aczyt09",
        },
      }
    );

    if (!response.ok) {
      // alert("Failed to fetch data");
      console.log('Failed')
    }

    return await response.json();
  } catch (error) {
    // alert(error);
    // navigate('/pageNotFound')
    console.log(error);
  }
};
// DONE**

//   =================================
// const handleMoveToWishlist = async (productId) => {
//     try{
//       const userRegister = localStorage.getItem('authToken');

//       const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist/', {
//         method: 'PATCH',
//         headers: {
//           projectID: "rhxg8aczyt09",
//             Authorization: `Bearer ${userRegister}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           "productId": productId
//         })
//       });

//       handleRemoveFromCart(productId);
//     }catch(error){

//     }
//   };

//   ==============================================
// const fetchWishlistProduct = async()=> {
//     try {
//       const userRegister = localStorage.getItem("authToken");
//       const response = await fetch(
//         'https://academics.newtonschool.co/api/v1/ecommerce/wishlist',
//         {
//           method: "GET",
//           headers: {
//             projectID: "rhxg8aczyt09",
//             Authorization: `Bearer ${userRegister}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         // navigate("/commingSoon");
//         // console.log('WISHLIST STORE ID ARRAY ERROR')
//       }

//       const result = await response.json();
//       // console.log('WISHLIST STORE ID ARRAY =>', result)
//       const wishlistData = result?.data?.items;
//       setWishlistProduct(wishlistData.map(item => item?.products?._id));
      
//     } catch (error) {
//       // console.log("FilterData ERROR==>", error);
//     }
//   };

//   ===================================
// const addToWishlist = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist/', {
//     method: 'PATCH',
//   headers: {
//     projectID: "rhxg8aczyt09",
//     'Authorization': `Bearer ${userRegister}`,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     'productId': filterProduct._id,
//   }),
//   });


  export {fetchWishlistResponse, wishlistDelet, wishlistAdd, fetchProductDetails, addToCart, removeFromWishlist, cartProductData, removeFromCart}