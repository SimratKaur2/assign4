import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";

export default function DifficultyButtons({ onClick }) {
  //state variables
  const [SelectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleButtonClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    onClick(difficulty); // Call the onClick handler passed as a prop with the selected difficulty
  };

  return (
    <Box
      mt={2}
      mb={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          onClick={() => handleButtonClick("easy")}
          sx={{
            ...(SelectedDifficulty === "easy" && {
              backgroundColor: "#F1C40F",
            }),
          }}
        >
          Easy
        </Button>
        <Button
          onClick={() => handleButtonClick("medium")}
          sx={{
            ...(SelectedDifficulty === "medium" && {
              backgroundColor: "#F39C12",
            }),
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => handleButtonClick("hard")}
          sx={{
            ...(SelectedDifficulty === "hard" && {
              backgroundColor: "#EC7063",
            }),
          }}
        >
          Hard
        </Button>
      </ButtonGroup>
    </Box>
  );
}
