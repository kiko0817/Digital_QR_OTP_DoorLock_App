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

var response_signup;

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
	
	post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign up", "id": id.toString(), "pw": password.toString()});
	
	xhr.onreadystatechange = function(e){
		console.log(xhr.status);
		if(xhr.readyState == 4 && xhr.status == 200 ){
			response_signup = xhr.responseText;
			console.log("internal: "+response_signup);
			console.log("check response: "+response_signup);
			
			if(response_signup.toString() === "success"){
				alert("Sign up success");
				display();
			}else{
				document.addjoin.id.focus();
			}
		}
	};
});


//password validation
function validate_pw(password, pw_check){
	if(password != pw_check){
		alert("password is diffrent");
		document.addjoin.new_password.focus();
	}
}

// Sign in
var my_id = document.getElementById("my_id");
var my_pw = document.getElementById("my_password");

var response_signin;
var signin = document.querySelector("#signin");
signin.addEventListener("click", function(){
	var myidvalue = my_id.value;
	var mypwvalue = my_pw.value;
	validateID(myidvalue, mypwvalue);
	
	console.log("my_id: "+myidvalue);
	console.log("my_pw: "+mypwvalue);
	
	post("http://117.17.158.192:8200/Servlet/servers", {"type":"sign in", "id": myidvalue.toString(), "pw": mypwvalue.toString()});
	
	xhr.onreadystatechange = function(e){
		console.log(xhr.status);
		if(xhr.readyState == 4 && xhr.status == 200 ){
			response_signin = xhr.responseText;
			console.log("internal: "+response_signin);
			console.log("check response: "+response_signin);
			
			if(response_signin.toString() === "can't search id"){
				alert("This id doesn't exist");
				document.addjoin.my_id.focus();
			}else if(response_signin.toString() === "success"){
				alert("Sign in success");
				setLocalStorage();
				displayQR();
			}
		}
	};

});

function validateID(myidvalue, mypwvalue){
	if(myidvalue == ""){
		alert("Enter your id");
		document.addjoin.my_id.focus();
	}
	if(mypwvalue == ""){
		alert("Enter your password");
		document.addjoin.my_pw.focus();
	}
}

var back = document.getElementById("back");
back.addEventListener("click", function(){
	console.log("back");
	window.history.back();
});

function display(){
	location.href = "index.html#main";
}

function displayQR(){
	location.href = "index.html#QRarea";
}

//http POST
var xhr = new XMLHttpRequest();

function post(url, data){
	xhr.open('POST', url, true);	//asynchronous
	xhr.setRequestHeader("Content-Type", "application/text/plain");
	
    if(data) {
        reqData = JSON.stringify(data);
        xhr.send(reqData);
    } else {
        xhr.send();
    }
}

xhr.onreadystatechange = function(e){
	if(xhr.readyState == 4 && xhr.status == 200 ){
		var temp = xhr.reponseText;
	}
}

//create qr code
var createBtn = document.getElementById("createBtn");
var qrcode = document.getElementById("qrcode");

var otp = '';
createBtn.addEventListener("click", function(){
	// variables refresh
	var midOtp = '';
	var otp1 = '';
	var otp2 = '';
	var otp3 = '';
	var otp4 = '';
	var otp5 = '';
	var otp6 = '';
	var pwAsc = '';
	var pwTemp = '';
	var pwSixteen = '';
	var idOtp = '';
	var pwOtp = '';
	var day = new Date();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hour = day.getHours();
	var min = day.getMinutes();
	var sec = day.getSeconds();

	month = month.toString();
	date = date.toString();
	hour = hour.toString();
	min = min.toString();
	sec = sec.toString();

	var fulldate = month + date + hour + min + sec;

	fulldate = parseInt(fulldate, 10);
	
	idOtp = my_id.value.toString();
	pwOtp = my_pw.value.toString();
//	pwOtp = 'd';
	console.log("pwOtp:"+pwOtp);
	
	for ( var i = 0 ; i < pwOtp.length  ; i++){
	    pwTemp = pwOtp.charAt(i);
	    pwTemp = pwTemp.charCodeAt(0);
	    pwTemp = pwTemp.toString();
	    pwAsc = pwAsc+pwTemp;
	}

	pwAsc = parseInt(pwAsc, 10);
	console.log("pwAsc: "+pwAsc);
	otp = fulldate * pwAsc;
	console.log("otp-fulldate * pwAsc: "+otp);
	otp = otp.toString(16);
	console.log("otp.toString(): "+otp);
	
	for ( i = 0 ; i < otp.length ; i++) {
	    if(otp.charAt(i) == 'A' || otp.charAt(i) == 'a'){
	        midOtp = midOtp + '0';
	    }
	    else if (otp.charAt(i) == 'B' || otp.charAt(i) == 'b'){
	        midOtp = midOtp + '1';
	    }
	    else if (otp.charAt(i) == 'C' || otp.charAt(i) == 'c'){
	        midOtp = midOtp + '2';
	    }
	    else if (otp.charAt(i) == 'D' || otp.charAt(i) == 'd'){
	        midOtp = midOtp + '3';
	    }
	    else if (otp.charAt(i) == 'E' || otp.charAt(i) == 'e'){
	        midOtp = midOtp + '4';
	    }
	    else if (otp.charAt(i) == 'F' || otp.charAt(i) == 'f'){
	        midOtp = midOtp + '5';
	    }
	    else {
	        midOtp = midOtp + otp.charAt(i);
	    }
	}

	midOtp = parseFloat(midOtp, 10);
	midOtp = midOtp.toString();

	otp1= (parseInt(midOtp.charAt(0)) + parseInt(midOtp.charAt(3)) + parseInt(midOtp.charAt(6))) % 10;
	otp2= (parseInt(midOtp.charAt(3)) + parseInt(midOtp.charAt(4)) + parseInt(midOtp.charAt(8))) % 10;
	otp3= (parseInt(midOtp.charAt(5)) + parseInt(midOtp.charAt(2)) + parseInt(midOtp.charAt(9))) % 10;
	otp4= (parseInt(midOtp.charAt(2)) + parseInt(midOtp.charAt(6)) + parseInt(midOtp.charAt(10))) % 10;
	otp5= (parseInt(midOtp.charAt(0)) + parseInt(midOtp.charAt(3)) + parseInt(midOtp.charAt(13))) % 10;
	otp6= (parseInt(midOtp.charAt(2)) + parseInt(midOtp.charAt(4)) + parseInt(midOtp.charAt(7))) % 10;

	otp = otp1.toString() + otp2.toString() + otp3.toString() + otp4.toString() + otp5.toString() + otp6.toString();
	console.log("otp string: "+otp);
	otp = parseInt(otp); // opt ready
	console.log("otp-int: "+otp);
	idOtp = encodeURIComponent(idOtp);
    otp = encodeURIComponent(otp);
    
    console.log("otp-final: "+otp);

    var googleQRUrl = "https://chart.googleapis.com/chart?chs=177x177&cht=qr&chl=";

    // show QR code image at the img tag area
	qrcode.setAttribute('src', googleQRUrl + idOtp +"," + otp +'&choe=UTF-8');
	
	console.log(otp+","+my_id.value.toString()+","+1234);
	connectSendWebSocket(otp+","+my_id.value.toString()+","+1234);
});


// Web socket
//protocol should be ws, not http
//creating web socket with url parameter => connecting

function connectSendWebSocket(msg){
	//var webSocketUrl = "ws://117.17.158.192:8200/Servlet/broadsocket";
	var webSocketUrl = "ws://echo.websocket.org";
	var webSocket = new WebSocket(webSocketUrl);

	webSocket.onopen = function(evt)
	{
	  console.log('connection open, readyState: ' + evt.target.readyState);
	  sendMessage(msg);
	};

	webSocket.onerror = function(evt)
	{
	  console.log('error, readyState: ' + evt.target.readyState);
	};

	function sendMessage(msg)
	{
	  console.log("ready: "+webSocket.readyState);
	  if (webSocket.readyState === 1)
	  {
		webSocket.send(msg);
		console.log("msg: "+msg);
	  }
	}
	// To receive message, register message event. It receives message after message event happens
	webSocket.onmessage = function(evt)
	{
	   // from server: key, id, unique#
	  console.log('server message: ' + evt.data);
	  var kiu = ''; 	// key, id, unique
	  kiu = evt.data.toString().split(",");
	  console.log("kiu: "+kiu);
	  check(kiu);
	};

	//close connection
	function closeConnection()
	{
	  if (webSocket.readyState === 1)
	  {
	    webSocket.close();
	  }
	}
	
	// notify connection close if close event happens.
	webSocket.onclose = function(evt)
	{
	  console.log('connection close, readyState: ' + evt.target.readyState);
	};
}



//door log check
var log_check = document.getElementById("log_check");
log_check.addEventListener("click", function(){
	console.log("log click");
	post("http://117.17.158.192:8200/Servlet/Log", {"type":"log", "id": my_id.value.toString()});
	
	xhr.onreadystatechange = function(e){
		var logresponse = xhr.responseText;
		
		var logtext = document.getElementById("logtext");
		var logsplit = logresponse.split(',');
		console.log("logsplit: "+logsplit);

		var length = logsplit.length;
		var temp = '';
		for(var i=0; i<length; i++){
			temp += (i+1)+": "+logsplit[i]+"<br/>";
			console.log(temp);
			logtext.innerHTML = temp;
		}
	};
});



//check door key 
function check(kiu){
	var key, id, unique;
	key = kiu[0];
	id = kiu[1];
	unique = kiu[2];
	
	if(key == otp && my_id == id && unique == 1234){
		sendWebSocket("client_ok"+","+my_id+","+1234);
	}
}


// set local storage
// local storage can be used instead of cookie for saving user preferences
// unlike cookie at web browser, local storage can be adapted across application restarts at device
function setLocalStorage(){
	var flag = document.getElementById("idsave-checkbox").checked;
	console.log("flag: "+flag);
	if(flag){
		localStorage.setItem("idsave", 'hello');

	}else{
		localStorage.removeItem("idsave");
	}
}

var iddata = localStorage.getItem("idsave");
console.log("idsave data: "+iddata);
if(iddata === null){
	my_id.setAttribute("value", "");
}else{
	my_id.setAttribute("value", iddata);
}


