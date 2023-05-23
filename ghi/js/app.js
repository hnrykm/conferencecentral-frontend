window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.log("There was a problem with your request.");
		} else {
			const data = await response.json();
		}
	} catch (e) {
		console.log("There was a problem with your request.");
	}
});
