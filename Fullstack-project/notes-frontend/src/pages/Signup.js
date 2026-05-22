import API_BASE_URL from "../config";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const navigate=useNavigate();


const validatePassword=(password)=>{
 return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
 .test(password);
};


const signup = async ()=>{

if(!email||!password||!confirmPassword){
 alert("All fields required");
 return;
}

if(!validatePassword(password)){
 alert(
"Password needs uppercase, lowercase and number"
 );
 return;
}

if(password!==confirmPassword){
 alert("Passwords do not match");
 return;
}

const res = await fetch(
`${API_BASE_URL}/auth/signup`,
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

const data = await res.text();

alert(data);

if(
data==="User registered successfully!"
){
 navigate("/login");
}

};



return(
<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:
"linear-gradient(135deg,#43cea2,#185a9d)"
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

<h2>Create Account 🚀</h2>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px"
}}
/>

<input
type="password"
placeholder="Create Password"
value={password}
onChange={(e)=>setPassword(
e.target.value
)}
style={{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px"
}}
/>

<p style={{
fontSize:"12px",
color:"gray"
}}>
Password must contain uppercase,
lowercase and number
</p>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(
e.target.value
)}
style={{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px"
}}
/>

<button
onClick={signup}
style={{
width:"100%",
padding:"10px",
background:"#43cea2",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Signup
</button>

<p style={{marginTop:"15px"}}>
Already have account?{" "}
<span
onClick={()=>navigate("/login")}
style={{
color:"#185a9d",
cursor:"pointer",
fontWeight:"bold"
}}
>
Login
</span>
</p>

</div>
</div>
);

}

export default Signup;