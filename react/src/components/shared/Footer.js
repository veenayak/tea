import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
// import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
// import tumblr from '../../images/tumblr.svg'
import axios from 'axios';
import { useState , useRef} from 'react';
import Alert from './Alert';

const style ={

    button:{
        disabled: {
            cursor: "not-allowed"
        }
    },
}

function Footer() {
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
            setDisabled(false);
            setSubscriberEmail('');
        },2000)
    };
    const handleInsertSubscriber = () => () =>{
        setDisabled(true);

        const data = {email: subscriberEmail};

        if(subscriberEmail === ''){
            subEmailFocus.current.focus();
            alert("Email is required!!","alert show","!success");

        } 
        else{
            axios.post('http://api.awesomtea.com/subscribers', data)
            .then(res => {
                if(res.data.status === 200 || res.data.status === 409){
                    console.log(res.data.message);
                    alert(res.data.message,"alert show","success");
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

    const [subscriberEmail,setSubscriberEmail] = useState('');
    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const subEmailFocus = useRef(null);

    const [disabled,setDisabled] = useState(false);

    return (
        <div>
            <footer>
                <div id="footer_one">
                    <div>
                        <h4>Contact</h4>
                        <p>For any queries mail us at suraj.kumar.shambhu@gmail.com</p>
                    </div>
                    <div>
                        <h4>Suscribe to our Newsletter</h4>
                        <input type="text" placeholder="Enter you email" name="subscriberEmail" id="subscriberEmail" onChange={event => setSubscriberEmail(event.target.value)} ref={subEmailFocus} value={subscriberEmail}></input>
                        <button style={disabled ? style.button.disabled : style.button} onClick={handleInsertSubscriber()} disabled={disabled}>Subsscribe</button>    
                    </div>
                    <div>
                        <h4>Social Media</h4>
                        <a href="https://www.facebook.com"><img src={facebook}></img></a>
                        <a href="https://instagram.com/awesome_tea_?utm_medium=copy_link"><img src={instagram}></img></a>
                        {/* <a href="https://twitter.com/Tatparya3?s=08"><img src={twitter}></img></a>				 */}
                        <a href="https://youtube.com"><img src={youtube}></img></a>
                        {/* <a href="https://www.tumblr.com/blog/tatparya"><img src={tumblr}></img></a> */}

                    </div>
                </div>
                <div id="footer_two">
                    <p>&copy;2021 <a href="#">awesometea.com</a></p>	
                </div>
            </footer>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div>
  );
}

export default Footer;