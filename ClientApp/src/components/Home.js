import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, Craftable Software Team!</h1>
        <p>Welcome to my humble web application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To check out my solution to the techinal assignment you provided me please take a look at the <a href="/postcode">Postcode</a> route.</p>
        
        <p>Thank you for the opportunity to develop my skills as a full stack developer. Any doubt feel free to contact me.</p>
        
        <ul>
          <p>Here you can find my Social pages:</p>
          <li><a href='https://dariamanskaia.github.io/WorldOfDaria/'>Webpage</a></li>
          <li><a href='https://github.com/dariamanskaia'>Github</a></li>
          <li><a href='https://pt.linkedin.com/in/dariamanskaia'>Linkedin</a></li>
        </ul>
        
      </div>
    );
  }
}
