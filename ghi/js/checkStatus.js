// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload'); // FINISH THIS
// console.log(payloadCookie);
if (payloadCookie) {
	// The cookie value is a JSON-formatted string, so parse it
	const encodedPayload = payloadCookie.value;
	// console.log(encodedPayload);
	// Convert the encoded payload from base64 to normal string
	const decodedPayload = atob(encodedPayload); // FINISH THIS

	// The payload is a JSON-formatted string, so parse it
	const payload = JSON.parse(decodedPayload); // FINISH THIS

	// Print the payload
	console.log(payload);

	const permissions = payload.user.perms;
	// Check if "events.add_conference" is in the permissions.
	// If it is, remove 'd-none' from the link
	if (permissions.includes('events.add_conference')) {
		const add_conference = document.getElementById('add-conference');
		add_conference.classList.remove('d-none');
	}

	// Check if "events.add_location" is in the permissions.
	// If it is, remove 'd-none' from the link
	if (permissions.includes('events.add_location')) {
		const add_location = document.getElementById('add-location');
		add_location.classList.remove('d-none');
	}
}
