import logo from '../../images/tea.png';
import { useState ,useEffect} from 'react';
import Hamburger from 'hamburger-react'
import {FaArrowUp} from "react-icons/fa";
const styles={
    upShow:{
        opacity: 1,
    },
    upHide:{
        opacity: 0,
    }
}
function Navbar() {
    const [up, setUp] = useState(false)

    const [isOpen, setOpen] = useState(false)
    const [nav,setNav] = useState(false);
    const [active,setActive] = useState("home");
    useEffect(() => {
        
        window.addEventListener('scroll', scrollHandler);
     
        return () => window.removeEventListener('scroll', scrollHandler);
        
    }, []);
    
    const scrollHandler = () => {
        const main1 = document.querySelector("#main1").offsetTop;
        const main2 = document.querySelector("#main2").offsetTop;
        const main3 = document.querySelector("#main3").offsetTop;
        const scroll = document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        if(scroll > docHeight/2){
            setUp(true);
        }
        else{
            setUp(false);
        }
        if(scroll >= main1 && scroll < main2-94){
            setActive("home");
        }
        else if(scroll >= main2 && scroll < main3-94){
            setActive("blog");
        }
        else if(scroll >= main3){
            setActive("contact");
        }
        
    }
    const scrollTop = () =>{
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
    const scrollContact = () =>{
        
        const contact = document.querySelector("#main3").offsetTop;
        window.scroll({
            top: contact-94,
            behavior: 'smooth'
        });
    }
    const scrollBlog = () =>{
        
        const blog = document.querySelector("#main2").offsetTop;
        window.scroll({
            top: blog-94,
            behavior: 'smooth'
        });
    }
    return (
        <header>
            <nav>
                <div id="logo_div">
                    <img src={logo}></img>
                </div>

                <div id="link_div" className={nav === true ? "show" : "notShow"}> 
                    <a className={active==="contact" ? "active" : ""} onClick={scrollContact}>Contact</a>
                    <a className={active==="blog" ? "active" : ""} onClick={scrollBlog}>Blog</a>
                    <a className={active==="home" ? "active" : ""} onClick={scrollTop}>Home</a>				

                </div>
                <Hamburger toggled={isOpen} size={36} toggle={setOpen} color="#5eb562" onToggle={toggled => {
                    if (toggled) {
                        setNav(true);
                    } else {
                        setNav(false);
                    }
                }}/>

            </nav>
            <button id="up" style={up === true ? styles.upShow : styles.upHide} onClick={scrollTop}><FaArrowUp></FaArrowUp></button>

        </header>
  );
}

export default Navbar;