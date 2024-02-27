let title=document.getElementById("title");
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("sumbit");

let mode="create";
let tmp;
//get total
function gettotal(){
   if(price.value!=""){
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.backgroundColor="green";
   }else{
    total.style.backgroundColor="red";
   }
}

// create product
//save local storage
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}
submit.onclick=()=>{
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value!="" && price.value!="" && count!="" && category.value!="" && newpro.count<100){  
        if(mode=="create"){
            if(newpro.count>1){
                let count=newpro.count;
                while(count>1){
                    datapro.push(newpro)
                    count--;
                }   
            }
            datapro.push(newpro)
        }else{
            datapro[tmp]=newpro;
            mode="create";
            submit.innerHTML="create";
            count.style.display="block";
        }
        cleardata();
    }
    //save to local storage
    localStorage.setItem('product',JSON.stringify(datapro));
    showdata();
}
//clear inputs
function cleardata(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
//read 
function showdata(){
    gettotal();
    table="";
    let btndelete=document.getElementById('deleteall');
    for(let i=0;i<datapro.length;i++){
        table+=`
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr>
            `;
        document.getElementById('tbody').innerHTML=table;
        if(datapro.length > 0){
            btndelete.innerHTML=`
                <button onclick="deleteall()">Delete All (${datapro.length})</button>
            `
        }
    }
    if(datapro.length==0){
        document.getElementById('tbody').innerHTML=table;
        btndelete.innerHTML='';
    }
}
showdata();

//delete
function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata();
}
function deleteall(){
    datapro.splice(0);
    localStorage.clear()
    showdata();
}
//update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    count.style.display="none";
    submit.innerHTML=`Update`
    gettotal();
    mode="update";
    tmp=i;
    window.scroll({
        top:0,
        behavior:"smooth"
    })
}
//search
let searchmode="title";
function getsearchmode(id){
    let search=document.getElementById("search");
    if(id=="searchTitle"){
        searchmode='title';
    }else{
        searchmode='category';
    }
    search.focus()
    search.placeholder=`search by ${searchmode}`
    search.value="";
    showdata();
}
function searchdata(value){
    console.log(value);
    let table='';
    for(let i=0;i<datapro.length;i++){
        if(searchmode=="title"){
            if(datapro[i].title.includes(value.toLowerCase())){
                table+=`
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updatedata(${i})" id="update">update</button></td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                        </tr>
            `;}
        }else{
            if(datapro[i].category.includes(value)){
                table+=`
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updatedata(${i})" id="update">update</button></td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                        </tr>
            `;
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
