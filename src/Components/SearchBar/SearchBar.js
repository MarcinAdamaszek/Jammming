import React from 'react';
//import { SearchButton } from '../SearchButton/SearchButton';
import './SearchBar.css';

export class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.state = {
            term: ''
        }
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        })
        e.preventDefault();
    }

    search() {
        if (this.state.term) {
        this.props.onSearch(this.state.term);
        }
    }

    render() {
        return (    
            <div className="SearchBar">
                <input onChange={this.handleTermChange} onKeyPress={this.handleEnterPress} placeholder="Enter A Song, Album, or Artist" />
                <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        );
    }
}