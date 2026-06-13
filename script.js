let dropArea=document.getElementById("drop-area");
let fileInput=document.getElementById("fileInput");
let preview=document.getElementById("preview");
let progress=document.getElementById("progress-bar");
let error=document.getElementById("error");

function openFile(){
fileInput.click();
}

fileInput.addEventListener("change",function(){
uploadFile(this.files[0]);
});

dropArea.addEventListener("dragover",(e)=>{
e.preventDefault();
});

dropArea.addEventListener("drop",(e)=>{
e.preventDefault();

let file=e.dataTransfer.files[0];

uploadFile(file);
});

function uploadFile(file){

error.innerHTML="";

if(
file.type!="image/jpeg" &&
file.type!="image/png" &&
file.type!="image/gif"
){
error.innerHTML="Only JPG PNG GIF allowed";
return;
}

let count=0;

let interval=setInterval(()=>{

count+=10;

progress.style.width=count+"%";

if(count>=100){

clearInterval(interval);

let reader=new FileReader();

reader.onload=function(){

preview.src=reader.result;

preview.style.display="block";

/* Save to localStorage */

localStorage.setItem(
"savedImage",
reader.result
);

};

reader.readAsDataURL(file);

}

},200);

}

/* Load after refresh */

window.onload=function(){

let img=localStorage.getItem(
"savedImage"
);

if(img){

preview.src=img;

preview.style.display="block";

}

};