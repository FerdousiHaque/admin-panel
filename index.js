// Initialize Firebase
var config = {
  apiKey: "AIzaSyAaCKqSLjJybceKzASZSmIe88YKLQrIsWg",
  authDomain: "afnan-s-china-bistro.firebaseapp.com",
  databaseURL: "https://afnan-s-china-bistro.firebaseio.com",
  projectId: "afnan-s-china-bistro",
  storageBucket: "afnan-s-china-bistro.appspot.com",
  messagingSenderId: "782208850671",
  appId: "1:782208850671:web:bd13eeb741c4a18bed591a",
  measurementId: "G-QVSDHHSDFD"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in

    var user = firebase.auth().currentUser;

  } else {
    // No user is signed in
    //window.location = "index.html";
  }
});

function login(){
  
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then((user) => {
    window.location = "admin.html";
    })    .catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
}

function signup(){
  
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  .then((user) => {
    window.location = "index.html";
      })    .catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
  
}
