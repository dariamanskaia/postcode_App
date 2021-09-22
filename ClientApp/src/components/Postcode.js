import React, { Component } from 'react';

export class Postcode extends Component {
  static displayName = Postcode.name;

  


  render() {
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    const coordinatesAirport = {
      latitude: 51.4700223,
      longitude: -0.4542955
    }
  
    const submitPostcodeClick = (e) => {
      const postcode = $(".input_postcode").val();
        if (!validatePostcode(postcode)){
          alert("Please submit a valid postcode");
          return;
        }
        
        const url = 'hhtps://api.postcodes.io/postcodes/' + postcode;
        $.get(url,
          (data) => {
            const coordinates = {
              latitude: parseFloat(data.result.latitude),
              longitude: parseFloat(data.result.longitude),
            };

            const distancekm = parseFloat(getDistanceFromLatLonInKm(coordinatesAirport.latitude, coordinatesAirport.longitude, coordinates.latitude, coordinates.longitude));

            $('.distance_km').html(`This place is ${distanceKm.toFixed(2)}km away from the airport`);
                $('distance_km').removeClass("hidden");
          })
          .fail(() => {
            alert("Error. Postcode not found.");
          })
    };

    // @param {string} postcode

    const validatePostcode = (postcode) => {
      if (postcode.length <= 0){
        return false;
      }
      return true;
    }

    const deg2rad = (deg) => {
      return deg * (Math.PI/180)
    }
  
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

      
  let km = ${'d'}
  let miles = km / 1.609;
  console.log(miles);
  
  $(document).ready(() => {
    $('.submit_postcode').click(submitPostcodeClick); //defining click event for submit button
  })

    return (
      <div>
        <h1>How far away are you from the airport?</h1>

        <label for="input_postcode">Insert your postcode to calculate your distance to London Heathrow airport.</label>
        <input name="input_postcode" type='text' class="input_postcode" placeholder='Insert postcode' />
        <button class="submit_postcode">submit</button>

        <div class="distance_km hidden"></div>
      </div>
    );
  }
}
