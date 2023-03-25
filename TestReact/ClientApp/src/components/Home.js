import React, { Component } from 'react';
import calc from '../image/calculator.svg';
import table from '../image/table.svg';
import '../custom.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
  <div class="menu">
    <div>
    <a href='/calc'><img src={calc} style={{ width: '100%', height: '100%' }}/></a>
    </div>  
    <div>
    <iamge src={table} style={{ width: '100%', height: '100%' }} />
    </div>
    <div>
      
    </div>
  </div>
    );
  }
}
