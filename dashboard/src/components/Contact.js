import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from './shared/Alert';
import Moment from 'react-moment';

const style={
    main:{
        display: "inline-block",
        padding: "12px 18px",
        minWidth: "100%",
    },
    data:{
        padding: "12px 18px",
        background: "#ffffff",
        marginBottom: "12px",
        width: "100%",
        display: "grid",
        gridTemplateAreas: "'left topRight' 'left middleRight' 'end end' '. bottomRight'",
        gridTemplateColumns: "min-content auto",
        alignItems: "center",
        gap: "12px",
        borderRadius: "4px",
        boxShadow: "0px 0px 4px 2px #e4e4e4"
    },
    index:{
        background: "rgb(66, 61, 161)",
        gridArea: "left",
        color: "#ffffff",
        fontSize: "20px",
        padding: "8px",
        borderRadius: "4px",
        display: "inline-flex",
        height: "100%",
        alignItems: "center",
        maxHeight: "48px",
        alignSelf: "baseline",

    },
    email:{
        margin: "0",
        gridArea: "topRight",        
    },
    date:{
        fontSize: "12px",
        color: "#757575",
        gridArea: "middleRight",    

    },
    message:{
        gridArea: "end",       
        margin: "0", 
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #eaeaea",
        background: "#f7f7f7",
        marginTop: "4px"

    },
    name:{
        gridArea: "bottomRight",
        margin: "0",
        textAlign: "right",    

    }
    
}
const Contact = () => {

    const [data,setData] = useState([]);
    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
        },2000);
    };
    const fetchContacts = () =>{
        const token = JSON.parse(localStorage.getItem('token'));

        axios.post('http://api.awesomtea.com/contacts/fetch',{token:token})
        .then(res => {
            if(res.data.status === 200){
                let arr = res.data.data;
                console.log(arr);
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

    useEffect(() => {
        fetchContacts();
    },[]);

    return (
        <div style={style.main}>
            {
                data.map((item,index) => 
                    <div key={index} style={style.data}>
                        <span style={style.index}>{index+1}</span>
                        <p style={style.name}>-{item.name}</p>
                        <p style={style.email}>{item.email}</p>
                        <p style={style.message}>{item.message}</p>
                        <span style={style.date}>
                            <Moment format="hh:mm:ss DD/MM/YY">
                                {item.createdOn}
                            </Moment>
                        </span>
                    </div>
                )
            }
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div>
    );
}
export default Contact;