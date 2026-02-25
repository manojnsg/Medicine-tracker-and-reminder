self.addEventListener("notificationclick",function(event){

event.notification.close();

let status=event.action==="taken"?"Taken":"Not Taken";
let record=event.notification.title+" - "+status+" at "+new Date().toLocaleString();

event.waitUntil(
clients.matchAll({type:"window"}).then(clientsArr=>{
if(clientsArr.length>0){
clientsArr[0].postMessage({
type:"SAVE",
record:record
});
}
})
);

});