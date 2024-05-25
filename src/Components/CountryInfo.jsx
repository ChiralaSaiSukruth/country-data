import React from 'react';

function CountryInfo({ countryData }) {
    const {
        flags,
        name,
        capital,
        continents,
        population,
        currencies,
        languages,
        borders,
        area,
        idd,
        capitalInfo,
        timezones,
    } = countryData;

    return (
        <div>
            <img src={flags.svg} alt="Flag" className="flagImage" />
            <h2>{name.common}</h2>
            <div className="row">
                <div className="dataRow">
                    <h4>Capital:</h4>
                    <span>{capital ? capital[0] : 'N/A'}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Continent:</h4>
                    <span>{continents ? continents[0] : 'N/A'}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Population:</h4>
                    <span>{population.toLocaleString()}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Currency:</h4>
                    <span>
                        {currencies
                            ? `${currencies[Object.keys(currencies)[0]].name} - ${Object.keys(currencies)[0]}`
                            : 'N/A'}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Common Languages:</h4>
                    <span>
                        {languages
                            ? Object.values(languages).join(', ')
                            : 'N/A'}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Borders:</h4>
                    <span>
                        {borders
                            ? borders.join(', ')
                            : 'No borders'}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Area:</h4>
                    <span>{area.toLocaleString()} km²</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Calling Area:</h4>
                    <span>{idd ? `${idd.root}${idd.suffixes[0]}` : 'N/A'}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Capital Coordinates:</h4>
                    <span>
                        {capitalInfo && capitalInfo.latlng
                            ? `${capitalInfo.latlng[0]}, ${capitalInfo.latlng[1]}`
                            : 'N/A'}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Time Zones:</h4>
                    <span>
                        {timezones
                            ? timezones.join(', ')
                            : 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CountryInfo;
