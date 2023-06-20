import React from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from "../components/Announcement"
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
const Container= styled.div`

`
const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight:bold;
    margin-right:20px;   
`

const Select  = styled.select`
  padding :10px ;
  margin-right: 20px;
`
const Option = styled.option`
`
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilter({
        ...filter,
        [e.target.name]:value,
    });
  }
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option>
                        Color
                    </Option>
                    <Option >white</Option>
                    <Option >black</Option>
                    <Option >red</Option>
                    <Option >blue</Option>
                    <Option >yellow</Option>
                    <Option >green</Option>    
                </Select>
                <Select>
                    <Option name="size" onChange={handleFilters}>
                        Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e)=>setSort(e.target.value)}>
                    <Option value = "newest">newest</Option>
                    <Option value = "asc">Price(asc)</Option>
                    <Option value = "desc">Price(desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat = {cat} filter = {filter} sort = {sort}/>
        <Newsletter />
    </Container>
  )
}

export default ProductList