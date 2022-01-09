var socket = io('http://localhost:8000/', { transports: ['websocket', 'polling', 'flashsocket'] });
var x=document.getElementById('container');
var y=document.getElementById('screen_chat1')
var form1=document.getElementById('form1')
var form2=document.getElementById('form2')
var z=document.getElementById('screen_chat')
var w=document.querySelector('.joined_massage')
var massageInp=document.getElementById('input');
var btn=document.querySelector('.btn');
var name1;

var audio =new Audio('ting.mp3');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    name1=document.getElementById('fname').value;
    socket.emit('cut', name1);
    document.location.reload(true);
})
form2.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("hello")
    y.style.display = "block";
    x.style.display = "none";
    name1=document.getElementById('fname').value;
    socket.emit('new-user-joined', name1);
});
const append=(massage,position) =>{
    var massageElement=document.createElement('div');
    massageElement.innerHTML=massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    z.append(massageElement);
    if(position=='left')
    {
        audio.play();
    }
}
const append1=(massage) =>{
    var massageElement=document.createElement('div');
    massageElement.innerHTML=massage;
    massageElement.classList.add('joined_massage');
    z.append(massageElement);
}
form1.addEventListener('submit',(e)=>{
    e.preventDefault();
    const massage=massageInp.value;
    append( `You: ${massage}`,'right')
    socket.emit('send',massage);
    massageInp.value='';
})

socket.on('user-joined',name1 =>{
    append1( `${name1}  joined the chat`)
})

socket.on('receive',data =>{
    append( `${data.name}:${data.massage}`,'left');
})
socket.on('left',data =>{
    append1( `${data} left`);
})

