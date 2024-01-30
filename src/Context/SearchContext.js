import React, { useContext } from "react";
import { createContext, useState } from "react";

const MyContext = createContext();


export const SearchProvide = ({children})=> {
    const [searchInput, setSearchInput] = useState('');
    const [fetchProducts, setFetchProducts] = useState({});
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
        <MyContext.Provider value={{handleSearchClick, searchInput, setSearchInput, fetchProducts}}>
            {children}
        </MyContext.Provider>
    )
};

 export const useSearch = ()=> {
    return useContext(MyContext);
    
 };






