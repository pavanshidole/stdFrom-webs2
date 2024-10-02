const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}





const tempArr=(arr)=>{
    let result="";

    arr.forEach((std,i)=>{
        result+=`
                                    <tr id="${std.stdId}">
                                        <td>${i+1}</td>
                                        <td>${std.fname}</td>
                                        <td>${std.lname}</td>
                                        <td>${std.email}</td>
                                        <td>${std.contact}</td>
                                    </tr>
        
        
        
        `
    })

    stdContainer.innerHTML=result;


}


let stdArr=JSON.parse(localStorage.getItem("stdArr")) || [];

const onmsg=()=>{
    if(stdArr.length===0){
        info.classList.remove("d-none");
        card.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        card.classList.remove("d-none");
    }
}

onmsg();

if(stdArr.length > 0){
    tempArr(stdArr);
}


const createStd=(stdInfo)=>{
    let tr=document.createElement("tr");
    tr.id=stdInfo.id;

    tr.innerHTML=`
                
                     <td>${stdArr.length}</td>
                     <td>${stdInfo.fname}</td>
                     <td>${stdInfo.lname}</td>
                     <td>${stdInfo.email}</td>
                     <td>${stdInfo.contact}</td>
                                    
    `

    stdContainer.append(tr);
}


const onStdForm=(ele)=>{
    ele.preventDefault();

    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:uuid,
    }

    stdArr.push(stdObj);
    ele.target.reset();
  
    createStd(stdObj);
    onmsg();

    localStorage.setItem("stdArr",JSON.stringify(stdArr));

}









stdForm.addEventListener("submit", onStdForm);


