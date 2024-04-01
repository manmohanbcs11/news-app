import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import React from 'react';

interface Props {}
interface AppState {
  pageSize: number;
  country: string;
  searchItem: string;
  progress: number;
}

export default class App extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageSize: 6,
      country: '',
      searchItem: '',
      progress: 0
    };
  }

  setProgress = (progress: number) => {
    this.setState({ progress: progress });
  }

  updateCountry = (countryValue: string) => {
    this.setState({ country: countryValue });
  };

  updateSearchItem = (searchItemValue: string) => {
    this.setState({ searchItem: searchItemValue });
  };

  render() {
    const { pageSize, country, searchItem, progress } = this.state;
    return (
      <Router>
        <div>
        <LoadingBar height={3} color='#f11946' progress={progress} onLoaderFinished={() => this.setProgress(0)}/>
          <NavBar updateCountry={this.updateCountry} updateSearchItem={this.updateSearchItem} />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="global" />} />
            <Route path="/business" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="business" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="entertainment" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="sports" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="technology" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="health" />} />
            <Route path="/country/:country" element={<News setProgress = {this.setProgress} pageSize={pageSize} country={country} category="" />} />
            <Route path="/search/:searchItem" element={<News setProgress = {this.setProgress} pageSize={pageSize} country="" category="" searchItem={searchItem} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
