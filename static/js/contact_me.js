var msg = document.getElementById("msg")

var myemail = document.getElementById("id-email");
var mysubject = document.getElementById("id-subject");
var mybody = document.getElementById("id-body");
const p_myemail = document.getElementById("id-p-email");
const p_mysubject = document.getElementById("id-p-subject");
const p_mybody = document.getElementById("id-p-body");


myemail.addEventListener('input', function() {
	regex = /^\w+([._-])*(0-9)*\w*@\w+([._-])*(0-9)*\w*\.\w{2,3}(\.\w{2,3})*$/;
	
	if(regex.test(this.value)) {
		myemail.className = "form-control border border-success rounded border-5"
		p_myemail.className = "text-success ms-1";
		p_myemail.innerHTML = "Correct";
	}else{
		myemail.className = "form-control border border-danger rounded border-5"
		p_myemail.className = "text-danger ms-1";
		p_myemail.innerHTML = "Invalid Email";
	}

});

mysubject.addEventListener('input', function() {
	if(this.value) {
		mysubject.className = "form-control border border-success rounded border-5"
		p_mysubject.className = "text-success ms-1"
		p_mysubject.innerHTML = "Correct"
	}else {
		mysubject.className = "form-control border border-danger rounded border-5"
		p_mysubject.className = "text-danger ms-1"
		p_mysubject.innerHTML = "Complete the subject field"
	}
})

mybody.addEventListener('input', function() {
	regex = /^[\s\S]{21,700}$/i;
	if(regex.test(this.value)) {
		mybody.className = "form-control border border-success rounded border-5"
		p_mybody.className = "text-success ms-1"
		p_mybody.innerHTML = "Excelent"
	}else {
		mybody.className = "form-control border border-danger rounded border-5"
		p_mybody.className = "text-danger ms-1"
		p_mybody.innerHTML = "It must have more than 20 characters"
	}
})



const myform = document.getElementById("form_contactme");

myform.addEventListener("submit", function (e) {
	e.preventDefault();

	if(p_myemail.innerHTML == "Correct" && p_mysubject.innerHTML == "Correct" && p_mybody.innerHTML == "Excelent") {
		
		const formData = new FormData(this);

		fetch("/contactme", {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(data => {

				if (data.msg) {
					console.log(data)
					
					myemail.value = "";
					mysubject.value = "";
					mybody.value = "";
					myemail.className = "form-control";
					mysubject.className = "form-control";
					mybody.className = "form-control";
					p_myemail.innerHTML = "";
					p_mysubject.innerHTML = "";
					p_mybody.innerHTML = "";

					msg.innerHTML = `
					<div class="alert alert-success alert-dismissible fade show" role="alert">
						<strong>Done! </strong>`+data.msg+
					`<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>`			
					
				} else {
					console.log(data)
					msg.innerHTML = `
					<p class="fs-5 text-center text-danger">
					There was a server error. Try it later</p>
					`
				}
			})
			.catch(err => {
				console.log("There was an error")
				msg.innerHTML = `
				<p class="fs-5 text-center text-danger">
				There was a server error. Try it later</p>
				`
			})
	}else {

		if(p_myemail.innerHTML == "") {
			p_myemail.className = "text-danger fw-bold ms-1";
			p_myemail.innerHTML = "Complete this field";

		} else if(p_mysubject.innerHTML == "") {
			p_mysubject.className = "text-danger fw-bold ms-1";
			p_mysubject.innerHTML = "Complete this field";

		} else if(p_mybody.innerHTML == ""){
			p_mybody.className = "text-danger fw-bold ms-1";
			p_mybody.innerHTML = "Complete this field";

		} else {
			if(p_myemail.innerHTML == "Invalid Email") {
				p_myemail.className = "text-danger fw-bold ms-1";
			}
			if(p_mysubject.innerHTML == "Complete the subject field") {
				p_mysubject.className = "text-danger fw-bold ms-1";
			}
			if(p_mybody.innerHTML == "It must have more than 20 characters") {
				p_mybody.className = "text-danger fw-bold ms-1";
			}
		}
		
	}
	
});
