import API_BASE_URL from "../config";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

function ForgotPassword(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const validatePassword=(password)=>{
 return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
 .test(password);
};

const resetPassword = async ()=>{

 if(!email||!password){
   alert("All fields required");
   return;
 }

 if(!validatePassword(password)){
   alert(
"Password needs uppercase lowercase and number"
   );
   return;
 }

 const res=await fetch(
 `${API_BASE_URL}/auth/forgot`,
 {
  method:"PUT",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   email,
   password
  })
 }
 );

 const data=await res.text();

 alert(data);

 if(data==="Password updated successfully!"){
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
"linear-gradient(135deg,#ff7e5f,#feb47b)"
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

<h2>Reset Password 🔐</h2>

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
placeholder="New Password"
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
Must contain uppercase lowercase
and number
</p>

<button
onClick={resetPassword}
style={{
width:"100%",
padding:"10px",
background:"#ff7e5f",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Update Password
</button>

<p style={{marginTop:"15px"}}>
Back to{" "}
<span
onClick={()=>navigate("/login")}
style={{
color:"#ff7e5f",
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

export default ForgotPassword;