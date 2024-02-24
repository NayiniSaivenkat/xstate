import React,{useEffect, useState} from 'react';
import './App.css';

function App() {
  const [countries,setCountries]=useState([]);
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState("");
  const [selectedState,setSelectedState]=useState("");
  const [selectedCity,setSelectedCity]=useState("");
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setStates(data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
}, [selectedCountry]);


useEffect(() => {
  if (selectedCountry && selectedState) {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCities(data);
        setSelectedCity("");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}, [selectedCountry, selectedState]);

  return (
    <div className='city-selector'>
      <h1>Select Location</h1>
      <div className='dropdowns'>
      <select className='dropdown' value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
        <option disabled value="">Select Country</option>
        {countries&&(countries.map((country)=>(
          <option key={country} value={country}>{country}</option>
        )))}
      </select>
      <select className='dropdown' value={selectedState} onChange={(e)=>setSelectedState(e.target.value)}>
        <option disabled value="">Select State</option>
        {states.map((state)=>(
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select className='dropdown' value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
        <option disabled value="">Select City</option>
        {cities.map((city)=>(
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      </div>
      {selectedCity&&(
        <h2 className='result'>
          You selected <span className='highlight'>{selectedCity},</span>
          <span className='fade'>
            {" "}
            {selectedState},{selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
