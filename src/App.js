import React from 'react';
import './App.css';
import Posts from './components/Posts';
import Comments from './components/Comments';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App"> 
      <Posts/>
      <Comments />
    </div>
  );
}

export default App;
