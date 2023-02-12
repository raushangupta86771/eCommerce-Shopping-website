import React from 'react'
import InHome from './InHome'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getAllProducts } from '../../../actions/ProductActions';
import axios from 'axios';
import "./Home-Center.css"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Spinner from '../../Spinner/Spinner';


const HomeCenter = () => {
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const url = "http://localhost:5000/getallproduct";


  const [searchedInitial, setSearchedInit] = useState([]);
  const [note, setNote] = useState({ searchItem: "" });


  // Our States
  const [value, setValue] = React.useState([2, 100]);
  const [spinner, setSpinner] = React.useState(true);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };


  useEffect(() => {
    // console.log(`${url}/${value[0]}/${value[1]}`)
    // console.log(localStorage.getItem('userId'))
    try {
      axios({
        method: "get",
        url: `${url}/${value[0]}/${value[1]}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setSpinner(false);
        setProducts(res.data);
      })
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }

    console.log(products)
    // dispatch(getAllProducts(products));

  }, value)

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    let url2 = "http://localhost:5000/product"
    try {
      const response = await axios({
        method: "get",
        url: `${url2}/search/${note.searchItem}`,
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
      <div className="home-main">
        <div className="search-and-slider">
          <div>
            <form className="d-flex my-3" role="search">
              <div className="search-maintain">
                <input className="me-2 search-input search-assignee" type="search" name='searchItem' value={note.searchItem || ''} onChange={onchange} placeholder={!note.searchItem ? "Search product" : ''} aria-label="Search" />
                <i onClick={handleSearch} className='seach-icon-adjust fa fa-search'></i>
              </div>
              {/* <button className="button" type="submit" onClick={handleSearch} ></button> */}
            </form>
          </div>

          <div className="container-fluid right-shift-slider">
            <div className=""><div style={{
              margin: 'auto',
              display: 'block',
              width: 'fit-content'
            }}>
              <div>
                <Typography id="range-slider" gutterBottom className='slider-actual'>
                  Select Price Range
                </Typography>
                <Slider
                  min={0}
                  max={600}
                  value={value}
                  onChange={rangeSelector}
                  valueLabelDisplay="auto"
                />
              </div>

              {/* Price is between {value[0]} /- and {value[1]} /- */}
            </div>
            </div>
          </div>
        </div>
        {
          spinner ? <Spinner /> :
            <div className='row'>
              <div className='col-12 mx-auto'>
                <div className="row ad-bg">

                  {
                    !flag && searchedInitial.map((pro) => {
                      return <InHome product={pro} key={pro._id} />
                    })
                  }

                  {//agar flag true hai to total products show karenge
                    flag && products.map((pro) => {
                      return <InHome product={pro} key={pro._id} />
                    })
                  }

                </div>
              </div>
            </div>
        }
      </div>
    </>
  )
}

export default HomeCenter