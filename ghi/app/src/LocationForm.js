import React, { useEffect, useState } from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New location successfully created!</div>`;
}

function LocationForm() {
	const [formData, setFormData] = useState({
		name: '',
		roomCount: '',
		city: '',
		state: '',
	});

	const [states, setStates] = useState([]);

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};

		data.name = formData.name;
		data.room_count = formData.roomCount;
		data.city = formData.city;
		data.state = formData.state;

		const locationUrl = 'http://localhost:8000/api/locations/';
		const fetchConfig = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			setFormData({
				name: '',
				roomCount: '',
				city: '',
				state: '',
			});
		}
	};

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/states/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setStates(data.states);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new location</h1>
					<form id="create-location-form" onSubmit={handleSubmit}>
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
								placeholder="Room count"
								required
								type="number"
								name="roomCount"
								id="roomCount"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.roomCount}
							/>
							<label htmlFor="roomCount">Room count</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="City"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.city}
							/>
							<label htmlFor="city">City</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="state"
								name="state"
								className="form-select"
								onChange={handleFormDataChange}
							>
								<option value="">Choose a state</option>
								{states.map((state) => {
									return (
										<option value={state.abbreviation} key={state.abbreviation}>
											{state.name}
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

export default LocationForm;
