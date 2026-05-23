import API_BASE_URL from "../Config";
import React,{useEffect,useState}
from "react";

import {useNavigate}
from "react-router-dom";


function Trash(){

const [notes,setNotes]=useState([]);

const navigate=useNavigate();


useEffect(()=>{

const token=
localStorage.getItem("token");

const email=
localStorage.getItem("user");

if(!token||!email){
 navigate("/login");
 return;
}


fetch(
`${API_BASE_URL}/notes/trash?email=${email}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{
 setNotes(data);
})
.catch(err=>{
 console.log(err);
});


},[navigate]);


const restoreNote=(id)=>{

const token=
localStorage.getItem("token");

fetch(
`${API_BASE_URL}/notes/restore/${id}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(()=>{
setNotes(
notes.filter(
note=>note.id!==id
)
);
});

};



const deleteForever=(id)=>{

const token=
localStorage.getItem("token");

fetch(
`${API_BASE_URL}/notes/delete/${id}`,
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(()=>{
setNotes(
notes.filter(
note=>note.id!==id
)
);
});

};



return(
<div style={{padding:"30px"}}>

<h1 style={{
textAlign:"center",
color:"white"
}}>
🗑 Trash
</h1>


<div style={{
display:"flex",
flexWrap:"wrap",
gap:"20px",
justifyContent:"center"
}}>

{
notes.length===0
?

<h2 style={{
color:"white"
}}>
No deleted notes 😌
</h2>

:

notes.map(note=>(

<div
key={note.id}
style={{
background:"#f8f8f8",
padding:"20px",
borderRadius:"12px",
width:"300px"
}}
>

<h3>
{note.title}
</h3>

<p>
{note.content}
</p>


<div style={{
display:"flex",
justifyContent:"space-between"
}}>

<button
onClick={()=>
restoreNote(note.id)
}
style={{
background:"green",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"6px"
}}
>
Restore
</button>



<button
onClick={()=>
deleteForever(note.id)
}
style={{
background:"red",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"6px"
}}
>
Delete Forever
</button>

</div>

</div>

))
}

</div>
</div>
);

}

export default Trash;