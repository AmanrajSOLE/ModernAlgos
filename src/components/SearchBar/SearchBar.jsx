import React from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  symbols,
  symbol,
  onSymbolChange,
  mode,
  setMode,
  lotSize,
}) => {

  const handleSymbolChange = (_, newValue) => {
    if (!newValue) return;
    onSymbolChange(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      gap={4}
      flexWrap="wrap"
      px={3}
      py={1.5}
      borderRadius={2}
      sx={{ backgroundColor: "#111" }}
    >

      {/* Toggle */}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, val) => val && setMode(val)}
        size="small"
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          "& .MuiToggleButton-root": {
            color: "#aaa",
            border: "none",
            px: 2.5,
            py: 0.5,
          },
          "& .Mui-selected": {
            backgroundColor: "#7c5cff !important",
            color: "#fff",
          },
        }}
      >
        <ToggleButton value="Intraday">Intraday</ToggleButton>
        <ToggleButton value="Positional">Positional</ToggleButton>
      </ToggleButtonGroup>

      {/* Symbol Search */}
      <Autocomplete
        options={symbols}
        value={symbol}
        onChange={handleSymbolChange}
        size="small"
        sx={{ minWidth: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search symbol"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <>
                  <SearchIcon fontSize="small" sx={{ color: "#888", mr: 1 }} />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
            sx={{
              backgroundColor: "#1a1a1a",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              input: { color: "#fff" },
            }}
          />
        )}
      />

      {/* Lot Size Display */}
      <Typography variant="body2" sx={{ color: "#aaa" }}>
        Lot Size:
        <Box component="span" sx={{ color: "#fff", fontWeight: 600, ml: 1 }}>
          {lotSize}
        </Box>
      </Typography>

    </Box>
  );
};

export default SearchBar;
