import "./style.css";
// import { setupCounter } from "./counter.js";


const renderApp = () => {
  document.querySelector('#app').innerHTML = `
  <div>
    Hello Vite
    <p>${new Date()}</p>
  </div>
`;
};

renderApp();
setInterval(renderApp, 5_000);

// setupCounter(document.querySelector('#counter'));
