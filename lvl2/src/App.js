import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
      super();

      this.state = {
        selectedFile : null
      }
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
      </div>
    );
  }
}

export default App;
