import React, { Component } from 'react';

export class Postcode extends Component {
  static displayName = Postcode.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }



  render() {
    return (
      <div>
        <h1>Postcode</h1>

        <p>Insert your postcode to calculate your to London Heathrow airport.</p>

        <form className='add-form'>
            <div className='form-control'>
                <label>Postcode</label>
                <input type='text' placeholder='Insert postcode' />
                <button className="btn btn-primary" type='submit' value='Save Task'>submit</button>
            </div>
        </form>
      </div>
    );
  }
}
