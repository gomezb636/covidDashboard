import React from "react";
import { Cards, Chart, CountryPicker} from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
import maskImg from "./images/mask.png";
import vaccImg from "./images/vacc.png";
import handsImg from "./images/washHands.png";
import Covid19 from "./Components/covid19Map/Covid19"


class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  
  render() {
    const { data, country } = this.state;
    return (
      <div>
        <div>
          <nav className={styles.navbar}>
            <p>COVID-19 Dashboard</p>
            <ul>
              <li>
                <span><a href="#home">Home</a></span>
                <span><a href="#map">Map</a></span>
                <span><a href="#count">Case Count</a></span>
                <span><a href="#graph">Graph</a></span>
                <span><a href="#safety">Safety Recommendations</a></span>
              </li>
            </ul>
          </nav>
          <div className={styles.banner} id="home">
            <img className={styles.image} src={coronaImage} alt="COVID-19" />
            <br />
            <h3>Stay up to date with global and country-wide COVID-19 information</h3>
            <h4>View our map or graph to see statistics</h4>
            <br />
            <br />
          </div>
        </div>

        <div className={styles.mapCases} id="map">
          <Covid19 />
        </div>
        <div className={styles.container}>
          <div id="count">
            <Cards data={data} country={country}/>
          </div>
          <br />
          <br />
          <div className={styles.bargraph} id="graph">
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
          </div>
          <br />
          <br />
          <div className={styles.safe} id="safety">
            <h1>Safety Recommendations</h1>
            <div className={styles.row}>
              <div className={styles.column}>
                <h3>Wash Your Hands</h3>
                <img className={styles.safetyImage} src={handsImg} alt="washHandsImg" />
                <p>Remember to always wash your hands with soap for at least 20 seconds.</p>
                <p>This ensures you dont get infected and also helps reduce the spread of germs!</p>
              </div>
              <div className={styles.column}>
                <h3>Wear A Mask</h3>
                <img className={styles.safetyImage} src={maskImg} alt="mask" />
                <p>Don't forget to wear a mask!</p>
                <p>Wearing a mask helps prevent spreading germs. Help make the world a safer place for everyone!</p>
              </div>
              <div className={styles.column}>
                <h3>Get Your Vaccine</h3>
                <img className={styles.safetyImage} src={vaccImg} alt="vaccine" />
                <p>COVID-19 Vaccines are now avaiable to everyone!</p>
                <p>For more information, visit www.cdc.gov/vaccines/covid-19</p>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <h2>Created by: Anjali Patel, Vibha Rajagopalan, and Brenda Gomez</h2>
          <h2>Resources</h2>
          <div className={styles.resourcesDiv}>
            <h4><a href="https://towardsdatascience.com/lets-create-a-covid-19-tracker-using-react-js-5a3a0265a633">Cards & Graph Tutorial</a></h4>
            <h4><a href="https://www.youtube.com/watch?v=4cliojOu3as">Map Tutorial</a></h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;