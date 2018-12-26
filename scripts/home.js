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
      history.back(1);

      // window.location.href='../pages/signIn.html'

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
                    <td>${  objData[key].usertype}</td>


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

            document.getElementById('donors').innerHTML+=
           `
           <tr>
           <td>${ objData[key].fullName}</td>
           <td>${objData[key].dob}</td>
           <td>${objData[key].age}</td>
           <td>${ objData[key].gender}</td>
           <td>${objData[key].bldGrpSlct}</td>
           <td>${  objData[key].email}</td>
           <td>${  objData[key].address}</td>
           <td>${  objData[key].usertype}</td>


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
                    <td>${  objData[key].usertype}</td>


           </tr>
            `
            }

           
           
          }
            
          
        }

        if(document.getElementById('acceptors').innerHTML==''){
          document.getElementById('acceptors').innerHTML=
          `
          <h1>Sorry  Acceptors No Match Found</h1>
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
                    <td>${  objData[key].usertype}</td>


           </tr>
            `
            }

           
           
          }
            
          
        }

        if(document.getElementById('donors').innerHTML==''){
          document.getElementById('donors').innerHTML=
          `
          <h1>Sorry No Match Found</h1>
          `

        }
      })



    }

   
    })


  }






  // function bldGrpSearch2(){

  //   var bldGrp=document.getElementById('bldGrp').value;
  //   bldGrp.innerHTML=''
  //   console.log(bldGrp)


    

  //   let userUid=localStorage.getItem('currentUserId')
  //   console.log(userUid)

  //   firebase.database().ref("users/" + userUid)
  //   .once("value",(data)=>{
  //     var userObj=data.val();

  //   if(userObj.usertype=='acceptor'){
  

  //     firebase.database().ref("users/")
  //     .once("value",(data)=>{
  //       let objData=data.val();

  //       for (var key in objData) {
  //         if(objData[key].usertype=='donor')
  //         // {            console.log(objData[key].usertype)
  //            if(objData[key].bldGrpSlct==bldGrp){
  //             // console.log(objData[key].bldGrpSlct)
  //             // console.log(bldGrp+"match" +objData[key].fullName)
  //           document.getElementById('acceptors').innerHTML+=
  //           `
  //           <tr>
  //                   <td>${ objData[key].fullName}</td>
  //                   <td>${objData[key].dob}</td>
  //                   <td>${objData[key].age}</td>
  //                   <td>${ objData[key].gender}</td>
  //                   <td>${objData[key].bldGrpSlct}</td>
  //                   <td>${  objData[key].email}</td>
  //                   <td>${objData[key].phNo}</td>
  //                   <td>${  objData[key].address}</td>

  //          </tr>
  //           `
  //           }
                
  //           else{
  //             document.getElementById('donors').innerHTML=''
  //           }
          



  //         }
            
          
        
  //       if(document.getElementById('acceptors').innerHTML==''){
  //         document.getElementById('acceptors').innerHTML=
  //         `
  //         <h1>Sorry No Match Found</h1>
  //         `

  //       }
  //     })

  //   }
    
  //   })
  // }



