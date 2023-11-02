import {
  Box,
  Button,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSlippage } from "../../store/actions/coinActions";

const themeStyles = () => {
  return {
    paper: {
      background: "#0d111b",
      width: "100px",
      height: "190px",
      textAlign: "center",
      color: "#Fff",
      paddingY: ".5rem",
    },
    flexbox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemCenter: {
      display: "flex",
      alignItems: "center",
    },
    btn: {
      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      width: "20%",
      borderRadius: ".625rem",
      color: "#fff",

      textTransform: "capitalize",
    },
    toggleBtn: {
      width: "75%",
      borderRadius: ".625rem",
      color: "#fff",
    },
  };
};

const Slippage = ({ id, open, anchorEl, handleClose }) => {
  const { slippage } = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "bottom",
      }}
    >
      <Box sx={themeStyles().paper}>
        <Typography variant="body1" marginBottom={".5rem"} component={"h6"}>
          Slippage
        </Typography>
        <Box
          sx={themeStyles().itemCenter}
          flexDirection={"column"}
          columnGap={"1rem"}
        >
          <ToggleButtonGroup
            orientation="vertical"
            sx={themeStyles().toggleBtn}
            value={slippage}
            fullWidth
            onChange={(e) => dispatch(changeSlippage(e.target.value))}
            aria-label="text alignment"
          >
            <ToggleButton
              style={
                slippage === "0.1"
                  ? {
                      color: "#fff",
                      backgroundColor: "#E234B9",
                      borderRadius: "1rem",
                    }
                  : {
                      color: "#fff",
                      backgroundColor: "transparent",
                      borderRadius: "1rem",
                    }
              }
              value="0.1"
            >
              0.1%
            </ToggleButton>
            <ToggleButton
              style={
                slippage === "0.5"
                  ? {
                      color: "#fff",
                      backgroundColor: "#E234B9",
                      borderRadius: "1rem",
                    }
                  : {
                      color: "#fff",
                      backgroundColor: "transparent",
                      borderRadius: "1rem",
                    }
              }
              value="0.5"
            >
              0.5%
            </ToggleButton>
            <ToggleButton
              style={
                slippage === "1"
                  ? {
                      color: "#fff",
                      backgroundColor: "#E234B9",
                      borderRadius: "1rem",
                    }
                  : {
                      color: "#fff",
                      backgroundColor: "transparent",
                      borderRadius: "1rem",
                    }
              }
              value="1"
            >
              1%
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Popover>
  );
};

export default Slippage;
