import React ,{useState,useEffect}from 'react';

import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InfoBox from './Components/InfoBox';
import Map from './Components/Map';
import LiveCases from './Components/LiveCases';
import {sortData,prettyPrintStat} from './Utils.js/SortedData';

import 'leaflet/dist/leaflet.css';



function App() {
  const [countries,setCountries]=useState(['USA','INDIA','UK']);
  const [country,setCountry] = useState("Worldwide")
  const [countryInfo,setCountryInfo] = useState([]);
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter]=useState({lat:34.80746 , lng:-40.4796})
  const [mapZoom,setMapZoom]=useState(3);
  const [mapCountries ,setMapCountries] = useState([])
  const [casesType,setCasesType]=useState("cases");


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all').then(response=>{
      return response.json()
    }).then(data=>{
      setCountryInfo(data);
    })
  }, [])

  useEffect(()=>{
    const getCoutriesData= async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries').then(response=>{
        return response.json();
      }).then(data=>{
        const countries=data.map(country=>{
          return {
            name:country.country,
            value:country.countryInfo.iso2
          }
         })
         const sortedData = sortData(data);
         setCountries(countries);
         setTableData(sortedData);
         setMapCountries(data);
         

      })

    }
    getCoutriesData();

  },[])

  const handleChange = async(event) => {
    const countryCode = event.target.value;
    const Url = countryCode==='Worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(Url).then(response=>{
      return response.json();
    }).then(data=>{
      setCountry(countryCode);
      setCountryInfo(data); 
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
         setMapZoom(4);
    })

    
  };
  

  return (
    <div className="app">
      <div className="app-left">
      <div className="app-header">
     <h1>Covid 19 tracker</h1>
     <FormControl className="app_dropdown">
       
       <Select value={country} variant="outlined" onChange={handleChange}>
       <MenuItem value="Worldwide">Worldwide</MenuItem>
         {countries.map(country=>{
           return <MenuItem value={country.value}>{country.name}</MenuItem>
         })}
    
          </Select>
        </FormControl>
      </div>
     
     <div className="app_stats">
       <InfoBox isRed onClick={e=>setCasesType("cases")} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} ></InfoBox>
       <InfoBox  onClick={e=>setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
       <InfoBox isRed onClick={e=>setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>

     </div>

    {/* map */}

      <Map zoom={mapZoom} center={mapCenter} countries={mapCountries} casesType={casesType}/>

      </div>

      <div className="app-right">
        <LiveCases data={tableData} casesType={casesType}/>

      </div>
     
    


    </div>
  );
}

export default App;
