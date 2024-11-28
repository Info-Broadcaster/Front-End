import { useEffect, useState } from "react";
import PageLayer from "./PageLayer";
import InputLabel from "./components/InputLabel";
import { useParams } from "react-router-dom";
import TagList from "./components/TagList";
import DisplayFlag from "./components/DisplayFlag";
import AdvancedSpinner from "./components/AdvancedSpinner";
import Button from "./components/Button";
import { IoIosSend } from "react-icons/io";
import axiosInstance from "../axiosInstance";
import DialogDefault from "./components/DialogDefaut";

export default function Edition() {
  const isDebugMode = true;
  const { link, lang } = useParams();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isLoadingBubbles, setIsLoadingBubbles] = useState(true);
  const [isSent, setIsSent] = useState(false);

  const handleCheck = (jid, isChecked) => {
    setIsSent(false);
    setCheckedItems((prev) =>
      isChecked ? [...prev, jid] : prev.filter((item) => item !== jid)
    );
  };

  function getBubbles() {
    setIsLoadingBubbles(true);
    axiosInstance
      .get("/rainbowGetBubbles")
      .then((response) => {
        setBubbles(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingBubbles(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    // setBubbles(exemplePayload);
    getBubbles();
    if (!isDebugMode) {
      axiosInstance
        .post("/dialoguewithllama/summarize", {
          url: decodeURIComponent(link),
          lang: lang,
        })
        .then((response) => {
          console.log(response.data.data);
          setContent(response.data.data.summarized);
          setSubject(response.data.data.title);
          setTheme(response.data.data.themes);
          if (response.data.status === "error") {
            // setIsError(true);
            console.error(response.data.message);
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setContent("Mode debug activé");
      setIsLoading(false);
    }
  }, [link, lang, isDebugMode]);

  return (
    <PageLayer title="Edition">
      <div className="py-10">{/* <SnackBar /> */}</div>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-4 ">
          <AdvancedSpinner />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span>Génération de l'article en cours...</span>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-5">
          <DisplayFlag flagCode={lang} />
          <InputLabel label="Lien" value={link} disabled={true} />
          <InputLabel
            label="Titre de l'article"
            setValue={(e) => setSubject(e.target.value)}
            value={subject}
          />
          <InputLabel
            label="Contenu"
            setValue={(e) => setContent(e.target.value)}
            value={content}
            textarea={true}
          />
          <div className="flex items-center justify-center w-full gap-5">
            <span className="w-1/6">
              <label>Catégories</label>
            </span>
            <TagList tags={theme} />
          </div>
          <div className="flex justify-end">
            <Button callback={() => setShowModal(true)} isLoading={false}>
              Envoyer sur Rainbow
              <IoIosSend className="text-2xl" />
            </Button>
          </div>
        </div>
      )}
      <DialogDefault
        showModal={showModal}
        setShowModal={setShowModal}
        bubbles={bubbles}
        onCheckBubble={handleCheck}
        checkedBubbles={checkedItems}
        isLoadingBubbles={isLoadingBubbles}
        content={content}
        isSent={isSent}
        setIsSent={setIsSent}
      />
    </PageLayer>
  );
}
