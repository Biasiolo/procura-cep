// src/globalStyles.ts
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
  }

  #root {
    margin: 0 auto;
    padding: 20px;
    max-width: 100vw;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`

export default GlobalStyle
