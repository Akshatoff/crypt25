"use client";

import React, { useEffect, useState } from "react";
import Back from "../components/Back";

export default function Page() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/leaderboardrank");
      const data = await res.json();
      setLeaderboard(data); // This automatically rerenders cleanly
    } catch (error) {
      console.error("Fetching leaderboard failed", error);
    }
  };

  const refreshLeaderboard = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setTimeout(() => setRefreshing(false), 2500);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <>
      <Back />
      <div className="section centered cover" id="home">
        <span className="subtitle">Crypt@trix</span>
        <span
          className={`titleLink ${refreshing ? "dimmed" : ""}`}
          onClick={refreshLeaderboard}
        >
          {refreshing ? "Refreshed!" : "Refresh ↻"}
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
            {leaderboard.map((entry, index) => (
              <tr key={entry.team + index}>
                <td>{entry.rank}</td>
                <td>{entry.team}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
