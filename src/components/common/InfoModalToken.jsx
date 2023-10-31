import { Modal } from "@mui/material";
import { Link } from "react-router-dom";

const InfoModalToken = ({ open, setOpen, tokenOne, tokenTwo }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="flex items-center  justify-center h-full bg-[rgba(0,0,0,.5)]"
        onClick={() => setOpen(false)}
      >
        <div className="flex rounded-lg border-2 border-blue-500 items-center  justify-between lg:w-[400px] h-[200px] w-[90%] mx-auto bg-black">
          <div className="flex flex-col  w-[45%]  text-white text-center space-y-3">
            <div className="flex items-center justify-center gap-x-2">
              <img
                src={tokenOne?.img}
                className={"w-6 h-6 object-cover"}
                alt={tokenOne?.name}
              />
              <h6 className="text-gray-400 font-semibold">{tokenOne?.name}</h6>
            </div>
            <hr />
            <Link to={"/"} className="block mb-3">
              View Contract
            </Link>
            <Link to={"/"} className="block mb-3">
              Token Info
            </Link>
          </div>
          {tokenTwo && (
            <div className="flex flex-col w-[45%] text-white text-center space-y-3">
              <div className="flex items-center justify-center gap-x-2">
                <img
                  src={tokenTwo?.img}
                  className={"w-6 h-6 object-cover"}
                  alt={tokenTwo?.name}
                />
                <h6 className="text-gray-400 font-semibold">
                  {tokenTwo?.name}
                </h6>
              </div>
              <hr />
              <Link to={"/"} className="block mb-3">
                View Contract
              </Link>
              <Link to={"/"} className="block mb-3">
                Token Info
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InfoModalToken;
