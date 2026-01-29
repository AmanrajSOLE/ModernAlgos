import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const EmptyState = ({ onStart }) => {
  return (
    <Box
      mt={4}
      p={6}
      textAlign="center"
      borderRadius={2}
      sx={{ backgroundColor: "#162225" }}
    >
      <IconButton onClick={onStart}>
        <AddIcon sx={{ fontSize: 40, color: "#9ecbff" }} />
      </IconButton>

      <Typography sx={{ color: "#fff", mt: 1 }}>
        Let’s Get Started!
      </Typography>

      <Typography sx={{ color: "#aaa", mt: 0.5 }}>
        Configure Your Entry And Exit Indicators To Prepare Your Strategy For
        Backtesting.
      </Typography>
    </Box>
  );
};

export default EmptyState;
