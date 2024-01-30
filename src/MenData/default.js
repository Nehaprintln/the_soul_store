import React, {useState, useEffect} from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import sweater from '../Image/Sweater.avif';
import hoodies from '../Image/hoodies.webp';
import jackets from '../Image/jacket.webp';
import jeans from '../Image/jeans.jpg';
import jogger from '../Image/jogger.jpeg';
import shirts from '../Image/shirt.webp';
import shorts from '../Image/shorts.jpg';
import tshirt from '../Image/tshirt.webp';
import kurta from '../Image/kurta.webp';
import pyjamas from '../Image/pyjamas.webp';
import tracksuit from '../Image/tracksuit.webp';
import trouser from '../Image/trouser.avif';


const baseURL = 'https://academics.newtonschool.co';
const clothCategoryURL = '/api/v1/ecommerce/clothes/categories';
const projectId = 'rhxg8aczyt09';




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
 

export default function Categories() {
  
  return (
    <div className="categories-container" style={{textAlign: 'center', marginTop: '30px'}}>
      <h2>CATEGORIES</h2>
      <div
        className="categories-card"
        >
        <Link>
          <div className="card-transition">
            <Card inverse>
              <CardImg 
                alt="Card image cap"
                src={sweater}
                style={{
                  height: 450,
                  width: 490,
                }}
                //   width="100%"
              />
              <CardImgOverlay>
                <CardTitle tag="h3" className="card-title">SWEATSHIRTS</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        </Link>
        <Link>
          <div className="card-transition">
            <Card inverse>
              <CardImg 
                alt="Card image cap"
                src={hoodies}
                style={{
                  height: 450,
                  width: 490,
                }}
                //   width="100%"
              />
              <CardImgOverlay>
                <CardTitle tag="h3" className="card-title">HOODIES</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        </Link>
        <Link>
          <div className="card-transition">
            <Card inverse>
              <CardImg 
                alt="Card image cap"
                src={jackets}
                style={{
                  height: 450,
                  width: 490,
                }}
                //   width="100%"
              />
              <CardImgOverlay>
                <CardTitle tag="h3" className="card-title">JACKETS</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={shirts}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">SHIRTS</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={shorts}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">SHORTS</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={jogger}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">JOGGER</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={tshirt}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">T-SHIRT</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={tracksuit}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">TRACKSUITS</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={kurta}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">KURTA</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={trouser}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">TROUSER</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
        <Link>
        <div className="card-transition">
          <Card inverse>
            <CardImg 
              alt="Card image cap"
              src={pyjamas}
              style={{
                height: 350,
                width: 350,
              }}
              //   width="100%"
            />
            <CardImgOverlay>
              <CardTitle tag="h3" className="card-title">PYJAMAS</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        </Link>
      </div>
    </div>
  );
}


export { HoverCategory }