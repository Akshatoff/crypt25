"use client";

import React from "react";

const fetchLeaderboard = async () => {
  try {
    let data = ("add backend call here!!!!!!!!!!");
    // add code that adds data as rows to the table
  } catch (error) {
    console.error("Fetching leaderboard failed", error);
  }
};

export default function page() {
  return (
    <>
      <div className="section centered cover" id="home">
        <span className="subtitle">
          Crypt@trix
        </span>
        <span className="title">Leaderboard</span>
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

          <tbody>
            <tr>
              <td>1</td>
              <td>Team 1</td>
              <td>500</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Team 2</td>
              <td>300</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Team 3</td>
              <td>250</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Team 4</td>
              <td>100</td>
            </tr>
          </tbody>

        </table>
      </div>
    </>
  );
}
