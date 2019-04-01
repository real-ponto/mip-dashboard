import React, { Component } from 'react';
import './App.css';
import RegisterCompanyForm from './containers/RegisterCompany'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterCompanyForm/>
      </div>
    );
  }
}

export default App;

