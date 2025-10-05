import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = () => {
    const q = query.trim();
    if (!q) return;

    axios
      .get(`http://localhost:5000/Lib/get/name/${q}`) // path parameter $(q)
      .then((res) => setResults(res.data || []))
      .catch((err) => console.error("Error fetching data:", err));
  };

  {
    console.log(query);
  }
  return (
    <div className="searchBar">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          onKeyDown={(e) => e.key === "Enter" && fetchResults()}
        />
        <button className="searchBtn" onClick={fetchResults}>
          🔍
        </button>
      </div>

     <ul className="searchResults">
  {results.map((book, i) => (
    <li key={i} className="bookItem">
      <h3>{book.name}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ID:</strong> {book.id}</p>
      <p><strong>Availability:</strong> {book.availability ? "Available" : "Not available"}</p>
      <p><strong>Time:</strong> {new Date(book.time).toLocaleString()}</p>
    </li>
  ))}
</ul>

    </div>
  );
}
