import {Outlet} from "react-router-dom";
import HeaderComponent from "../component/common/header/Header.component";

const Layout = () => {
  return (
      <>
        <HeaderComponent/>
        <Outlet/>
      </>
  )
}

export default Layout;