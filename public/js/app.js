console.log("Client side JS file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("#location");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	fetch(
		`http://localhost:3000/weather?address=${encodeURIComponent(search.value)}`
	).then((response) => {
		response.json().then(({ error, location, forecast }) => {
			if (error) {
				messageOne.textContent = error;
			} else {
				messageOne.textContent = location;
				messageTwo.textContent = forecast;
			}
		});
	});
});
