import React from 'react'
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  margin: 3px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.normal};
  transition:border 2s;
  &:hover {
    border: 2px solid ${props => props.theme.v2};
  }
`

Input.defaultProps = {
  theme: {
    normal: "#4b7bec",
    v2: "#45aaf2"
  }
}

export default Input