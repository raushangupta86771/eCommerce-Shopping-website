import React from 'react'
import InHome from './InHome'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getAllProducts } from '../../../actions/ProductActions';
import axios from 'axios';
import "./Home-Center.css"

const HomeCenter = () => {
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const url = "http://localhost:5000/product";


  const [searchedInitial, setSearchedInit] = useState([]);
  const [note, setNote] = useState({ searchItem: "" });



  useEffect(() => {

    try {
      axios({
        method: "get",
        url: url,
      }).then((res) => {
        setProducts(res.data);
      })
    } catch (error) {
      console.log(error);
    }


    dispatch(getAllProducts(products));

  }, [])

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "get",
        url: `${url}/search/${note.searchItem}`,
        headers: { "Content-Type": "application/json" },
      }).then((d) => {
        if (d.data.data.length >= 1) {
          setFlag((prev) => !prev);
          setSearchedInit(d.data.data)
        }
        else {
          setSearchedInit([])
        }
        // console.log(d.data.data.length);
      }).
        catch((e) => {
          console.log(e);
        })
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <form className="d-flex my-3" role="search">
        <input className="form-control me-2" type="search" name='searchItem' value={note.searchItem} onChange={onchange} placeholder="Search product" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit" onClick={handleSearch} >Search</button>
      </form>

      <div className="container-fluid">
        <div className='row'>
          <div className='col-12 mx-auto'>
            <div className="row">

              {
                !flag && searchedInitial.map((pro) => {
                  return <InHome product={pro}  key={pro._id}/>
                }) 
              }

              {//agar flag true hai to total products show karenge
                flag && products.map((pro) => {
                  return <InHome product={pro}  key={pro._id}/>
                }) 
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeCenter