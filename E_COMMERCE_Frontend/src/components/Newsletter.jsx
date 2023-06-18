import React from 'react'
import styled from "styled-components"
import SendIcon from '@mui/icons-material/Send';
const Container = styled.div`
    background-color:  #fcf5f5;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-weight: bold;
    font-size: 70px;
    margin: 20px;
`

const Desc = styled.p`
    font-size: 30px;
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    height: 40px;
    background-color: white;
    border: 1px solid lightgray;
    margin-top: 10px;
`
const Input  = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`
const Button = styled.button`
    border: none;
    background-color: teal;
    color: white;
    flex:1;
    cursor: pointer;
    /* padding-left: 20px; */
`
const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favourite products.</Desc>
        <SearchContainer>
            <Input placeholder='Enter Your Email'></Input>
            <Button>
                <SendIcon />
            </Button>        
        </SearchContainer>
    </Container>
  )
}

export default Newsletter