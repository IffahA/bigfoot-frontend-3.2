import logo from "/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //state to store all sightings data from API
  const [sighting, setSighting] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      //till data is fetched, show loading page
      setLoading(true);

      //fetching data from backend
      const response = await axios.get("http://[::1]:3000/sightings");
      console.log(response.data);

      //store fetched data in state
      setSighting(response.data);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {loading ? (
          <h4>Loading, please wait</h4>
        ) : (
          sighting.map((item) => (
            <p key={item.REPORT_NUMBER}>
              {item.YEAR}
              {item.LOCATION_DETAILS}
            </p>
          ))
        )}
      </div>
    </>
  );
}

export default App;
