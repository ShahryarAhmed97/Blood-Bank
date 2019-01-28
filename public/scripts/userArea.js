var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "blood-bank-shary.appspot.com",
    messagingSenderId: "297535555782"
  };
  firebase.initializeApp(config);
console.log(firebase)

function signOutFun(){

    firebase.auth().signOut()
    .then((success)=>{
      localStorage.setItem('userObj',JSON.stringify({user:null}))

      localStorage.setItem('currentUserId',null)
      // history.back(2);

      window.location.href='../pages/signIn.html'

    })
    .catch((error)=>{

    });

  }

document.getElementById('userAreaDiv').style.display='none'


function updateProfile(){
    let userUid=localStorage.getItem('currentUserId');
    alert('yes')
    // firebase.database().ref('users/'+userUid)
    // .once('value',(data)=>{
    //     let userObj=data.val();
    //     firebase.storage().ref().child(`userProfiles/${userImg.name}`).put(userImg)





    // })
}





  function userArea(){
      let userUid=localStorage.getItem('currentUserId');
      firebase.database().ref('status/'+userUid)
      .once('value',(data)=>{
          var statusData=data.val();

        //   if(statusData===true){
        //       document.getElementById('available').checked=true;
        //   }
        //   else{
        //     document.getElementById('available').checked=false;

        //   }

      })

      firebase.database().ref('users/'+userUid)
      .once('value',(data)=>{
    var userObj=data.val();
    if(userObj.userImg==undefined)
    {
      userObj.userImg="../images/emptyUser.png"
      
    }

        if(userObj.usertype=='donor'){
            document.getElementById("userAreaDonor").innerHTML+=
           `
            <div class="col-md-6" style='border: 2px solid white'>
         <div class="col-md-4 text-center">
             <img src="${userObj.userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
            
             </div>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div class="col-md-8">
             <div class="userInfo">
                 <p><span class="bold">Email:</span> ${userObj.email}</p>
                 <p><span class="bold">Name:</span> ${userObj.fullName}</p>
                 <p><span class="bold">Gender:</span> ${userObj.gender}</p>
                 <p><span class="bold">Gender:</span> ${userObj.gender}</p>

                 <p><span class="bold">Contact No:</span> ${userObj.phNo}</p>
                 <p><span class="bold">Blood Type:</span> ${userObj.bldGrpSlct}</p>
                 <p><span class="bold">User Type:</span> ${userObj.dob}</p>
                 <p><span class="bold">Address:</span> ${userObj.address}</p>
                     
             </div>
         </div>
     </div>
 
     <br><br><br>

     `

        }
        else{

            if(userObj.userImg==undefined)
            {
              userObj.userImg="../images/emptyUser.png"
              
            }
            document.getElementById("userAreaAcceptor").innerHTML+=
            `
            <div class="col-md-6" style='border: 2px solid white'>
         <div class="col-md-4 text-center">
             <img src="${userObj.userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
         </div>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div class="col-md-8">
             <div class="userInfo">
                 <p><span class="bold">Email:</span> ${userObj.email}</p>
                 <p><span class="bold">Name:</span> ${userObj.fullName}</p>
                 <p><span class="bold">Gender:</span> ${userObj.gender}</p>
                 <p><span class="bold">Gender:</span> ${userObj.gender}</p>

                 <p><span class="bold">Contact No:</span> ${userObj.phNo}</p>
                 <p><span class="bold">Blood Type:</span> ${userObj.bldGrpSlct}</p>
                 <p><span class="bold">User Type:</span> ${userObj.dob}</p>
                 <p><span class="bold">Address:</span> ${userObj.address}</p>
                     
             </div>
         </div>
     </div>
     <br><br><br>
 
     
     `

        }
      })
  }


  function updateRecord(){
    document.getElementById('userAreaDiv').style.display='block'
    document.getElementById('clickToUpdate').style.display='none'
    document.getElementById("delBut").style.display='none'
}




function cnfrmUpdateRecord(){
    let fullName=document.getElementById('fullName').value;
    let address=document.getElementById('address').value;

let phNo=document.getElementById('phNo').value;
    let dob=document.getElementById('dob').value;
    let bldGrp = document.getElementById("bldGrp");
    let bldGrpSlct = bldGrp.options[bldGrp.selectedIndex].text;
    let age=document.getElementById('age').value;
        let userImg=document.getElementById('img').files[0];


    

     

    if(fullName!='' || address!=''  || phNo!='' || dob!='' ||bldGrp!='' ||age!='' ){
    
  
        let userObj={
            fullName,
            address,
             age,
            bldGrpSlct,
            dob,
            phNo,
            userImg
        }
        let userUid=localStorage.getItem('currentUserId')
        firebase.storage().ref().child(`userProfiles/${userUid}/${userImg.name}`).put(userImg)
        .then((success)=>{
            success.ref.getDownloadURL()
            .then((url)=>{
                userObj.userImg=url

                firebase.database().ref('users/' + userUid)
                .update(userObj).then((success)=>{
                    location.reload();
        
                })
                .catch((error)=>{
                    console.log(error.message)
                })



            })
            .catch((error)=>{
                console.log(error.message)

            });

        })  .catch((error)=>{
            console.log(error.message)

        });
       

      

 


    
}

else{
    alert('Plz Fill the form Correctly');
}


    



}



function delUserFun(){
   
    let userUid=localStorage.getItem('currentUserId');

    firebase.storage().ref().child(`userProfiles/${userUid}`).delete()
    .then((success)=>{
        console.log(success)
   })
    .catch((error)=>{
        console.log(error)

    })

   firebase.database().ref('users/'+ userUid).remove()
    .then((success)=>{
        console.log(success)

        localStorage.setItem('currentUserId',JSON.stringify({user:'null'}));

     })

    var user = firebase.auth().currentUser;
            
    user.delete().then(function() {
        location.href='../pages/signIn.html';
    
    }).catch(function(error) {
        var errMsg=error.message;
        alert(errMsg)
    });

}


function donateFun(){
    var userUid=localStorage.getItem('currentUserId');
    var status=document.getElementsByName('available')[0].checked;
    
        firebase.database().ref('status/'+userUid)
        .set(status);

    

}
