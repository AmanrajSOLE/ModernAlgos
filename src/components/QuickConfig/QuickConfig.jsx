import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Divider,
} from "@mui/material";

const QUICK_CONFIGS = [
  {
    key: "EMA_CROSSOVER",
    label: "EMA CrossOver",
  },
  {
    key: "SUPERTREND",
    label: "SuperTrend",
  },
  {
    key: "PSAR",
    label: "Parabolic SAR",
  },
  {
    key: "BBANDS",
    label: "BBands BreakOut",
  },
  {
    key: "MACD",
    label: "MACD Crosssover",
  },
];

const QuickConfigurations = ({ onSelect }) => {
  return (
    <Box mt={3}>
      <Typography
        sx={{
          color: "#3ccf91",
          mb: 2,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Quick Configurations
      </Typography>

      <Divider
        sx={{
          borderColor: "#ffffff",
          borderBottomWidth: 2,
          opacity: 0.9,
          mb: 2,
        }}
      />

      <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
        {QUICK_CONFIGS.map((config) => (
          <Card
            key={config.key}
            sx={{
              width: 250,
              height: 50,
              backgroundColor: "#111",
              border: "1px solid #222",
              borderRadius: 2,
            }}
          >
            <CardActionArea
              onClick={() => onSelect(config.key)}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              {/* Text */}
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {config.label}
              </Typography>

              {/* Image */}
              
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default QuickConfigurations;
