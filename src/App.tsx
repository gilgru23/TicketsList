import React from 'react';
import './App.scss';
import {createApiClient} from './api';
import AddTicktet from './AddTicket'
import TicketList from './TicketList'
// @ts-ignore
import {Link,BrowserRouter,Route} from 'react-router-dom'


export type AppState = {

}

const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
	}

	render() {
		return (
			<BrowserRouter>
			<div className="ui three item menu">
			<Link to="/" className="item"><b>Show Tickets List</b></Link>
			<Link to="/addTicket" className="item"><b>Add a Ticket</b></Link>
			</div>
			<Route path="/" exact component={TicketList} />
			<Route path="/addTicket" exact component={AddTicktet} />
		
			</BrowserRouter>
		)
	}
}

export default App;