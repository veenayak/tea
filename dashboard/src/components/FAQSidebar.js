import { useState , useRef ,useEffect } from 'react';
import {MdClose} from "react-icons/md";
import axios from 'axios';
import Alert from './shared/Alert';

const style={
    main:{
        position: "fixed",
        right: "0",
        top: "0",
        height: "100vh",
        boxShadow: "0px 0px 8px 4px #cccccc",
        width: "480px", 
        maxWidth: "100%", 
        background: "#f4f2f2",
        padding: "12px 18px",
        overflowY: "scroll",
        paddingBottom: "0",
        close:{
            right: "100%",
            display: "none"
        }
    },
    inpDiv:{
        marginBottom: "18px",
        display: "grid",
    },
    buttonDiv: {
        position: "sticky",
        top: "100%",
        bottom: "0",
        width: "100%",
        padding: "12px 0",
        background: "#f4f2f2"
    },
    buttonHalf:{
        display:  "grid",
        gridTemplateColumns: "auto auto",
        gap: "12px",
        marginBottom: "12px"

    },
    button: {
        width: "100%",
        maxWidth: "unset",
        disabled: {
            width: "100%",
            maxWidth: "unset",
            cursor: "not-allowed",
        }
    },
    contentDiv: {
        display: "grid",
        gridTemplateColumns: "auto max-content",
        alignItems: "center"
    },
    label: {
        width: "max-content"
    },
    textarea:{
        resize: "none",
        height: "240px",
    },
    inp: {
        width: "100%"
    },
    img: {
        height: "120px",
        objectFit: "contain",
        width: "auto",
        maWidth: "100%",     
        marginTop: "18px",
    },
    
}
const FAQSidebar = (props) => {
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            if(icon === "success"){
                props.fetch();
                props.setActive(false);
            }
            setAlertDisplay("alert");  
            setDisabled(false);            
        },2000);
    };

    const questionFocus = useRef(null);
    
    const answerFocus = useRef(null);


    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const [disabled,setDisabled] = useState(false);

    const saveFAQ = () =>{
        setDisabled(true);
        const token = JSON.parse(localStorage.getItem('token'));

        if(props.question === ''){
            questionFocus.current.focus();
            alert("Question is required!!","alert show","!success");
            
        }
        else if(props.answer === ''){
            answerFocus.current.focus();
            alert("Answer is required!!","alert show","!success");

        }
        else{
            const data = {token: token,question: props.question,answer: props.answer,};
            console.log(data);
            axios.post('http://api.awesomtea.com/faqs',data)
            .then(res => {
                if(res.data.status === 200){
                    alert(res.data.message,"alert show","success");                   
                }
                else{
                    alert(res.data.message,"alert show","!success");
                    console.log(res);
                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }

    } 

    const updateFAQ = () =>{
        setDisabled(true);

        const token = JSON.parse(localStorage.getItem('token'));

        if(props.question === ''){
            questionFocus.current.focus();
            alert("Question is required!!","alert show","!success");
            
        }
        else if(props.answer === ''){
            answerFocus.current.focus();
            alert("Answer is required!!","alert show","!success");

        } 

        else{
            const data = {id: props.id, token: token,question: props.question,answer: props.answer };
            axios.post('http://api.awesomtea.com/faqs/update',data)
            .then(res => {
                if(res.data.status === 200){
                    alert(res.data.message,"alert show","success");
                }
                else{
                    alert(res.data.message,"alert show","!success");
                    console.log(res);

                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }

    } 

    const hideSidebar = () =>{
        props.setActive(false);
    }
    
    
    return (
        <div style={props.active ? style.main : style.main.close}>
            <MdClose size={28} onClick={hideSidebar} style={{marginBottom: "18px"}}/>
            <h1>{props.type === "insert" ? "Create FAQ" : "Update FAQ"}</h1>
            <div style={style.inpDiv}>
                <label htmlFor="question" style={style.label}>Question</label>
                <input type="text" name="question" id="question" onChange={event => props.setQuestion(event.target.value)} ref={questionFocus} value={props.question || ""}></input>
            </div>
            <div style={style.inpDiv}>
                <label htmlFor="answer" style={style.label}>Answer</label>
                <input type="text" name="answer" id="answer"  onChange={event => props.setAnswer(event.target.value)} ref={answerFocus} value={props.answer || ""}></input>
            </div>

           
            <div style={style.buttonDiv}>
               
                <button style={disabled ? style.button.disabled : style.button }  onClick={props.type === "insert" ? saveFAQ : updateFAQ} disabled={disabled}>Save</button>


            </div>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>
        </div>
    );
}
export default FAQSidebar;