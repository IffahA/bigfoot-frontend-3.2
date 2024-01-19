import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BACKEND_URL } from "./constants";
import { Link, useParams } from "react-router-dom";

export default function IndividualSighting() {
  const [indSighting, setIndSighting] = useState([]);
  const [loading, setLoading] = useState(false);
  let index = useParams();

  //retrieves individua; sighting data
  useEffect(() => {
    const loadData = async () => {
      //till data is fetched, show loading page
      setLoading(true);

      index = JSON.stringify(index.sightingIndex);
      index = Number(index.slice(1, index.length - 1));

      console.log(index);

      //fetching data from backend
      const response = await axios.get(`${BACKEND_URL}/sightings/${index}`);
      console.log(response.data);

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
          {indSighting.YEAR} <br />
          {indSighting.SEASON} {indSighting.MONTH}
          <br />
          {indSighting.OBSERVED}
        </p>
      )}
      <br />
      <Link to={`/`}>
        <p>Go back to homepage</p>
      </Link>
    </div>
  );
}
