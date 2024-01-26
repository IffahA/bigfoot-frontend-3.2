import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { Link, useParams } from "react-router-dom";

export default function Comment() {
  const [sightingId, setsightingId] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
  });

  let id = useParams();

  //loads all comments upon render
  useEffect(() => {
    const loadData = async () => {
      console.log(sightingId);
      //till data is fetched, show loading page
      setLoading(true);

      id = JSON.stringify(id.sightingIndex);
      id = Number(id.slice(1, id.length - 1));
      setsightingId(id);
      console.log(sightingId);

      if (sightingId) {
        //fetching data from backend
        const response = await axios.get(
          `${BACKEND_URL}/sightings/${sightingId}/comments`
        );
        console.log(response.data);

        //store fetched data in state
        setComments(response.data);

        setLoading(false);
      }
    };

    loadData();
  }, [sightingId]);

  //handles form submission
  const submitForm = async (e) => {
    e.preventDefault();

    //adds new comment to db
    let response = await axios.post(
      `${BACKEND_URL}/sightings/${sightingId}/comments`,
      newComment
    );
    console.log(response);

    setNewComment({
      content: "",
    });

    console.log(newComment);

    let comments = await axios.get(
      `${BACKEND_URL}/sightings/${sightingId}/comments`
    );
    console.log(comments.data);

    //store fetched data in state
    setComments(comments.data);
  };

  //sets state when form inputs added
  const handleChange = (e) => {
    let value = e.target.value;
    console.log(e.target.value);

    setNewComment({
      content: value,
    });
  };

  return (
    <div>
      {loading ? (
        <h4>Loading, please wait</h4>
      ) : (
        comments.map((item) => <li key={item.id}>{item.content}</li>)
      )}
      <form onSubmit={submitForm}>
        <label>
          Add comment
          <input type="text" name="content" onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
