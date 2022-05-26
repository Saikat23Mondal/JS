var selectedRow = null
let formdatas =[];
let flag;

function onFormSubmit(e) {
	event.preventDefault();

    if(validate()){
         formData  = readFormData();
        
        if (selectedRow == null){
         
            insertNewRecord(formData);
		}
        resetForm();   
    } 
}

//Retrieve the data
function readFormData() {

    var formData = {
    product: document.getElementById("product").value,
    perPrice:document.getElementById("perPrice").value,
    myList: document.getElementById("lang").value
    }
    formdatas.push(formData);
    console.log(formdatas);
    const groupedFormData = groupBy(formdatas, 'myList');
    console.log(groupedFormData);
    return groupedFormData;
    
}

//Insert the data
function insertNewRecord(data) {
    var cpu = data.Cpu;
    
   
    // var motherboard=
    // var ram=
    // var gpu=
   
    
    if(flag){
        document.getElementById("tdata").remove(); 
        flag=false;
        
      }
      
    // for(let i=0;i<cpu.length;i++){
    //     var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    //     var newRow = table.insertRow(table.length);  
    //     console.log(cpu[i]);
        
    
    // cell1 = newRow.insertCell(0);
	// 	cell1.innerHTML = cpu[i].product;
    // cell2 = newRow.insertCell(1);
	// 	cell2.innerHTML = cpu[i].myList;
    //     if (cpu[i].perPrice >= 100) {
    //         cell3 = newRow.insertCell(2);
    //         cell3.innerHTML=cpu[i].perPrice;
    //         cell3.style.color="red"
    //       }
    //       else{
    //         cell3 = newRow.insertCell(2);
    //         cell3.innerHTML=cpu[i].perPrice;
    //         cell3.style.color="blue"
          
    //       }

   
    // cell4 = newRow.insertCell(3);
    //     cell4.innerHTML = `<button onClick="onDelete(this)">Delete</button>`;
      
    // }
    // flag= true
    
	buildTable(cpu)




}
function buildTable(data){
    var table = document.getElementById('tdata')
    
    
      console.log(data.length);
      var tData = document.getElementById("tdata").length;
      console.log(tData);  
      for(let i=0;i<tData-1;i++){
          deleteCell(i)
      }
      
    for (var i = 0; i < data.length; i++){
        if(data.perPrice>=100){
            var row = `<tr id="tableData">
                        <td>${data[i].myList}</td>
                        <td>${data[i].product}</td>
                        <td style="background-color:red">${data[i].perPrice}</td>
                        <td><button onClick="onDelete(this)">Delete</button></td>
                  </tr>`
        table.innerHTML += row
        }
        else{
            var row = `<tr  id="tableData">
            <td>${data[i].myList}</td>
            <td>${data[i].product}</td>
            <td style="bacground-color:blue">${data[i].perPrice}</td>
            <td><button onClick="onDelete(this)">Delete</button></td>
      </tr>`
        table.innerHTML += row
        }
        


    }
}

function deleteCell(id){
    // var row = document.getElementById("id");
    // row.deleteCell(position);
    row = id.parentElement;
    document.getElementById('storeList').deleteRow(row);
    
}


//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("product").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}
function validate() {
    isValid = true;
    if (document.getElementById("product").value == "" && document.getElementById("perPrice").value == "") {
        isValid = false;
        document.getElementById("itemNameValidation").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("itemNameValidation").classList.contains("hide"))
            document.getElementById("itemNameValidation").classList.add("hide");
    }
    return isValid;
}
function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }
