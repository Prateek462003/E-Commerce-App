import React from 'react'
import { styled } from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const Container = styled.div`
  height: 60px;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* justify-content: space-between; */

`
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: flex-end;
`
const Language = styled.span`
font-size: 14px;
  cursor: pointer;
  flex: 1;
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
  border: none;
  height: 20px;
  flex: 1;
`

const Logo = styled.h1`
  font-size: xx-large;
  font-weight: bold;
`
const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
`
const Navbar = () => {
  return (
    <div>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input></Input>
              <SearchIcon />
            </SearchContainer>
          </Left>
          <Center>
            <Logo>E-KART.COM</Logo>
          </Center>
          <Right>
            <MenuItem>REGISTER</MenuItem>
            <MenuItem>SIGN IN</MenuItem>
            <MenuItem>
              <Badge badgeContent={4} color='primary'>
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Navbar