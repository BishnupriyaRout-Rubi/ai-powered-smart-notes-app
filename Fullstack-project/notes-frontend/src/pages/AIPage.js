import API_BASE_URL from "../config";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

function AIPage(){

const [prompt,setPrompt]=useState("");
const [aiResponse,setAiResponse]=useState("");
const [loading,setLoading]=useState(false);

const navigate=useNavigate();


const askAI = async()=>{

if(!prompt.trim()) return;

const token=
localStorage.getItem("token");

if(!token){
 navigate("/login");
 return;
}

setLoading(true);
setAiResponse("");

try{

const res=await fetch(
`${API_BASE_URL}/ai/generate`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
prompt
})
}
);

if(res.status===401){
alert("Session expired");
localStorage.clear();
navigate("/login");
return;
}

const data=await res.text();

setAiResponse(data);

}catch(err){
console.error(err);
setAiResponse("AI error");
}

setLoading(false);

};



return(
<div style={{
minHeight:"100vh",
padding:"40px",
display:"flex",
flexDirection:"column",
alignItems:"center",
color:"white"
}}>

<button
onClick={()=>navigate("/")}
style={{
alignSelf:"flex-start",
marginBottom:"20px",
padding:"8px 15px",
borderRadius:"8px",
border:"none"
}}
>
⬅ Back
</button>


<h1>
🤖 AI Assistant
</h1>


<div style={{
marginTop:"30px",
display:"flex",
gap:"10px",
flexWrap:"wrap",
justifyContent:"center"
}}>

<input
type="text"
placeholder="Ask something..."
value={prompt}
onChange={(e)=>
setPrompt(e.target.value)
}
onKeyDown={(e)=>
e.key==="Enter" && askAI()
}
style={{
padding:"10px",
width:"250px",
borderRadius:"8px",
border:"none"
}}
/>


<button
onClick={askAI}
style={{
background:"#667eea",
color:"white",
border:"none",
padding:"10px 15px",
borderRadius:"8px"
}}
>
Ask
</button>



<button
onClick={()=>
navigate(
"/add",
{
state:{
aiContent:aiResponse
}
}
)
}
disabled={!aiResponse}
style={{
background:
aiResponse
? "#4CAF50"
: "#999",

color:"white",
border:"none",
padding:"10px 15px",
borderRadius:"8px"
}}
>
➕ Add
</button>

</div>



{
loading &&
<p style={{
marginTop:"20px"
}}>
🤖 Thinking...
</p>
}



{
aiResponse &&
<div style={{
marginTop:"30px",
width:"60%",
background:
"rgba(255,255,255,0.15)",
backdropFilter:"blur(10px)",
padding:"20px",
borderRadius:"15px",
maxHeight:"400px",
overflowY:"auto",
whiteSpace:"pre-wrap"
}}>
{aiResponse}
</div>
}

</div>
);

}

export default AIPage;