import { Container, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "../components/ThemeSwitch";
import DifficultyButtons from "../components/DifficultyButtons";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import Confetti from "react-confetti";

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

  const [pokemonCards, setPokemonCards] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const [guessingCards, setGuessingCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGuessing, setIsGuessing] = useState(false);
  const [powerupActivated, setPowerupActivated] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  //to render cards based off the difficuly selected
  const difficultyConfig = {
    easy: {
      level: 1,
      totalTime: 100,
      totalPairs: 4,
      pairsLeft: 4,
    },
    medium: {
      level: 2,
      totalTime: 150,
      totalPairs: 6,
      pairsLeft: 6,
    },
    hard: {
      level: 3,
      totalTime: 200,
      totalPairs: 8,
      pairsLeft: 8,
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

  useEffect(() => {
    if (selectedDifficulty) {
      // Fetch totalPairs different Pokemon
      const { totalPairs } = difficultyConfig[selectedDifficulty];
      const fetchedPokemon = Array.from({ length: totalPairs }, () =>
        fetchRandomPokemon()
      );

      // Duplicate each Pokemon and shuffle the array
      const shuffledPokemon = shuffle([...fetchedPokemon, ...fetchedPokemon]);

      setPokemonCards(shuffledPokemon);
    }
  }, [selectedDifficulty, selectedDifficulty]);

  useEffect(() => {
    if (gameStarted) {
      const fetchPokemon = async () => {
        let pokemonArray = [];
        const availablePokemonIds = Array.from(
          { length: 810 },
          (_, i) => i + 1
        );

        for (let i = 0; i < totalPairs; i++) {
          const randomIndex = Math.floor(
            Math.random() * availablePokemonIds.length
          );
          const randomPokemonId = availablePokemonIds.splice(randomIndex, 1)[0];
          const pokemon = await getPokemon(randomPokemonId);

          // Push two of each Pokemon into the array for matching pairs
          pokemonArray.push(pokemon, pokemon);
        }

        // Shuffle the array so Pokemon appear at random positions
        pokemonArray.sort(() => Math.random() - 0.5);

        setPokemonData(pokemonArray);
      };

      fetchPokemon();
    }
  }, [gameStarted, totalPairs]);

  useEffect(() => {
    // If there are two cards being guessed and they don't match, flip them back over after a delay
    if (
      guessingCards.length === 2 &&
      pokemonData[guessingCards[0]].id !== pokemonData[guessingCards[1]].id
    ) {
      setTimeout(() => {
        setFlippedCards(
          flippedCards.map((flipped, i) =>
            guessingCards.includes(i) ? !flipped : flipped
          )
        );
        setGuessingCards([]);
      }, 1000);
    }
  }, [guessingCards, flippedCards, pokemonData]);
  //functions here //
  //pokemon.sprites.front_default
  // Function to fetch a random Pokemon
  const fetchRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 810) + 1;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
  };

  useEffect(() => {
    if (pairsMatched === totalPairs) {
      setIsGameWon(true);
      setShowConfetti(true);
    }
  }, [pairsMatched, totalPairs]);

  useEffect(() => {
    const powerupInterval = setInterval(() => {
      //   alert("Powerup activated!");
      if (!isGameWon) {
        setPowerupActivated(true);
        setFlippedCards((prevFlippedCards) =>
          prevFlippedCards.map((flipped, index) =>
            matchedCards.includes(index) ? flipped : !flipped
          )
        );

        setTimeout(() => {
          setFlippedCards((prevFlippedCards) =>
            prevFlippedCards.map((flipped, index) =>
              matchedCards.includes(index) ? flipped : !flipped
            )
          );
        }, 2000);
      }
    }, 20000);

    return () => {
      clearInterval(powerupInterval);
    };
  }, [isGameWon]);

  const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const pokemon = {
      id: data.id,
      image: data.sprites.front_default,
    };
    return pokemon;
  };

  // Function to shuffle an array
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  //1. to handle the Difficulty Buttons
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log("Selected difficulty:", difficulty);
  };

  //3. logic to handle the starting game again
  const handleStartGameClick = () => {
    setGameStarted(true);
    const { totalTime, totalPairs, pairsLeft } =
      difficultyConfig[selectedDifficulty];
    setPairsLeft(pairsLeft);
    setTimeRemaining(totalTime);
    setTotalPairs(totalPairs);
    setTotalTime(totalTime);
    setIsGameWon(false);
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
    setGuessingCards([]);
    setMatchedCards([]);
    setIsGameWon(false);

    // Additional logic specific to resetting the game
    // Reset the timer, reshuffle the cards, etc.
  };

  //   //5. logic to handle the card click
  //   const handleCardClick = (index) => {
  //     // Handle card click logic
  //     setFlippedCards(
  //       flippedCards.map((flipped, i) => (i === index ? !flipped : flipped))
  //     );

  //     // Increment click count, check for card matches, update pairs left/matched, etc.
  //     setClickCount((prevCount) => prevCount + 1);
  //   };

  const handleCardClick = (index) => {
    // If the card is already flipped or if we're in the middle of a guess, ignore the click
    if (!flippedCards[index] || isGuessing || guessingCards.includes(index)) {
      return;
    }

    // Flip the clicked card
    setFlippedCards(
      flippedCards.map((flipped, i) => (i === index ? !flipped : flipped))
    );

    // If there are no cards currently being guessed, add this card to the guessingCards array
    if (guessingCards.length === 0) {
      setGuessingCards([index]);
    }
    // If there's one card currently being guessed, add this card to the guessingCards array and check if they match
    else if (guessingCards.length === 1) {
      setGuessingCards((oldGuessingCards) => [...oldGuessingCards, index]);

      if (pokemonData[guessingCards[0]].id === pokemonData[index].id) {
        // If they match, add them to the matchedCards array and remove them from the guessingCards array
        setMatchedCards((oldMatchedCards) => [
          ...oldMatchedCards,
          ...guessingCards,
          index,
        ]);
        setGuessingCards([]);
        setPairsMatched(pairsMatched + 1);
        setPairsLeft(pairsLeft - 1);
      } else {
        // If they don't match, flip them back over after a delay
        // If they don't match, flip them back over after a delay
        const currentGuessingCards = [...guessingCards, index];
        setGuessingCards([]);

        setIsGuessing(true); // Disable additional card flips

        setTimeout(() => {
          setFlippedCards((prevFlippedCards) =>
            prevFlippedCards.map((flipped, i) =>
              currentGuessingCards.includes(i) ? !flipped : flipped
            )
          );
          setIsGuessing(false); // Enable card flips again
        }, 1000);
      }
    }

    // Increment click count
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

      if (isGameWon) {
        return (
          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showConfetti && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                // recycle={false} // Optional: Set to false to prevent confetti from stacking on top of each other
              />
            )}
            <Typography
              variant="h4"
              color={theme.palette.text.primary}
              mb={2}
              sx={{
                // Adjust text size for mobile view
                "@media (max-width: 600px)": {
                  fontSize: "1rem",
                },
              }}
            >
              Congratulations! You won the game!
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleResetGameClick}
            >
              Play Again!
            </Button>
          </Container>
        );
      }

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
            <Typography
              variant="h4"
              color={theme.palette.text.primary}
              sx={{
                // Adjust text size for mobile view
                "@media (max-width: 600px)": {
                  fontSize: "1.5rem",
                },
              }}
            >
              Level {level}
            </Typography>
            <Typography
              variant="h6"
              color={theme.palette.text.primary}
              sx={{
                // Adjust text size for mobile view
                "@media (max-width: 600px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              Lets see if you can complete it in {totalTime} seconds.
            </Typography>
            <div>
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                mt={1}
                sx={{
                  // Adjust text size for mobile view
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem",
                  },
                }}
              >
                Total Pairs: {totalPairs}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                sx={{
                  // Adjust text size for mobile view
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem",
                  },
                }}
              >
                Pairs Matched: {pairsMatched}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                sx={{
                  // Adjust text size for mobile view
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem",
                  },
                }}
              >
                Pairs Left: {pairsLeft}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                sx={{
                  // Adjust text size for mobile view
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem",
                  },
                }}
              >
                Clicks: {clickCount}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                mb={1}
                sx={{
                  // Adjust text size for mobile view
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem",
                  },
                }}
              >
                Time left: {timeRemaining} seconds
              </Typography>
            </div>
            <Button
              variant="outlined"
              size="medium"
              onClick={handleResetGameClick}
            >
              Reset Game
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            ml
            mr={{ xs: 1, md: 6 }}
            mt={{ xs: 1, md: 2 }}
            mb={{ xs: 3, md: 3 }}
          >
            {Array.from({ length: totalPairs * 2 }).map((_, index) => (
              <Box key={index} width={{ xs: "50%", md: "25%" }} padding={1}>
                <Card onClick={() => handleCardClick(index)}>
                  <CardContent
                    style={{
                      height: "18vh",
                      width: "18vh",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "80%",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backfaceVisibility: "hidden",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: flippedCards[index] ? "rotateY(180deg)" : "",
                      }}
                    >
                      <Image
                        src={pokemonData[index]?.image}
                        alt={`Pokemon ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div
                      style={{
                        width: "80%",
                        height: "80%",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backfaceVisibility: "hidden",
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: flippedCards[index] ? "" : "rotateY(180deg)",
                      }}
                    >
                      <Image
                        src={
                          "https://www.freepnglogos.com/uploads/pokeball-png/pokeball-black-gel-icing-musings-marvelous-15.png"
                        }
                        alt="Pokeball"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
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
        <Snackbar
          open={powerupActivated}
          message="Powerup activated!"
          autoHideDuration={3000}
          onClose={() => setPowerupActivated(false)}
          sx={{
            transformOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            transform: "translateX(-50%)",
            "@media (max-width: 600px)": {
              // Adjust styles for mobile view
              width: "50%",
              transform: "translateX(-1%)",
              fontSize: "12px",
            },
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "left",
          }}
        />

        <Typography
          variant="h3"
          color={theme.palette.text.primary}
          mt={2}
          sx={{
            // Adjust text size for mobile view
            "@media (max-width: 600px)": {
              fontSize: "1.9rem",
            },
          }}
        >
          Pokémon Memory Match
        </Typography>
        <ThemeSwitch toggleTheme={toggleTheme} />
        {gameStarted ? (
          renderGameContent()
        ) : (
          <>
            <Typography
              variant="h4"
              color={theme.palette.text.primary}
              sx={{
                // Adjust text size for mobile view
                "@media (max-width: 600px)": {
                  fontSize: "1.5rem",
                },
              }}
            >
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
