import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";

function App() {
  return (
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<MainPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
