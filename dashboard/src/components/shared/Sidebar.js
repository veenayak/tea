import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";

const style = {
    activeStyle:{
        color: "rgb(66, 61, 161)",
        textDecoration: "none",
        padding: "12px 0px",
        transition: "all 0.2s ease 0s",
        fontWeight: "bold",
        marginBottom: "4px",
        width: "100%",
        display: "inline-block",

    },
    
    links:{
        height: "100vh",
        background: "#f4f2f2",
        width: "100%",
        padding: "18px",
        borderRight: "2px solid rgb(234 234 234)",
    },
    inactiveStyle:{
        color: "black",
        textDecoration: "none",
        padding: "12px 0px",
        borderRadius: "4px",
        transition: "all 0.2s",
        display: "inline-block",
        marginBottom: "4px",
        alignItems: "center",
        width: "100%",
        "&:hover":{
            color: "#423da1",
        },
    },       
};
const Sidebar = () =>{
    const location = useLocation();
    const handleOnCLick = (link) => () =>{
        console.log(link);
        setActive(link);
    }
    const [active,setActive] = useState(location.pathname);
    return (
        <div style={ style.links }>
   
            <Link to="/blog" onClick={handleOnCLick("/blog")}  style={ active === "/blog" ? style.activeStyle : style.inactiveStyle } >Blogs</Link>
            <Link to="/faq" onClick={handleOnCLick("/faq")}  style={active === "/faq" ? style.activeStyle : style.inactiveStyle}>FAQ</Link>

            <Link to="/contact" onClick={handleOnCLick("/contact")}  style={active === "/contact" ? style.activeStyle : style.inactiveStyle }>Contacts</Link>
            <Link to="/subscriber" onClick={handleOnCLick("/subscriber")}  style={active === "/subscriber" ? style.activeStyle : style.inactiveStyle}>Subscribers</Link>

        </div>
    );
}
export default Sidebar;