import React, { useState } from 'react';
import { Route ,Switch ,useLocation } from 'react-router-dom';

import  "./index.css";

import Blog from './components/Blog';
import FAQ from './components/FAQ';

import Contact from './components/Contact';
import Sidebar from './components/shared/Sidebar';
import Login from './components/Login';
import Subscriber from './components/Subscriber';
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/Route/ProtectedRoute';


const style={
  navbar: {
    gridArea: "topRight",
  },
  main: {
    gridArea: "bottomRight",
    height: "calc(100vh - 72px)",
    overflowY: "scroll",
    overflowX: "hidden",
    background: "rgb(244, 242, 242)",

  },
  login: {
    gridArea: "bottomRight",
    background: "rgb(244, 242, 242)",
    display: "inline-block",
    width: "100%",

  }
}


const App = () =>{

  const [isOpen,setOpen] = useState(false);

  const location = useLocation();
  const [active,setActive] = useState(location.pathname);

  const sidebarToggle = (active) => {
    if(active) setOpen(true);
    else setOpen(false);
  }
  return(
    <div className={active === "/" ? "login" : isOpen ? "notLog open" : "notLogin"}>
      {
        active === "/" ? <></> : <div  className={ isOpen ? "sidebar" : "sidebar close" }><Sidebar /></div>
      }
      {
        active === "/" ? <></> : <div style={style.navbar}><Navbar toggle={sidebarToggle}/></div>
      }
      <div style={active === "/" ?  style.login2 : style.main}>
        <Switch >
            <Route path="/" component={Login} exact/>
            <ProtectedRoute path="/blog" component={Blog} exact set={setActive}/>
            <ProtectedRoute path="/contact" component={Contact} exact set={setActive}/>
            <ProtectedRoute path="/subscriber" component={Subscriber} exact set={setActive}/>
            <ProtectedRoute path="/faq" component={FAQ} exact set={setActive}/>

            <Route component={Error} />
        </Switch>
      </div>
    </div>
  );  
}

export default App;
