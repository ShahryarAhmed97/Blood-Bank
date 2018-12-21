var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "",
    messagingSenderId: "297535555782"
  };
  firebase.initializeApp(config);

  function signOutFun(){

    firebase.auth().signOut()
    .then((success)=>{
      localStorage.setItem('userObj',JSON.stringify({user:null}))

      localStorage.setItem('currentUserId',null)

      window.location.href='../pages/signIn.html'

    })
    .catch((error)=>{

    });

  }



  function loadFun(){

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

            console.log(objData[key].email)
            
            document.getElementById('donors').innerHTML+=
            `
            <tr>
                    <td>${ objData[key].fullName}</td>
                    <td>${objData[key].dob}</td>
                    <td>${objData[key].age}</td>
                    <td>${ objData[key].gender}</td>
                    <td>${objData[key].bldGrpSlct}</td>
                    <td>${  objData[key].email}</td>
                    <td>${objData[key].phNo}</td>
                    <td>${  objData[key].address}</td>

           </tr>
            `

          }
            
          
        }
      })



    }
    else{

      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();

        for (var key in objData) {
          if(objData[key].usertype=='donor')
          {            console.log(objData[key].usertype)

            document.getElementById('acceptors').innerHTML+=
           `
           <tr>
           <td>${ objData[key].fullName}</td>
           <td>${objData[key].dob}</td>
           <td>${objData[key].age}</td>
           <td>${ objData[key].gender}</td>
           <td>${objData[key].bldGrpSlct}</td>
           <td>${  objData[key].email}</td>
           <td>${  objData[key].address}</td>

           <td>${objData[key].phNo}</td>

  </tr>
          `
          }
            
          
        }
      })



    }

    })

   


  }
  function reload(){

  }



  function bldGrpSearch(){

    var bldGrp=document.getElementById('bldGrp').value;
    bldGrp.innerHTML=''
    console.log(bldGrp)


    

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

            console.log(objData[key].email)
      if(objData[key].bldGrpSlct==bldGrp){
            document.getElementById('donors').innerHTML+=
            `
            <tr>
                    <td>${ objData[key].fullName}</td>
                    <td>${objData[key].dob}</td>
                    <td>${objData[key].age}</td>
                    <td>${ objData[key].gender}</td>
                    <td>${objData[key].bldGrpSlct}</td>
                    <td>${  objData[key].email}</td>
                    <td>${objData[key].phNo}</td>
                    <td>${  objData[key].address}</td>

           </tr>
            `
            }
           

            else{

              document.getElementById('donors').innerHTML=" "
             

            }

          }
            
          
        }
      })



    }
    else{

      firebase.database().ref("users/")
      .once("value",(data)=>{
        let objData=data.val();

        for (var key in objData) {
          if(objData[key].usertype=='donor')
          {            console.log(objData[key].usertype)
             if(objData[key].bldGrpSlct==bldGrp){
            document.getElementById('acceptors').innerHTML+=
            `
            <tr>
                    <td>${ objData[key].fullName}</td>
                    <td>${objData[key].dob}</td>
                    <td>${objData[key].age}</td>
                    <td>${ objData[key].gender}</td>
                    <td>${objData[key].bldGrpSlct}</td>
                    <td>${  objData[key].email}</td>
                    <td>${objData[key].phNo}</td>
                    <td>${  objData[key].address}</td>

           </tr>
            `
            }

          

            else{

              document.getElementById('acceptors').innerHTML=' '
              

            }


          }
            
          
        }
      })



    }

    })

   




  }








//recent last work
  
  // function loadFun(){

  //   let userUid=localStorage.getItem('currentUserId')
  //   console.log(userUid)

  //   firebase.database().ref("users/" + userUid)
  //   .once("value",(data)=>{
  //     var userObj=data.val();

  //   if(userObj.usertype=='donor'){
  //     firebase.database().ref("users/")
  //     .once("value",(data)=>{
  //       let objData=data.val();

        
     
     
     
       

  //       for (var key in objData) {
  //         if(objData[key].usertype=='acceptor')
  //         {
            
  //           document.getElementById('donors').innerHTML+=
  //           `
  //           <div class="col-md-8 col-md-offset-2" >
  //                   <td>${ userObj.fullName}</td>
  //                    <td>${  userObj.address}</td>
  //                    <td>${  userObj.email}</td>
  //                   <td>${ userObj.gender}</td>
  //                   <td>${userObj.age}</td>
  //                   <td>${ userObj.usertype}</td>
            
            
  //                  </div>
  //           `

  //         }
            
          
  //       }
  //     })



  //   }
  //   else{

  //     firebase.database().ref("users/")
  //     .once("value",(data)=>{
  //       let objData=data.val();

  //       for (var key in objData) {
  //         if(objData[key].usertype=='donor')
  //         {
  //           document.getElementById('acceptors').innerHTML+=
  //           `
  //           <div class="col-md-8 col-md-offset-2" >
  //           <td>${ userObj.fullName}</td>
  //                    <td>${  userObj.address}</td>
  //                    <td>${  userObj.email}</td>
  //                   <td>${ userObj.gender}</td>
  //                   <td>${userObj.age}</td>
  //                   <td>${ userObj.usertype}</td>
          
    
    
  //          </div>           
  //           `

  //         }
            
          
  //       }
  //     })



  //   }

  //   })

   


  // }


  
