import React from "react";
import { useState, useEffect } from "react";
import BottomWear from "./bottomwear/BottomWear"
import { Link } from "react-router-dom";
import ShowCategaries from "../ShowCategaries/ShowCategaries";



function HoverCategory() {

  const [categories, setCategories] = useState([]);
  useEffect(() => {
      async function CategoryData() {
          try {
              const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories', {
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
              console.log(result);
              console.log(result.data);
              setCategories(result.data); // Update state with fetched data
          } catch (error) {
              alert(error);
          } 
      }
  
      CategoryData();
  }, []);

return (
  <> 
  <ul>
      { categories.map((category, index)=> (
            <li key={index} ><Link className="hover">{category}</Link></li>
      ))
      }
  </ul>     
  </>
)
};





export {
  HoverCategory
}
// export default Categories