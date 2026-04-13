let balance = 0;
let orders = [];

function login(){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("dashboard").style.display="block";
}

function addMoney(){
  let amount = parseInt(prompt("Enter amount (20-5000)"));

  if(amount < 20 || amount > 5000){
    alert("Invalid amount");
    return;
  }

  fetch("http://localhost:3000/create-order",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({amount})
  })
  .then(res=>res.json())
  .then(data=>{
    var options = {
      key: "rzp_live_Sc966IkaNDTRPy",
      amount: data.amount,
      order_id: data.id,

      handler: function (){
        balance += amount;
        wallet.innerText = balance;
        alert("Payment success");
      }
    };

    new Razorpay(options).open();
  });
}

function buy(service,country,price){
  if(balance < price){
    alert("Low balance");
    return;
  }

  balance -= price;
  wallet.innerText = balance;

  let order = {service,country,price,status:"Pending"};
  orders.push(order);

  loadOrders();
}

function loadOrders(){
  let box = document.getElementById("orders");
  box.innerHTML = "";

  orders.forEach(o=>{
    box.innerHTML += `${o.service} ${o.country} ₹${o.price} - ${o.status}<hr>`;
  });
}
