import React, { useEffect, useState } from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New location successfully created!</div>`;
}

function ConferenceForm() {
	const [locations, setLocations] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		starts: '',
		ends: '',
		description: '',
		maxPresentations: '',
		maxAttendees: '',
		location: '',
	});

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.name = formData.name;
		data.starts = formData.starts;
		data.ends = formData.ends;
		data.description = formData.description;
		data.max_presentations = formData.maxPresentations;
		data.max_attendees = formData.maxAttendees;
		data.location = formData.location;
		console.log(data);

		const conferenceUrl = 'http://localhost:8000/api/conferences/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(conferenceUrl, fetchConfig);
		if (response.ok) {
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			setFormData({
				name: '',
				starts: '',
				ends: '',
				description: '',
				maxPresentations: '',
				maxAttendees: '',
				location: '',
			});
		}
	};

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/locations';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new conference</h1>
					<form id="create-conference-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Starts"
								required
								type="date"
								name="starts"
								id="starts"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.starts}
							/>
							<label htmlFor="name">Starts</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Ends"
								required
								type="date"
								name="ends"
								id="ends"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.ends}
							/>
							<label htmlFor="name">Ends</label>
						</div>
						<div className="form mb-3">
							<label htmlFor="name">Description</label>
							<textarea
								required
								type="textarea"
								name="description"
								id="description"
								className="form-control"
								onChange={handleFormDataChange}
								rows="3"
								value={formData.description}
							></textarea>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum Presentations"
								required
								type="number"
								name="maxPresentations"
								id="maxPresentations"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.maxPresentations}
							/>
							<label htmlFor="name">Maximum Presentations</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum Attendees"
								required
								type="number"
								name="maxAttendees"
								id="maxAttendees"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.maxAttendees}
							/>
							<label htmlFor="name">Maximum Attendees</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="location"
								name="location"
								className="form-select"
								onChange={handleFormDataChange}
							>
								<option>Choose a location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.name}
										</option>
									);
								})}
							</select>
						</div>
						<div id="submitted"></div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ConferenceForm;
