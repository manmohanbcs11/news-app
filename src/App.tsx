import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';

interface Props {}
interface AppState {
  pageSize: number;
  country: string;
  searchItem: string;
}

export default class App extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageSize: 6,
      country: '',
      searchItem: '',
    };
  }

  updateCountry = (countryValue: string) => {
    this.setState({ country: countryValue });
  };

  updateSearchItem = (searchItemValue: string) => {
    this.setState({ searchItem: searchItemValue });
  };

  render() {
    const { pageSize, country, searchItem } = this.state;
    console.log('APP searchItem: ', searchItem);
    return (
      <Router>
        <div>
          <NavBar updateCountry={this.updateCountry} updateSearchItem={this.updateSearchItem} />
          <Routes>
            <Route path="/" element={<News pageSize={pageSize} country="" category="global" />} />
            <Route path="/business" element={<News pageSize={pageSize} country="" category="business" />} />
            <Route path="/entertainment" element={<News pageSize={pageSize} country="" category="entertainment" />} />
            <Route path="/sports" element={<News pageSize={pageSize} country="" category="sports" />} />
            <Route path="/technology" element={<News pageSize={pageSize} country="" category="technology" />} />
            <Route path="/health" element={<News pageSize={pageSize} country="" category="health" />} />
            <Route path="/country/:country" element={<News pageSize={pageSize} country={country} category="" />} />
            <Route path="/search/:searchItem" element={<News pageSize={pageSize} country="" category="" searchItem={searchItem} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
