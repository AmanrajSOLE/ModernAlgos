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

const SYMBOL_LOT_MAP = {
  NIFTY: 65,
  BANKNIFTY: 30,
  RELIANCE: 500,
  SBIN: 750,
  TATASTEEL: 5500,
};

const symbols = Object.keys(SYMBOL_LOT_MAP);

const SearchBar = ({
  symbol,
  setSymbol,
  mode,
  setMode,
  lotSize,
  setLotSize,
}) => {
  const handleSymbolChange = (_, newValue) => {
    if (!newValue) return;
    setSymbol(newValue);
    setLotSize(SYMBOL_LOT_MAP[newValue]);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"   // ✅ push all to right
      alignItems="center"
      gap={4}
      flexWrap="wrap"
      px={3}
      py={1.5}
      borderRadius={2}
      sx={{ backgroundColor: "#111" }}
    >
      {/* 🔍 Searchable Symbol Input */}
      

      {/* Intraday / Positional Toggle */}
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

      <Autocomplete
        options={symbols}
        value={symbol}
        onChange={handleSymbolChange}
        freeSolo={false}
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
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "#888", mr: 1 }}
                  />
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
        ListboxProps={{
          sx: {
            backgroundColor: "#111",
            color: "#fff",
          },
        }}
      />

      {/* Lot Size */}
      <Typography variant="body2" sx={{ color: "#aaa" }}>
        Lot Size:{" "}
        <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>
          {lotSize}
        </Box>
      </Typography>
    </Box>
  );
};

export default SearchBar;
