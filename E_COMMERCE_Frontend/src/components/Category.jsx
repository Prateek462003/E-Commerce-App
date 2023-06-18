import React from 'react'
import CategoryItem from './CategoryItem'
import { categories } from '../data'
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
`
const Category = () => {
  return (
    <Container>
        {categories.map((item)=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Category