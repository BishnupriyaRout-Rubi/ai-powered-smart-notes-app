import React,{useState,useEffect,useRef}
from "react";

import {
useNavigate,
useLocation
}
from "react-router-dom";


function AddNote(){

const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [color,setColor]=useState("#000000");
const [font,setFont]=useState("Arial");

const navigate=useNavigate();
const location=useLocation();

const editorRef=useRef(null);


useEffect(()=>{

const user=
localStorage.getItem("user");

const token=
localStorage.getItem("token");

if(!user || !token){
navigate("/login");
}

},[navigate]);


useEffect(()=>{

if(location.state?.aiContent){

setContent(
location.state.aiContent
);

if(editorRef.current){
editorRef.current.innerText=
location.state.aiContent;
}

}

},[location.state]);


const iconBtn={
padding:"6px 10px",
borderRadius:"6px",
border:"none",
cursor:"pointer",
background:
"rgba(255,255,255,0.2)",
color:"white"
};



const addNote = async()=>{

const finalContent=
editorRef.current.innerHTML || "";

if(
!title.trim()
||
!finalContent.trim()
){
alert(
"Title and Content required"
);
return;
}


const token=
localStorage.getItem("token");


try{

const res=await fetch(
`${process.env.REACT_APP_API_URL}/notes`,
{
method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({
title,
content:finalContent,
color,
font,
user:{
email:
localStorage.getItem("user")
}
})

}
);


if(res.status===401 || res.status===403){
console.log("TOKEN:",localStorage.getItem("token"));
alert("403 from backend");
return;
}


if(!res.ok){
alert("Failed to save note");
return;
}


alert("Note saved ✅");

navigate("/");


}catch(err){

console.log(err);
alert("Error saving note");

}

};



return(
<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>


<div style={{
background:
"rgba(255,255,255,0.2)",
padding:"25px",
borderRadius:"15px",
width:"400px",
backdropFilter:"blur(12px)",
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"12px"
}}>


<h2 style={{
color:"#fff"
}}>
Add Note
</h2>


<button
onClick={()=>
navigate("/ai")
}
style={{
background:"#00c6ff",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"8px"
}}
>
🤖 Use AI
</button>



<div
contentEditable
onInput={(e)=>
setTitle(
e.currentTarget.innerHTML
)
}
style={{
width:"100%",
padding:"10px",
borderRadius:"8px",
background:"white"
}}
>
</div>



<div style={{
display:"flex",
gap:"10px"
}}>

<button
onClick={()=>
document.execCommand("bold")
}
style={iconBtn}
>
<b>B</b>
</button>


<button
onClick={()=>
document.execCommand("italic")
}
style={iconBtn}
>
<i>I</i>
</button>

</div>



<div
ref={editorRef}
contentEditable
suppressContentEditableWarning
onInput={(e)=>
setContent(
e.currentTarget.innerHTML || ""
)
}
style={{
width:"100%",
minHeight:"140px",
padding:"12px",
borderRadius:"10px",
background:"white",
fontFamily:font
}}
>
</div>



<div>
<label style={{
color:"#fff"
}}>
Color:
</label>

<input
type="color"
value={color}
onChange={(e)=>
setColor(
e.target.value
)}
/>

</div>



<div>

<label style={{
color:"#fff"
}}>
Font:
</label>

<select
value={font}
onChange={(e)=>
setFont(
e.target.value
)}
>

<option>
Arial
</option>

<option>
Courier New
</option>

<option>
Georgia
</option>

<option>
Verdana
</option>

</select>

</div>



<button
onClick={addNote}
style={{
background:"#ffd700",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer"
}}
>
➕ Add Note
</button>


</div>
</div>
);

}

export default AddNote;