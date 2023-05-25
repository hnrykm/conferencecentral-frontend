function createSuccess() {
	return `<div class="alert alert-success" role="alert">New presentation successfully created!</div>`;
}

window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/conferences/';
	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById('conference');
		for (let conference of data.conferences) {
			const option = document.createElement('option');
			option.value = conference.id;
			option.innerHTML = conference.name;
			selectTag.appendChild(option);
		}
	}

	// When the "Create" button is clicked
	const formTag = document.getElementById('create-presentation-form');
	formTag.addEventListener('submit', async (event) => {
		event.preventDefault();

		// Pull the value (id) from the selected conference, assign to conference_id
		const select = document.getElementById('conference');
		const conference_id = select.options[select.selectedIndex].value;

		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));

		const presentationUrl = `http://localhost:8000/api/conferences/${conference_id}/presentations/`;
		const fetchConfig = {
			method: 'POST',
			body: json,
			headers: {
				'Content-type': 'application/json',
			},
		};

		const response = await fetch(presentationUrl, fetchConfig);
		if (response.ok) {
			formTag.reset();
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			const newPresentation = await response.json();
		}
	});
});
