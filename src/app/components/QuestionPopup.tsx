import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#000",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "space-between",
  gap: "2rem",
};

export default function QuestionPopup({
  questionText,
  img,
  open,
  onClose,
  onNextLevel,
}: {
  questionText: string;
  img?: string;
  open: boolean;
  onClose: () => void;
  onNextLevel: () => void;
}) {
  const [solved, setSolved] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");

  const checkAnswer = async () => {
    const res = await fetch("/checkAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: inputAnswer }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Correct answer! Proceed to the next level");
      setSolved(true);
    } else {
      alert(data.message || "Wrong answer. Try again");
    }
  };

  const goToNextLevel = async () => {
    setSolved(false);
    setInputAnswer("");

    onClose();
    onNextLevel();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {img && (
            <div className="img-con">
              <img
                src={img}
                alt="Question"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>
          )}
          <div className="input-con">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {questionText}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Input your final answer…</b>
            </Typography>
            <input
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button onClick={checkAnswer}>Check</button>
            {solved && <button onClick={goToNextLevel}>Next Level</button>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
