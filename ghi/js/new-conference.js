window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/locations/";
	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById("location");
		for (let location of data.locations) {
			const option = document.createElement("option");
			option.value = location.id;
			option.innerHTML = location.name;
			selectTag.appendChild(option);
		}
	}
});
