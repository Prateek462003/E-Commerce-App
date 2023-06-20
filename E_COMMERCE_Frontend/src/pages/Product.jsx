import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethods'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'

const Container = styled.div``
const Wrapper = styled.div`
    /* height: 100vh; */
    padding: 50px;
    display: flex;
`

const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit:cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`

const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
font-weight: 100;
font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    align-items: center;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props)=>props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 10px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width:50% ;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    cursor: pointer;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    &:hover{
        background-color:#f8f4f4;
    }
`
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch;

  const handleClick = () =>{
    // addProdct and update the cart
    dispatch(addProduct({...product, amount, color, size}));  
  }
  const handleAmount=(type)=>{
    if(type === "remove"){
      amount > 1 && setAmount((prev)=>(
        prev - 1
      ))
    }else{
      setAmount((prev)=>(
        prev + 1
      ));
    }
  }
  useEffect( ()=>{
    const getProduct = async() =>{
      try{
        const res = await publicRequest.get("/product/find/" +id);
        setProduct(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getProduct();
  }, [id]);
  return (
    <Container>
    <Navbar />
    <Announcement />
    <Wrapper>
      <ImageContainer>
        <Image src={product.img} />
      </ImageContainer>
      <InfoContainer>
        <Title>{product.title}</Title>
        <Desc>
          {product.desc}
        </Desc>
        <Price>$ 20</Price>
        <FilterContainer>
          <Filter>
            <FilterTitle>Color</FilterTitle>
            {product.color.map((c)=>
              <FilterColor color = {c} onClick={()=>setColor(c)}/>
            )}
            
          </Filter>
          <Filter>
            <FilterTitle onChange={(e)=>setSize(e.target.value)}>Size</FilterTitle>
            <FilterSize>
              {product.size.map((s)=>
                <FilterSizeOption>{s}</FilterSizeOption>
              )}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <RemoveIcon onClick={handleAmount("remove")}/>
            <Amount>{amount}</Amount>
            <AddIcon onClick={handleAmount("add")}/>
          </AmountContainer>
          <Button onClick = {handleClick}>ADD TO CART</Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
    <Newsletter />
  </Container>
);
}

export default Product