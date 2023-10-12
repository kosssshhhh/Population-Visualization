import {Outlet} from "react-router-dom";
import Header from "../component/Header";

const Layout = () => {
  return (
      <>
        <Header/>
        <Outlet/>
      </>
  )
}

export default Layout;