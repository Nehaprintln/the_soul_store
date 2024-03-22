import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Men from './MenData/Men';
import Women from './WomenData/Women';
import Footer from './Footer/Footer';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import SearchProduct from './Search/SearchProduct';
import { SearchProvide, WishlistProvider } from './Context/GlobleContext';
import FilterData from './FilterComponent/FilterData';
import ProductDetails from './ProductDisplay/ProductDetails';
import CommingSoonProduct from './CommingSoon/CommingSoonProduct';
import WishList from './WishList/WishList';
import Cart from './Cart/Cart';
import Modal from './Modal/Modal';
import DeliveryAddress from './Checkout/DeliveryAddress';
import Address from './Checkout/Address';
import ScrollToTop from './ScrollToTop/ScrollTotop';

function App() {
  // const [cartItemCounts, setCartItemCounts] = useState();

 

  return (
    <>
    
    <SearchProvide>
      {/* <CardProvider> */}
        {/* <WishlistProvider> */}
    <Router>
        <ScrollToTop />
        <Header />
      <Routes> 
        <Route path='/' element={<Navigate to='/men' />} /> 
        <Route path='/women' element={<Women />} />
        <Route path='/men'  element={<Men />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        {/* <Route path='/search/:query/:gender' element={<FilterData />} /> */}
        <Route path='/filterProducts/:subCategory/:gender' element={<FilterData />} /> {/* DO HERE CHANGES */}
        <Route path='/filterProducts/:subCategory/:gender/:id' element={<ProductDetails />} />
        <Route path='/pageNotFound' element={<h1>Page not found</h1>} />
        <Route path='/comingSoon' element={<CommingSoonProduct />} />
        <Route path='/mywishlist' element={<WishList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/modal' element={<Modal />} />
        <Route path='/delivery-address' element={<DeliveryAddress />} />
        <Route path='/address' element={<Address />} />
      </Routes>
    </Router>
    {/* {`/search/${gender}/${searchInput}`} */}
    <Footer />
        {/* </WishlistProvider> */}
    {/* </CardProvider> */}
    </SearchProvide>
    </>

    // <>
    //   <Home />
    //   <Navigation />
    // </>
  );
}

export default App;
