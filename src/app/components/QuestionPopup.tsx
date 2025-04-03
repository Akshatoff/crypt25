import React from "react";
import Link from "next/link";
import Image from "next/image";
import backIcon from "../../../public/back.svg";

function check() {
  // Logic to check answers
}

function Question({ text }: { text: string }) {
  return (
    <span className="questionBox__question">{text}</span>
  );
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
  return (
    <button onClick={check}>Check</button>
  )
}

export default function QuestionPopup(questionText:string, onSubmit:Function) {
  return (
    <div className="popup questionBox">
      <Question text={questionText}></Question>
      <Input></Input>
      <Submit></Submit>
    </div>
  );
}
