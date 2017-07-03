(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());

//Sign up
var next1 = document.querySelector("#next1");
var signup = document.querySelector("#signup");
var id;
var password;
var pw_check;

next1.addEventListener("click", function(){
	id = document.getElementById('new_id').value;
	console.log(id);
	location.href = "index.html#signUp2";
});


signup.addEventListener("click", function(){
	password = document.getElementById('new_password').value;
	pw_check = document.getElementById('pw_check').value;
	
	validate_pw(password, pw_check);
	
	console.log(id.toString());
	console.log(password.toString());
	
	var response = post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign up", "id": id.toString(), "pw": password.toString()});

	if(response == 200){
		location.href = "index.html#success";
	}
	setInterval("display()", 2000); 
});

function validate_pw(password, pw_check){
	if(password != pw_check){
		alert("password is diffrent");
		document.addjoin.new_password.focus();
	}
}

var a = document.createElement("a");
a.setAttribute("href", "index.html#successIn");

var signin = document.querySelector("#signin");
signin.addEventListener("click", function(){
	var my_id = document.getElementById("my_id").value;
	var my_pw = document.getElementById("my_password").value;
	
	var response = post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign in", "id": my_id.toString(), "pw": my_pw.toString()});
	
	if(response == 200){
		location.href = "index.html#successIn";
		setInterval("displayQR()", 1300); 
	}
});




function display(){
	location.href = "index.html#main";
}

function displayQR(){
	location.href = "index.html#QRarea";
}


// http POST
function post(url, data){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);	//asynchronous
	xhr.setRequestHeader("Content-Type", "application/text/plain");
	
    if(data) {
        reqData = JSON.stringify(data);
        xhr.send(reqData);
    } else {
        xhr.send();
    }

	xhr.onreadystatechange = processRequest;
	
	function processRequest(e){
		console.log(xhr.status);
		if(xhr.readyState == 4 && xhr.status == 200 ){
			console.log("status ok");
//			var response = JSON.parse(xhr.responseText);
			var response = xhr.responseText;
			console.log("check");
			console.log(response);
		}
	}
	return 200;
}
