import React from "react";
import { Container, Box, Typography, colors } from "@mui/material";
import panelimg from "../assets/panelimg.png";
import TypingEffect from "./typeingEffect";

const HeroSection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        padding={4}
        // border={"1px solid black"}
      >
        <Box flex={1} paddingLeft={4}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Welcome to{" "}
            <Box component="span" color="#8BC441">
              Saylani
            </Box>{" "}
            Welfare Non Governmental Organization in Pakistan
          </Typography>
          <Typography variant="body1">
            We provide interest-free (Riba-free) loans for weddings, education,
            business, home construction, and other essential needs. All services
            are Shariah-compliant and community-focused
          </Typography>
          <TypingEffect />
        </Box>

        <Box flex={1} display="flex" justifyContent="center">
          <img
            src={panelimg}
            alt="Mak Welfare"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
