import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<App />} />

					<Route
						path="attendees"
						element={<AttendeesList attendees={props.attendees} />}
					/>
					<Route path="attendees/new" element={<AttendeeForm />} />

					{/* <Route path="attendees/new" element={<AttendeeForm />} /> */}

					<Route path="locations">
						<Route path="new" element={<LocationForm />} />
					</Route>

					<Route path="conferences">
						<Route path="new" element={<ConferenceForm />} />
					</Route>

					<Route path="presentations">
						<Route path="new" element={<PresentationForm />} />
					</Route>

					<Route path="*" element="Error 404 - Page Not Found" />
				</Routes>
				{/* <AttendeeForm /> */}
				{/* <ConferenceForm /> */}
				{/* <LocationForm /> */}
				{/* <AttendeesList attendees={props.attendees} /> */}
			</div>
		</BrowserRouter>
	);
}

export default App;
