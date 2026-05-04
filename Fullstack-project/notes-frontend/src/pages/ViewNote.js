import React,{useEffect,useState}
from "react";

import {
useParams,
useNavigate
}
from "react-router-dom";

import axios from "axios";

function ViewNote(){

const {id}=useParams();

const [note,setNote]=useState(null);
const [files,setFiles]=useState([]);

const navigate=useNavigate();



const loadFiles=()=>{

const token=
localStorage.getItem("token");

fetch(
`${process.env.REACT_APP_API_URL}/files/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
)
.then(async(res)=>{

const text=
await res.text();

if(!text){
setFiles([]);
return;
}

const data=
JSON.parse(text);

if(
Array.isArray(data)
){
setFiles(data);
}
else{
setFiles([]);
}

})
.catch(()=>{
setFiles([]);
});

};




useEffect(()=>{

const token=
localStorage.getItem("token");

if(!token){
navigate("/login");
return;
}


axios.get(
`${process.env.REACT_APP_API_URL}/notes/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
)
.then(res=>{
setNote(res.data);
})
.catch(err=>{

console.log(err);

if(err.response?.status===401){
localStorage.clear();
navigate("/login");
}

});


loadFiles();

},[id,navigate]);





const uploadFile=async(e)=>{

const file=
e.target.files[0];

if(!file) return;


const token=
localStorage.getItem("token");


const formData=
new FormData();

formData.append(
"file",
file
);



const res=
await fetch(
`${process.env.REACT_APP_API_URL}/files/upload/${id}`,
{
method:"POST",
headers:{
Authorization:
`Bearer ${token}`
},
body:formData
}
);


const msg=
await res.text();

alert(msg);


loadFiles();

};





const shareNote=async()=>{

const collaboratorEmail=
prompt(
"Enter collaborator email"
);

if(!collaboratorEmail) return;


const token=
localStorage.getItem("token");

const ownerEmail=
localStorage.getItem("user");


const res=await fetch(
`${process.env.REACT_APP_API_URL}/notes/share/${id}?ownerEmail=${ownerEmail}&collaboratorEmail=${collaboratorEmail}`,
{
method:"POST",
headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data=
await res.text();

alert(data);

};





const deleteNote=()=>{

const token=
localStorage.getItem("token");

fetch(
`${process.env.REACT_APP_API_URL}/notes/${id}`,
{
method:"DELETE",
headers:{
Authorization:
`Bearer ${token}`
}
}
)
.then(()=>{
navigate("/");
});

};





if(!note){
return <p>Loading...</p>
}




return(
<div style={{
padding:"30px"
}}>

<button
onClick={()=>navigate("/")}
style={{
padding:"8px 14px",
borderRadius:"8px",
border:"none"
}}
>
⬅ Back
</button>



<div style={{
background:
"rgba(255,255,255,0.15)",
backdropFilter:"blur(12px)",
padding:"25px",
borderRadius:"15px",
marginTop:"20px",
color:"white"
}}>


<h2
dangerouslySetInnerHTML={{
__html:note.title
}}
></h2>



<small style={{
background:
"rgba(255,216,107,0.2)",
padding:"6px 12px",
borderRadius:"20px",
color:"#ffd86b"
}}>
📅 {
new Date(
note.createdAt
).toLocaleString(
"en-IN",
{
dateStyle:"medium",
timeStyle:"short"
}
)
}
</small>




<p
style={{
marginTop:"20px",
whiteSpace:"pre-wrap"
}}
dangerouslySetInnerHTML={{
__html:note.content
}}
>
</p>




<div style={{
marginTop:"25px"
}}>

<label style={{
background:"#00b894",
padding:"10px 18px",
borderRadius:"10px",
cursor:"pointer",
display:"inline-block"
}}>
📎 Upload File

<input
type="file"
accept=".pdf,image/*"
hidden
onChange={uploadFile}
/>

</label>



<h3 style={{
marginTop:"20px"
}}>
Attachments
</h3>



{
!Array.isArray(files)
||
files.length===0

?

<p>
No attachments yet
</p>

:

files.map(file=>(

<div
key={file.id}
style={{
marginTop:"10px"
}}
>
<a
href={`http://localhost:8080/${file.filePath}`}
target="_blank"
rel="noreferrer"
style={{
color:"#ffd86b"
}}
>
📄 {file.fileName}
</a>
</div>

))
}

</div>





<div style={{
marginTop:"25px",
display:"flex",
gap:"15px"
}}>

<button
onClick={()=>
navigate(`/edit/${note.id}`)
}
style={{
background:
"linear-gradient(135deg,#43e97b,#38f9d7)",
border:"none",
padding:"10px 18px",
borderRadius:"10px"
}}
>
✏ Edit
</button>



<button
onClick={shareNote}
style={{
background:
"linear-gradient(135deg,#667eea,#764ba2)",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"10px"
}}
>
🤝 Share
</button>



<button
onClick={deleteNote}
style={{
background:
"linear-gradient(135deg,#ff416c,#ff4b2b)",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"10px"
}}
>
🗑 Delete
</button>


</div>

</div>
</div>
);

}

export default ViewNote;