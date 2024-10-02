const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const snackbar=(title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:4000,
        confirmButtonColor:"#000",
    })
}

const onEdit=(ele)=>{
    let editId=ele.closest("tr").id;

    localStorage.setItem("editId", editId);

    let getObj=stdArr.find(std=>std.stdId===editId);

    console.log(getObj);
    console.log(editId);
    fnameControl.value=getObj.fname;
    lnameControl.value=getObj.lname;
    emailControl.value=getObj.email;
    contactControl.value=getObj.contact
  
    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

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
                                        <td><button class="btn editBtn btn-sm btn-outline-info" onclick="onEdit(this)">Edit</button></td>
                                        <td><button class="btn removeBtn btn-sm btn-outline-danger" onclick="onRemove(this)">Remove</button></td>
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
    tr.id=stdInfo.stdId;

    tr.innerHTML=`
                
                     <td>${stdArr.length}</td>
                     <td>${stdInfo.fname}</td>
                     <td>${stdInfo.lname}</td>
                     <td>${stdInfo.email}</td>
                     <td>${stdInfo.contact}</td>
                     <td><button class="btn editBtn btn-sm btn-outline-info" onclick="onEdit(this)">Edit</button></td>
                     <td><button class="btn removeBtn btn-sm btn-outline-danger" onclick="onRemove(this)">Remove</button></td>
                                    
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
        stdId:uuid(),
    }

    stdArr.push(stdObj);
    ele.target.reset();
  
    createStd(stdObj);
    onmsg();

    localStorage.setItem("stdArr",JSON.stringify(stdArr));

   

}


const onUpdateBtn=()=>{
    let updateId=localStorage.getItem("editId");

    

    let updateObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:updateId,
    }

    let getIndex=stdArr.findIndex(std=> std.stdId===updateId);

    stdArr[getIndex]=updateObj;

    localStorage.setItem("stdArr",JSON.stringify(stdArr));

    let list=[...document.getElementById(updateId).children];

    list[1].innerHTML=`${updateObj.fname}`;
    list[2].innerHTML=`${updateObj.lname}`;
    list[3].innerHTML=`${updateObj.email}`;
    list[4].innerHTML=`${updateObj.contact}`;

    updateBtn.classList.add("d-none");
    AddBtn.classList.remove("d-none");

    stdForm.reset();

    snackbar(`${updateObj.fname} info updated is SuccessFully!1` ,`success`);
    
}






stdForm.addEventListener("submit", onStdForm);
updateBtn.addEventListener("click", onUpdateBtn);


