if('serviceWorker' in navigator){
navigator.serviceWorker.register('service-worker.js');
}

function toggleMenu(){
let m=document.getElementById("menu");
m.style.left=m.style.left==="0px"?"-200px":"0px";
}

function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.style.display="none");
document.getElementById(id).style.display="block";
toggleMenu();
}
showPage("home");

function saveMedicine(){

let name=document.getElementById("name").value;
let dose=document.getElementById("dose").value;
let time=document.getElementById("time").value;
let tablets=parseInt(document.getElementById("tablets").value);

if(!name||!dose||!time||!tablets){
alert("Fill all fields");
return;
}

let data={name,dose,time,tablets};
localStorage.setItem("medicine",JSON.stringify(data));

scheduleReminder(data);

alert("Reminder Set Successfully");
}

function scheduleReminder(data){

Notification.requestPermission();

let delay=new Date(data.time).getTime()-Date.now();

if(delay>0){
setTimeout(()=>{
navigator.serviceWorker.ready.then(reg=>{
reg.showNotification("💊 "+data.name+" ("+data.dose+")",{
body:"Please take your medicine",
actions:[
{action:"taken",title:"Taken"},
{action:"missed",title:"Not Taken"}
],
requireInteraction:true
});
});
},delay);
}
}

navigator.serviceWorker.addEventListener("message",function(e){

if(e.data.type==="SAVE"){
let history=JSON.parse(localStorage.getItem("history"))||[];
history.push(e.data.record);
localStorage.setItem("history",JSON.stringify(history));
displayHistory();
}
});

function displayHistory(){
let history=JSON.parse(localStorage.getItem("history"))||[];
let list=document.getElementById("historyList");
list.innerHTML="";
history.forEach(h=>{
list.innerHTML+="<li>"+h+"</li>";
});
}