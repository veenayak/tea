import Hamburger from 'hamburger-react';
import img from "../../images/vibinWhite.png";
import {BiLogOutCircle} from 'react-icons/bi';
const style = {
    main:{
        backgroundColor: "#f4f2f2",
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
    },
    wrapper:{
        display: "grid",
        gridTemplateColumns: "auto  auto",
        justifyContent: "space-between",
    
    },
    logo:{
        textAlign: "center",
        display: "grid",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        gap: "4px"
    },
    img:{
        width: "auto",
        height: "48px",
        filter: "invert(2)",
    },
    signOut:{
        fontSize: "28px",
        cursor: "pointer"
    }

};
const Navbar = (props) =>{
    const signOut = () =>{
        localStorage.clear();
        window.location.replace("/");
    }
    return (
        <nav style={ style.main }>
            <div style={style.logo}>
                <Hamburger size={28} color="black" onToggle={toggled => {
                    if (toggled) {
                        props.toggle(true);
                    } 
                    else {
                        props.toggle(false);
                    }
                }} />
                {/* <img src={img} alt="Vibin logo" style={style.img}></img> */}
            </div>
            <div style={style.signOut}>
                <BiLogOutCircle onClick={signOut} />
            </div>

        </nav>
    );
  }
  
  export default Navbar;
  