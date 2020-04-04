import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';

const HeaderPage = styled.header`
  width: 100%;
  padding: 20px;
  color: white !important;
  margin-bottom:10px;
  background-color: ${props => props.theme.normal};
`
HeaderPage.defaultProps = {
  theme: {
    normal: "#4b7bec",
    v2: "#45aaf2"
  }
}

const Header = () => {
    return (
        <HeaderPage className="head">
          <img src="https://i.pinimg.com/originals/12/c3/39/12c3398c5534a0e35e7a6db288c48d5a.png" className="img_head" /><span>Loup-garou en ligne !</span>
        </HeaderPage>
    )
  }

export default Header