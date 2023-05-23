window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.log("There was a problem with your request.");
		} else {
			const data = await response.json();
			const conference = data.conferences[0];
			const nameTag = document.querySelector(".card-title");
			nameTag.innerHTML = conference.name;

			const detailUrl = `http://localhost:8000${conference.href}`;
			const detailResponse = await fetch(detailUrl);
			if (detailResponse.ok) {
				const details = await detailResponse.json();
				const description = details.conference.description;
				const detailTag = document.querySelector(".card-text");
				detailTag.innerHTML = description;

				const photo = details.conference.location.picture_url;
				const imageTag = document.querySelector(".card-img-top");
				imageTag.src = photo;
			}
		}
	} catch (e) {
		console.log("There was a problem with your request.");
	}
});
