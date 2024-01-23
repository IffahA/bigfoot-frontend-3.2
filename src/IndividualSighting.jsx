import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BACKEND_URL } from "./constants";
import { Link, useParams } from "react-router-dom";

export default function IndividualSighting() {
  const [indSighting, setIndSighting] = useState([]);
  const [loading, setLoading] = useState(false);
  let id = useParams();

  //retrieves individua; sighting data
  useEffect(() => {
    const loadData = async () => {
      //till data is fetched, show loading page
      setLoading(true);

      id = JSON.stringify(id.sightingIndex);
      id = Number(id.slice(1, id.length - 1));

      console.log(id);

      //fetching data from backend
      const response = await axios.get(`${BACKEND_URL}/sightings/${id}`);
      console.log(response.data);

      //function to convert ISO date to string
      const convertISOToString = (isoDate) => {
        const dateObject = new Date(isoDate);
        return dateObject.toDateString();
      };

      response.data.date = convertISOToString(response.data.date);

      console.log(response);

      //store fetched data in state
      setIndSighting(response.data);

      setLoading(false);
    };

    loadData();
  }, []);
  return (
    <div>
      {loading ? (
        <h4>Loading, please wait</h4>
      ) : (
        <p>
          {" "}
          {indSighting.date} <br />
          {indSighting.location} {indSighting.notes}
          <br />
        </p>
      )}
      <br />
      <Link to={`/`}>
        <p>Go back to homepage</p>
      </Link>
    </div>
  );
}
