import React, {  useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import Profile from "./Profile";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const BookBorrow = async (name) => {
    try {
      await axios.post(
        `${API_BASE_URL}/Lib/user/borrow`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err);
    }
  };

  const fetchResults = async () => {
    const q = query.trim();
    if (!q) return;

    await axios
      .get(`${API_BASE_URL}/Lib/get/name/${q}`) // path parameter $(q)
      .then((res) => setResults(res.data || []))
      .catch((err) => console.error("Error fetching data:", err));
  };

  return (
    <>
      <div className="searchPage">
        <h1 className="arcade">Library</h1>
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
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>ID:</strong> {book.id}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  {book.availability ? "Available" : "Not available"}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(book.time).toLocaleString()}
                </p>
                <button
                  className="button_Style"
                  onClick={async () => {
                    await BookBorrow(book.name);
                    fetchResults();
                  }}
                >
                  Borrow
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {token !== null && (
        <>
          <Profile
            Refetch={fetchResults}
            availability={results.map((book) => book.availability)}
          />
        </>
      )}
    </>
  );
}
