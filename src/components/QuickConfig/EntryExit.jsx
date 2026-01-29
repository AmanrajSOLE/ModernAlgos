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

/* ---------- NUMBER CONTROL ---------- */

const NumberControl = ({ value, setValue, step = 1, min = 0 }) => {
  const inc = () => setValue(v => v + step);
  const dec = () => setValue(v => Math.max(min, v - step));

  return (
    <Box display="grid" gridTemplateColumns="32px 1fr 32px"
      alignItems="center" bgcolor="#111" borderRadius={1} height={40}>
      <IconButton size="small" onClick={dec}><RemoveIcon sx={{color:"red"}}/></IconButton>
      <Typography align="center" color="#fff">{value}</Typography>
      <IconButton size="small" onClick={inc}><AddIcon sx={{color:"#4caf50"}}/></IconButton>
    </Box>
  );
};

/* ---------- FIELD ---------- */

const Field = ({ children, width = 95 }) => (
  <Box bgcolor="#111" px={1} py={0.3} borderRadius={1} minWidth={width}>
    {children}
  </Box>
);

/* ---------- RULE ROW ---------- */

const RuleRow = ({ bgColor, operator, onClose, lotSize }) => {
  const [logic, setLogic] = useState("AND");
  const [p1, setP1] = useState(7);
  const [p2, setP2] = useState(21);

  return (
    <Box display="flex" flexWrap="wrap" gap={1.5} p={1} borderRadius={1} bgcolor={bgColor}>
      <Field><Select variant="standard" disableUnderline value="EMA"><MenuItem value="EMA">EMA</MenuItem></Select></Field>

      <NumberControl value={p1} setValue={setP1} />

      <Field width={110}>
        <Select variant="standard" disableUnderline value={operator}>
          <MenuItem value={operator}>{operator}</MenuItem>
        </Select>
      </Field>

      <Field><Select variant="standard" disableUnderline value="EMA"><MenuItem value="EMA">EMA</MenuItem></Select></Field>

      <NumberControl value={p2} setValue={setP2} />

      <Select size="small" value={logic} onChange={e=>setLogic(e.target.value)}
        sx={{
          height:36,minWidth:90,color:"#fff",
          bgcolor: logic==="OR"?"#b35c5c":"#4f8f94",
          "& fieldset":{border:"none"}
        }}>
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="OR">OR</MenuItem>
      </Select>

      {onClose && (
        <IconButton onClick={onClose}><CloseIcon sx={{color:"red"}}/></IconButton>
      )}
    </Box>
  );
};

/* ---------- TRADE ROW ---------- */

const TradeRow = ({ isExit, onClose, lotSize }) => {
  const [qty,setQty] = useState(lotSize);

  return (
    <Box display="flex" flexWrap="wrap" gap={1} p={1}
      borderRadius={1} bgcolor={isExit?"#1b1f2a":"#2a2a1f"}>

      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton value="B" sx={{color:"#3ccf91"}}>B</ToggleButton>
        <ToggleButton value="S" sx={{color:"#ff6b6b"}}>S</ToggleButton>
      </ToggleButtonGroup>

      <Field><Select variant="standard" disableUnderline value="CE">
        <MenuItem value="CE">CE</MenuItem><MenuItem value="PE">PE</MenuItem>
      </Select></Field>

      <Field><Select variant="standard" disableUnderline value="ATM">
        <MenuItem value="ATM">ATM</MenuItem>
      </Select></Field>

      <NumberControl value={qty} setValue={setQty} step={lotSize} min={lotSize} />

      <Field width={70}><Typography color="#777">Target</Typography></Field>
      <Field width={70}><Typography color="#777">SL</Typography></Field>

      {isExit && onClose && (
        <IconButton onClick={onClose}><CloseIcon sx={{color:"red"}}/></IconButton>
      )}
    </Box>
  );
};

/* ---------- PANEL CARD ---------- */

const PanelCard = ({ title, children }) => (
  <Box p={3} borderRadius={2}
    sx={{background:"linear-gradient(135deg,#162a2c,#0e1c1d)",border:"1px solid #1f3a3d"}}>
    <Typography color="#cfe9e9" mb={1}>{title}</Typography>
    <Divider sx={{borderColor:"#fff",borderBottomWidth:2,mb:2}}/>
    {children}
  </Box>
);

/* ---------- MAIN ---------- */

const StrategyBuilder = ({ lotSize }) => {

  const [exitRows,setExitRows] = useState([]);
  const [exitTradeRows,setExitTradeRows] = useState([]);
  const [showExitWhen,setShowExitWhen] = useState(false);
  const [showExitTrade,setShowExitTrade] = useState(false);

  const addExitRow = ()=> setExitRows(r=>[...r,{id:Date.now()}]);
  const addExitTradeRow = ()=> setExitTradeRows(r=>[...r,{id:Date.now()}]);

  const removeExitRow = id=>{
    const u=exitRows.filter(r=>r.id!==id);
    setExitRows(u);
    if(!u.length) setShowExitWhen(false);
  };

  const removeExitTradeRow = id=>{
    const u=exitTradeRows.filter(r=>r.id!==id);
    setExitTradeRows(u);
    if(!u.length) setShowExitTrade(false);
  };

  const [times,setTimes]=useState(0);
  const [targetMode,setTargetMode]=useState("₹");

  return (
  <>
  {/* ===== TOP GRID ===== */}

  <Box mt={3} display="grid" gridTemplateColumns={{xs:"1fr",lg:"1fr 1fr"}} gap={2}>

  {/* LEFT */}
  <Box>
    <Typography color="#3ccf91">Entry When</Typography>
    <Divider sx={{borderColor:"#fff",borderBottomWidth:2,mb:2}}/>
    <RuleRow bgColor="#1f2d2f" operator="Crosses Above" lotSize={lotSize}/>
    <Button startIcon={<AddIcon/>} sx={{mt:1}}>ADD</Button>

    {!showExitWhen ? (
      <Button sx={{mt:2}} fullWidth startIcon={<AddIcon/>}
        onClick={()=>{setShowExitWhen(true);addExitRow();}}>
        ADD EXIT WHEN
      </Button>
    ) : (
      <>
        <Typography color="#ff4d4d" mt={2}>Exit When</Typography>
        <Divider sx={{borderColor:"#fff",borderBottomWidth:2,mb:2}}/>
        {exitRows.map(r=>(
          <RuleRow key={r.id} bgColor="#2a1f1f"
            operator="Crosses Below"
            lotSize={lotSize}
            onClose={()=>removeExitRow(r.id)}
          />
        ))}
        <Button startIcon={<AddIcon/>} onClick={addExitRow}>ADD</Button>
      </>
    )}
  </Box>

  {/* RIGHT */}
  <Box>
    <Typography color="#3ccf91">Entry Trade</Typography>
    <Divider sx={{borderColor:"#fff",borderBottomWidth:2,mb:2}}/>
    <TradeRow lotSize={lotSize}/>
    <Button startIcon={<AddIcon/>} sx={{mt:1}}>ADD</Button>

    {!showExitTrade ? (
      <Button sx={{mt:2}} fullWidth startIcon={<AddIcon/>}
        onClick={()=>{setShowExitTrade(true);addExitTradeRow();}}>
        ADD EXIT TRADE
      </Button>
    ) : (
      <>
        <Typography color="#ff4d4d" mt={2}>Exit Trade</Typography>
        <Divider sx={{borderColor:"#fff",borderBottomWidth:2,mb:2}}/>
        {exitTradeRows.map(r=>(
          <TradeRow key={r.id} isExit lotSize={lotSize}
            onClose={()=>removeExitTradeRow(r.id)}
          />
        ))}
        <Button startIcon={<AddIcon/>} onClick={addExitTradeRow}>ADD</Button>
      </>
    )}
  </Box>

  </Box>

  {/* ===== BOTTOM PANELS ===== */}

  <Box mt={4} display="grid" gridTemplateColumns={{xs:"1fr",md:"1fr 1fr 1fr"}} gap={3}>
    <PanelCard title="Computation Time">
      <NumberControl value={times} setValue={setTimes}/>
    </PanelCard>

    <PanelCard title="Target Parameters">
      <ToggleButtonGroup size="small" exclusive value={targetMode}
        onChange={(_,v)=>v&&setTargetMode(v)}>
        <ToggleButton value="₹">₹</ToggleButton>
        <ToggleButton value="%">%</ToggleButton>
      </ToggleButtonGroup>
    </PanelCard>

    <PanelCard title="Backtest Period">
      <TextField type="date" size="small" fullWidth/>
    </PanelCard>
  </Box>

  <Box display="flex" justifyContent="flex-end" mt={4}>
    <Button variant="contained" sx={{bgcolor:"#1f7a45"}}>
      Run Backtesting
    </Button>
  </Box>

  </>
  );
};

export default StrategyBuilder;
