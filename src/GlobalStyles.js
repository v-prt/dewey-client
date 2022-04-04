import { createGlobalStyle } from 'styled-components/macro'

export const colors = {
  dark: '#1a1a1a',
  light: '#fff',
  yellow: '#f6d365',
  pink: '#f5576c',
  blue: '#5ee7df',
}

export const backgrounds = {
  yellow: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  blue: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
  grey: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
}

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        letter-spacing: 1px;
    }
    html, body {
        font-family: 'Roboto', sans-serif;
        color: #222;
        font-size: 14px;
    }
    h1, h2, h3 {
        margin: 0;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    p {
        margin: 0;
    }
    a {
        transition: 0.1s ease-in-out;
        color: ${colors.pink};
        &:hover, &:focus {
            color: #000;
        }
    }
    .ant-btn {
        transition: 0.1s ease-in-out;
        text-shadow: none;
        box-shadow: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        border-radius: 0;
    }
    .ant-btn-primary {
        background: #fff;
        border: 1px solid #fff;
        color: #f5576c;
        &:hover, &:focus {
            background: #000;
            border: 1px solid #000;
            color: #fff;
        }
        &.color {
            background: #f5576c;
            border: 1px solid #f5576c;
            color: #fff;
            &:hover, &:focus {
                background: #000;
                border: 1px solid #000;
            }
        }
    }
    .ant-btn-secondary {
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
        &:hover, &:focus {
            background: transparent;
            border: 1px solid #000;
            color: #000;
        }
    }
    .ant-btn-loading {
        pointer-events: none;
    }
    .ant-input, .ant-input-affix-wrapper {
        border-radius: 0;
    }
`
