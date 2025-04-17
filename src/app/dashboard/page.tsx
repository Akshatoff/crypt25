"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import dynamic from "next/dynamic";
import { getQuestionByLevel } from "@/lib/question";

const QuestionPopup = dynamic(() => import("@/app/components/QuestionPopup"), {
  ssr: false,
});

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
  const [code, setCode] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [questionData, setQuestionData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  const fetchandShowQuestion = async () => {
    const res = await fetch("/getlevel", {
      cache: "no-store", // important for SSR/client fetch
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error fetching level");
      return;
    }

    const level = data.level;
    setCurrentLevel(level); // still store for popup UI
    const question = getQuestionByLevel(level);
    if (question) {
      setQuestionData(question);
      setShowPopup(true);
    } else {
      alert("No question found for your level!");
    }
  };

  const verifySchoolCode = async () => {
    try {
      const response = await fetch("/schoolCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolCode: inputCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setSchoolName(data.schoolName);
        setCode(inputCode);
        alert("School Code Verified");
      } else {
        alert(data.error);
        setSchoolName(null);
      }
    } catch (error) {
      console.error("Error Verifying School Code", error);
      alert("something went wrong please try again");
    }
  };

  useEffect(() => {
    const fetchSessionAndSchool = async () => {
      try {
        const { data } = await authClient.getSession();

        if (!data || !data.user) {
          router.push("/login");
        }
        setSession(data as UserSession);

        const response = await fetch("/getSchool");
        const schoolData = await response.json();

        if (response.ok && schoolData.schoolCode) {
          setCode(schoolData.schoolCode);
          await fetchSchoolName(schoolData.schoolCode);
        }
      } catch (error) {
        setError(error as any);
        console.error("Error fetching data", error);
      }
    };

    fetchSessionAndSchool();
  }, []);

  const fetchSchoolName = async (code: string) => {
    try {
      const res = await fetch("/schoolCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolCode: code }),
      });

      const data = await res.json();
      if (res.ok) {
        setSchoolName(data.schoolName);
      } else {
        setCode(null);
        setSchoolName(null);
      }
    } catch (error) {
      console.error("Error fetching school code", error);
    }
  };

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
          {code ? (
            <p>School Name: {schoolName || "Fetching..."}</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter your school code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <button className="submit" onClick={verifySchoolCode}>
                Verify Code
              </button>
            </>
          )}
        </div>

        <button className="btn" onClick={() => fetchandShowQuestion()}>
          Play
        </button>

        {showPopup && questionData && (
          <QuestionPopup
            questionText={questionData.question}
            img={questionData.img}
            open={showPopup}
            onClose={() => setShowPopup(false)}
            onNextLevel={(nextLevel: number) => {
              setCurrentLevel(nextLevel);
              fetchandShowQuestion();
            }}
            level={currentLevel || 1}
          />
        )}
      </div>
    </>
  );
}
