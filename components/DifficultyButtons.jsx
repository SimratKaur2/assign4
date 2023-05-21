import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";

export default function DifficultyButtons({ onClick }) {
  const handleButtonClick = (difficulty) => {
    onClick(difficulty); // Call the onClick handler passed as a prop with the selected difficulty
  };

  return (
    <Box
      mt={3}
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
        sx={{ bgcolor: "black" }}
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button onClick={() => handleButtonClick("easy")}>Easy</Button>
        <Button onClick={() => handleButtonClick("medium")}>Medium</Button>
        <Button onClick={() => handleButtonClick("hard")}>Hard</Button>
      </ButtonGroup>
    </Box>
  );
}
