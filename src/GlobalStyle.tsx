import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: var(--text-light);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0 20px;

    /* Background colors */
    --background-light: #f9f9f9;
    --background-dark: #333;
    --overlay-color: rgba(0, 0, 0, 0.3);

    /* Text colors */
    --text-primary: #222;
    --text-secondary: #555;
    --text-light: #fff;
    --link-color: #007bff;
    --primary-blue: #3498db;
    --primary-blue-dark: #2980b9;
    --neutral-gray-blue: rgb(90, 101, 124);

    /* Border and shadow */
    --border-color: #ddd;
    --shadow-light: rgba(0, 0, 0, 0.1);

    /* Button and Input focus colors */
    --input-focus-shadow: rgba(0, 0, 0, 0.2);

    /* Error color */
    --error-color: #d9534f;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--background-light);
    color: var(--text-primary);
  }

  a {
    font-weight: 500;
    color: var(--link-color);
    text-decoration: inherit;
  }

  a:hover {
    color: var(--primary-blue-dark);
    text-decoration: none;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--background-dark);
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: var(--link-color);
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: var(--text-primary);
    }

    a:hover {
      color: var(--primary-blue-dark);
    }

    button {
      background-color: var(--background-light);
    }
  }

  .header {
    font-size: 3rem;
    color: var(--neutral-gray-blue);
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-top: 40px;
    margin-bottom: 20px;
    text-transform: uppercase;
    position: relative;
  }

  .header::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--primary-blue);
    margin: 8px auto 0;
    border-radius: 2px;
  }

  .header:hover::after {
    width: 120px;
    transition: width 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .header {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .header {
      font-size: 2rem;
    }
  }
`;