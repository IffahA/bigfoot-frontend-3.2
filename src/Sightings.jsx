import logo from "/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BACKEND_URL } from "./constants";
import { Link } from "react-router-dom";

export default function Sightings() {
  //state to store all sightings data from API
  const [sighting, setSighting] = useState([]);
  const [loading, setLoading] = useState(false);

  //retrieves all sighting data
  useEffect(() => {
    const loadData = async () => {
      //till data is fetched, show loading page
      setLoading(true);

      //fetching data from backend
      const response = await axios.get(`${BACKEND_URL}/sightings`);
      console.log(response.data);

      //store fetched data in state
      setSighting(response.data);

      setLoading(false);
    };

    loadData();
  }, []);

  //retrieves data for specific sighting
  // const handleClick = async (index) => {
  //   let respnse = await axios.get(`http://[::1]:3000/sightings/${index}`);
  //   console.log(response.data);
  // };

  return (
    <>
      <div>
        <ul>
          {loading ? (
            <h4>Loading, please wait</h4>
          ) : (
            sighting.map((item, index) => (
              <li key={index}>
                <br />
                <Link to={`/sightings/${index}`}>{item.YEAR}</Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
