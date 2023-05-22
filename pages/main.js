import { Container, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "../components/ThemeSwitch";
import DifficultyButtons from "../components/DifficultyButtons";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Main({ toggleTheme }) {
  //state variables come here
  const theme = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(6);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [totalPairs, setTotalPairs] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  //for timer thing
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [flippedCards, setFlippedCards] = useState([]);

  //to render cards based off the difficuly selected
  const difficultyConfig = {
    easy: {
      level: 1,
      totalTime: 100,
      totalPairs: 4,
    },
    medium: {
      level: 2,
      totalTime: 150,
      totalPairs: 6,
    },
    hard: {
      level: 3,
      totalTime: 200,
      totalPairs: 8,
    },
  };

  //hooks come here
  useEffect(() => {
    if (timeRemaining > 0 && gameStarted) {
      const timerId = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
      return () => clearInterval(timerId); // This will clear the interval on component unmount or if dependencies change
    }
    if (timeRemaining === 0) {
      // logic for when time runs out goes here
    }
  }, [timeRemaining, gameStarted]);

  //functions here //

  //1. to handle the Difficulty Buttons
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log("Selected difficulty:", difficulty);
  };

  //3. logic to handle the starting game again
  const handleStartGameClick = () => {
    setGameStarted(true);
    const { totalTime, totalPairs } = difficultyConfig[selectedDifficulty];
    setTimeRemaining(totalTime);
    setTotalPairs(totalPairs);
    setTotalTime(totalTime);

    // initializing flippedCards based on totalPairs
    setFlippedCards(Array(totalPairs * 2).fill(true)); // Initialize flippedCards based on totalPairs

    console.log("Starting game with", selectedDifficulty, "difficulty");
    // Additional logic specific to starting the game
    // Start the timer, shuffle the cards, etc.
  };

  //4. logic to handle the reset game click
  const handleResetGameClick = () => {
    setGameStarted(false);
    setClickCount(0);
    setPairsLeft(6);
    setPairsMatched(0);
    setTotalTime(null);
    setTotalPairs(null);
    setTimeRemaining(null);
    setFlippedCards([]);
    // Additional logic specific to resetting the game
    // Reset the timer, reshuffle the cards, etc.
  };

  //5. logic to handle the card click
  const handleCardClick = (index) => {
    // Handle card click logic
    setFlippedCards(
      flippedCards.map((flipped, i) => (i === index ? !flipped : flipped))
    );

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
    if (gameStarted && selectedDifficulty) {
      const { level, totalTime, totalPairs } =
        difficultyConfig[selectedDifficulty];

      return (
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
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
              Level {level}
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
              Time left: {timeRemaining} seconds
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={handleResetGameClick}
              mb={2}
            >
              Reset Game
            </Button>
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="wrap" m={6}>
            {Array.from({ length: totalPairs * 2 }).map((_, index) => (
              <Box key={index} width="25%" padding={1}>
                <Card onClick={() => handleCardClick(index)}>
                  <CardContent
                    style={{
                      height: "18vh",
                      width: "18vh",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        Math.floor(Math.random() * 810) + 1
                      }.png`}
                      alt={`Pokemon ${index + 1}`}
                      style={{
                        width: "80%",
                        height: "80%",
                        objectFit: "cover",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: flippedCards[index] ? "rotateY(180deg)" : "",
                      }}
                    />
                    <img
                      src={
                        "https://www.freepnglogos.com/uploads/pokeball-png/pokeball-black-gel-icing-musings-marvelous-15.png"
                      }
                      alt="Pokeball"
                      style={{
                        width: "80%",
                        height: "80%",
                        objectFit: "cover",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: flippedCards[index] ? "" : "rotateY(180deg)",
                      }}
                    />
                  </CardContent>
                </Card>
              </Box>
            ))}
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
        // height: "100vh",
        minHeight: "100vh",
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
