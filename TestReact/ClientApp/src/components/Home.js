import React, { Component } from 'react';
import calc from '../image/calculator.svg';
import table from '../image/table.svg';
import planner from '../image/planner.svg'
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
    <a href='/children'><img src={table} style={{ width: '90%', height: '90%' }}/></a>
    </div>
    <div>
    <div>
    <a href='/planner'><img src={planner} style={{ width: '90%', height: '80%' }}/></a>
    </div>
      
    </div>
  </div>
    );
  }
}
