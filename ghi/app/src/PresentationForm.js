import React, { useEffect, useState } from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New location successfully created!</div>`;
}

function PresentationForm() {
	const [conferences, setConferences] = useState([]);
	const [formData, setFormData] = useState({
		presenterName: '',
		presenterEmail: '',
		companyName: '',
		title: '',
		synopsis: '',
		conference: '',
	});

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/conferences/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setConferences(data.conferences);
		}
	};

	const handleFormDataChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {};
		data.presenter_name = formData.presenterName;
		data.presenter_email = formData.presenterEmail;
		data.company_name = formData.companyName;
		data.title = formData.title;
		data.synopsis = formData.synopsis;
		data.conference = formData.conference;

		console.log(data);
		const presentationUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(presentationUrl, fetchConfig);
		if (response.ok) {
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			setFormData({
				presenterName: '',
				presenterEmail: '',
				companyName: '',
				title: '',
				synopsis: '',
				conference: '',
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new presentation</h1>
					<form id="create-presentation-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Presenter name"
								required
								type="text"
								name="presenterName"
								id="presenterName"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.presenterName}
							/>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Presenter email"
								required
								type="email"
								name="presenterEmail"
								id="presenterEmail"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.presenterEmail}
							/>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Company name"
								type="text"
								name="companyName"
								id="companyName"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.companyName}
							/>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Title"
								required
								type="text"
								name="title"
								id="title"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.title}
							/>
						</div>
						<div className="form mb-3">
							<label htmlFor="name">Synopsis</label>
							<textarea
								required
								type="textarea"
								name="synopsis"
								id="synopsis"
								className="form-control"
								rows="3"
								onChange={handleFormDataChange}
								value={formData.synopsis}
							></textarea>
						</div>

						<div className="mb-3">
							<select
								required
								id="conference"
								name="conference"
								className="form-select"
								onChange={handleFormDataChange}
								value={formData.conference}
							>
								<option>Choose a conference</option>
								{conferences.map((conference) => {
									return (
										<option key={conference.id} value={conference.id}>
											{conference.name}
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

export default PresentationForm;
