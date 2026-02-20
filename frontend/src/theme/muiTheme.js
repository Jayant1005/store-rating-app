import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark", // Requested deep charcoal backgrounds for dashboards
        primary: {
            main: "#d044e3", // Vibrant primary CTA
            light: "#e780f2",
            dark: "#9e1cb0",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#44c6e3", // Vibrant secondary
            light: "#84e0f5",
            dark: "#1e9cb8",
            contrastText: "#000000",
        },
        background: {
            default: "#121212", // Really deep charcoal for that premium look
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
            letterSpacing: "-0.015em",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "-0.01em",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.75rem",
        },
        button: {
            textTransform: "none", // Modern buttons aren't ALL CAPS
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // More rounded premium feel
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "10px 24px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(208, 68, 227, 0.4)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // Remove default dark mode overlay
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                },
            },
        },
    },
});

export default theme;
