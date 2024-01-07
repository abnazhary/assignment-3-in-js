var nameInput = document.getElementById ("name")
var urlInput = document.getElementById ("url")
var addbtn = document.getElementById ("addbtn")
var tableBody = document.getElementById ("tableBody")

var BookMarks;

var MainIndex =0;

if(localStorage.getItem("BookMarks")==null){
    BookMarks=[];
}else{
    BookMarks = JSON.parse(localStorage.getItem("BookMarks"))
    displayBook(BookMarks)
}

var nameRegex = /^[A-za-z]{1,}$/

function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }
    else{
        return false;
    }
}



var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/

function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }
    else{
        return false;
    }
}

nameInput.onkeyup =function(){
    if(isUrlValid() && isNameValid() ){
        addbtn.removeAttribute("disabled");
    }else{
        addbtn.disabled = "true";
    }
}
urlInput.onkeyup =function(){
    if(isUrlValid() && isNameValid() ){
        addbtn.removeAttribute("disabled");
    }else{
        addbtn.disabled = "true";
    }
}

function addData (){
    if(addbtn.innerHTML=="Update"){
        addbtn.innerHTML="Submit"
        var BookMark ={
            name : nameInput.value ,
            url  : urlInput.value ,
        }
        BookMarks.splice(MainIndex,1,BookMark);
    
    
    }else{
        var BookMark ={
            name : nameInput.value ,
            url  : urlInput.value ,
        }
    
        BookMarks.push(BookMark)
    }

  
    // console.log(BookMarks)
    localStorage.setItem ("BookMarks", JSON.stringify (BookMarks) );
    displayBook(BookMarks);
    clearData()
    

}

function displayBook(anyArray){
    var cartona =``
  for(var i = 0 ; i < anyArray.length; i++){
    cartona += `
    
    <tr>
    <td>${anyArray[i].name}</td>
    <td><button class= "btn btn-primary">visit</button></td>
    <td><button onclick="UpdateBook(${i})" class= "btn btn-info">Update</button></td>
    <td><button onclick="DeleteBook(${i})" class= "btn btn-danger">Delete</button></td>
    </tr>
    `

}
tableBody.innerHTML = cartona;
}

function clearData(){
    nameInput.value ="";
    urlInput.value ="";
}

function DeleteBook(index){
    BookMarks.splice(index,1);
    localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
    displayBook(BookMarks);

}


function UpdateBook(index){
    nameInput.value = BookMarks[index].name;
    urlInput.value = BookMarks[index].url;
    addbtn.innerHTML = "Update"
     MainIndex = index;
}

function search(term){

    var wantedBook=[];
    for(var i = 0 ; i<BookMarks.length ; i++){
        if(BookMarks[i].name.toLowerCase().includes(term)){
            wantedBook.push(BookMarks[i])
        }
    }
    displayBook(wantedBook);
}