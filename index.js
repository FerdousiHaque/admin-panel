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
var setUp = firebase.database().ref().child("settings");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("update").style.display = "none";
    
    // show all settings data and update it
    setUp.on("child_added", snap => {
      var address = snap.child("Address").val();
      var copyright = snap.child("Copyright").val();
      var email = snap.child("Email").val();
      var fullAddress = snap.child("FullAddress").val();
      var heading = snap.child("Heading").val();
      var mobile = snap.child("Mobile").val();
      var tittle = snap.child("Tittle").val();
  
      $("#set_tings").append("<tr id='"+snap.key+"'><td>Tittle</td><td>" + tittle + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Tittle'+"')>Update Tittle</button></td><td>"+'</td></tr>'
      +"<tr id='"+snap.key+"'><td>Heading</td><td>" + heading + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Heading'+"')>Update Heading</button></td><td>" +'</td></tr>'
      +"<tr id='"+snap.key+"'><td>Address</td><td>" + address + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Address'+"')>Update Address</button></td><td>" +'</td></tr>'
      +"<tr id='"+snap.key+"'><td>Full Address</td><td>" + fullAddress + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'FullAddress'+"')>Update it</button></td><td>" +'</td></tr>'
      +"<tr id='"+snap.key+"'><td>Email</td><td>" + email + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Email'+"')>Update Email</button></td><td>" +'</td></tr>'
      +"<tr id='"+snap.key+"'><td>Mobile No.</td><td>" + mobile + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Mobile'+"')>Update Mobile</button></td><td>" +'</td></tr>'
      +"<tr id='"+snap.key+"'><td>CopyRight</td><td>" + copyright + 
      "</td><td><button onclick=setttingUpdate('" +
      snap.key+'\',\''+'Copyright'+"')>Update it</button></td><td>" +'</td></tr>');
      });

    var user = firebase.auth().currentUser;
    const productId = document.getElementById('id_field');
    const desp = document.getElementById('product_field');
    const img = document.getElementById('image_field');
    const newProduct = document.getElementById('addProduct');

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

function setttingUpdate(key, field_name){
  var field_tittle = "Update "+field_name;

  var newValue = prompt(field_tittle, "");
  if (newValue != "") {
    // update the field with new value
    setUp.child(key)
    .update({ [field_name]: newValue })
    .then(function () {
      alert("Yeah Updated!!");
      location.reload();  //reload to load all the data
      return false;
    })
    .catch(function (error) {
      console.log('Update failed: ' + error.message);
    });
  } else {
    alert("The Field must be filled out");
      return false;
  }
}

function cancle(){
  document.getElementById("update").style.display = "none";
}

function logout(){
  firebase.auth().signOut();
}
