import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import Cardiogram from '../models/cardiogram';
import Chart from '../components/chart';
import './app.css';

// Urls to fetch cardiograms from
const CARDIOGRAM_URLS = [
  { url: 'http://localhost:3000/data/fzcy58.json' },
  { url: 'http://localhost:3000/data/ilrs66.json' },
  { url: 'http://localhost:3000/data/m68mee.json' },
  { url: 'http://localhost:3000/data/hyef26.json' },
  { url: 'http://localhost:3000/data/u4nyvl.json' },
  { url: 'http://localhost:3000/data/8f7nc7.json' }
];

/**
 * Base App component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardiograms: []
    };
  }

  componentDidMount() {
    Promise.all(CARDIOGRAM_URLS.map((c) => this.fetchData(c)))
      .then((cardiograms) => {
        this.setState({ isLoading: false, cardiograms });
      });
  }

  fetchData(c) {
    return fetch(c.url).then((response) =>
      response.json().then((data) => new Cardiogram(data.cardiogram))
    );
  }

  render() {
    return (
      <section className="app">
        {this.state.isLoading && 'Loading...'}
        {
          !this.state.isLoading && this.state.cardiograms.map((c) =>
            <div key={c.title} className="cardiogram">
              <h3 className="cardiogram-title">{c.title}</h3>
              <Chart cardiogram={c} />
            </div>
          )
        }
      </section>
    );
  }
}

export default App;
