import React, { Component } from 'react';

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
    

    const validation = validatePostcode(this.state.postcode);
    if (!validation){
      alert('Please submit a valid postcode');
      return;
    }
    alert('Your postcode is: ' + this.state.postcode);

    const url = 'https://api.postcodes.io/postcodes/' + this.state.postcode;
    
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data)
        //continuar a escrever
      }); 


  }
  
  


  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>How far away are you from the airport?</h1>

          <label for="input_postcode">Insert your postcode to calculate your distance to London Heathrow airport.</label>
          <input name="input_postcode" type='text' class="input_postcode" placeholder='Insert postcode' value={this.state.postcode} onChange={this.handleChange}/>
          <input type="submit" class="submit_postcode" />

          <div class="distance_km hidden"></div>
        </div>
      </form>
    );
  }
}
