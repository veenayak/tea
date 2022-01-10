import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
// import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
// import tumblr from '../../images/tumblr.svg'
import { FaLongArrowAltRight } from "react-icons/fa";

import main from '../../images/main.jpg';
import work1 from '../../images/work1.jpg';
import work2 from '../../images/work2.jpg';
import work3 from '../../images/work3.jpg';


import leaf6 from '../../images/leaf4-cropped.png';
import axios from 'axios';
import { useState , useRef ,useEffect} from 'react';
import Alert from '../shared/Alert';


const style ={

    button: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        gap: "8px",
        disabled: {
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            gap: "8px",
            cursor: "not-allowed"
        }
    },
    faq: {

        display: "grid",
        gridTemplateColumns: "max-content auto",
        alignItems: "center",
        background: "#efefef",
        borderRadius: "5px",
        marginBottom: "18px"
    },
    span:{
        padding: "12px",
        borderRight: "2px solid #5eb562",
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    div:{
        padding: "12px",
    },
    h3:{
        margin: "0",
    },
    p:{
        margin: "0",
        marginTop: "4px"
    }
    
}
function Home() {


    const [data,setData] = useState([]);
    const [blogData,setBlogData] = useState([]);
    const [current,setCurrent] = useState(1);
    const fetchFAQS = () =>{
        axios.post('http://api.awesomtea.com/faqs/fetch')
        .then(res => {
            if(res.data.status === 200){
                let arr = res.data.data;
                setData(arr);
            }
            else{
                console.log(res);
            }
        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }
    const fetchBlogs = () =>{
        axios.post('http://api.awesomtea.com/blogs/fetch')
        .then(res => {
            if(res.data.status === 200){
                let arr = res.data.data;
                setBlogData(arr);
            }
            else{
                console.log(res);
            }
        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
            setDisabled(false);
        },2000);
    };
    const handleContact = () => () =>{
        setDisabled(true);

        const data = { email: contactEmail, message: contactMessage, name: contactName };
        if(contactName === ''){
            contactNameFocus.current.focus();
            alert("Name is required!!","alert show","!success");
            
        }
        else if(contactEmail === ''){
            contactEmailFocus.current.focus();
            alert("Email is required!!","alert show","!success");

        } 
        else if(contactMessage === ''){
            contactMessageFocus.current.focus();
            alert("Message is required!!","alert show","!success");

            
        }
        else{
            axios.post('http://api.awesomtea.com/contacts', data)
            .then(res => {
                if(res.data.status === 200){
                    console.log(res.data.message);
                    alert(res.data.message,"alert show","success");
                    setContactEmail("");
                    setContactName("");
                    setContactMessage("")
                }
                else{
                    alert(res.data.message.email.message,"alert show","!success");

                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }
        
    }

    const contactNameFocus = useRef(null);
    const contactEmailFocus = useRef(null);
    const contactMessageFocus = useRef(null);

    const [contactName,setContactName] = useState('');
    const [contactEmail,setContactEmail] = useState('');
    const [contactMessage,setContactMessage] = useState('');

    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');
    const [disabled,setDisabled] = useState(false);



    const changeCurrent = (index) =>{
        setCurrent(index);
    }

//    const [active,setActive] = useState(0); 
//    const changeActive = () =>{

//         if(active != 3){
            

//             setActive(active+1);
//             setTimeout(function(){
//                 const scroll = document.querySelector("#main_imgdiv>div .active").offsetLeft;
//                 document.querySelector("#main_imgdiv>div").style.left = scroll;
//             },200)

            
//         }
//         else{
//             setActive(0);
//             setTimeout(function(){
//                 const scroll = document.querySelector("#main_imgdiv>div .active").offsetLeft;
//                 document.querySelector("#main_imgdiv>div").style.left = scroll;
//             },200)
//         }
//    }
   useEffect(() => {
        fetchFAQS();
    },[]);
    useEffect(() => {
        fetchBlogs();
    },[]);
  return (
    <div>
    
        <main id="main1">
            <div className="main_div">
                <h1>Awesome Tea</h1>
                <p>Essence of Assam.</p>		
                <div>
                    <a href="https://www.facebook.com"><img src={facebook}></img></a>
                    <a href="https://instagram.com/awesome_tea_?utm_medium=copy_link"><img src={instagram}></img></a>
                    {/* <a href="https://twitter.com/Tatparya3?s=08"><img src={twitter}></img></a>				 */}
                    <a href="https://youtube.com"><img src={youtube}></img></a>
                    {/* <a href="https://www.tumblr.com/blog/tatparya"><img src={tumblr}></img></a> */}
                </div>
            </div>
            <div id="main_imgdiv">
                <div>

                    <img src={work1}  alt="Tea Leafs"></img>
                    <img src={main} alt="Tea Leafs"></img>

                    <img src={work2}  alt="Tea Leafs"></img>

                    <img src={work3}  alt="Tea Leafs"></img>
                </div>

            </div>

        </main>
        <main id="main2">

            <div>
                <div className="main_imgdiv2">
                    {
                        blogData.map((item,index) => 
                            
                            <img src={item.mainImage} key={index} onClick={()=>changeCurrent(index)} className={current === index ? "active" : "" }></img>
                        
                        )
                    }
                </div>
                <div className="main_div" >
                    {
                        blogData.map((item,index) => 

                            <div key={index} className={current === index ? "active" : "" }>
                                <h2 style={{marginTop: 0}}>{item.title}</h2>
                                <p>{item.description}</p>		
                            </div>

                        )
                    }
                </div>
            </div>


        </main>
        <section>

            <div className="slides">
                {/* <h3>Career Coaching Session</h3>
                <p>Require career guidance? Book a session soon.</p> */}
            </div>

            <img src={leaf6}></img>

        </section>
        <main id="main3">

            <div id="main_imgdiv3">
                <h2 style={{marginBottom: "15px"}}>FAQ</h2>
                {
                    data.map((item,index) => 
                    <div key={index} style={style.faq}>
                        <span style={style.span}>{index+1}</span>

                        <div style={style.div}>

                            <h3 style={style.h3}>{item.question}</h3>
                            <p style={style.p}>{item.answer}</p>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className="main_div">

                <h2>Contact Us</h2>
                <p>We will get in touch with you asap.</p>
                <form action="" method="post">
                    <div>
                        <input placeholder="Name" type="text" name="name" id="name" style={style.inp} onChange={event => setContactName(event.target.value)} ref={contactNameFocus} value={contactName}></input>
                    </div>
                    <div>
                       <input placeholder="Email" type="text" name="contactEmail" id="contactEmail" style={style.inp} onChange={event => setContactEmail(event.target.value)} ref={contactEmailFocus} value={contactEmail}></input>
                    </div>
                    <div>
                        <textarea placeholder="Message" style={{minHeight: 200}} id="message" onChange={event => setContactMessage(event.target.value)} ref={contactMessageFocus} value={contactMessage}></textarea>
                    
                    </div>
                </form>
                <button style={disabled ? style.button.disabled : style.button} onClick={handleContact()} disabled={disabled}>Send this message<FaLongArrowAltRight /></button>
                
            </div>	
        </main>
        <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

    </div>
	
    
    
  );
}

export default Home;
