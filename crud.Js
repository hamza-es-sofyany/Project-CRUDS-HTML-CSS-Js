// get total
// creat product 
// save localstorage
// clear inputs
// read
//count
// delete
// update
// search
// clean data



let titel = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit'); 
let mood = 'Create';
let temp ;
 // star get total
 function gettotale(){
   if(price.value != ''){
      let result = (+price.value + +taxes.value + +ads.value)-
       +discount.value;
       total.innerHTML = result ;
       total.style.backgroundColor = '#040'


   }else{
      total.style.background = '#a00d02'
      total.innerHTML = ''
   }

 }


// end get total





// start // save localstorage
// start creat product 
let dataPro ;
if(localStorage.product != null){
   dataPro = JSON.parse(localStorage.product);
}else {
   dataPro = [];
}

submit.onclick = function(){
   newPro ={
      titel : titel.value.toLowerCase(),
      price : price.value,
      taxes : taxes.value,
      ads : ads.value,
      discount : discount.value,
      total : total.innerHTML,
      count : count.value,
      category : category.value.toLowerCase(),

   
   }
   if(mood === 'Create'){
      if(newPro.count>1){
         for(let i = 0;i<newPro.count;i++){
            dataPro.push(newPro);
         }
      }else{
         dataPro.push(newPro);
   
      }

   }else{
      dataPro[temp] = newPro;
      mood = 'Create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
   }
  
   


   localStorage.setItem('product', JSON.stringify(dataPro) )
   clearData()
   showData()

}

// end creat product 

//  end // save localstorage


// start clear inputs
 function clearData(){
   titel.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';

 }
//  end cle ar inputs





//  start read
function showData(){
   gettotale()
   let table = '';
   for(let i=0; i<dataPro.length; i++){
      table += `
       <tr>
                     <td>${i + 1}</td>
                     <td>${dataPro[i].titel}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
               <td><button onclick='updateData( ${i} )'  id="update">update</button></td>
               <td><button  onclick='deleteData( ${i} )' id="deletedata">delete</button></td>
                           </tr>       
      `;
   }
   
   document.getElementById('tbody').innerHTML = table;
   let btndelete = document.getElementById('deledAll')
   if(dataPro.length>0){
      btndelete.innerHTML = `
      <button onclick='deleteAll()'>deleteAll (${dataPro.length})</button>

      `
   }else{
      btndelete.innerHTML = '';
   }

}
showData()
   
//  end read


//  start count
// start delete
function deleteData(i){
   dataPro.splice(i,1);
   localStorage.product = JSON.stringify(dataPro);
   showData()
  

}

function deleteAll(){
 localStorage.clear()
dataPro.splice(0)
showData()


}
// end delete
//  end count


// start update
function updateData(i){
   titel.value = dataPro[i].titel;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   gettotale()

   count.style.display = 'none';
   category.value = dataPro[i].category;
   submit.innerHTML = 'Update';
   mood = 'Update';
   temp = i;
   scroll({
      top : 0,
      behavior : 'smooth'

   })



}



// end update



//  start search
let searchMood = 'title';
 

function geatSearchMood(id){
   let search = document.getElementById('search');
    if(id === 'searchtitel'){
      searchMood = 'title';
    
    }else{
      searchMood = 'category';

   
    }
    search.placeholder='Search By ' + searchMood;
    search.focus();
    search.value = '';
    searchData()

}

function searchData(value){
   let table = ''
   if(searchMood === 'title'){
     for(let i=0 ;i<dataPro.length ; i++){
   if(dataPro[i].titel.includes(value.toLowerCase())){ 
      table +=  `
      <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
              <td><button onclick='updateData( ${i} )'  id="update">update</button></td>
              <td><button  onclick='deleteData( ${i} )' id="deletedata">delete</button></td>
                          </tr>       
     `;

   }



   }




   }else{
      for(let i=0 ;i<dataPro.length ; i++){
         if(dataPro[i].category.includes(value.toLowerCase())){ 
            table +=  `
            <tr>
                          <td>${i}</td>
                          <td>${dataPro[i].titel}</td>
                          <td>${dataPro[i].price}</td>
                          <td>${dataPro[i].taxes}</td>
                          <td>${dataPro[i].ads}</td>
                          <td>${dataPro[i].discount}</td>
                          <td>${dataPro[i].total}</td>
                          <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData( ${i} )'  id="update">update</button></td>
                    <td><button  onclick='deleteData( ${i} )' id="deletedata">delete</button></td>
                                </tr>       
           `;
      
         }
      
      
      
         }

   }
   document.getElementById('tbody').innerHTML = table;

}


//  end search


// start clean data

//  end clean data
