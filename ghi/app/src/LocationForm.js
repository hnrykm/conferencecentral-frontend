import React, { useEffect, useState } from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New location successfully created!</div>`;
}

function LocationForm(props) {
	const [states, setStates] = useState([]);
	const [name, setName] = useState('');
	const [roomCount, setRoomCount] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');

	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};
	const handleCityChange = (event) => {
		const value = event.target.value;
		setCity(value);
	};
	const handleRoomCountChange = (event) => {
		const value = event.target.value;
		setRoomCount(value);
	};
	const handleStateChange = (event) => {
		const value = event.target.value;
		setState(value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};

		data.room_count = roomCount;
		data.name = name;
		data.city = city;
		data.state = state;

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
			const newLocation = await response.json();
			console.log(newLocation);

			setName('');
			setRoomCount('');
			setCity('');
			setState('');
		}
	};

	// Form Data
	// const [formData, setFormData] = useState({
	// 	name: '',
	// 	roomcount: '',
	// 	city: '',
	// 	state: '',
	// });

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/states/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setStates(data.states);
			// const selectTag = document.getElementById('state');
			// for (let state of data.states) {
			// 	const option = document.createElement('option');
			// 	option.value = state.abbreviation;
			// 	option.innerHTML = state.name;
			// 	selectTag.appendChild(option);
			// }
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
								onChange={handleNameChange}
								value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Room count"
								required
								type="number"
								name="room_count"
								id="room_count"
								className="form-control"
								onChange={handleRoomCountChange}
								value={roomCount}
							/>
							<label htmlFor="room_count">Room count</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="City"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
								onChange={handleCityChange}
								value={city}
							/>
							<label htmlFor="city">City</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="state"
								name="state"
								className="form-select"
								onChange={handleStateChange}
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
