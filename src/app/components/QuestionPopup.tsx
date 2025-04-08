import React from "react";

function check() {
  // Logic to check answers
}

function Question({ text }: { text: string }) {
  return <span className="questionBox__question">{text}</span>;
}

function Input() {
  return (
    <>
      <b>Input your final answer…</b>
      <input placeholder="Answer" />
    </>
  );
}

function Submit() {
  return <button onClick={check}>Check</button>;
}

export default function QuestionPopup({
  questionText,
  img,
  onClose,
}: {
  questionText: string;
  img?: string;
  onClose: () => void;
}) {
  return (
    <div className="popup questionBox">
      <button className="close" onClick={onClose}>
        X
      </button>
      {img && (
        <img
          src={img}
          alt="Question"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}
      <span className="questionBox__question">{questionText}</span>
      <b>Input your final answer…</b>
      <input placeholder="Answer" />
      <button>Check</button>
    </div>
  );
}
