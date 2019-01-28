var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "blood-bank-shary.appspot.com",

    messagingSenderId: "297535555782"
  };
  firebase.initializeApp(config);

  

  function signOutFun(){

    firebase.auth().signOut()
    .then((success)=>{
      localStorage.setItem('userObj',JSON.stringify({user:null}))

      localStorage.setItem('currentUserId',null)
      // history.back(2);

      window.location.href='../pages/signIn.html'

    })
    .catch((error)=>{

var errMsg=error.message;
alert(errMsg)
    });

  }



  function loadFun(){

    document.getElementById('loaderDiv').style.display='none';

    let userUid=localStorage.getItem('currentUserId')
    console.log(userUid)
    if(userUid!==null){
     

    
    

    firebase.database().ref("users/" + userUid)
    .once("value",(data)=>{
      var userObj=data.val();

    if(userObj.usertype=='donor'){
      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();
        
      

        
     
     
     
       

        for (var key in objData) {
          if(objData[key].usertype=='acceptor')
          {
            if(objData[key].userImg==undefined)
            {
              console.log(objData[key].userImg)
              objData[key].userImg="../images/emptyUser.png"
              
            }

            
            document.getElementById('acceptors').innerHTML+=
            `
            <div class="col-md-6" style='border: 2px solid white'>
         <div class="col-md-4 text-center">
             <img src="${objData[key].userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
         </div>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div class="col-md-8">
             <div class="userInfo">
                 <p><span class="bold">Email:</span> ${objData[key].email}</p>
                 <p><span class="bold">Name:</span> ${objData[key].fullName}</p>
                 <p><span class="bold">Gender:</span> ${objData[key].gender}</p>
                 <p><span class="bold">Contact No:</span> ${objData[key].phNo}</p>
                 <p><span class="bold">Blood Type:</span> ${objData[key].bldGrpSlct}</p>
                 <p><span class="bold">User Type:</span> ${objData[key].dob}</p>
                 <p><span class="bold">Address:</span> ${objData[key].address}</p>
                     
             </div>
         </div>
     </div>
 
     
     `

          }
            
          
        }
      })



    }
    else{
      var status='0';


      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();

        for (var key in objData) {

          if(objData[key].usertype=='donor')
          {  
                if(objData[key].userImg==undefined)
              {
                console.log(objData[key].userImg)
                objData[key].userImg="../images/emptyUser.png"
                
              }
                  

           checkStatus(key); 
var statusBool=localStorage.getItem('available')
console.log(statusBool)
            if(statusBool==='true')
            {
              status="Available for donation"
      
            }
            else {
              status="Not Avaiable for Donation"
            }

            document.getElementById('donors').innerHTML+=
           `
           <div class="col-md-6" style='border: 2px solid white'>
        <div class="col-md-4 text-center">
            <img src="${objData[key].userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
        </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="col-md-8">
            <div class="userInfo">
                <p><span class="bold">Email:</span> ${objData[key].email}</p>
                <p><span class="bold">Name:</span> ${objData[key].fullName}</p>
                <p><span class="bold">Gender:</span> ${objData[key].gender}</p>
                <p><span class="bold">Contact No:</span> ${objData[key].phNo}</p>
                <p><span class="bold">Blood Type:</span> ${objData[key].bldGrpSlct}</p>
                <p><span class="bold">User Type:</span> ${objData[key].dob}</p>
                <p><span class="bold">Address:</span> ${objData[key].address}</p>
                    
            </div>
        </div>
    </div>

    
    `

           
 
          }
         

          
        }
      })



    }

    })

  }
  else{
    alert('lg gay')
    window.location.href='../pages/signIn.html'
  }


  }








  function bldGrpSearch2(){//for donors

    var bldGrp=document.getElementById('bldGrp').value;
    bldGrp.innerHTML=''
    console.log(bldGrp)

    document.getElementById('acceptors').innerHTML=''


    

    let userUid=localStorage.getItem('currentUserId')
    console.log(userUid)

    firebase.database().ref("users/" + userUid)
    .once("value",(data)=>{
      var userObj=data.val();

    if(userObj.usertype=='donor'){
      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();

        
        for (var key in objData) {
          if(objData[key].usertype=='acceptor')
          {
            if(objData[key].userImg==undefined)
            {
              console.log(objData[key].userImg)
              objData[key].userImg="../images/emptyUser.png"
              
            }

      if(objData[key].bldGrpSlct==bldGrp){
            document.getElementById('acceptors').innerHTML+=
            `
            <div class="col-md-6" style='border: 2px solid white'>
         <div class="col-md-4 text-center">
             <img src="${objData[key].userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
         </div>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div class="col-md-8">
             <div class="userInfo">
                 <p><span class="bold">Email:</span> ${objData[key].email}</p>
                 <p><span class="bold">Name:</span> ${objData[key].fullName}</p>
                 <p><span class="bold">Gender:</span> ${objData[key].gender}</p>
                 <p><span class="bold">Contact No:</span> ${objData[key].phNo}</p>
                 <p><span class="bold">Blood Type:</span> ${objData[key].bldGrpSlct}</p>
                 <p><span class="bold">User Type:</span> ${objData[key].dob}</p>
                 <p><span class="bold">Address:</span> ${objData[key].address}</p>
                     
             </div>
         </div>
     </div>
 
     
     `
            }

           
           
          }
            
          
        }

        if(document.getElementById('acceptors').innerHTML==''){
          document.getElementById('acceptorDiv').innerHTML=
          `
          <h1>Sorry  No Match Found</h1>
          `

        }
      })



    }

   
    })


  }


  

  function bldGrpSearch1(){

    var bldGrp=document.getElementById('bldGrp').value;
    bldGrp.innerHTML=''
    console.log(bldGrp)

    document.getElementById('donors').innerHTML=''
    

    let userUid=localStorage.getItem('currentUserId')
    console.log(userUid)

    firebase.database().ref("users/" + userUid)
    .once("value",(data)=>{
      var userObj=data.val();

    if(userObj.usertype=='acceptor'){
      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();

        
        for (var key in objData) {
          if(objData[key].usertype=='donor')
          {
            if(objData[key].userImg==undefined)
            {
              console.log(objData[key].userImg)
              objData[key].userImg="../images/emptyUser.png"
              
            }

            console.log(objData[key].email)
      if(objData[key].bldGrpSlct==bldGrp){
            document.getElementById('donors').innerHTML+=
            `
            <div class="col-md-6" style='border: 2px solid white'>
         <div class="col-md-4 text-center">
             <img src="${objData[key].userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
         </div>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div class="col-md-8">
             <div class="userInfo">
                 <p><span class="bold">Email:</span> ${objData[key].email}</p>
                 <p><span class="bold">Name:</span> ${objData[key].fullName}</p>
                 <p><span class="bold">Gender:</span> ${objData[key].gender}</p>
                 <p><span class="bold">Contact No:</span> ${objData[key].phNo}</p>
                 <p><span class="bold">Blood Type:</span> ${objData[key].bldGrpSlct}</p>
                 <p><span class="bold">User Type:</span> ${objData[key].dob}</p>
                 <p><span class="bold">Address:</span> ${objData[key].address}</p>
                     
             </div>
         </div>
     </div>
 
     
     `
            }

           
           
          }
            
          
        }

        if(document.getElementById('donors').innerHTML==''){
          document.getElementById('donorDiv').innerHTML=
          `
          <h1>Sorry No Match Found</h1>
          `

        }
      })



    }

   
    })


  }


    function checkStatus(key){

   firebase.database().ref('status/'+key)
   .once('value',(data)=>{
    var status=data.val();
   localStorage.setItem('available',status)
   
   
  })
 
   
}


// `
// <div class="row">
// <div class="col-md-3 text-center">
//     <img src="${imgUrl}" class="imgMargin" alt="profilepic" id="profilepic" style="height:280px;">
//         <a href="../pages/upload.html" class="chngImg"><label>Change Image</label></a>
// </div>
// <div class="col-md-4">
//     <div class="userInfo">
//         <p><span class="bold">Email:</span> ${email}</p>
//         <p><span class="bold">Name:</span> ${userName}</p>
//         <p><span class="bold">Gender:</span> ${gender}</p>
//         <p><span class="bold">Contact No:</span> ${phoneno}</p>
//         <p><span class="bold">Blood Type:</span> ${userblood}</p>
//         <p><span class="bold">User Type:</span> ${userType}</p>
//         <p><span class="bold">Address:</span> ${address}</p>
//         <p><span class="bold">City:</span> ${city}</p>
//             <div class="text-right btnCenter">
//                 <button onclick="editBtn()" class="btn btn-primary imgMargin">Edit Profile</button>
//             </div>
//     </div>
// </div>
// </div>
// `
