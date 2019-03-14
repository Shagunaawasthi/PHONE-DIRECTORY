window.onload= function(){
     var quickaddbtn =document.getElementById("quickadd");
     var quickaddformdiv = document.querySelector(".quickadd_forms");
     var cancelbtn= document.getElementById("cancel");
     var addbtn= document.getElementById("add");
     var fullName = document.getElementById("name");
     var phoneNo = document.getElementById("phone");
     var addressbookdiv = document.querySelector(".add_book");
     console.log(addressbookdiv);
      var addBook=[];
      quickaddbtn.addEventListener("click",function(){
           quickaddformdiv.style.display="block";
      });
      cancelbtn.addEventListener("click",function(){
         quickaddformdiv.style.display="none";
    }); 
       addbtn.addEventListener("click",addToBook);
       addressbookdiv.addEventListener("click",remove);
     
       function addToBook(){
           var isNull = fullName.value!='' && phoneNo.value!='';
           
            var valid = isNaN(fullName.value) && !isNaN(phoneNo.value);
                
             if(isNull&&valid){
                   var obj = {
                         fullName : fullName.value,
                         phoneNo : phoneNo.value,
                    }
                 console.log(obj);
                 addBook.push(obj);
                 localStorage['addIt']=JSON.stringify(addBook) ;
                 //hide
                 quickaddformdiv.style.display="none";
                 //empty form
                  clearForm();
                  //update
                  showAddBook();
             } 
             else{
                alert("Invalid Name or Number Format");
             }
         
         }
         function remove(e){
          if(e.target.classList.contains("delBut")){
             var remId= e.target.getAttribute("data-id");
                  
             var books = localStorage.getItem('addIt');
             books = JSON.parse(books);
             books.splice(remId,1);
               
          localStorage['addIt']=JSON.stringify(books);
             showAddBook();
              }
         }
      function clearForm(){
          var form = document.querySelectorAll(".form_field");
          for(var i in form){
              form[i].value='';
          }
      }
      function showAddBook(){
          //already exist
          if(localStorage['addIt']=== undefined){
              localStorage['addIt']="[]";
          } else{
              addBook= JSON.parse(localStorage['addIt']);
              addressbookdiv.innerHTML='';
              console.log(addBook);
              for( var n in addBook){
                   var str = '<div class="entry">';
                   str += '<div class= "name"><p style ="font-size:20px;font-family:Sniglet, cursive;text-align:left;"> <strong>Name : '+addBook[n].fullName +'</strong></p></div>';
                   str += '<div class="phone"><p style ="font-size:20px;font-family:Sniglet, cursive;text-align:left;"> <strong> Phone : '+addBook[n].phoneNo+ '</strong></p></div>';
                   str +='<div class="del"><button style="border-radius:6px;font-size:15px;" class="delBut" data-id=  "' + n + '">Delete</button></div>'            
                   str +='</div>';
                   addressbookdiv.innerHTML += str;
                 }
          }
      }
      showAddBook();
 };