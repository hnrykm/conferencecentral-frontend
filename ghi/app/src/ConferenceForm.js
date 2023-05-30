import React, { useEffect, useState } from 'react';

function ConferenceForm() {
	const [locations, setLocations] = useState([]);
	const [name, setName] = useState('');
	const [starts, setStarts] = useState('');
	const [ends, setEnds] = useState('');
	const [description, setDescription] = useState('');
	const [maxPresentations, setMaxPresentations] = useState('');
	const [maxAttendees, setMaxAttendees] = useState('');
	const [location, setLocation] = useState('');

	const handleNameChange = (event) => {
		const value = event.target.value;
		return setName(value);
	};
	const handleStartsChange = (event) => {
		const value = event.target.value;
		return setStarts(value);
	};
	const handleEndsChange = (event) => {
		const value = event.target.value;
		return setEnds(value);
	};
	const handleDescriptionChange = (event) => {
		const value = event.target.value;
		return setDescription(value);
	};
	const handleMaxPresentationsChange = (event) => {
		const value = event.target.value;
		return setMaxPresentations(value);
	};
	const handleMaxAttendeesChange = (event) => {
		const value = event.target.value;
		return setMaxAttendees(value);
	};
	const handleLocationChange = (event) => {
		const value = event.target.value;
		return setLocation(value);
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
					<form id="create-conference-form">
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
								placeholder="Starts"
								required
								type="date"
								name="starts"
								id="starts"
								className="form-control"
								onChange={handleStartsChange}
								value={starts}
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
								onChange={handleEndsChange}
								value={ends}
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
								onChange={handleDescriptionChange}
								rows="3"
								value={description}
							></textarea>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum Presentations"
								required
								type="number"
								name="max_presentations"
								id="max_presentations"
								className="form-control"
								onChange={handleMaxPresentationsChange}
								value={maxPresentations}
							/>
							<label htmlFor="name">Maximum Presentations</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum Attendees"
								required
								type="number"
								name="max_attendees"
								id="max_attendees"
								className="form-control"
								onChange={handleMaxAttendeesChange}
								value={maxAttendees}
							/>
							<label htmlFor="name">Maximum Attendees</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="location"
								name="location"
								className="form-select"
								onChange={handleLocationChange}
							>
								<option>Choose a location</option>
								{locations.map((location) => {
									return <option key={location.id}>{location.name}</option>;
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
