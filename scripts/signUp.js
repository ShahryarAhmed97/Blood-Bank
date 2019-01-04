

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "blood-bank-shary.appspot.com",
    messagingSenderId: "297535555782"
  };
  firebase.initializeApp(config);
 


function signUpFun(){
    let fullName=document.getElementById('fullName').value;
    let address=document.getElementById('address').value;

    let email=document.getElementById('email').value;
let phNo=document.getElementById('phNo').value;
    let password=document.getElementById('password').value;
    let dob=document.getElementById('dob').value;
    let bldGrp = document.getElementById("bldGrp");
    let bldGrpSlct = bldGrp.options[bldGrp.selectedIndex].text;
    let age=document.getElementById('age').value;
    let userImg=document.getElementById('img').files[0];

    var emailCheck=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(email.match(emailCheck)){
    
     

    if(fullName!='' || address!=''  || phNo!='' || password!='' || dob!='' ||bldGrp!='' || age!=''){
    
  
let gender='';
    if(document.getElementsByName('gender')[0].checked){
        gender='Male'

    }
    else{
        
         gender='Female'

    }

    let usertype='';
    if(document.getElementsByName('usertype')[0].checked){
        usertype='donor'

    }
    else{
        
         usertype='acceptor'

    }



    


    
    firebase.auth()
    .createUserWithEmailAndPassword(email,password)
    .then((success)=>{

        let userObj={
            fullName,
            address,
            email,
    
            gender,
            age,
            usertype,
            bldGrpSlct,
            dob,
            phNo
        }
        let userUid=firebase.auth().currentUser.uid

        firebase.storage().ref().child(`userProfiles/${userUid}/${userImg.name}`).put(userImg)
        .then((success)=>{
            success.ref.getDownloadURL()
            .then((imgUrl)=>{
                userObj.userImg=imgUrl
                firebase.database().ref('users/' + userUid)
                .set(userObj).then(()=>{
                    window.location.href='../pages/signIn.html'
        
                }).catch((error)=>{
                    var errMsg=error.message;
                       alert(errMsg)
                })


            })
            .catch((error)=>{
                var errMsg=error.message;
                    alert(errMsg)


            })

            

        })
        .catch((error)=>{
            var errMsg=error.message;
            alert(errMsg)

        });

       

 })
.catch((error)=>{
            var errMsg=error.message;
            alert(errMsg)

    });

    
}

else{
    alert('Plz Fill the form Correctly');
}


    }
else{
    alert('email is badly formatted')
}


}