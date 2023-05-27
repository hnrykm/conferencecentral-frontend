import Nav from './Nav';

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<>
			<Nav />
			<div className="container">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Conference</th>
						</tr>
					</thead>
					<tbody>
						{/* for (let attendee of props.attendees){' '}
					{
						<tr>
							<th>{attendee.name}</th>
							<th>{attendee.conference}</th>
						</tr>
					} */}
						{props.attendees.map((attendee) => {
							return (
								<tr key={attendee.href}>
									<td>{attendee.name}</td>
									<td>{attendee.conference}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
