import React, { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Lancement />
    </div>
  );
}

const LANCEMENT = gql`
  query GetLance {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      details
      links {
        video_link
      }
    }
  }
`;

function Lancement() {
  const { loading, error, data } = useQuery(LANCEMENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.launches.map((launche) => (
    <div key={launche.details}>
      <h2>{launche.rocket.rocket_name}</h2>
      <p>{launche.launch_date_utc}</p>
      <p>{launche.launch_success}</p>
      <p>{launche.details}</p>
      <a href={`${launche.links.video_link}`}>Video</a>
    </div>
  ));
}

export default App;
