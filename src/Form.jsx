import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function Form() {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newSighting, setnewSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  let selectedCategoryIds = [];

  //navigate hook
  const navigate = useNavigate();

  //converts today's date to set max in form
  const max = new Date().toISOString().slice(0, 16);
  console.log(max);

  //handles form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const selectedCategoryIds = selectedCategories.map(({ value }) => value);
    console.log(selectedCategoryIds);

    let response = await axios.post(`${BACKEND_URL}/sightings/sighting`, {
      ...newSighting,
      selectedCategoryIds,
    });
    console.log(response);

    setnewSighting({
      date: "",
      location: "",
      notes: "",
    });

    setSelectedCategories([]);

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

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
    // selectedCategoryIds = selectedCategories.map(({ value }) => value);
    // console.log(selectedCategoryIds);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
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
