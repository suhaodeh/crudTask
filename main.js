const name = document.querySelector("#courseName");
const price = document.querySelector("#coursePrice");
const category = document.querySelector("#courseCategory");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addbtn = document.querySelector("#click");
const invalidName= document.querySelector(".invalid-name");
const invalidCategory= document.querySelector(".invalid-category");
const invalidPrice =document.querySelector(".invalid-price");
const invalidDescription= document.querySelector(".invalid-description");
const invalidCapacity= document.querySelector(".invalid-capacity");

const deleteBtn =document.querySelector("#deleteBtn");
const search= document.querySelector("#search");
let courses =[];
if(localStorage.getItem("courses")!=null){
    courses=JSON.parse(localStorage.getItem("courses"));
    displaycourses();
}

addbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let isValid = true;
    const namepattern= /^[A-Z][a-z]{2,10}[0-9]{0,2}$/;
    console.log(namepattern.test(name.value)) ;
    if(!namepattern.test(name.value)){
      
       invalidName.innerHTML="this name is invalid ,it must start with a capital letter acd contain 2-10 char small letter"
       name.classList.add("is-invalid");
       isValid=false;
    }else{
        invalidName.innerHTML="";
name.classList.remove("is-invalid");
name.classList.add("is-valid");

    }

    const categoryPattern = /^[A-Z][a-z]{2,3}$/;
   
    if(!categoryPattern.test(category.value)){
      
        invalidCategory.innerHTML="this category is invalid ,it must start with a capital letter acd contain 2-3 char small letter"
       category.classList.add("is-invalid");
       isValid=false;
    }else{
        invalidCategory.innerHTML="";
category.classList.remove("is-invalid");
category.classList.add("is-valid");
    }


    const pricePattern= /(800|8[0-9][0-9]|9[0-9][0-9]|1[0-9]{3}|2000)/;
    console.log(pricePattern.test(price.value)) ;
    if(!pricePattern.test(price.value)){
      
       invalidPrice.innerHTML="price must start from 800 to 2000"
       price.classList.add("is-invalid");
       isValid=false;
    }else{
        invalidPrice.innerHTML="";
price.classList.remove("is-invalid");
price.classList.add("is-valid");
    }
    const descriptionPattern = /^[A-Z][a-z]{0,99}/;
    console.log(descriptionPattern.test(description.value)) ;
    if(!descriptionPattern.test(description.value)){
      
       invalidDescription.innerHTML="description must start with capital latter then small latars ,the number of char. does not exceed 100. "
       description.classList.add("is-invalid");
       isValid=false;
    }else{
        invalidDescription.innerHTML="";
description.classList.remove("is-invalid");
description.classList.add("is-valid"); 
    }


    const capacityPattern = /(2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|70)/;
    console.log(capacityPattern.test(capacity.value)) ;
    if(!capacityPattern.test(capacity.value)){
      
       invalidCapacity.innerHTML="capacity must start from 20 to 70"
       capacity.classList.add("is-invalid");
       isValid=false;
    }else{
        invalidCapacity.innerHTML="";
capacity.classList.remove("is-invalid");
capacity.classList.add("is-valid"); 
    }




   if (isValid){
    const course = {
        name:name.value,
        category :category.value,
        price:price.value,
        description:description.value,
        capacity:capacity.value,
    }



    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });

   

    
displaycourses();

    }
          
});


function displaycourses(){
    const result = courses.map((course,index)=>{
        return`
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
         <td>${course.category}</td>
          <td>${course.price}</td>
           <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
            <button class='btn btn-danger' onclick='deleteCourse(${index})'>delete</button>
            </td>
        </tr>`;
    }).join('');
    document.querySelector("#data").innerHTML=result;

}
function deleteCourse(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
  localStorage.setItem("courses",JSON.stringify(courses));
  displaycourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
  
}
search.addEventListener("input",(e)=>{
    const keyword = search.value;
   const courseresult = courses.filter((course)=>{
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    });
    const result = courseresult.map((course,index)=>{
        return`
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
         <td>${course.category}</td>
          <td>${course.price}</td>
           <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
            <button class='btn btn-danger' onclick='deleteCourse(${index})'>delete</button>
            </td>
        </tr>`;
    }).join('');
    document.querySelector("#data").innerHTML=result;
});

 deleteBtn.addEventListener("click",()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
    
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          courses = [];
  localStorage.setItem("courses",JSON.stringify(courses));
  displaycourses();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

});