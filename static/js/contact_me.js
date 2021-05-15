
const myform = document.getElementById("form_contactme");

myform.addEventListener("submit", function (e) {
	e.preventDefault();
	const formData = new FormData(this);

	fetch("/contactme", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			let msg = document.getElementById("msg")

			if (data.msg) {
				console.log(data)
				msg.innerHTML =`
				<p class="fs-5 text-center text-success"><img src="../static/images/contactme/correct.png" width="25" class="pb-1">
				`+data.msg+`</p>`
				
			} else {
				console.log(data)
				msg.innerHTML = `
				<p class="fs-5 text-center text-danger"><img src="../static/images/contactme/wrong.png" width="25" class="pb-1">
				Verify email is right or complete all fields</p>
				`

			}
		})
		.catch(err => {
			console.log("There was an error")
			msg.innerHTML = "There was an error"
		})
});
