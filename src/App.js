import './App.css';
import PostList from './components/CountryList';
import SelectedPost from './components/SelectedCountry';
import React from "react";

function App() {
  return (
    <div className="App">
      <br/>
      <SelectedPost/>
      <br/>
      <PostList/>
    </div>
  );
}

export default App;
