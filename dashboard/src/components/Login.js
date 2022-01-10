import { FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';
import { useState , useRef } from 'react';
import Alert from './shared/Alert';
import img from "../images/vibinWhite.png";

const style = {
    main:{
        backgroundColor: "#f4f2f2",
        minHeight: "100vh",
        position: "relative",
    },
    loginDiv:{
        maxWidth: "480px",
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
    },
    inp:{
        width: "100%",
    },
    inpDiv:{
        marginBottom: "18px",
    },
    icons:{
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto auto",
        gridGap: "16px",
        marginRight: "auto",        
    },
    textarea:{
        width: "100%",
        marginBottom: "12px",
        height: "192px",
        resize: "none",
    },
    label:{
        width: "100%",
        display: "block",
        marginBottom: "12px",
        paddingTop: "0",
    },
    button: {
        marginTop: "18px",
        float: "right",
        display: "grid",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        gap: "8px",
        disabled: {
            marginTop: "18px",
            float: "right",
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            gap: "8px",
            cursor: "not-allowed",
        }
    },
    logo:{
        display: "grid",
        gridTemplateAreas: "'left topRight' 'left topBttom'" ,
        // gridGap: "4px",
        alignItems: "center",
        width: "max-content",
        marginBottom: "18px"
    },
    img:{
        width: "auto",
        height: "48px",
        gridArea: "left",
        filter: "invert(2)",
    },
    h1:{
        color: "black",
        gridArea: "topRight",
        margin: "0",
        padding: "5px 2px 0 2px",
    },
    p:{
        color: "black",
        gridArea: "topBttom",
        margin: "0",
        padding: "0px 2px 5px 2px",
    },

}
const Login = () => {

    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
            setDisabled(false);
            if(icon === "success"){
                window.location.replace("/blog");
            }
        },2000);
    };
    const handleLogin = () => () =>{

        setDisabled(true);
        const data = { email: loginEmail, password: loginPassword };
        if(loginEmail === ''){
            loginEmailFocus.current.focus();
            alert("Email is required!!","alert show","!success");
            
        }
        else if(loginPassword === ''){
            loginPasswordFocus.current.focus();
            alert("Password is required!!","alert show","!success");

        } 
        else{
            axios.post('http://api.awesomtea.com/login', data)
            .then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('token',JSON.stringify(res.data.token));
                    alert("Success...redirecting to dashboard","alert show","success");
                    const tokJson = JSON.parse(localStorage.getItem('token')); 
                }
                else{
                    alert(res.data.message,"alert show","!success");
                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }
        
    }

    const loginEmailFocus = useRef(null);
    const loginPasswordFocus = useRef(null);

    const [loginEmail,setLoginEmail] = useState('');
    const [loginPassword,setLoginPassword] = useState('');

    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const [disabled,setDisabled] = useState(false);
    return (
        <div style={style.main}>
            <div className="wrapper" style={style.loginDiv}>
                
                <div>
                    <div style={style.logo}>
                        {/* <img src={img} alt="Vibin logo" style={style.img}></img> */}
                        <h1 style={ style.h1 }>Awesome Tea</h1>
                        {/* <p style={  style.p }>Be the vibe</p> */}
                    </div>
                    <div>
                        <div style={style.inpDiv}>
                            <label htmlFor="email" style={style.label}>Email</label>
                            <input type="text" name="email" id="email" style={style.inp} onChange={event => setLoginEmail(event.target.value)} ref={loginEmailFocus} value={loginEmail}></input>
                        </div>
                        <div style={style.inpDiv}>
                            <label htmlFor="password" style={style.label}>Password</label>
                            <input type="password" name="password" id="password" style={style.inp} onChange={event => setLoginPassword(event.target.value)} ref={loginPasswordFocus} value={loginPassword}></input>
                        </div>
                    </div>
                    <button style={disabled ? style.button.disabled : style.button } onClick={handleLogin()} disabled={disabled}>Login <FaLongArrowAltRight /></button>

                </div>
            </div>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div>
        
    );
  }
  
  export default Login;