import React, {useState, useEffect} from 'react'
import  './modal.css'
import QuantitySelect from '../ProductDisplay/QuantitySelect'
import SizeSelect from '../ProductDisplay/SizeSelect';
import Button from '../CommonLayout/Button/Button';
import { handleAddToCart } from '../WishList/wishlistData';
import Swal from "sweetalert2";



export default function Modal(props) {
    // {modalProduct && <Modal modalProduct={modalProduct} closeModal={() => setModalProduct(null)} />}

    const {modalProductId, closeModal} = props;
    const [selectValue, setSelectValue] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [modalProduct, setModalProduct] = useState();
    // const [isMoveToCart, setIsMoveToCart] = useState(false);
    console.log('modalProductId PRODUCT==>',modalProductId)
    console.log('MODAL PRODUCT==>',modalProduct)

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value)
        setSelectValue(value);
    };
      console.log(selectValue);
    
    const handleSizeChange = (event) => {
        console.log("event happend");
        setSelectedSize(event.target.value);
        console.log("event",event.target.value);
    };

    const handleMoveToCart = async (modalId, selectValue, selectedSize) => {
        if(selectValue && selectedSize){
            try{
              const userRegister = localStorage.getItem("authToken");
              console.log('userRegisterAuth==> ',userRegister)
              const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${modalId}`,{
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
        }else{
          Swal.fire({
            text: "Please Select Size and quantity",
          });
        }
        removeFromWishlist(modalId);
        closeModal();
        // setIsMoveToCart(!isMoveToCart)
    };

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
    }


    useEffect(() => {
        async function fetchProductDetails() {
          try {
            const response = await fetch(
              `https://academics.newtonschool.co/api/v1/ecommerce/product/${modalProductId}`,
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
            //   navigate('/pageNotFound')
            }
    
            const result = await response.json();
            setModalProduct(result.data);
          } catch (error) {
            // alert(error);
            // navigate('/pageNotFound')
          }
        }
    
        fetchProductDetails();
       
    }, [modalProductId]);
    

  return (
    <>
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='imgTextClose' style={{display: 'flex', gap: '20px'}}>
                    <div>
                        <img src={modalProduct?.displayImage} />
                    </div>
                    <div style={{whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",}}>
                        {modalProduct?.name}
                        <p>
                    ₹ {modalProduct?.price}
                    </p>
                    </div>
                    <div style={{paddingLeft: '90px', cursor: 'pointer'}}>
                        <div onClick={closeModal}>X</div>
                    </div>
                </div>
                <hr />
            <SizeSelect className="size-chart" productDetails={modalProduct} handleSizeChange={handleSizeChange} selectedSize={selectedSize} />
            <QuantitySelect className="quantity-container" text="Quantity" handleQuantityChange={handleQuantityChange} selectValue={selectValue} />
            <Button className="modalAddCart" text='ADD TO CARD' onClick={()=> handleMoveToCart(modalProduct?._id, selectValue, selectedSize)} />
            
            </div>
        </div>
    </>
  )
}
