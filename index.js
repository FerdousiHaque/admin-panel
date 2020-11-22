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
  firebase.initializeApp(config);
var rootRef = firebase.database().ref().child("products");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("update").style.display = "none";

    var user = firebase.auth().currentUser;
    const productId = document.getElementById('id_field');
    const desp = document.getElementById('product_field');
    const img = document.getElementById('image_field');
    const newProduct = document.getElementById('addProduct');

    const database = firebase.database();
    const roofRef = database.ref('products');

    newProduct.addEventListener('click', (e) => { // write data into Firebase
      e.preventDefault();
      roofRef.child(productId.value).set({
        description: desp.value,
        image: img.value
      });
      productId.value='';   // Clear all the field to ready for next input
      desp.value='';
      img.value='';

      location.reload();  //reload to load all the product
      return false;
    });
    //Read data from Firebase to show in table format
    rootRef.on("child_added", snap => {
    var key = snap.key;
    var description = snap.child("description").val();
    var image = snap.child("image").val();

    $("#table_body").append("<tr id='"+snap.key+"'><td>"+ key +"</td><td>" + description + "</td><td>" + image 
    +"</td><td><button onclick=updateData('" +
    snap.key +"')>Update</button></td><td>" +
    "</td><td><button onclick=deleteData('" +
    snap.key +"')>Delete</button></td><td>" +
    '</td></tr>');
    });

    if(user != null){
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome, You are login with this email : " + email_id;
    }

  } else {
    // No user is signed in
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("update").style.display = "none";
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
}

function signup(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
}

function updateData(key) {
  document.getElementById("update").style.display = "block";
  window.scrollTo(0,document.body.scrollHeight);
  var productUp = document.getElementById("product_up");
  var imageUp = document.getElementById("image_up");
  var updatePro = document.getElementById("updatePro");

  // show value of description and image in input field
  firebase.database().ref('products/'+key).on('value', function(snapshot){
    productUp.value = snapshot.val().description;
    imageUp.value = snapshot.val().image;
  });

  updatePro.addEventListener('click', (e) => { // Update data into Firebase
    e.preventDefault();
    if(productUp.value == "" || imageUp.value == ""){
      alert("All field must be filled out");
      return false;
    }
    rootRef
      .child(key)
      .update({ description: productUp.value,
        image: imageUp.value })
      .then(function () {
        alert("Product Updated!!");
        location.reload();  //reload to load all the product
        return false;
      })
      .catch(function (error) {
        console.log('Update failed: ' + error.message);
      });
  });
}
function deleteData(key) {
  if (confirm("The Product will be Removed!")) {
    //remove that product from database
    rootRef
      .child(key)
      .remove()
      .then(function () {
        console.log('Remove succeeded.');
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
      location.reload();  //reload to load updated products
      return false;
  } else {
    //disapper the alert box
  }
}

function cancle(){
  document.getElementById("update").style.display = "none";
}

function logout(){
  firebase.auth().signOut();
}
