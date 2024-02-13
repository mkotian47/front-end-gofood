import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// require("dotenv").config()


const Home = () => {
  const [foodCat, setFoodCat] = useState([]); //Using array as initial value because we are going to send array from backend
  // Agar dot map use karna hai toh array lagta hai
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch]  = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption " style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x500/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x500/?grilled" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x500/?friedrice" className="d-block w-100" style={{filter:"brightness(30%)"}}alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
      <div className="container">
        {foodCat && foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className="row mx-auto">
                {data.CategoryName}
                <hr />
                {foodItem && foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-4 col-xl-3 ">
                          <Card foodItem = {filterItems}
                          options = {filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>no item</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Hi</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
