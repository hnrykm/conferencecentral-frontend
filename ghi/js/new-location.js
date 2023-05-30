function createSuccess() {
	return `<div class="alert alert-success" role="alert">New location successfully created!</div>`;
}

window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/states/";
	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById("state");
		for (let state of data.states) {
			const option = document.createElement("option");
			option.value = state.abbreviaton;
			option.innerHTML = state.name;
			selectTag.appendChild(option);
		}
	}

	const formTag = document.getElementById("create-location-form");
	formTag.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));

		const locationUrl = "http://localhost:8000/api/locations/";
		const fetchConfig = {
			method: "POST",
			body: json,
			headers: {
				"Content-type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
			formTag.reset();
			const success = document.getElementById("submitted");
			success.innerHTML = createSuccess();
			const newLocation = await response.json();
		}
	});
});
