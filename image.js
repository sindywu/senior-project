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
var item;
var source;
var listImg = [];
var current_index = 0;

window.onload = function(){
		item = parent.document.URL.substring(parent.document.URL.indexOf('img='), parent.document.URL.length);
	    var index = item.indexOf("=");
	    var str = [ item.substring(0, index), item.substring(index+1)];
	    item = str[1];
		console.log(item);
        database.ref(user+ '/' + item + "/cues/imgs").once("value").then(function(snapshot){
          var index = 0;
          snapshot.forEach(function(childSnapshot){
          	index++;
          	console.log(index);
          	var li = document.createElement('li');
          	var img = document.createElement('img');
          	img.className = "cue-image";
          	img.id = item + "-" + index;
          	img.src = "img/" + user + "/" + item + "/" + index + ".png";
          	li.appendChild(img);
          	document.getElementById('image-cue').appendChild(img);
          });          
        });
        database.ref(user + '/' + item + "/cues/").once("value").then(function(snapshot){
          document.getElementById('location-cue').innerHTML = "Location: " + snapshot.val().location;
          document.getElementById('emotion-cue').innerHTML = "Feeling: " + snapshot.val().feeling;
          document.getElementById('journal-title').innerHTML = snapshot.val().date;
          document.getElementById('description-cue').innerHTML = "Description: " + snapshot.val().description;
        });
        database.ref(user + '/' + item + "/").once("value").then(function(snapshot){
          console.log("exists?" + snapshot.val().question);
          if(snapshot.val().question == null){
            document.getElementById("q").focus(); //CHANGE
          }
          else{
            document.getElementById("q").innerHTML = snapshot.val().question;
            console.log("exists?child" + snapshot.child("answer/value").val());
            if(snapshot.child("answer/value").val() == null){

            }
            else{
              document.getElementById("no-answer").style["display"] = "none";
              document.getElementById("answered").style["display"] = "";
              document.getElementById("source").innerHTML = snapshot.child("answer/source").val();
              document.getElementById("change-source").style["display"] = "";
              document.getElementById("source").style["display"] = "";
              if(snapshot.child("answer/source").val() == "Self-Answer"){
                document.getElementById("a").innerHTML = snapshot.child("answer/value").val();
                document.getElementById("b").style["display"] = "none";
              }
              else {
                document.getElementById("b").innerHTML = snapshot.child("answer/value").val();
                document.getElementById("a").style["display"] = "none";
              }
            }
          }
          if(snapshot.val().memo != null) {
            document.getElementById("memo-area").value = snapshot.val().memo;
          }
        });
       
}

function ready() {
	console.log(document.getElementById("image-cue").childElementCount);
    for(var i=0 ; i<document.getElementById("image-cue").childElementCount; i++){
        	console.log("i:" + i);
        	listImg[i] = i+1;
    }
    change_pic();
}

document.getElementById("delete").onclick = function() {
  document.getElementById('myModal').style["display"] = "";
	/*var del = database.ref(user + '/' + item);
	del.remove();*/

	//document.getElementById("back").click();
	//ADD USER FEEDBACK FOR DELETE

}

document.getElementById('q').onblur = function() {
  	console.log("outside input");
  	var input = document.getElementById('q');
  	if(input && input.innerHTML != ""){
  		var updates = {};
  		updates[user + '/' + item + '/question'] = input.innerHTML;
  		database.ref().update(updates);
  		
  	}
}

document.getElementById('q').addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
      	document.getElementById('q').blur();
      }
 });

document.getElementById('a').onblur = function() {
  	console.log("outside input");
  	var input = document.getElementById('a');
  	if(input && input.innnerHTML != ""){
  		var updates = {};
  		updates[user + '/' + item + '/answer/value'] = input.innerHTML;
  		updates[user + '/' + item + '/answer/source'] = document.getElementById("source").innerHTML;
  		database.ref().update(updates);
  	}

}

document.getElementById('b').addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
      	document.getElementById('b').blur();
      }
 });

document.getElementById('b').onblur = function() {
    console.log("outside input");
    var input = document.getElementById('b');
    if(input && input.innnerHTML != ""){
      var updates = {};
      updates[user + '/' + item + '/answer/value'] = input.innerHTML;
      updates[user + '/' + item + '/answer/source'] = document.getElementById("source").innerHTML;
      database.ref().update(updates);
    }
    

}

document.getElementById('a').addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById('a').blur();
      }
 });

document.getElementById('memo-area').onblur = function() {
  	console.log("outside input");
  	var input = document.getElementById('memo-area');
  	if( input && input.value){
  		var updates = {};
  		updates[user + '/' + item + '/memo'] = input.value;
  		database.ref().update(updates);
  	}
}

document.getElementById('memo-area').addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
      	document.getElementById('memo-area').blur();
      }
 });

document.getElementById("back").onclick = function() {
  	history.back();
}

document.getElementById("submit").onclick = function() {
  window.location.href = 'index.html';
}

document.getElementById("change-source").onclick = function() {
  document.getElementById("no-answer").style["display"] = "";
  document.getElementById("answered").style["display"] = "none";
  document.getElementById("change-source").style["display"] = "none";
  document.getElementById("source").style["display"] = "none";
  document.getElementById("cancel-source").style["display"] = ""
}

document.getElementById("cancel-source").onclick = function() {
  document.getElementById("no-answer").style["display"] = "none";
  document.getElementById("answered").style["display"] = "";
  document.getElementById("change-source").style["display"] = "";
  document.getElementById("source").style["display"] = "";
  document.getElementById("cancel-source").style["display"] = "none"
}

document.getElementById("self-answer").onclick = function(){
  document.getElementById("no-answer").style["display"] = "none";
  document.getElementById("answered").style["display"] = "";
  document.getElementById("change-source").style["display"] = "";
  document.getElementById("source").style["display"] = "";
  document.getElementById("a").focus();
  //document.getElementById("a").innerHTML = "What is your answer?";
  //document.getElementById("a").style["color"] = "#757575";

   document.getElementById("a").style["display"] = "";
   document.getElementById("b").style["display"] = "none";
  source = "Self-Answer";
  document.getElementById("source").innerHTML = source;
}

document.getElementById("google").onclick = function(){
  window.open('http://www.google.com/search?q='+document.getElementById('q').innerHTML);
  document.getElementById("no-answer").style["display"] = "none";
  document.getElementById("answered").style["display"] = "";
  document.getElementById("change-source").style["display"] = "";
  document.getElementById("source").style["display"] = "";
  document.getElementById("a").focus();
  //document.getElementById("a").innerHTML = "What did you find out?";
  //document.getElementById("a").style["color"] = "#757575";
  document.getElementById("b").style["display"] = "";
  document.getElementById("a").style["display"] = "none";
  source = "Google";
  document.getElementById("source").innerHTML = source;
}

document.getElementById("reddit").onclick = function(){
  window.open('https://www.reddit.com/');
  document.getElementById("no-answer").style["display"] = "none";
  document.getElementById("answered").style["display"] = "";
  document.getElementById("change-source").style["display"] = "";
  document.getElementById("source").style["display"] = "";
  document.getElementById("a").focus();
  //document.getElementById("a").innerHTML = "What did you find out?";
  //document.getElementById("a").style["color"] = "#757575";
  document.getElementById("b").style["display"] = "";
  document.getElementById("a").style["display"] = "none";
  source = "reddit";
  document.getElementById("source").innerHTML = source;
}

document.getElementById("delete2").onclick = function() {
  var del = database.ref(user + '/' + item);
  del.remove();

  document.getElementById("back").click();
}

document.getElementById("cancel").onclick = function() {
  document.getElementById('myModal').style["display"] = "none";
}

/*function change_pic() {
	if(current_index == 0)
		ready();
	document.getElementById("cue-image").src = "img/username/" + item + "/" + listImg[current_index] + ".png";
}

function next_pic() {
	console.log("next");
	if (current_index == listImg.length - 1) {
		current_index = 0;
	}
	else
		current_index +=1;
	change_pic();
}

function prev_pic() {
	console.log("prev");
	if (current_index == 0) {
		current_index = listImg.length - 1;
	}
	else
		current_index -=1;
	change_pic();
}





$("#image-cue").on("swipeleft", function(event){
	next_pic();
});

$("#image-cue").on("swiperight", function(event){
	prev_pic();
});*/