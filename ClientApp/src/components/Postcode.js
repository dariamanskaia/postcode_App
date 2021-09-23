import React, { Component } from 'react';

//next imports are to calculate distance between coordinates
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { getDistance } from 'geolib';



const validatePostcode = (postcode) => {
  if (postcode.length <= 0){
    return false;
  }
  return true;
}

export class Postcode extends Component {
  constructor(props) {
    super(props);
    this.state = {postcode: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    
    validatePostcode("asdf");
    console.log(event.target.value);
    this.setState({postcode: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({...this.state, isFetching: true});
    
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

    //get request react for the postcode coordinates
    const url = 'https://api.postcodes.io/postcodes/' + this.state.postcode;
    
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({users: data, isFetching: false})
        const coordinates = {
          latitude: parseFloat(data.result.latitude),
          longitude: parseFloat(data.result.longitude),
        }   
        console.log(coordinates)
        console.log(coordinatesAirport)
        
        

        const distanceKm = () => {
        console.log("passou")
          const calculateDistance = () => {
            console.log("passou outra vez")
            const dis = getDistance(
              { latitude: 20.0504188, longitude: 64.4139099 },
              { latitude: 51.528308, longitude: -0.3817765 }
            );
            
            alert(`Distance\n${dis / 1000} KM`);
          };
          
           
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.container}>
                  <Text style={styles.header}>
                    Example to Calculate Distance Between Two Locations
                  </Text>
                  <Text style={styles.textStyle}>
                    Distance between
                    {'\n'}
                    India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
                  </Text>
                  <TouchableHighlight
                    style={styles.buttonStyle}
                    onPress={calculateDistance}>
                    <Text>Get Distance</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </SafeAreaView>
          );
        };

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
            justifyContent: 'center',
          },
          header: {
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
            textAlign: 'center',
            paddingVertical: 20,
          },
          textStyle: {
            marginTop: 30,
            fontSize: 16,
            textAlign: 'center',
            color: 'black',
            paddingVertical: 20,
          },
          buttonStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: '#dddddd',
            margin: 10,
          },
        });
        distanceKm();
        getDistance();

        
      })
      .catch(e => {
        console.log("Error fetching data:", e);
        this.setState({...this.state, isFetching: false});
      });


      
};
  
  


  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>How far away are you from the airport?</h1>

          <label htmlFor="input_postcode">Insert your postcode to calculate your distance to London Heathrow airport.</label>
          <input name="input_postcode" type='text' className="input_postcode" placeholder='Insert postcode' value={this.state.postcode} onChange={this.handleChange}/>
          <input type="submit" className="submit_postcode" />

          <div className="distance_km hidden"></div>
        </div>
      </form>


    );
  }
}

export default Postcode;