function createCard(title, description, pictureUrl, starts, ends, location) {
	return `
		<div class="col-4">
		<div class="card-sm shadow">
			<img src="${pictureUrl}" class="card-img-top">
			<div class="card-body">
			<h5 class="card-title">${title}</h5>
			<h6 class="card-subtitle mb-2 text-muted">${location}</h6>
			<p class="card-text">${description}</p>
			</div>
			<p class="card-footer text-muted text-center">${starts} - ${ends}</p>
		</div>
		</div>
	`;
}

function raiseError() {
	return `<div class="alert alert-danger" role="alert">There was an error retrieving the requested information.</div>`;
}

window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const row = document.querySelector(".row");
			row.innerHTML = raiseError();
		} else {
			const data = await response.json();

			for (let conference of data.conferences) {
				const detailUrl = `http://localhost:8000${conference.href}`;
				const detailResponse = await fetch(detailUrl);
				if (detailResponse.ok) {
					const details = await detailResponse.json();
					const title = details.conference.name;
					const description = details.conference.description;
					const pictureUrl = details.conference.location.picture_url;
					const starts = new Date(
						details.conference.starts
					).toLocaleDateString();
					const ends = new Date(details.conference.ends).toLocaleDateString();
					const location = details.conference.location.name;
					const html = createCard(
						title,
						description,
						pictureUrl,
						starts,
						ends,
						location
					);
					const row = document.querySelector(".row");
					row.innerHTML += html;
				}
			}
		}
	} catch (e) {
		const row = document.querySelector(".row");
		row.innerHTML = raiseError();
	}
});
