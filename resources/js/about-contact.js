emailjs.init("867-xr3sYxilqte30");
const form=document.getElementById("form");
const nameU=document.getElementById("name");
const emailU=document.getElementById("email");
const msg=document.getElementById("msg");
const subscribe=document.getElementById("subscribe-btn");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=nameU.value;
    let email=emailU.value;
    if(name==""||email==""){
        msg.innerText="Please fill all the fields";
        msg.style.color="red";
        return;
    }
    let temp={
        name:name,
        email:email
    };
    emailjs.send(
        "service_mlw2zi7",
       "template_1fui79h",
       temp
    )
    .then((respone)=>{
        msg.innerText="Subscribed successfully";
        msg.style.color="green";
        nameU.value="";
        emailU.value="";
    })
    .catch((error)=>{
        msg.innerText="Something went wrong";
        msg.style.color="red";
        console.log("error");
    })
});