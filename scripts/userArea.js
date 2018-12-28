var config = {
    apiKey: "AIzaSyC-yDOu8M2RAJKv883HAtxcPBS4Z2Zy7BU",
    authDomain: "blood-bank-shary.firebaseapp.com",
    databaseURL: "https://blood-bank-shary.firebaseio.com",
    projectId: "blood-bank-shary",
    storageBucket: "",
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
  function userArea(){
      let userUid=localStorage.getItem('currentUserId');

      firebase.database().ref('users/'+userUid)
      .once('value',(data)=>{
    var userObj=data.val();

        if(userObj.usertype=='donor'){
            document.getElementById("userAreaDonor").innerHTML+=
            `
            <tr>
            <td>${ userObj.fullName}</td>
                    <td>${userObj.dob}</td>
                    <td>${userObj.age}</td>
                    <td>${ userObj.gender}</td>
                    <td>${userObj.bldGrpSlct}</td>
                    <td>${ userObj.email}</td>
                    <td>${userObj.phNo}</td>
                    <td>${  userObj.address}</td>

                    <tr>
            `

        }
        else{
            document.getElementById("userAreaAcceptor").innerHTML+=
            `
            <tr>
            <td>${ userObj.fullName}</td>
                    <td>${userObj.dob}</td>
                    <td>${userObj.age}</td>
                    <td>${ userObj.gender}</td>
                    <td>${userObj.bldGrpSlct}</td>
                    <td>${ userObj.email}</td>
                    <td>${userObj.phNo}</td>
                    <td>${  userObj.address}</td>

                    <tr>
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

    

     

    if(fullName!='' || address!=''  || phNo!='' || dob!='' ||bldGrp!='' ||age!='' ){
    
  
        let userObj={
            fullName,
            address,
             age,
            bldGrpSlct,
            dob,
            phNo
        }
        let userUid=localStorage.getItem('currentUserId')

        firebase.database().ref('users/' + userUid)
        .update(userObj).then((success)=>{
            location.reload();

        })
        .catch((error)=>{
            console.log(error.message)
        })

 


    
}

else{
    alert('Plz Fill the form Correctly');
}


    



}



function delUserFun(){
    let userUid=localStorage.getItem('currentUserId');
    firebase.database().ref('users/'+ userUid).remove()
    .then((success)=>{
        console.log(success)

        localStorage.setItem('currentUserId',JSON.stringify({user:'null'}));
        location.href='../pages/signIn.html';

    })
  
}