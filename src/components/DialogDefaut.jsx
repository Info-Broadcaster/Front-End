import { IoIosSend } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import Button from "./Button";
import AdvancedSpinner from "./AdvancedSpinner";
import BubbleList from "./BubbleList";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";

const DialogDefault = ({
  showModal,
  setShowModal,
  bubbles,
  onCheckBubble,
  checkedBubbles,
  isLoadingBubbles,
  content,
  isSent,
  setIsSent,
}) => {
  const [sendIsLoading, setSendIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function sendMessageToRainbow() {
    setSendIsLoading(true);
    setIsError(false);
    console.log(checkedBubbles);

    axiosInstance
      .post("/rainbowSendMessageToBubbles", {
        bubbles: checkedBubbles,
        message: content,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setIsSent(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setSendIsLoading(false);
      });
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-55 ">
            <div className="relative w-full mx-10 my-6 flex justify-center ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-1/2 min-w-96 bg-white outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">
                    Sélectionner des bulles
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white opacity-7 h-6 w-6 text-xl  bg-purple-800 py-0 rounded-full flex items-center justify-center pb-1">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-scroll h-96 ">
                  {isLoadingBubbles ? (
                    <div className="flex justify-center items-center flex-col gap-4 h-full ">
                      <AdvancedSpinner />
                      <span>Chargement des bulles...</span>
                    </div>
                  ) : (
                    <BubbleList
                      bubbles={bubbles}
                      onCheckBubble={onCheckBubble}
                      checkedBubbles={checkedBubbles}
                    />
                  )}
                </div>
                <div className="flex  p-6 border-t border-solid border-blueGray-200 flex-col">
                  {isError ? (
                    <span className="flex justify-end text-red-600 pb-2">
                      Une erreur est survenue
                    </span>
                  ) : null}
                  <div className="flex justify-end">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fermer
                    </button>
                    <Button
                      callback={() => sendMessageToRainbow()}
                      isLoading={sendIsLoading}
                      disabled={isSent}
                    >
                      {isSent ? (
                        <div className="flex gap-2">
                          <span>Envoyé</span>
                          <FaCheck className="text-2xl" />
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <span>Envoyer sur Rainbow</span>
                          <IoIosSend className="text-2xl" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DialogDefault;
