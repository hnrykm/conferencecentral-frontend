import React, { useState, useEffect } from 'react';

function AttendeeForm(props) {
	const [conferences, setConferences] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	let spinnerClasses = 'spinner-grow text-secondary';
	let dropdownClasses = 'form-select d-none';

	let successClasses = 'alert alert-success d-none mb-0';
	let formClasses = '';

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/conferences/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setConferences(data.conferences);
			setLoaded(true);
		}
	};

	if (loaded && conferences.length > 0) {
		spinnerClasses = 'spinner-grow text-secondary d-none';
		dropdownClasses = 'form-select';
	}

	const [formData, setFormData] = useState({
		conference: '',
		name: '',
		email: '',
	});

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.conference = formData.conference;
		data.name = formData.name;
		data.email = formData.email;

		const attendeesUrl = 'http://localhost:8001/api/attendees/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(attendeesUrl, fetchConfig);
		if (response.ok) {
			setFormData({
				conference: '',
				name: '',
				email: '',
			});
			setSubmitted(true);
		}
	};

	if (submitted) {
		successClasses = 'alert alert-success mb-0';
		formClasses = 'd-none';
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="my-5 container">
			<div className="row">
				<div className="col col-sm-auto">
					<img
						width="300"
						className="bg-white rounded shadow d-block mx-auto mb-4"
						src="/logo.svg"
					/>
				</div>
				<div className="col">
					<div className="card shadow">
						<div className="card-body">
							<form
								id="create-attendee-form"
								className={formClasses}
								onSubmit={handleSubmit}
							>
								<h1 className="card-title">It's Conference Time!</h1>
								<p className="mb-3">
									Please choose which conference you'd like to attend.
								</p>
								<div
									className="d-flex justify-content-center mb-3"
									id="loading-conference-spinner"
								>
									<div className={spinnerClasses} role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
								<div className="mb-3">
									<select
										name="conference"
										id="conference"
										className={dropdownClasses}
										required
										onChange={handleFormDataChange}
									>
										<option value="">Choose a conference</option>
										{conferences.map((conference) => {
											return (
												<option key={conference.href} value={conference.href}>
													{conference.name}
												</option>
											);
										})}
									</select>
								</div>
								<p className="mb-3">Now, tell us about yourself.</p>
								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												required
												placeholder="Your full name"
												type="text"
												id="name"
												name="name"
												className="form-control"
												onChange={handleFormDataChange}
												value={formData.name}
											/>
										</div>
									</div>
									<div className="col">
										<div className="form-floating mb-3">
											<input
												required
												placeholder="Your email address"
												type="email"
												id="email"
												name="email"
												className="form-control"
												onChange={handleFormDataChange}
												value={formData.email}
											/>
										</div>
									</div>
								</div>
								<button className="btn btn-lg btn-primary">I'm going!</button>
							</form>
							<div className={successClasses} id="success-message">
								Congratulations! You're all signed up!
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AttendeeForm;
