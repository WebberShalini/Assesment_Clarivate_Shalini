import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App1 from "./App1/App1";
import App2 from "./App2/App2";
import "./styles/App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="main-container">
          <header className="header">Header</header>
          <div className="layout">
            <aside className="sidebar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/app1">App 1</Link>
                </li>
                <li>
                  <Link to="/app2">App 2</Link>
                </li>
              </ul>
            </aside>
            <main className="content">
              <Routes>
                <Route path="/" element={<h2>Welcome to the Main App</h2>} />
                <Route path="/app1/*" element={<App1 />} />
                <Route path="/app2" element={<App2 />} />
              </Routes>
            </main>
          </div>
          <footer className="footer">Footer</footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
