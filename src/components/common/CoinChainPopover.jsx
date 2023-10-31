import BNBLogo from "../../assets/bnb.svg";
import ETHLogo from "../../assets/eth.svg";
import * as RiIcon from "react-icons/ri";
import ETHMini from "../../assets/ethsmall.svg";
import BNBMini from "../../assets/bnbsmall.svg";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Popover,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { selectCoinChain } from "../../store/actions/coinActions";

const ToggleBtnChain = styled(Button)({
  borderRadius: "1rem",
  background: "#141825",
  marginBottom: ".5rem",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  columnGap: ".5rem",
  width: "180px",
  height: "48px",
  transition: "all .4s linear",
  "&:hover": {
    backgroundColor: "#000",
  },
});

const CoinChainPopover = ({ isConnected }) => {
  const { coinChain } = useSelector((state) => state.coin);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const { chain, chains } = useNetwork();
  const { switchNetwork, status } = useSwitchNetwork();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectSwitchToken = (id) => {
    switchNetwork(id);
  };

  useEffect(() => {
    const value = chain?.id === 56 ? "BNB Smart Chain (BEP20)" : "Ethereum";
    dispatch(selectCoinChain(value));
    setAnchorEl(null);
  }, [chain, coinChain]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return isConnected ? (
    <>
      {isMobile ? (
        <Button
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          width: "80px",
          height: "45px",
          color: "#fff",
          fontSize: "1.125rem",
          columnGap: ".5rem",
          borderRadius: "1rem",
          textTransform: "capitalize",
          background:
            coinChain === "BNB Smart Chain (BEP20)"
              ? "linear-gradient(90deg, #2C274F -8.29%, #F3DF2F 115.9%)"
              : " linear-gradient(90deg, rgba(98, 126, 234, 0.5) -8.29%, #010101 153.92%)",
        }}
        type="submit"
      >
        {coinChain === "BNB Smart Chain (BEP20)" ? (
          <img src={BNBMini} alt="bnb" />
        ) : (
          <img src={ETHMini} alt="eth" />
        )}
        <RiIcon.RiArrowDownSLine size={28}/>
      </Button>
      ) : (
        <Button
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            width: "200px",
            height: "45px",
            color: "#fff",
            columnGap: ".5rem",
            fontSize: "1.125rem",
            borderRadius: "1rem",
            textTransform: "capitalize",
            background:
              coinChain === "BNB Smart Chain (BEP20)"
                ? "linear-gradient(90deg, #2C274F -8.29%, #F3DF2F 115.9%)"
                : " linear-gradient(90deg, rgba(98, 126, 234, 0.5) -8.29%, #010101 153.92%)",
          }}
          type="submit"
        >
          {coinChain === "BNB Smart Chain (BEP20)" ? (
            <>
              <img src={BNBMini} alt="bnb" />
              BNB Chain
            </>
          ) : (
            <>
              <img src={ETHMini} alt="eth" />
              Ethereum
            </>
          )}
          <RiIcon.RiArrowDownSLine size={28} />
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "180px",
            backgroundColor: "#0d111b",
            padding: ".5rem .7rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ToggleBtnChain
            onClick={() => selectSwitchToken(56)}
            value={coinChain}
            aria-label="bnb"
          >
            <img src={BNBLogo} alt="" />
            BNB Chain
          </ToggleBtnChain>
          <ToggleBtnChain onClick={() => selectSwitchToken(1)} aria-label="eth">
            <img src={ETHLogo} alt="" />
            Ethereum
          </ToggleBtnChain>
        </Box>
      </Popover>
    </>
  ) : null;
};

export default CoinChainPopover;
