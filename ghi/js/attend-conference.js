window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/conferences/';
	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();

		const selectTag = document.getElementById('conference');
		for (let conference of data.conferences) {
			const option = document.createElement('option');
			option.value = conference.href;
			option.innerHTML = conference.name;
			selectTag.appendChild(option);
		}

		const div_spinner = document.getElementById('loading-conference-spinner');
		div_spinner.classList.add('d-none');
		selectTag.classList.remove('d-none');
	}

	const formTag = document.getElementById('create-attendee-form');
	formTag.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));

		const attendeesUrl = 'http://localhost:8001/api/attendees/';
		const fetchConfig = {
			method: 'post',
			body: json,
			headers: {
				'Content-type': 'application/json',
			},
		};

		const response = await fetch(attendeesUrl, fetchConfig);
		if (response.ok) {
			const div_success = document.getElementById('success-message');
			div_success.classList.remove('d-none');
			formTag.classList.add('d-none');
		}
	});
});
