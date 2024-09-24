import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
<<<<<<< HEAD
import DOMPurify from "dompurify";

import styles from "./Answer.module.css";
import { ChatAppResponse, getCitationFilePath } from "../../api";
=======
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import styles from "./Answer.module.css";
import { ChatAppResponse, getCitationFilePath, SpeechConfig } from "../../api";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
import { parseAnswerToHtml } from "./AnswerParser";
import { AnswerIcon } from "./AnswerIcon";
import { SpeechOutputBrowser } from "./SpeechOutputBrowser";
import { SpeechOutputAzure } from "./SpeechOutputAzure";

interface Props {
    answer: ChatAppResponse;
<<<<<<< HEAD
=======
    index: number;
    speechConfig: SpeechConfig;
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    isSelected?: boolean;
    isStreaming: boolean;
    onCitationClicked: (filePath: string) => void;
    onThoughtProcessClicked: () => void;
    onSupportingContentClicked: () => void;
    onFollowupQuestionClicked?: (question: string) => void;
    showFollowupQuestions?: boolean;
    showSpeechOutputBrowser?: boolean;
    showSpeechOutputAzure?: boolean;
<<<<<<< HEAD
    speechUrl: string | null;
=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
}

export const Answer = ({
    answer,
<<<<<<< HEAD
=======
    index,
    speechConfig,
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    isSelected,
    isStreaming,
    onCitationClicked,
    onThoughtProcessClicked,
    onSupportingContentClicked,
    onFollowupQuestionClicked,
    showFollowupQuestions,
    showSpeechOutputAzure,
<<<<<<< HEAD
    showSpeechOutputBrowser,
    speechUrl
=======
    showSpeechOutputBrowser
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
}: Props) => {
    const followupQuestions = answer.context?.followup_questions;
    const messageContent = answer.message.content;
    const parsedAnswer = useMemo(() => parseAnswerToHtml(messageContent, isStreaming, onCitationClicked), [answer]);
<<<<<<< HEAD

=======
    const { t } = useTranslation();
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "Lightbulb" }}
<<<<<<< HEAD
                            title="Show thought process"
                            ariaLabel="Show thought process"
=======
                            title={t("tooltips.showThoughtProcess")}
                            ariaLabel={t("tooltips.showThoughtProcess")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                            onClick={() => onThoughtProcessClicked()}
                            disabled={!answer.context.thoughts?.length}
                        />
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "ClipboardList" }}
<<<<<<< HEAD
                            title="Show supporting content"
                            ariaLabel="Show supporting content"
                            onClick={() => onSupportingContentClicked()}
                            disabled={!answer.context.data_points}
                        />
                        {showSpeechOutputAzure && <SpeechOutputAzure url={speechUrl} />}
=======
                            title={t("tooltips.showSupportingContent")}
                            ariaLabel={t("tooltips.showSupportingContent")}
                            onClick={() => onSupportingContentClicked()}
                            disabled={!answer.context.data_points}
                        />
                        {showSpeechOutputAzure && (
                            <SpeechOutputAzure answer={sanitizedAnswerHtml} index={index} speechConfig={speechConfig} isStreaming={isStreaming} />
                        )}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        {showSpeechOutputBrowser && <SpeechOutputBrowser answer={sanitizedAnswerHtml} />}
                    </div>
                </Stack>
            </Stack.Item>

            <Stack.Item grow>
<<<<<<< HEAD
                <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
=======
                <div className={styles.answerText}>
                    <ReactMarkdown children={sanitizedAnswerHtml} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />
                </div>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            </Stack.Item>

            {!!parsedAnswer.citations.length && (
                <Stack.Item>
                    <Stack horizontal wrap tokens={{ childrenGap: 5 }}>
<<<<<<< HEAD
                        <span className={styles.citationLearnMore}>Citations:</span>
=======
                        <span className={styles.citationLearnMore}>{t("citationWithColon")}</span>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        {parsedAnswer.citations.map((x, i) => {
                            const path = getCitationFilePath(x);
                            return (
                                <a key={i} className={styles.citation} title={x} onClick={() => onCitationClicked(path)}>
                                    {`${++i}. ${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )}

            {!!followupQuestions?.length && showFollowupQuestions && onFollowupQuestionClicked && (
                <Stack.Item>
                    <Stack horizontal wrap className={`${!!parsedAnswer.citations.length ? styles.followupQuestionsList : ""}`} tokens={{ childrenGap: 6 }}>
<<<<<<< HEAD
                        <span className={styles.followupQuestionLearnMore}>Follow-up questions:</span>
=======
                        <span className={styles.followupQuestionLearnMore}>{t("followupQuestions")}</span>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        {followupQuestions.map((x, i) => {
                            return (
                                <a key={i} className={styles.followupQuestion} title={x} onClick={() => onFollowupQuestionClicked(x)}>
                                    {`${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )}
        </Stack>
    );
};
