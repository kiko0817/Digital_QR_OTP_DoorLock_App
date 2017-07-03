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
	location.href = "index.html#signUp2";
});


signup.addEventListener("click", function(){
	password = document.getElementById('new_password').value;
	pw_check = document.getElementById('pw_check').value;
	
	validate_pw(password, pw_check);
	
	console.log(id.toString());
	console.log(password.toString());
	
	var result = post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign up", "id": id.toString(), "pw": password.toString()});

	if(result.toString() === "success"){
		location.href = "index.html#success";
		setInterval("display()", 2000); 
	}else{
		document.addjoin.id.focus();
	}
});

function validate_pw(password, pw_check){
	if(password != pw_check){
		alert("password is diffrent");
		document.addjoin.new_password.focus();
	}
}


var signin = document.querySelector("#signin");
signin.addEventListener("click", function(){
	var my_id = document.getElementById("my_id").value;
	var my_pw = document.getElementById("my_password").value;
	
	var result = post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign in", "id": my_id.toString(), "pw": my_pw.toString()});
	console.log("check result: "+result);
	
	if(my_id === ""){
		alert("Enter your id");
		document.addjoin.my_id.focus();
	}
	if(my_pw === ""){
		alert("Enter your password");
		document.addjoin.my_pw.focus();
	}
	if(result.toString() === "failed"){
		alert("Sign in failure...");
		document.addjoin.my_id.focus();
	}else{
		location.href = "index.html#siginsuccess";
		setInterval("displayQR()", 1300); 
	}
});

var tomain = document.querySelector("#tomain");
tomain.addEventListener("click", function(){
	location.href="index.html#main";
});


function display(){
	location.href = "index.html#main";
}

function displayQR(){
	location.href = "index.html#QRarea";
}



//http POST
var xhr = new XMLHttpRequest();
var response;
function post(url, data){
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
//			var responseJSON = JSON.parse(xhr.responseText);
			response = xhr.responseText;
//			console.log(responseJSON);
			console.log(response);
		}
	}
	if(response != undefined)
		return response;
}


// Cookies

function setCookie(){
	
}

function getCookie(){
	
}

function deleteCookie(){
	
}
