import API_BASE_URL from "../config";
import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Home(){

const [notes,setNotes]=useState([]);
const [search,setSearch]=useState("");
const [message,setMessage]=useState("");

const navigate=useNavigate();


useEffect(()=>{

const email=
localStorage.getItem("user");

const token=
localStorage.getItem("token");


if(!email || !token){
 navigate("/login");
 return;
}

setNotes([]);

axios.get(
`${API_BASE_URL}/notes?email=${email}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>{
 setNotes(res.data);
})
.catch(err=>{
 console.log(err);

 if(err.response?.status===401){
   alert("Session expired. Login again");
   localStorage.clear();
   navigate("/login");
 }
});

},[navigate]);


return(
<div style={{padding:"30px"}}>

<h1 style={{
textAlign:"center",
color:"white"
}}>
📝 My Notes
</h1>


<div style={{
textAlign:"center",
marginBottom:"15px"
}}>
<button
onClick={()=>navigate("/ai")}
style={{
background:
"linear-gradient(135deg,#667eea,#764ba2)",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>
🤖 AI Assistant
</button>
</div>


<div style={{
textAlign:"center",
marginBottom:"20px"
}}>
<input
type="text"
placeholder="🔍 Search notes..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
style={{
padding:"10px",
width:"300px",
borderRadius:"10px",
border:"none"
}}
/>
</div>


{message &&(
<div style={{
position:"fixed",
top:"20px",
right:"20px",
background:"#333",
color:"white",
padding:"10px 20px",
borderRadius:"8px"
}}>
{message}
</div>
)}



<div style={{
display:"flex",
flexWrap:"wrap",
gap:"20px",
justifyContent:"center"
}}>

{notes
.filter(note=>
note.title
.replace(/<[^>]*>/g,"")
.toLowerCase()
.includes(search.toLowerCase())

||

note.content
.toLowerCase()
.includes(search.toLowerCase())
)

.map(note=>(
<div
key={note.id}
onClick={()=>
navigate(`/view/${note.id}`)
}
style={{
background:
"rgba(255,255,255,0.15)",
backdropFilter:"blur(10px)",
padding:"20px",
borderRadius:"15px",
width:"280px",
color:"white",
boxShadow:
"0 8px 25px rgba(0,0,0,0.3)",
cursor:"pointer"
}}
onMouseEnter={(e)=>{
e.currentTarget.style.transform=
"scale(1.05)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform=
"scale(1)";
}}
>

<h3
dangerouslySetInnerHTML={{
__html:note.title
}}
></h3>

<small style={{color:"#ddd"}}>
📅 {
note.createdAt
? new Date(
note.createdAt
).toLocaleString()
: "Old Note"
}
</small>

</div>
))
}

</div>



<div style={{
textAlign:"center",
marginTop:"30px"
}}>
<button
onClick={()=>
navigate("/add")
}
style={{
background:"#ffd700",
border:"none",
padding:"10px 20px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>
➕ Add Note
</button>
</div>


</div>
);

}

export default Home;