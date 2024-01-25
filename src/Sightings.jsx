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

      //function to convert ISO date to string
      const convertISOToString = (isoDate) => {
        const dateObject = new Date(isoDate);
        return dateObject.toDateString();
      };

      response.data.forEach((data) => {
        data.date = convertISOToString(data.date);
      });
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
        <Link to={`/new`}>
          <button>Add sighting</button>
        </Link>
        <ul>
          {loading ? (
            <h4>Loading, please wait</h4>
          ) : (
            sighting.map((item, index) => (
              <li key={index}>
                <br />
                <Link to={`/sightings/${item.id}`}>{item.date} </Link> <br />
                {item.location} {item.notes}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
