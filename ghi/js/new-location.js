// we need to add an event listener for when the DOM loads
// let's declare a variable that will hold the URL for the API that we just created
// Let's fetch the URL. Don't forget the await keyword so that we get the response, not the Promise
// If the response is okay, then lets get the data using the .json method. Don't forget to await that too.

window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/states/";
	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById("state");
		for (let state of data.states) {
			const option = document.createElement("option");
			option.value = state.state;
			option.innerHTML = state.state;
			selectTag.appendChild(option);
		}
	}
});
