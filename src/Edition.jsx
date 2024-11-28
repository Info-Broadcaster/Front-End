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
      setContent(`Retour vers le futur. Selon les informations de BFMTV, Patrick Balkany a récemment saisi la justice pour faire annuler la peine d’inéligibilité à laquelle il a été condamné, en 2019. Il souhaite pouvoir ainsi se présenter aux élections municipales de 2026 dans son fief de Levallois-Perret (Hauts-de-Seine).

"Il s’agit d’une requête, déposée le 25 octobre, pour obtenir ce qu’on appelle le relèvement de sa peine complémentaire d’inéligibilité", confirme ainsi une source judiciaire.

Reconnu définitivement coupable de fraude fiscale et blanchiment avec son épouse, Isabelle, pour avoir dissimulé au fisc un patrimoine évalué à 13 millions d’euros, notamment dans deux villas aux Caraïbes et au Maroc, Patrick Balkany a été condamné à quatre ans et demi de prison ferme et à une peine complémentaire de dix ans d’inéligibilité.

"C’était déjà il y a cinq ans. Je suis allé en prison quasiment un an et j’ai porté un bracelet électronique. Et avec Isabelle, on rembourse chaque mois 1.300 euros au fisc. Donc, oui, j’ai demandé que la peine d’inéligibilité s’arrête pour pouvoir me représenter", confirme le principal intéressé.

Considérant que la retraite est "l’antichambre de la mort", il affirme aujourd’hui retourner à Levallois-Perret "tous les deux jours" en moyenne. "Je ne peux pas faire dix mètres sans que les gens m’arrêtent: ‘Vous nous manquez Monsieur le maire! Quand est-ce que vous revenez?’ Les habitants, mais aussi les agents municipaux…", affirme-t-il.

Sa requête n’a rien à avoir avec les réquisitions au procès de Marine Le Pen
En pleine tourmente judiciaire à l’approche des élections municipales de 2020, il avait finalement abandonné le fauteuil de maire, occupé plus de 30 ans, et désigné Agnès Pottier-Dumas comme sa successeure la plus naturelle. Ancienne directrice générale des services de la ville, celle-ci l’avait emporté au second tour avec près de 46% des voix lors d’une triangulaire. Mais à 76 ans aujourd’hui, Patrick Balkany regrette de l’avoir adoubée et souhaite reprendre sa place. "Les gens ont besoin d’un contact plus humain. On verra ce que tout cela donne. Mais mon équipe est déjà prête à suivre…"

Transmise en octobre au Parquet national financier, sa requête n’a donc rien à avoir avec les réquisitions d’inéligibilité intervenues, le 13 novembre, au procès de Marine Le Pen et des ex-cadres du Front national jugés depuis le 30 septembre pour détournement de fonds publics. Mais ce proche de Nicolas Sarkozy a évidemment suivi les débats politiques et juridiques portant sur le sort de la cheffe de file des députés RN. "Les magistrats jugent toujours ‘au nom du peuple français’", rappelle ainsi Patrick Balkany. "Et bien, je crois qu’ils devraient arrêter. Ce sont aux électeurs de se prononcer sur les noms de leurs représentants."`);
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
            setValue={setSubject}
            value={subject}
          />
          <InputLabel
            label="Contenu"
            setValue={setContent}
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
        link={link}
        title={subject}
      />
    </PageLayer>
  );
}
