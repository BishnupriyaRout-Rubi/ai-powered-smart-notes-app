import React,{useEffect,useState} from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import {
useParams,
useNavigate
} from "react-router-dom";

function EditNote(){

const {id}=useParams();
const navigate=useNavigate();

const [notification,setNotification]=useState("");

const [note,setNote]=useState({
title:"",
content:""
});


/* Fetch Note */
useEffect(()=>{

const token=localStorage.getItem("token");

fetch(
`${process.env.REACT_APP_API_URL}/notes/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

setNote({
...data,
title:data.title
? data.title.replace(/<[^>]*>/g,"")
: "",

content:data.content
? data.content.replace(/<[^>]*>/g,"")
: ""
});

})
.catch(err=>console.log(err));

},[id]);



/* 🔥 WebSocket Debug */
useEffect(()=>{

const client = new Client({

webSocketFactory:()=>new SockJS(
"http://localhost:8080/ws"
),

onConnect:()=>{

console.log(
"✅ WEBSOCKET CONNECTED"
);

client.subscribe(
`/topic/notes/${id}`,
(message)=>{

console.log(
"📩 MESSAGE RECEIVED:",
message.body
);

setNotification(
message.body
);

alert(
"🔔 "+message.body
);

}
);

},

onStompError:(frame)=>{
console.error(
"STOMP ERROR:",
frame
);
},

onWebSocketError:(err)=>{
console.error(
"SOCKET ERROR:",
err
);
}

});

client.activate();

return ()=>{
client.deactivate();
};

},[id]);



/* Update */
const updateNote=()=>{

const token=
localStorage.getItem("token");

fetch(
`${process.env.REACT_APP_API_URL}/notes/${id}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${token}`
},

body:JSON.stringify(note)
}
)
.then(()=>{

console.log(
"NOTE UPDATED API HIT"
);

alert("Updated ✅");

/* comment this for testing */
 // navigate("/");

});

};



return(
<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>

<div style={{
background:"rgba(255,255,255,0.15)",
backdropFilter:"blur(15px)",
padding:"35px",
borderRadius:"20px",
width:"500px",
boxShadow:
"0 8px 30px rgba(0,0,0,0.35)"
}}>

<h1 style={{
textAlign:"center",
color:"white"
}}>
✏ Edit Note
</h1>


<input
value={note.title}
onChange={(e)=>
setNote({
...note,
title:e.target.value
})
}
placeholder="Title"
style={{
width:"100%",
padding:"15px",
borderRadius:"12px",
border:"none",
marginTop:"20px"
}}
/>


<textarea
value={note.content}
onChange={(e)=>
setNote({
...note,
content:e.target.value
})
}
style={{
width:"100%",
height:"220px",
marginTop:"20px",
padding:"15px",
borderRadius:"12px",
border:"none"
}}
/>


{notification && (
<p style={{
background:"#fff3cd",
padding:"12px",
borderRadius:"10px",
marginTop:"15px"
}}>
🔔 {notification}
</p>
)}


<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:"25px"
}}>

<button
onClick={()=>navigate(-1)}
style={{
background:"#888",
color:"white",
border:"none",
padding:"12px 20px",
borderRadius:"10px"
}}
>
⬅ Back
</button>


<button
onClick={updateNote}
style={{
background:
"linear-gradient(135deg,#43e97b,#38f9d7)",
border:"none",
padding:"12px 20px",
borderRadius:"10px"
}}
>
💾 Update
</button>

</div>

</div>
</div>
);

}

export default EditNote;