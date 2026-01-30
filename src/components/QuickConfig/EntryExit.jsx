import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


const NumberControl = ({ value, setValue, step = 1, min = 0 }) => {

  const increase = () => {
    setValue((v) => v + step);
  };

  const decrease = () => {
    setValue((v) => Math.max(min, v - step));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "32px 1fr 32px",
        alignItems: "center",
        backgroundColor: "#111",
        borderRadius: 1,
        height: 30,
      }}
    >
      <IconButton size="small" onClick={decrease} sx={{ color: "red" }}>
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography align="center" color="#fff">
        {value}
      </Typography>

      <IconButton size="small" onClick={increase} sx={{ color: "#4caf50" }}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const Field = ({ children, width = 95 }) => (
  <Box
    sx={{
      backgroundColor: "#111",
      px: 1,
      py: 0.1,
      borderRadius: 1,
      minWidth: width,
      height: 30,
    }}
  >
    {children}
  </Box>
);


const RuleRow = ({ bgColor, operator, onClose, lotSize }) => {
  const [logic, setLogic] = useState("AND");
  const [qty, setQty] = useState(lotSize);
  const [leftPeriod, setLeftPeriod] = useState(7);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      minWidth={0}
      alignItems="center"
      gap={1.5}
      p={1}
      borderRadius={1}
      sx={{ backgroundColor: bgColor }}
    >
      <Field>
        <Select variant="standard" disableUnderline fullWidth value="EMA">
          <MenuItem value="EMA">EMA</MenuItem>
        </Select>
      </Field>

      <NumberControl value={leftPeriod} setValue={setLeftPeriod} />

      <Field width={100}>
        <Select variant="standard" disableUnderline fullWidth value={operator}>
          <MenuItem value={operator}>{operator}</MenuItem>
        </Select>
      </Field>

      <Field>
        <Select variant="standard" disableUnderline fullWidth value="EMA">
          <MenuItem value="EMA">EMA</MenuItem>
        </Select>
      </Field>

      <NumberControl value={leftPeriod} setValue={setLeftPeriod} />

      <Select
        size="small"
        value={logic}
        onChange={(e) => setLogic(e.target.value)}
        sx={{
          height: 36,
          minWidth: 90,
          fontWeight: 600,
          color: "#fff",
          borderRadius: 1,
          backgroundColor: logic === "OR" ? "#b35c5c" : "#4f8f94",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "& .MuiSelect-icon": {
            color: "#fff",
          },
        }}
      >
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="OR">OR</MenuItem>
      </Select>

      {onClose && (
        <IconButton sx={{ color: "red" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};


const TradeRow = ({ isExit, onClose, lotSize }) => {
  const [qty, setQty] = useState(lotSize);
  React.useEffect(() => {
    setQty(lotSize);
  }, [lotSize]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      minWidth={0}
      alignItems="flex-end"
      gap={1.2}
      p={1}
      borderRadius={1}
      sx={{
        backgroundColor: isExit ? "#1b1f2a" : "#2a2a1f",
      }}
    >
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Side
        </Typography>
        <ToggleButtonGroup exclusive size="small">
          <ToggleButton value="B" sx={{ color: "#3ccf91" }}>
            B
          </ToggleButton>
          <ToggleButton value="S" sx={{ color: "#ff6b6b" }}>
            S
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Instrument
        </Typography>
        <Field>
          <Select variant="standard" disableUnderline value="CE">
            <MenuItem value="CE">CE</MenuItem>
            <MenuItem value="PE">PE</MenuItem>
          </Select>
        </Field>
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Strike
        </Typography>
        <Field>
          <Select variant="standard" disableUnderline value="ATM">
            <MenuItem value="ATM">ATM</MenuItem>
          </Select>
        </Field>
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Qty
        </Typography>
        <NumberControl
          value={qty}
          setValue={setQty}
          step={lotSize}
          min={lotSize}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Mode
        </Typography>
        <Field width={20}>
          <Select variant="standard" disableUnderline value="Pts">
            <MenuItem value="Pts">Pts</MenuItem>
            <MenuItem value="%">%</MenuItem>
          </Select>
        </Field>
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Target
        </Typography>
        <Field width={100}>
          <Typography sx={{ color: "#555" }}>Target</Typography>
        </Field>
      </Box>

      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography fontSize={11} color="#9aa">
          Stop Loss
        </Typography>
        <Field width={100}>
          <Typography sx={{ color: "#555" }}>Stoploss</Typography>
        </Field>
      </Box>

      {isExit && onClose && (
        <Box display="flex" alignItems="flex-end">
          <IconButton sx={{ color: "red" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

const PanelCard = ({ title, children }) => (
  <Box
    p={3}
    borderRadius={2}
    sx={{
      background: "linear-gradient(135deg,#162a2c,#0e1c1d)",
      border: "1px solid #1f3a3d",
      height: "100%",
    }}
  >
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <Typography color="#cfe9e9" fontWeight={500}>
        {title}
      </Typography>
    </Box>

    <Divider
      sx={{
        borderColor: "#ffffff",
        borderBottomWidth: 2,
        opacity: 0.9,
        mb: 2,
      }}
    />

    {children}
  </Box>
);

/* ---------- MAIN STRATEGY BUILDER ---------- */

const StrategyBuilder = ({ lotSize }) => {
  const [tradeType, setTradeType] = useState("Weekly");
  const [showExitWhen, setShowExitWhen] = useState(false);
  const [showExitTrade, setShowExitTrade] = useState(false);
  const [exitRows, setExitRows] = useState([]);
  const [exitTradeRows, setExitTradeRows] = useState([]);
  const [times, setTimes] = useState(0);
  const [targetMode, setTargetMode] = useState("₹");

  const addExitRow = () => {
    setExitRows((r) => [...r, { id: Date.now() }]);
  };

  const removeExitRow = (id) => {
    const updated = exitRows.filter((r) => r.id !== id);
    setExitRows(updated);

    if (updated.length === 0) {
      setShowExitWhen(false); // collapse section when last row removed
    }
  };

  const addExitTradeRow = () => {
    setExitTradeRows((r) => [...r, { id: Date.now() }]);
  };

  const removeExitTradeRow = (id) => {
    const updated = exitTradeRows.filter((r) => r.id !== id);
    setExitTradeRows(updated);

    if (updated.length === 0) {
      setShowExitTrade(false);
    }
  };

  return (
    <>
      <Box
        mt={3}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "1fr 1fr" }}
        gap={2}
      >
        {/* LEFT SIDE – ENTRY & EXIT WHEN */}
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              sx={{
                height: 40,
                display: "flex",
                alignItems: "center",
              }}
              color="#3ccf91"
            >
              Entry When
            </Typography>
            <InfoOutlinedIcon
              sx={{ fontSize: 16, color: "#aaa", height: 40 }}
            />
          </Box>
          <Divider
            sx={{
              borderColor: "#ffffff",
              borderBottomWidth: 2,
              opacity: 0.9,
              mb: 2,
            }}
          />

          <RuleRow
            bgColor="#1f2d2f"
            operator="Crosses Above"
            lotSize={lotSize}
          />

          <Button startIcon={<AddIcon />} sx={{ mt: 1 }}>
            ADD
          </Button>

          {/* EXIT WHEN */}
          {!showExitWhen ? (

            <Box sx={{ mt: 1, maxWidth: 260 }}>
              <Button
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => {
                  setShowExitWhen(true);
                  addExitRow();
                }}
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor: "#2a1a1a",
                  color: "#ff4d4d",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  "&:hover": { backgroundColor: "#3a2222" },
                }}
              >
                ADD EXIT WHEN
              </Button>
            </Box>
          ) : (
            /* BOX STATE */

            <>
              <Typography
                sx={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
                color="#ff4d4d"
              >
                Exit When
              </Typography>
              <Divider
                sx={{
                  borderColor: "#ffffff",
                  borderBottomWidth: 2,
                  opacity: 0.9,
                  mb: 2,
                }}
              />

              {exitRows.map((row) => (
                <RuleRow
                  key={row.id}
                  bgColor="#2a1f1f"
                  operator="Crosses Below"
                  onClose={() => removeExitRow(row.id)}
                  lotSize={lotSize}
                />
              ))}

              <Button
                startIcon={<AddIcon />}
                sx={{ mt: 1 }}
                onClick={addExitRow}
              >
                ADD
              </Button>
            </>
          )}
        </Box>

        {/* RIGHT SIDE – ENTRY & EXIT TRADE */}
        <Box>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography
              sx={{
                height: 40,
                display: "flex",
                alignItems: "center",
              }}
              color="#3ccf91"
            >
              Entry Trade
            </Typography>

            <ToggleButtonGroup
              size="small"
              exclusive
              value={tradeType}
              onChange={(_, v) => v && setTradeType(v)}
            >
              <ToggleButton value="Weekly">Weekly</ToggleButton>
              <ToggleButton value="Monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider
            sx={{
              borderColor: "#ffffff",
              borderBottomWidth: 2,
              opacity: 0.9,
              mb: 2,
            }}
          />

          <TradeRow lotSize={lotSize} />

          <Button startIcon={<AddIcon />} sx={{ mt: 1 }}>
            ADD
          </Button>

          {/* EXIT TRADE */}

          {!showExitTrade ? (
            <Box sx={{ mt: 1, maxWidth: 260 }}>
              <Button
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => {
                  setShowExitTrade(true);
                  addExitTradeRow();
                }}
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor: "#2a1a1a",
                  color: "#ff4d4d",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  "&:hover": { backgroundColor: "#3a2222" },
                }}
              >
                ADD EXIT TRADE
              </Button>
            </Box>
          ) : (
            <>
              <Typography
                sx={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
                color="#ff4d4d"
              >
                Exit Trade
              </Typography>

              <Divider
                sx={{
                  borderColor: "#ffffff",
                  borderBottomWidth: 2,
                  opacity: 0.9,
                  mb: 2,
                }}
              />
              {exitTradeRows.map((row) => (
                <TradeRow
                  key={row.id}
                  isExit
                  lotSize={lotSize}
                  onClose={() => removeExitTradeRow(row.id)}
                />
              ))}

              <Button
                startIcon={<AddIcon />}
                sx={{ mt: 1 }}
                onClick={addExitTradeRow}
              >
                ADD
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box mt={3}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
          gap={4}
        >
          {/* COMPUTATION TIME */}
          <PanelCard title="Computation Time">
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography color="#cfe9e9">No. of Times</Typography>
              <NumberControl value={times} setValue={setTimes} />
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="START"
                value="09:15"
                size="small"
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />
              <TextField
                label="END"
                value="15:30"
                size="small"
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography color="#cfe9e9">DAY</Typography>

              {["M", "T", "W", "T", "F", "ALL"].map((d) => (
                <Button
                  key={d}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    background: "#3ccf91",
                    color: "#fff",
                  }}
                >
                  {d}
                </Button>
              ))}
            </Box>
          </PanelCard>

          {/* TARGET PARAMETERS */}
          <PanelCard title="Target Parameters">
            <ToggleButtonGroup
              size="small"
              value={targetMode}
              exclusive
              onChange={(_, v) => v && setTargetMode(v)}
              sx={{ mb: 3 }}
            >
              <ToggleButton value="₹">₹</ToggleButton>
              <ToggleButton value="%">%</ToggleButton>
            </ToggleButtonGroup>

            <Box display="flex" gap={2}>
              <TextField
                label="Fixed Profit"
                size="small"
                fullWidth
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />

              <TextField
                label="Stop Loss"
                size="small"
                fullWidth
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />
            </Box>
          </PanelCard>

          {/* BACKTEST PERIOD */}
          <PanelCard title="Backtest Period">
            <Box mb={2}>
              <Typography color="#cfe9e9" mb={1}>
                Time Period
              </Typography>

              <Select
                size="small"
                defaultValue="Custom"
                sx={{ background: "#0f0f0f", color: "#fff", width: 160 }}
              >
                <MenuItem value="Custom">Custom</MenuItem>
                <MenuItem value="1M">1 Month</MenuItem>
                <MenuItem value="3M">3 Months</MenuItem>
              </Select>
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="From"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />

              <TextField
                label="To"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { background: "#0f0f0f", color: "#fff" } }}
              />
            </Box>
          </PanelCard>
        </Box>
      </Box>
      <Box fullWidth display="flex" justifyContent="flex-end" mt={8}>
        <Button
          variant="contained"
          sx={{
            background: "#1f7a45",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Run Backtesting
        </Button>
      </Box>
    </>
  );
};

export default StrategyBuilder;
