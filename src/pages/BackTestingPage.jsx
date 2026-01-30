import React, { useState, useEffect } from "react";
import { Box, Button, Fade } from "@mui/material";
import { SYMBOL_LOTS } from "../Mock/Symbol";
import { getSymbolLotMap } from "../Api/SymbolApi";
import SearchBar from "../components/SearchBar/SearchBar";
import QuickConfigurations from "../components/QuickConfig/QuickConfig";
import EmptyState from "../components/QuickConfig/EmptyState";
import StrategyBuilder from "../components/QuickConfig/EntryExit";

const BackTestingPage = () => {
  const [showStrategyFields, setShowStrategyFields] = useState(false);

  const [symbolLots, setSymbolLots] = useState({});
  const [mode, setMode] = useState("Intraday");
  const [lotSize, setLotSize] = useState(65);

  const [symbol, setSymbol] = useState("");

  const handleSymbolChange = (sym) => {
    setSymbol(sym);

    const lot = symbolLots[sym] || 1;
    setLotSize(lot);

    setShowStrategyFields(true);
  };

  useEffect(() => {
    getSymbolLotMap().then(setSymbolLots);
  }, []);

  return (
    <Box px={2} pb={4}>
      <SearchBar
        symbols={Object.keys(symbolLots)}
        symbol={symbol}
        onSymbolChange={handleSymbolChange}
        setSymbol={(val) => {
          setSymbol(val);
          setShowStrategyFields(true);
        }}
        mode={mode}
        setMode={setMode}
        lotSize={lotSize}
        setLotSize={setLotSize}
      />

      <QuickConfigurations onSelect={() => setShowStrategyFields(true)} />

      {!showStrategyFields && (
        <EmptyState onStart={() => setShowStrategyFields(true)} />
      )}

      {showStrategyFields && <StrategyBuilder lotSize={lotSize} />}
    </Box>
  );
};

export default BackTestingPage;
