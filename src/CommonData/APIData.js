import React, {useState, useEffect} from "react";
import MenSelectCategories from "../MenData/MenSelectCategories";

// const baseURL = 'https://academics.newtonschool.co';
// const clothCategoryURL = '/api/v1/ecommerce/clothes/categories';
// const projectId = 'f104bi07c490';




export default function HoverCategory({baseURL, clothCategoryURL, projectId}) {

    const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        async function CategoryData() {
            try {
                const response = await fetch(`${baseURL}${clothCategoryURL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    projectId: projectId
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
        <MenSelectCategories categories={categories} />
    </>
  )
}
  
