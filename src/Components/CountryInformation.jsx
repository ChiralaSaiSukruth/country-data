import React, { useState } from 'react';
import './CountryInformation.css';
import CountryInfo from './CountryInfo';

function CountryInformation() {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState('');

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

    return (
        <div className="country-container">
            <h1 className='data'>Search Country data</h1>
            <div className="search">
                <input
                    type="text"
                    id="countryName"
                    placeholder="Enter a country name here..."
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
                <button id="search-btn" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div id="result">
                {error && <h3 className="error">{error}</h3>}
                {countryData && <CountryInfo countryData={countryData} />}
            </div>
        </div>
    );
}

export default CountryInformation;
