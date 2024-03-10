import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';


interface AppState {
  pageSize: number,
  country: string
}

export default class App extends Component<{}, AppState> {

  constructor(props: AppState) {
    super(props);
    this.state = {
      pageSize: 6,
      country: '',
    };
  }

  updateCountry = (country: string) => {
    this.setState({ country });
  }

  render() {
    const { pageSize, country } = this.state;
    return (
      <Router>
        <div>
          <NavBar updateCountry={this.updateCountry}></NavBar>
          <Routes>
            <Route path="/" element={<News pageSize={pageSize} country='' category='global'></News>} />
            <Route path="/business" element={<News pageSize={pageSize} country='' category='business'></News>} />
            <Route path="/entertainment" element={<News pageSize={pageSize} country='' category='entertainment'></News>} />
            <Route path="/sports" element={<News pageSize={pageSize} country='' category='sports'></News>} />
            <Route path="/technology" element={<News pageSize={pageSize} country='' category='technology'></News>} />
            <Route path="/health" element={<News pageSize={pageSize} country='' category='health'></News>} />
            <Route path="/country/:country" element={<News pageSize={pageSize} country={country} category=''></News>} />
          </Routes>
        </div>
      </Router>
    )
  }
}
