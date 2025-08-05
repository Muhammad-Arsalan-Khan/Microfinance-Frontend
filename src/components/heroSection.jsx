import { Container, Box, Typography } from "@mui/material"
import image from "../assets/image.png"
import TypingEffect from "./typeingEffect"

const HeroSection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        padding={4}
        sx={{
        flexDirection: { xs: 'column', sm: 'row' } 
      }}
      >
        <Box flex={1} paddingLeft={4}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ fontSize: {xs: "25px" }}}>
            Welcome to{" "}
            <Box component="span" color="#8BC441">
              Pak Qarza
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
            src={image}
            alt="Mak Welfare"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection
