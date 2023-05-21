import { Container, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "../components/ThemeSwitch";
import DifficultyButtons from "../components/DifficultyButtons";

export default function Main({ toggleTheme }) {
  //state variables come here
  const theme = useTheme();

  //hooks come here

  //functions here //

  //1. to handle the Difficulty Buttons
  const handleDifficultyClick = (difficulty) => {
    // Handle the difficulty selection logic here
    console.log("Selected difficulty:", difficulty);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        justifyContent: "center", // Center the content horizontally
        alignItems: "center", // Center the content vertically
        height: "100vh", // Set the height to the full viewport height
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
          Welcome to my Pokemon Memory Game
        </Typography>
        <ThemeSwitch toggleTheme={toggleTheme} />
        <Typography variant="h4" color={theme.palette.text.primary}>
          Choose Difficulty
        </Typography>
        <DifficultyButtons onClick={handleDifficultyClick} />
        <Button variant="outlined" size="large">
          Start Playing!
        </Button>
      </Box>
    </Container>
  );
}
