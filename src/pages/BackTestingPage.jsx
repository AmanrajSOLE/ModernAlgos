import React, { useState } from "react";
import { Box, Button, Fade } from "@mui/material";
import { SYMBOL_LOTS } from "../Mock/Symbol";

/* Header */
import SearchBar from "../components/SearchBar/SearchBar";

/* Sections */
import QuickConfigurations from "../components/QuickConfig/QuickConfig";
import EmptyState from "../components/QuickConfig/EmptyState";
import StrategyBuilder from "../components/QuickConfig/EntryExit";

const BackTestingPage = () => {
  const [showStrategyFields, setShowStrategyFields] = useState(false);

  /* Search bar state (simple) */
  const [symbol, setSymbol] = useState("NIFTY");
  const [mode, setMode] = useState("Intraday");
  const [lotSize, setLotSize] = useState(65);

  const handleSymbolChange = (sym) => {
  setSymbol(sym);
  setLotSize(SYMBOL_LOTS[sym] || 1);
  setShowStrategyFields(true);
};


  return (
    <Box px={2} pb={4}>
      {/* 🔍 SEARCH BAR */}
      <SearchBar
        symbol={symbol}
        setSymbol={(val) => {
          setSymbol(val);
          setShowStrategyFields(true);
        }}
        mode={mode}
        setMode={setMode}
        lotSize={lotSize}
        setLotSize={setLotSize}
      />

      {/* QUICK CONFIGURATIONS */}
      <QuickConfigurations onSelect={() => setShowStrategyFields(true)} />

      {!showStrategyFields && (
        <EmptyState onStart={() => setShowStrategyFields(true)} />
      )}

      {showStrategyFields && <StrategyBuilder />}
    </Box>
  );
};

export default BackTestingPage;
