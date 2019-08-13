import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import BookList from './Book';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchBook: 'harry potter',
			bookLists: [],
			isLoading: true
		}

		this.handleChange = this.handleChange.bind(this);
		this.searchBookQuery = this.searchBookQuery.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.searchBookQuery(this.state.searchBook);

		this.inputRef.current.focus();
	}

	handleChange(e) {
		const {  name, value, type } = e.target;
    
        this.setState({
          [name]: type === "number" ? Number(value) : value
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({
			isLoading: true
		})

		this.searchBookQuery(this.state.searchBook);
	}

	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.setState({
				isLoading: true
			})
	
			this.searchBookQuery(this.state.searchBook);
		}
	}

	searchBookQuery(query) {
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
			.then((res) => {
				this.setState({
					bookLists: res.data.items,
					errorMsg: '',
					isLoading: false
				})

				if(res.data.totalItems <= 0) {
					this.setState({
						errorMsg: `No books found for '${query}'. Please search again.`
					})
				}
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					errorMsg: 'Sorry, can\'t connect to API. Please try again!'
				})
			})
	}

	render() {
		return(
			<div className="App">
				<h2>Welcome to my Book Fair!</h2>
				<form onSubmit={this.handleSubmit}>
					<input type="text"
						value={this.state.searchBook} 
						name="searchBook"
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress} 
						ref={this.inputRef}
						/>
					<button type="submit">Search</button>
				</form>

				{this.state.isLoading ? (
					<div className="loading-wrapper">
						<img alt="loader" src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
						<p>Loading your books...</p>
					</div>
				) : (
					<div className="results-wrapper">
						{this.state.bookLists && (
							<BookList books={this.state.bookLists} />
						)}
						
						{this.state.errorMsg && (
							<p style={{ textAlign: "center" }}>{this.state.errorMsg}</p>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default App;