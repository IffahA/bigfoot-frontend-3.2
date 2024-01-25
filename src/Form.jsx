import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [newSighting, setnewSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  //navigate hook
  const navigate = useNavigate();

  //converts today's date to set max in form
  const max = new Date().toISOString().slice(0, 16);
  console.log(max);

  //handles form submission
  const submitForm = async (e) => {
    e.preventDefault();

    let response = await axios.post(
      `${BACKEND_URL}/sightings/sighting`,
      newSighting
    );
    console.log(response);

    setnewSighting({
      date: "",
      location: "",
      notes: "",
    });

    navigate(`../sightings/${response.data.id}`);
  };

  //sets state when form inputs added
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setnewSighting((prevState) => {
      return { ...prevState, [name]: value };
    });

    console.log(newSighting);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          Location
          <input type="text" name="location" onChange={handleChange} />
        </label>
        <label>
          Notes
          <input type="text" name="notes" onChange={handleChange} />
        </label>
        <label>
          Date of sighting
          <input
            name="date"
            id="datePickerId"
            type="datetime-local"
            min="1990-06-07T00:00"
            max={max}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
