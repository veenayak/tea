import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from './shared/Alert';
import FAQSidebar from "./FAQSidebar"
import Moment from 'react-moment';

const style={
    main:{
        display: "inline-block",
        padding: "12px 18px",
        width: "100%",
    },
    data:{
        padding: "12px 18px",
        background: "#ffffff",
        marginBottom: "12px",
        width: "100%",
        display: "grid",
        gridTemplateAreas: "'left topRight' 'left bottomRight' ' end1 end1' 'end2 end2' 'end3 end3'",
        gridTemplateColumns: "27px auto",
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
        width: "min-content",
        maxHeight: "48px",
        alignSelf: "baseline",

    },
    title:{
        margin: "0",
        gridArea: "topRight",        
    },
    date:{
        gridArea: "bottomRight",
        fontSize: "12px",
        color: "#757575"
    },
    description:{
        gridArea: "end1",
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #eaeaea",
        background: "#f7f7f7",
    },
    mainImg:{
        gridArea: "end2",
        maxWidth: "100%",
        width: "auto",
        height: "120px",
        objectFit: "contain"
    },
    content:{
        gridArea: "end3"
    },
    img:{
        height: "120px",
        objectFit: "contain",
        width: "auto",
        maxWidth: "100%",
    },
    category: {
        textTransform: "capitalize",
        color: "#333071",
    },
    para:{
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #eaeaea",
        background: "#f7f7f7",
    },
    button:{
        marginBottom: "18px",
        display: "block",
        marginLeft: "auto"
    }
}
const FAQ = () => {
    const [data,setData] = useState([]);
    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const [question,setQuestion] = useState();
    const [answer, setAnswer] = useState("");
    const [id, setId] = useState(0);
    const [type, setType] = useState("");


    const [sidebarActive,setSidebarActive] = useState(false);

    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
        },2000);
    };

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
    const onEditFAQ = (item) =>{
        setQuestion(item.question);
        setAnswer(item.answer);
        setType("edit");
        setId(item._id);
        setSidebarActive(true);
    }
    const onInsertFAQ = () =>{
        setQuestion("");

        setAnswer("");
        setType("insert");
        setSidebarActive(true);
    }
    useEffect(() => {
        fetchFAQS();
    },[]);

    return (
        <div style={style.main}>
            <button onClick={onInsertFAQ} style={ style.button }>New FAQ</button>

            {
                data.map((item,index) => 
                    <div key={index} style={style.data} onClick={()=>onEditFAQ(item)}>
                        <span style={style.index}>{index+1}</span>
                        <p style={style.title}>{item.question}</p>

                        <span style={style.date}>
                            <Moment format="hh:mm:ss DD/MM/YY">
                                {item.createdOn}
                            </Moment>
                        </span>
                        <p style={style.description}>{item.answer}</p>


                    </div>
                )
            }
            <FAQSidebar fetch={fetchFAQS} id={id} active={sidebarActive} setActive={setSidebarActive} question={question} setQuestion={setQuestion} answer={answer}  setAnswer={setAnswer}  type={type}/>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div>
        
    );
}
export default FAQ;