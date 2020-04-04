import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  color: white !important;
  text-decoration: none;
  padding: 8px;
  margin: 3px;
  border-radius: 5px;
  border:0px;
  cursor: pointer;
  background: ${props => props.theme.normal};
  transition:background 4s;
  &:hover {
    background: ${props => props.theme.onHover};
  }
`
Button.defaultProps = {
  theme: {
    normal: "#4b7bec",
    onHover: "#45aaf2"
  }
}

export default Button;