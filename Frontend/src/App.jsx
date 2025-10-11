import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Login from "./components/login";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SearchBar" element={<SearchBar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
