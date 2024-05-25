
import React, { useState } from 'react';
import './CountryInformation.css';
import CountryInfo from './CountryInfo';

function CountryInformation() {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]); // New state for suggestions

    const handleSearch = () => {
        if (!countryName) {
            setError('The input field cannot be empty');
            setCountryData(null);
            return;
        }

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`;
        fetch(finalURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Country Information is not Found');
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    setError('Please enter a valid country name.');
                    setCountryData(null);
                } else {
                    setError('');
                    setCountryData(data[0]);
                }
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while fetching data.');
                setCountryData(null);
            });
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setCountryName(input);

        if (input.length > 0) {
            const suggestionsURL = `https://restcountries.com/v3.1/name/${input}`;
            fetch(suggestionsURL)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status !== 404) {
                        setSuggestions(data.map(country => country.name.common));
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching suggestions:', error);
                    setSuggestions([]);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setCountryName(suggestion);
        setSuggestions([]);
        handleSearch();
    };

    return (
        <div className="country-container">
            <h1 className='data'>Search Country data</h1>
            <div className="search">
                <input
                    type="text"
                    id="countryName"
                    placeholder="Enter a country name here..."
                    value={countryName}
                    onChange={handleInputChange}
                />
                <button id="search-btn" onClick={handleSearch}>
                    Search
                </button>
                <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="suggestion"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            </div>
            <div id="result">
                {error && <h3 className="error">{error}</h3>}
                {countryData && <CountryInfo countryData={countryData} />}
            </div>
        </div>
    );
}

export default CountryInformation;

