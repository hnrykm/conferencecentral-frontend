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

		const div_spinner = document.getElementById('loading-conference-spinner');
		const div_conference = document.getElementById('conference');
		// Here, add the 'd-none' class to the loading icon
		div_spinner.classList.add('d-none');
		// Here, remove the 'd-none' class from the select tag
		div_conference.classList.remove('d-none');
	}
});
