import { useState } from "react";
import { IconButton } from "@fluentui/react";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../i18n/config";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

interface Props {
    answer: string;
}

const SpeechSynthesis = (window as any).speechSynthesis || (window as any).webkitSpeechSynthesis;

let synth: SpeechSynthesis | null = null;

try {
    synth = SpeechSynthesis;
} catch (err) {
    console.error("SpeechSynthesis is not supported");
}

<<<<<<< HEAD
const getUtterance = function (text: string) {
    if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.voice = synth.getVoices().filter((voice: SpeechSynthesisVoice) => voice.lang === "en-US")[0];
=======
const getUtterance = function (text: string, lngCode: string = "en-US") {
    if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lngCode;
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;

        let voice = synth.getVoices().filter((voice: SpeechSynthesisVoice) => voice.lang === lngCode)[0];
        if (!voice) {
            voice = synth.getVoices().filter((voice: SpeechSynthesisVoice) => voice.lang === "en-US")[0];
        }

        utterance.voice = voice;
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
        return utterance;
    }
};

export const SpeechOutputBrowser = ({ answer }: Props) => {
<<<<<<< HEAD
=======
    const { t, i18n } = useTranslation();
    const currentLng = i18n.language;
    let lngCode = supportedLngs[currentLng]?.locale;
    if (!lngCode) {
        lngCode = "en-US";
    }
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const startOrStopSpeech = (answer: string) => {
        if (synth != null) {
            if (isPlaying) {
                synth.cancel(); // removes all utterances from the utterance queue.
                setIsPlaying(false);
                return;
            }
<<<<<<< HEAD
            const utterance: SpeechSynthesisUtterance | undefined = getUtterance(answer);
=======
            const utterance: SpeechSynthesisUtterance | undefined = getUtterance(answer, lngCode);
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

            if (!utterance) {
                return;
            }

            synth.speak(utterance);

            utterance.onstart = () => {
                setIsPlaying(true);
                return;
            };

            utterance.onend = () => {
                setIsPlaying(false);
                return;
            };
        }
    };
    const color = isPlaying ? "red" : "black";

    return (
        <IconButton
            style={{ color: color }}
            iconProps={{ iconName: "Volume3" }}
<<<<<<< HEAD
            title="Speak answer"
            ariaLabel="Speak answer"
=======
            title={t("tooltips.speakAnswer")}
            ariaLabel={t("tooltips.speakAnswer")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            onClick={() => startOrStopSpeech(answer)}
            disabled={!synth}
        />
    );
};
