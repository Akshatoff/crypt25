"use client";

import React from "react";
import { useEffect } from "react";
import Back from "../components/Back";

const fetchLeaderboard = async () => {
  function addToLeaderboard(rank: any, team: any, score: any) {
    const table = document.querySelector("#leaderboard");
    if (table) {
      table.innerHTML += `
          <tr>
            <td>${rank}</td>
            <td>${team}</td>
            <td>${score}</td>
          </tr>
        `;
    }
  }
  try {
    let data = "add backend call here!!!!!!!!!!";
    // add code that adds data as rows to the table
    // use addToLeaderboard(rank, team, score) to add a row
    // data.forEach((entry) => {
    //    addToLeaderboard(entry.rank, entry.team, entry.score);
    // });
  } catch (error) {
    console.error("Fetching leaderboard failed", error);
  }
};

const refreshLeaderboard = async () => {
  const table = document.querySelector("#leaderboard");
  if (table) table.innerHTML = "";
  await fetchLeaderboard();

  const refreshButton = document.querySelector(".titleLink");
  if (refreshButton) {
    refreshButton.innerHTML = "Refreshed!";
    refreshButton.classList.add("dimmed");
    setTimeout(() => {
      refreshButton.innerHTML = "Refresh ↻";
      refreshButton.classList.remove("dimmed");
    }, 2500);
  }
};

function Table() {
  return (
    <table>
      <colgroup>
        <col style={{ width: "20%" }} />
      </colgroup>
      <colgroup>
        <col style={{ width: "50%" }} />
      </colgroup>
      <colgroup>
        <col style={{ width: "30%" }} />
      </colgroup>

      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody id="leaderboard"></tbody>
    </table>
  );
}

export default function page() {
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <>
      <Back></Back>
      <div className="section centered cover" id="home">
        <span className="subtitle">Crypt@trix</span>
        <span className="titleLink" onClick={refreshLeaderboard}>
          Refresh ↻
        </span>
        <span className="title">Leaderboard</span>
        <Table></Table>
      </div>
    </>
  );
}
