const humbergur=document.getElementById("humbergur");
const navHumbergur=document.getElementById("nav-humbergur");
humbergur.addEventListener("click",()=>{
    navHumbergur.style.display="flex";  //to show humburger button
});
emailjs.init("867-xr3sYxilqte30");
const cartBox=document.getElementById("empty-cart");
const totalPrice=document.getElementById("total-price");
const buttons=document.querySelectorAll(".add-item"); //to select all buttons
let total=0;
let cartItems=[]; //to store items
for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",()=> {
        const serviceName=document.getElementById(`service-name${i}`).innerText;
        const servicePrice=document.getElementById(`service-price${i}`).innerText;
        const price=Number(servicePrice.replace(/[^\d]/g, ""));// replace will remove ,and currency sign,then chnage its data type using number()
        if(buttons[i].innerHTML.includes("Add Item")){ //to add items
            cartItems.push({
                id:i,
                name:serviceName,
                price:price
            });
            showCart();
            buttons[i].innerHTML=`Remove Item <i class="fa-solid fa-minus"></i>`;
            buttons[i].style.backgroundColor="rgba(220, 20, 60, 0.1)";
            buttons[i].style.color="rgba(220, 20, 60, 1)";
            let icon = buttons[i].querySelector("i"); //to chamge the color of border
            icon.style.border="1px solid rgba(220, 20, 60, 1)";
            total+=price;
            totalPrice.innerHTML=`₹${total}`;
        }
        else{//to remove item if already added
            cartItems=cartItems.filter(item=>item.id!==i);
           showCart();
            buttons[i].innerHTML=`Add Item <i class="fa-solid fa-plus"></i>`;
            buttons[i].style.backgroundColor="whitesmoke";
            buttons[i].style.color="#333";
            total-=price;
            totalPrice.innerHTML=`₹${total}`;
         }   
 });
}
function showCart(){//function defined to show data into the cart
   cartBox.innerHTML="";
    if(cartItems.length==0){
       cartBox.innerHTML=`<div class="empty-msg" id="empty-msg">
                            <i class="bi bi-info-circle"></i>
                            <h4>No items Added</h4>
                            <p>Add item to the Cart from the service bar</p>
                        </div>`;
                         return;
    }
    cartItems.forEach((item,index)=>{
     cartBox.innerHTML+=`<div class=cart-item>
                    <span>${index+1}</span>
                    <span class="item-name">${item.name}</span>
                    <span>₹${item.price}</span>
                </div>`
    });
}
const form=document.getElementById("form");
const bookNow=document.getElementById("book-now");
const nameU=document.getElementById("name");
const emailU=document.getElementById("email");
const phoneU=document.getElementById("phone");
const bookingContent=document.getElementById("booking-content");

form.addEventListener("submit",(e)=>{
    e.preventDefault();//stop page refresh
    if(total===0){
    bookingContent.innerHTML='<p class="red"><i class="bi bi-info-circle"></i> Add the items to the cart to book</p>';
        return;
    }
    sendEmail();
});
function sendEmail(){
    let services="";
    cartItems.forEach(item=>{
        services+=`
        ${item.name} -₹${item.price}\n`;
    });
    let template={
        user_name:nameU.value,
        user_email:emailU.value,
        user_phone:phoneU.value,order_items:services,
        total_amount:total
    };
    emailjs.send("service_mlw2zi7","template_37dyvgm",template)
    .then(()=>{
        bookingContent.innerHTML='<p class="green"><i class="bi bi-info-circle"></i> Email sent successfully</p>';   
        form.reset();
        setTimeout(()=>{
           bookingContent.innerHTML=`<p class="green">"Thankyou for booking the services, we will get back to you soon"</p>`;

        },2000);

    })
    .catch(function(error){
        bookingContent.innerHTML='<p class="red"><i class="bi bi-info-circle"></i> Email failed to send</p>';
        console.log(error);
    })
}