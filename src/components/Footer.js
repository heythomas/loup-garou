import React from 'react'
import styled from "styled-components";

const FooterPage = styled.footer`
  width: 100%;
  padding: 20px;
  color: white !important;
  margin-top:10px;
  background-color: ${props => props.theme.normal};
`
FooterPage.defaultProps = {
  theme: {
    normal: "#4b7bec",
    v2: "#45aaf2"
  }
}

const Footer = () => {
    return (
        <FooterPage className="foot">
          Fièrement propulsé par en Algol68 !
        </FooterPage>
    )
  }

export default Footer