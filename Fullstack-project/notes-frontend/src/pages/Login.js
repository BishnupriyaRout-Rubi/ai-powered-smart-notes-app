import API_BASE_URL from "../config";
import React,{useState}
from "react";

import {useNavigate}
from "react-router-dom";


function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();



const login = async()=>{

try{

const res=await fetch(
`${API_BASE_URL}/auth/login`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);


if(!res.ok){
alert("Login failed");
return;
}


const text=
await res.text();

if(!text){
alert("No response from server");
return;
}


const data=
JSON.parse(text);


if(data.token){

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"user",
email
);

alert(
"Login Successful ✅"
);

navigate("/");

}
else{

alert(
data.error
||
"Login failed"
);

}

}catch(err){

console.log(err);
alert("Server error");

}

};



return(
<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:
"linear-gradient(135deg,#667eea,#764ba2)"
}}>

<div style={{
background:"white",
padding:"30px",
borderRadius:"15px",
width:"320px",
textAlign:"center",
boxShadow:
"0 8px 25px rgba(0,0,0,0.3)"
}}>

<h2>
Welcome Back 👋
</h2>


<input
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)
}
style={{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px"
}}
/>



<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
style={{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px"
}}
/>



<button
onClick={login}
style={{
width:"100%",
padding:"10px",
background:"#667eea",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Login
</button>



<p style={{
marginTop:"15px"
}}>
Don’t have account?{" "}
<span
onClick={()=>
navigate("/signup")
}
style={{
color:"#667eea",
cursor:"pointer",
fontWeight:"bold"
}}
>
Signup
</span>
</p>



<p
onClick={()=>
navigate("/forgot")
}
style={{
color:"red",
cursor:"pointer"
}}
>
Forgot Password?
</p>


</div>
</div>
);

}

export default Login;