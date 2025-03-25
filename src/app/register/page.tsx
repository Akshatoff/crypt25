"use client";

import React from "react";

const handleRegistration = async () => {
  try {
    // register code
  } catch (error) {
    console.error("Registration failed", error);
  }
};

export default function page() {
  return (
    <>
      <div className="section" id="register">
        <h1 className="text" id="register">
          Register
        </h1>
        <button className="btn" onClick={handleRegistration}>
          Register
        </button>
      </div>
    </>
  );
}
