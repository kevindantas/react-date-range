import { createGlobalStyle } from 'styled-components';

const tableHeadColor = '#3e484f';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(249, 250, 253);
    box-sizing: border-box;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #455A64;
  }

  pre, code {
    font-family: 'Fira Code', monospace;
  }

  pre {
    background: #233;
    color: #fff;
    padding: 2rem 1rem;
    border-radius: 7px;
    box-shadow: 1px 5px 10px rgba(0,0,0,.4);
  }

  body * {
    box-sizing: inherit;
  }

  .cf:before,
  .cf:after {
      content: " ";
      display: table;
  }

  .cf:after {
      clear: both;
  }

  table {
    border-collapse: collapse;

    thead {
      text-transform: capitalize;

      tr {
        border-bottom-width: 2px;
        border-color: ${tableHeadColor};
        color: ${tableHeadColor};
      }
    }

    tr {
      border-bottom: 1px solid #ccc;
    }

    td, th {
      padding: 1rem;
      text-align: left;
    }
  }

  .demo {
    background: #fafafa;
    text-align: center;
    padding: 0;
    border-radius: 7px;
    box-shadow: 1px 20px 20px rgba(41, 60, 74, 0.18);
    margin-bottom: 3rem;
    display: block;
    margin: 48px auto;
    box-sizing: border-box;
    > div {
      margin: auto;
    }
  }

  h2 {
    margin-top: 7rem;
  }
`;
