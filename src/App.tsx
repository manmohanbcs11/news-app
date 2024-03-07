import './App.css';
import { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  PAGE_SIZE = 6;
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <News pageSize={this.PAGE_SIZE}></News>
      </div>
    )
  }
}
