var user = 'username';

var firebaseConfig = {
    apiKey: "AIzaSyAnSByKPSuRdbOtb1RnFEz39z6dIUfKvyM",
    authDomain: "senior-project-bfb8e.firebaseapp.com",
    databaseURL: "https://senior-project-bfb8e.firebaseio.com",
    projectId: "senior-project-bfb8e",
    storageBucket: "senior-project-bfb8e.appspot.com",
    messagingSenderId: "183752740745",
    appId: "1:183752740745:web:a7824b2416a7d4a6361b58",
    measurementId: "G-D63SSCBCDN"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);
var database = firebase.database();
var numImg;

window.onload = function(){
  database.ref(user).once("value").then(function(snapshot){
    if(!snapshot.hasChildren()){
      document.getElementById('no-pictures').style["display"] = "";
      document.getElementById('images').style["display"] = "none";
    }
    else {
      document.getElementById('no-pictures').style["display"] = "none";
      document.getElementById('images').style["display"] = "";
    }
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key;
      console.log(key);
      var button = document.createElement('button');
      var image = document.createElement('img');
      button.className = "image";
      image.src = "img/" + user + "/" + key + "/1.png";
      button.id = key;
      button.appendChild(image);
      console.log(childSnapshot.val().question);
      if(childSnapshot.val().question == null){
        document.getElementById("unanswered").appendChild(button);
        document.getElementById("unanswered").style["display"] = "";
      }
      else {
        document.getElementById("answered").appendChild(button);
        document.getElementById("answered").style["display"] = "";
      }
    });
    var items = document.getElementsByClassName("image");
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      console.log(item.id);
      item.onclick = function() {
        window.location.href = 'image.html?img=' + this.id; 
      }
    }
  });
}

/*document.getElementById("delete").onclick = function() {

}*/

document.getElementById("edit").onclick = function() {
  
}

document.getElementById("profile").onclick = function() {
  
}

