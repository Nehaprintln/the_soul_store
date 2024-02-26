const checkProductStatusInWishlist = async (id, setIsInWishlist)=> {
        // const {id} = props;
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

  const handleAddToCart = async (id, selectValue, selectedSize,navigate)=> {
    if(selectValue && selectedSize){
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
          navigate('/signup')
          console.log('CartPatch Data ==')
          return;
        }
  
          // const updatedCartData = await response.json();
          // setCartData(prevCardData => [...prevCardData, updatedCartData]);
          // setIsAdd(!isAdd);==============================================================
          // console.log('updatedCard', updatedCartData);
          // console.log('add New cardDat==',cartData);
  
        // dispatch({type: 'ADD_TO_CART', payload: updatedCartData});
        // console.log('Add button click')
        }catch(error){
          console.log('Error CartItem==', error)
        }
    }else{
      alert('Please Select Size and quantity')
    }
    
  };

  const handleWishlistProduct = async (id, setIsInWishlist, value)=> {
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

  export  {checkProductStatusInWishlist, handleAddToCart, handleWishlistProduct};