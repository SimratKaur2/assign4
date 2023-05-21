import { Container, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "../components/ThemeSwitch";
import DifficultyButtons from "../components/DifficultyButtons";
import React, { useState } from "react";

export default function Main({ toggleTheme }) {
  //state variables come here
  const theme = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(9);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [totalPairs, setTotalPairs] = useState(9);
  const [totalTime, setTotalTime] = useState(0);

  //hooks come here

  //functions here //

  //1. to handle the Difficulty Buttons
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    // Handle the difficulty selection logic here
    console.log("Selected difficulty:", difficulty);
  };

  //2. to handle the Game content based off difficulty
  //   const handleStartGameClick = () => {
  //     //Handle the start game button click
  //     //render content or navigate to a new page based on the selected difficulty
  //     if (selectedDifficulty === "easy") {
  //       console.log("Starting game with easy difficulty");
  //     } else if (selectedDifficulty === "medium") {
  //       console.log("Starting game with medium difficulty");
  //     } else if (selectedDifficulty === "hard") {
  //       console.log("Starting game with hard difficulty");
  //     } else {
  //       console.log("Please select a difficulty before starting the game.");
  //       //show an error or provide a message to select a difficulty
  //     }
  //   };

  //3. logic to handle the starting game again
  const handleStartGameClick = () => {
    setGameStarted(true);
    console.log("Starting game with", selectedDifficulty, "difficulty");
    // Additional logic specific to starting the game
    // Start the timer, shuffle the cards, etc.
  };

  //4. logic to handle the reset game click
  const handleResetGameClick = () => {
    setGameStarted(false);
    setClickCount(0);
    setPairsLeft(9);
    setPairsMatched(0);
    // Additional logic specific to resetting the game
    // Reset the timer, reshuffle the cards, etc.
  };

  //5. logic to handle the card click
  const handleCardClick = () => {
    // Handle card click logic
    // Increment click count, check for card matches, update pairs left/matched, etc.
    setClickCount((prevCount) => prevCount + 1);
  };

  //6. to handle the additional side effects
  //   useEffect(() => {
  //     // Additional side effects for the game logic
  //     // Timer logic, card shuffling, etc.
  //   }, [gameStarted]);

  //7. to render the game content
  const renderGameContent = () => {
    if (gameStarted && selectedDifficulty === "easy") {
      return (
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" color={theme.palette.text.primary} mb={1}>
              Level 1
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary} mb={1}>
              Lets see if you can complete it in {totalTime} seconds.
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Total Pairs: {totalPairs}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Matched: {pairsMatched}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Left: {pairsLeft}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Clicks: {clickCount}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary} mb={2}>
              Time left: {/** Add your time logic here */}
            </Typography>
            {/* <Box display="flex" flexDirection="row" flexWrap="wrap">
            {Array.from({ length: totalPairs }).map((_, index) => (
              <Card key={index} onClick={handleCardClick} />
            ))}
          </Box> */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleResetGameClick}
            >
              Reset Game
            </Button>
          </Box>
        </Container>
      );
    } else if (gameStarted && selectedDifficulty === "medium") {
      return (
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {" "}
            <Typography variant="h4" color={theme.palette.text.primary}>
              Level 2
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Lets see if you can complete it in {totalTime} seconds.
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Total Pairs: {totalPairs + 7}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Matched: {pairsMatched}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Left: {pairsLeft + 7}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Clicks: {clickCount}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Time left: {/** Add your time logic here */}
            </Typography>
            {/* <Box display="flex" flexDirection="row" flexWrap="wrap">
            {Array.from({ length: totalPairs }).map((_, index) => (
              <Card key={index} onClick={handleCardClick} />
            ))}
          </Box> */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleResetGameClick}
            >
              Reset Game
            </Button>
          </Box>
        </Container>
      );
    } else if (gameStarted && selectedDifficulty === "hard") {
      return (
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {" "}
            <Typography variant="h4" color={theme.palette.text.primary}>
              Level 3
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Lets see if you can complete it in {totalTime} seconds.
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Total Pairs: {totalPairs + 16}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Matched: {pairsMatched}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Pairs Left: {pairsLeft + 16}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Clicks: {clickCount}
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Time left: {/** Add your time logic here */}
            </Typography>
            {/* <Box display="flex" flexDirection="row" flexWrap="wrap">
              {Array.from({ length: totalPairs }).map((_, index) => (
                <Card key={index} onClick={handleCardClick} />
              ))}
            </Box> */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleResetGameClick}
            >
              Reset Game
            </Button>
          </Box>
        </Container>
      );
    } else {
      return (
        <>
          <Typography
            variant="h4"
            color={theme.palette.text.primary}
            mt={4}
            mb={2}
          >
            Oops! You forgot to select the Difficulty level.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={handleResetGameClick}
          >
            Go to home page{" "}
          </Button>
        </>
      );
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" color={theme.palette.text.primary}>
          Pokémon Memory Match
        </Typography>
        <ThemeSwitch toggleTheme={toggleTheme} />
        {gameStarted ? (
          renderGameContent()
        ) : (
          <>
            <Typography variant="h4" color={theme.palette.text.primary}>
              Choose Difficulty
            </Typography>
            <DifficultyButtons onClick={handleDifficultyClick} />
            <Button
              variant="outlined"
              size="large"
              onClick={handleStartGameClick}
            >
              Start Game
            </Button>
          </>
        )}
        {/* <Button variant="outlined" size="large" onClick={handleStartGameClick}>
          Prove You're a PokéMaster!
        </Button> */}
      </Box>
    </Container>
  );
}
