import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import {useSelector} from "react-redux";
import {RootState} from "./redux/redux.type";
import Papa, {ParseResult} from 'papaparse';

const options = {
  headers: {
    'content-type': 'text/csv',
    //'Authorization': //in case you need authorisation
  }
};
function App() {
  const {httpInterface} = useSelector((state: RootState) => state.network);

  useEffect(() => {
    const response = httpInterface.getData().then(res => {
      console.log(res)
      Papa.parse(res.data, {
        complete(results: ParseResult<any>, file: any) {
          console.log(results.data)
        }
      })
    }).then(console.log);

    // fetch('http://localhost:3000/csv/data3.csv', options).then(res => {
    //
    //   // const fr = new FileReader();
    //   return res.text()
    //   // return res.text();
    //   // fr.readAsArrayBuffer();
    //   // Papa.parse(res.body, {
    //   //
    //   // })
    // }).then(res => {
    //   console.log(res)
    // });

  }, []);
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
