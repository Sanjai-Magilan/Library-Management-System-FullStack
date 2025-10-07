import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="searchPage">
      <h1 className= "arcade">Library</h1>
      <SearchBar />
    </div>
  );
}
