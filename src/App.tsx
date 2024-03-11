import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { Utils } from './controller/utils';


interface AppState {
  pageSize: number,
  country: string,
  searchItem: string,
}

export default class App extends Component<{}, AppState> {

  constructor(props: AppState) {
    super(props);
    this.state = {
      pageSize: 6,
      country: '',
      searchItem: ''
    };
  }

  updateCountry = (country: string) => {
    this.setState({ country });
  }

  handleSearch = (searchItemValue: string) => {
    console.log('APP searchItemValue: ', searchItemValue);
    this.setState({ searchItem: searchItemValue });
  }

  render() {
    const { pageSize, country, searchItem } = this.state;
    console.log('APP searchItem: ', searchItem);
    return (
      <Router>
        <div>
          <NavBar updateCountry={this.updateCountry} handleSearch={this.handleSearch} history={undefined}></NavBar>
          <Routes>
            <Route path="/" element={<News pageSize={pageSize} country='' category='global'></News>} />
            <Route path="/business" element={<News pageSize={pageSize} country='' category='business'></News>} />
            <Route path="/entertainment" element={<News pageSize={pageSize} country='' category='entertainment'></News>} />
            <Route path="/sports" element={<News pageSize={pageSize} country='' category='sports'></News>} />
            <Route path="/technology" element={<News pageSize={pageSize} country='' category='technology'></News>} />
            <Route path="/health" element={<News pageSize={pageSize} country='' category='health'></News>} />
            <Route path="/country/:country" element={<News pageSize={pageSize} country={country} category=''></News>} />
            <Route path="/search/:query" element={<News pageSize={pageSize} country='' category='' searchItem={searchItem}></News>} />
          </Routes>
        </div>
      </Router>
    )
  }
}
