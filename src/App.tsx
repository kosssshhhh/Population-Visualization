import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import useFetchData from './hooks/useFetchData';


function App() {
  const [loadingState, population] = useFetchData('/csv/data3.csv');

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<MainPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
