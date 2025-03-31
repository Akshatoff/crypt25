"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type UserSession = {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
};
export default function page() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [code, setCode] = useState("");
  const [schoolName, setSchoolName] = useState<string | null>(null);



  const verifySchoolCode = async () => {
    try {
      const response = await fetch("/schoolCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ schoolCode: code }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSchoolName(data.schoolName);
        alert("School Code Verified");
      }
      else {
        alert(data.error);
        setSchoolName(null)
      }
    }
    catch (error){
      console.error("Error Verifying School Code", error);
      alert("something went wrong please try again");
    }
    
  }


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        console.log(data);
        
        if (!data || !data.user) {
          router.push("/login");
        }
        setSession(data as UserSession);
      } catch (error) {
        setError(error as any);
        console.error("Error fetching data", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <div className="section" id="dash">
        {error ? (
          <p>Error Loading User Data</p>
        ) : session ? (
          <h1 className="text" id="name">
            Welcome, {session.user?.name || "User"}
          </h1>
        ) : (
          <p>Loading</p>
        )}

        <div className="school-con">
          <input type="text" name="school-code" id="code" placeholder="Enter your school code" value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="submit" onClick={verifySchoolCode}>Verify Code</button>
          {schoolName && <p>School Name: {schoolName}</p>}
        </div>
      </div>
    </>
  );
}

