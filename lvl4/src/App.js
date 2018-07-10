import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TotalBinary from './components/totalBinary';


class App extends Component {
  constructor(){
      super();

      this.state = {
        selectedFile : null,
        count: null
      }
  }

  componentDidMount(){
    this.findTotal();
  }


  findTotal = () => {
    fetch("https://fhirtest.uhn.ca/baseDstu3/Binary", {
      method: "GET",
      dataType: "JSON"
    })
    .then((req) => {
      return req.json()
    })
    .then((res) => {
      this.setState({
        count : res.total

      })
    })
  }

  chooseFile = event => {
    this.setState({
        selectedFile: event.target.files[0]
    })
  }

  uploadFile = () => {
    const formData = new FormData();
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name);
    /*fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', {
      method: 'POST',
      body: formData
    })*/
    axios.post('https://fhirtest.uhn.ca/baseDstu3/Binary', formData, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100 ) + '%')
      }
    })
    .then(res => {
      console.log(res);
      alert( this.state.selectedFile.name + ' is Uploaded Successfully!!!');
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>LIFEN</h1>
        </div>

        <input type="file" onChange={this.chooseFile} />
        <button className="uploadFile" onClick={this.uploadFile}>Upload</button>
        <TotalBinary count={this.state.count} />
      </div>
    );
  }
}

export default App;
