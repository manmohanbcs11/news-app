import { Component } from 'react';
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
      country: 'IN'
    };
  }

  changeCountry = (value: string) => {
    console.log('new country value: ', value);
    this.setState({
      country: value
    });
  }

  render() {
    const { pageSize, country } = this.state;
    return (
      <div>
        <NavBar country={country} changeCountry={this.changeCountry}></NavBar>
        <News pageSize={pageSize} country={country}></News>
      </div>
    )
  }
}
