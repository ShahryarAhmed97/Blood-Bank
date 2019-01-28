var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "",
    messagingSenderId: "297535555782"
  };
  firebase.initializeApp(config);

  document.getElementById('loaderDiv').style.display='block';


  function signInFun(){
    document.getElementById('loaderDiv').style.display='block';

      let email=document.getElementById('email').value;
      let password=document.getElementById('password').value;
// let usertype=document.getElementsByName('usertype')[0].checked;
    

        firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then((success)=>{
          let userUid=firebase.auth().currentUser.uid
          console.log(userUid)

          localStorage.setItem('currentUserId',userUid)

        localStorage.setItem('userObj',JSON.stringify(success))
        firebase.database().ref('users/'+userUid)
        .once('value',(data)=>{
            var userData=data.val();
            if(userData.usertype=='donor')
            {
                window.location.href='../pages/acceptor.html'

            }
            else{
                window.location.href='../pages/donor.html'


            }
        })

     

    })
    .catch((error)=>{
        var errMsg=error.message;
alert(errMsg)

    });

    } 






































    



      

      

