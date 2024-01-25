import logo from "/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BACKEND_URL } from "./constants";
import Sightings from "./Sightings";
import IndividualSighting from "./IndividualSighting";
import Form from "./Form";
import Comment from "./Comment";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  //retrieves data for specific sighting
  // const handleClick = async (index) => {
  //   let respnse = await axios.get(`http://[::1]:3000/sightings/${index}`);
  //   console.log(response.data);
  // };

  // controls path
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Sightings />
        </div>
      ),
    },
    {
      path: "/sightings/:sightingIndex",
      element: (
        <div>
          <IndividualSighting />
          <Comment />
        </div>
      ),
    },
    {
      path: "/new",
      element: (
        <div>
          <Form />
        </div>
      ),
    },
  ]);

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
