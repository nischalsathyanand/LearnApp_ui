import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import TrainingAndLearningContainer from "./components/TrainingAndLearningContainer"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";
import HomeDemo from "./components/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" Component={LoginForm}></Route>
        <Route path="/home" Component={Home}> </Route>
        <Route path="/training" Component={TrainingAndLearningContainer}> </Route>
    
      </Routes>
    </Router>
  );
}

export default App;