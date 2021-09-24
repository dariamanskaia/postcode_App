import React, { Component } from 'react';
import { Map } from './Map';

// function to validate input
const validatePostcode = (postcode) => {
  if (postcode.length <= 0){
    return false;
  }
  return true;
}

// function to measure the distance
const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

// convert km to miles
const convertKmToM = (values) => {
  // you can make change as per requirement 
  const realMiles = ( values * 0.621371 );
  const Miles = Math.floor(realMiles);
  return Miles;
}


//Controlled components - https://reactjs.org/docs/forms.html
export class Postcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      distanceKm: 0,
      history: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({postcode: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    //validate postcode output
    const validation = validatePostcode(this.state.postcode);
    if (!validation){
      alert('Please submit a valid postcode');
      return;
    }
    // alert('Your postcode is: ' + this.state.postcode);

    
    //airport coordinates
    const coordinatesAirport = {
      latitude: 51.4700223,
      longitude: -0.4542955
    };

    //get request react for the postcode coordinates - https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
    const url = 'https://api.postcodes.io/postcodes/' + this.state.postcode;
    
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
        const coordinates = {
          latitude: parseFloat(data.result.latitude),
          longitude: parseFloat(data.result.longitude),
        }   
        // console.log(coordinates)
        // console.log(coordinatesAirport)
      
        //get distance
        const distanceKm = parseFloat(getDistanceFromLatLonInKm(coordinatesAirport.latitude, coordinatesAirport.longitude, coordinates.latitude, coordinates.longitude));
        // console.log(distanceKm.toFixed(2))
        this.setState({
          distanceKm: (distanceKm.toFixed(2))
        })
        
        const addHistory = (values) => {
          const history = (this.state.postcode);
          // const result = `${history}`;
          console.log(history)
        }
        addHistory();
       



        
      })
      .catch(e => {
        console.log("Error fetching data:", e);
        this.setState({...this.state, isFetching: false});
      });
      
};
  
  


  render() {

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h1>How far away are you from the airport?</h1>

            <label htmlFor="input_postcode">Insert your postcode to calculate your distance to London Heathrow airport.</label>
          
            <div className="flexAlign">
              <input name="input_postcode" type='text' className="input_postcode" placeholder='Insert postcode' value={this.state.postcode} onChange={this.handleChange}/>
              <input type="submit" className="submit_postcode" />
              <label className="history_postcode"> Postcode history: {this.state.postcode} </label>
            </div>

            <div className="distance_km">This location is <b> {this.state.distanceKm} km </b> and <b> {convertKmToM(this.state.distanceKm)} miles </b> away from the airport.</div>
            
          </div>
        </form>

        
        <div className="map-container" >
          <Map />
        </div>
      </div>



    );
  }
}