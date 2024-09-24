import { useRef, useState, useEffect, useContext } from "react";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
import { Checkbox, Panel, DefaultButton, TextField, ITextFieldProps, ICheckboxProps } from "@fluentui/react";
import { SparkleFilled } from "@fluentui/react-icons";
import { useId } from "@fluentui/react-hooks";
import readNDJSONStream from "ndjson-readablestream";

import styles from "./Chat.module.css";

import {
    chatApi,
    configApi,
<<<<<<< HEAD
    getSpeechApi,
=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    RetrievalMode,
    ChatAppResponse,
    ChatAppResponseOrError,
    ChatAppRequest,
    ResponseMessage,
    VectorFieldOptions,
<<<<<<< HEAD
    GPT4VInput
=======
    GPT4VInput,
    SpeechConfig
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
} from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import { HelpCallout } from "../../components/HelpCallout";
import { AnalysisPanel, AnalysisPanelTabs } from "../../components/AnalysisPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { ClearChatButton } from "../../components/ClearChatButton";
import { UploadFile } from "../../components/UploadFile";
import { useLogin, getToken, requireAccessControl } from "../../authConfig";
import { VectorSettings } from "../../components/VectorSettings";
import { useMsal } from "@azure/msal-react";
import { TokenClaimsDisplay } from "../../components/TokenClaimsDisplay";
import { GPT4VSettings } from "../../components/GPT4VSettings";
<<<<<<< HEAD
import { toolTipText } from "../../i18n/tooltips.js";
import { LoginContext } from "../../loginContext";
=======
import { LoginContext } from "../../loginContext";
import { LanguagePicker } from "../../i18n/LanguagePicker";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

const Chat = () => {
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [promptTemplate, setPromptTemplate] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(0.3);
    const [seed, setSeed] = useState<number | null>(null);
    const [minimumRerankerScore, setMinimumRerankerScore] = useState<number>(0);
    const [minimumSearchScore, setMinimumSearchScore] = useState<number>(0);
    const [retrieveCount, setRetrieveCount] = useState<number>(3);
    const [retrievalMode, setRetrievalMode] = useState<RetrievalMode>(RetrievalMode.Hybrid);
    const [useSemanticRanker, setUseSemanticRanker] = useState<boolean>(true);
    const [shouldStream, setShouldStream] = useState<boolean>(true);
    const [useSemanticCaptions, setUseSemanticCaptions] = useState<boolean>(false);
    const [excludeCategory, setExcludeCategory] = useState<string>("");
    const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] = useState<boolean>(false);
    const [vectorFieldList, setVectorFieldList] = useState<VectorFieldOptions[]>([VectorFieldOptions.Embedding]);
    const [useOidSecurityFilter, setUseOidSecurityFilter] = useState<boolean>(false);
    const [useGroupsSecurityFilter, setUseGroupsSecurityFilter] = useState<boolean>(false);
    const [gpt4vInput, setGPT4VInput] = useState<GPT4VInput>(GPT4VInput.TextAndImages);
    const [useGPT4V, setUseGPT4V] = useState<boolean>(false);

    const lastQuestionRef = useRef<string>("");
    const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const [activeCitation, setActiveCitation] = useState<string>();
    const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);

    const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
    const [answers, setAnswers] = useState<[user: string, response: ChatAppResponse][]>([]);
    const [streamedAnswers, setStreamedAnswers] = useState<[user: string, response: ChatAppResponse][]>([]);
    const [speechUrls, setSpeechUrls] = useState<(string | null)[]>([]);

    const [showGPT4VOptions, setShowGPT4VOptions] = useState<boolean>(false);
    const [showSemanticRankerOption, setShowSemanticRankerOption] = useState<boolean>(false);
    const [showVectorOption, setShowVectorOption] = useState<boolean>(false);
    const [showUserUpload, setShowUserUpload] = useState<boolean>(false);
<<<<<<< HEAD
    const [showSpeechInput, setShowSpeechInput] = useState<boolean>(false);
    const [showSpeechOutputBrowser, setShowSpeechOutputBrowser] = useState<boolean>(false);
    const [showSpeechOutputAzure, setShowSpeechOutputAzure] = useState<boolean>(false);
=======
    const [showLanguagePicker, setshowLanguagePicker] = useState<boolean>(false);
    const [showSpeechInput, setShowSpeechInput] = useState<boolean>(false);
    const [showSpeechOutputBrowser, setShowSpeechOutputBrowser] = useState<boolean>(false);
    const [showSpeechOutputAzure, setShowSpeechOutputAzure] = useState<boolean>(false);
    const audio = useRef(new Audio()).current;
    const [isPlaying, setIsPlaying] = useState(false);

    const speechConfig: SpeechConfig = {
        speechUrls,
        setSpeechUrls,
        audio,
        isPlaying,
        setIsPlaying
    };
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

    const getConfig = async () => {
        configApi().then(config => {
            setShowGPT4VOptions(config.showGPT4VOptions);
            setUseSemanticRanker(config.showSemanticRankerOption);
            setShowSemanticRankerOption(config.showSemanticRankerOption);
            setShowVectorOption(config.showVectorOption);
            if (!config.showVectorOption) {
                setRetrievalMode(RetrievalMode.Text);
            }
            setShowUserUpload(config.showUserUpload);
<<<<<<< HEAD
=======
            setshowLanguagePicker(config.showLanguagePicker);
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            setShowSpeechInput(config.showSpeechInput);
            setShowSpeechOutputBrowser(config.showSpeechOutputBrowser);
            setShowSpeechOutputAzure(config.showSpeechOutputAzure);
        });
    };

    const handleAsyncRequest = async (question: string, answers: [string, ChatAppResponse][], responseBody: ReadableStream<any>) => {
        let answer: string = "";
        let askResponse: ChatAppResponse = {} as ChatAppResponse;

        const updateState = (newContent: string) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    answer += newContent;
                    const latestResponse: ChatAppResponse = {
                        ...askResponse,
                        message: { content: answer, role: askResponse.message.role }
                    };
                    setStreamedAnswers([...answers, [question, latestResponse]]);
                    resolve(null);
                }, 33);
            });
        };
        try {
            setIsStreaming(true);
            for await (const event of readNDJSONStream(responseBody)) {
                if (event["context"] && event["context"]["data_points"]) {
                    event["message"] = event["delta"];
                    askResponse = event as ChatAppResponse;
                } else if (event["delta"]["content"]) {
                    setIsLoading(false);
                    await updateState(event["delta"]["content"]);
                } else if (event["context"]) {
                    // Update context with new keys from latest event
                    askResponse.context = { ...askResponse.context, ...event["context"] };
                } else if (event["error"]) {
                    throw Error(event["error"]);
                }
            }
        } finally {
            setIsStreaming(false);
        }
        const fullResponse: ChatAppResponse = {
            ...askResponse,
            message: { content: answer, role: askResponse.message.role }
        };
        return fullResponse;
    };

    const client = useLogin ? useMsal().instance : undefined;
    const { loggedIn } = useContext(LoginContext);

    const makeApiRequest = async (question: string) => {
        lastQuestionRef.current = question;

        error && setError(undefined);
        setIsLoading(true);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);

        const token = client ? await getToken(client) : undefined;

        try {
            const messages: ResponseMessage[] = answers.flatMap(a => [
                { content: a[0], role: "user" },
                { content: a[1].message.content, role: "assistant" }
            ]);

            const request: ChatAppRequest = {
                messages: [...messages, { content: question, role: "user" }],
                context: {
                    overrides: {
                        prompt_template: promptTemplate.length === 0 ? undefined : promptTemplate,
                        exclude_category: excludeCategory.length === 0 ? undefined : excludeCategory,
                        top: retrieveCount,
                        temperature: temperature,
                        minimum_reranker_score: minimumRerankerScore,
                        minimum_search_score: minimumSearchScore,
                        retrieval_mode: retrievalMode,
                        semantic_ranker: useSemanticRanker,
                        semantic_captions: useSemanticCaptions,
                        suggest_followup_questions: useSuggestFollowupQuestions,
                        use_oid_security_filter: useOidSecurityFilter,
                        use_groups_security_filter: useGroupsSecurityFilter,
                        vector_fields: vectorFieldList,
                        use_gpt4v: useGPT4V,
                        gpt4v_input: gpt4vInput,
<<<<<<< HEAD
=======
                        language: i18n.language,
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        ...(seed !== null ? { seed: seed } : {})
                    }
                },
                // AI Chat Protocol: Client must pass on any session state received from the server
                session_state: answers.length ? answers[answers.length - 1][1].session_state : null
            };

            const response = await chatApi(request, shouldStream, token);
            if (!response.body) {
                throw Error("No response body");
            }
<<<<<<< HEAD
=======
            if (response.status > 299 || !response.ok) {
                throw Error(`Request failed with status ${response.status}`);
            }
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            if (shouldStream) {
                const parsedResponse: ChatAppResponse = await handleAsyncRequest(question, answers, response.body);
                setAnswers([...answers, [question, parsedResponse]]);
            } else {
                const parsedResponse: ChatAppResponseOrError = await response.json();
<<<<<<< HEAD
                if (response.status > 299 || !response.ok) {
                    throw Error(parsedResponse.error || "Unknown error");
                }
                setAnswers([...answers, [question, parsedResponse as ChatAppResponse]]);
            }
=======
                if (parsedResponse.error) {
                    throw Error(parsedResponse.error);
                }
                setAnswers([...answers, [question, parsedResponse as ChatAppResponse]]);
            }
            setSpeechUrls([...speechUrls, null]);
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        lastQuestionRef.current = "";
        error && setError(undefined);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);
        setAnswers([]);
<<<<<<< HEAD
=======
        setSpeechUrls([]);
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
        setStreamedAnswers([]);
        setIsLoading(false);
        setIsStreaming(false);
    };

    useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }), [isLoading]);
    useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "auto" }), [streamedAnswers]);
    useEffect(() => {
        getConfig();
    }, []);

<<<<<<< HEAD
    useEffect(() => {
        if (answers && showSpeechOutputAzure) {
            // For each answer that is missing a speech URL, fetch the speech URL
            for (let i = 0; i < answers.length; i++) {
                if (!speechUrls[i]) {
                    getSpeechApi(answers[i][1].message.content).then(speechUrl => {
                        setSpeechUrls([...speechUrls.slice(0, i), speechUrl, ...speechUrls.slice(i + 1)]);
                    });
                }
            }
        }
    }, [answers]);

=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    const onPromptTemplateChange = (_ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setPromptTemplate(newValue || "");
    };

    const onTemperatureChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setTemperature(parseFloat(newValue || "0"));
    };

    const onSeedChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setSeed(parseInt(newValue || ""));
    };

    const onMinimumSearchScoreChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setMinimumSearchScore(parseFloat(newValue || "0"));
    };

    const onMinimumRerankerScoreChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setMinimumRerankerScore(parseFloat(newValue || "0"));
    };

    const onRetrieveCountChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setRetrieveCount(parseInt(newValue || "3"));
    };

    const onUseSemanticRankerChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticRanker(!!checked);
    };

    const onUseSemanticCaptionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticCaptions(!!checked);
    };

    const onShouldStreamChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setShouldStream(!!checked);
    };

    const onExcludeCategoryChanged = (_ev?: React.FormEvent, newValue?: string) => {
        setExcludeCategory(newValue || "");
    };

    const onUseSuggestFollowupQuestionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSuggestFollowupQuestions(!!checked);
    };

    const onUseOidSecurityFilterChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseOidSecurityFilter(!!checked);
    };

    const onUseGroupsSecurityFilterChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseGroupsSecurityFilter(!!checked);
    };

    const onExampleClicked = (example: string) => {
        makeApiRequest(example);
    };

    const onShowCitation = (citation: string, index: number) => {
        if (activeCitation === citation && activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveCitation(citation);
            setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
        }

        setSelectedAnswer(index);
    };

    const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
        if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveAnalysisPanelTab(tab);
        }

        setSelectedAnswer(index);
    };

    // IDs for form labels and their associated callouts
    const promptTemplateId = useId("promptTemplate");
    const promptTemplateFieldId = useId("promptTemplateField");
    const temperatureId = useId("temperature");
    const temperatureFieldId = useId("temperatureField");
    const seedId = useId("seed");
    const seedFieldId = useId("seedField");
    const searchScoreId = useId("searchScore");
    const searchScoreFieldId = useId("searchScoreField");
    const rerankerScoreId = useId("rerankerScore");
    const rerankerScoreFieldId = useId("rerankerScoreField");
    const retrieveCountId = useId("retrieveCount");
    const retrieveCountFieldId = useId("retrieveCountField");
    const excludeCategoryId = useId("excludeCategory");
    const excludeCategoryFieldId = useId("excludeCategoryField");
    const semanticRankerId = useId("semanticRanker");
    const semanticRankerFieldId = useId("semanticRankerField");
    const semanticCaptionsId = useId("semanticCaptions");
    const semanticCaptionsFieldId = useId("semanticCaptionsField");
    const suggestFollowupQuestionsId = useId("suggestFollowupQuestions");
    const suggestFollowupQuestionsFieldId = useId("suggestFollowupQuestionsField");
    const useOidSecurityFilterId = useId("useOidSecurityFilter");
    const useOidSecurityFilterFieldId = useId("useOidSecurityFilterField");
    const useGroupsSecurityFilterId = useId("useGroupsSecurityFilter");
    const useGroupsSecurityFilterFieldId = useId("useGroupsSecurityFilterField");
    const shouldStreamId = useId("shouldStream");
    const shouldStreamFieldId = useId("shouldStreamField");
<<<<<<< HEAD

    return (
        <div className={styles.container}>
=======
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.container}>
            {/* Setting the page title using react-helmet-async */}
            <Helmet>
                <title>{t("pageTitle")}</title>
            </Helmet>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            <div className={styles.commandsContainer}>
                <ClearChatButton className={styles.commandButton} onClick={clearChat} disabled={!lastQuestionRef.current || isLoading} />
                {showUserUpload && <UploadFile className={styles.commandButton} disabled={!loggedIn} />}
                <SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />
            </div>
            <div className={styles.chatRoot}>
                <div className={styles.chatContainer}>
                    {!lastQuestionRef.current ? (
                        <div className={styles.chatEmptyState}>
                            <SparkleFilled fontSize={"120px"} primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Chat logo" />
<<<<<<< HEAD
                            <h1 className={styles.chatEmptyStateTitle}>Chat with your data</h1>
                            <h2 className={styles.chatEmptyStateSubtitle}>Ask anything or try an example</h2>
=======
                            <h1 className={styles.chatEmptyStateTitle}>{t("chatEmptyStateTitle")}</h1>
                            <h2 className={styles.chatEmptyStateSubtitle}>{t("chatEmptyStateSubtitle")}</h2>
                            {showLanguagePicker && <LanguagePicker onLanguageChange={newLang => i18n.changeLanguage(newLang)} />}

>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                            <ExampleList onExampleClicked={onExampleClicked} useGPT4V={useGPT4V} />
                        </div>
                    ) : (
                        <div className={styles.chatMessageStream}>
                            {isStreaming &&
                                streamedAnswers.map((streamedAnswer, index) => (
                                    <div key={index}>
                                        <UserChatMessage message={streamedAnswer[0]} />
                                        <div className={styles.chatMessageGpt}>
                                            <Answer
                                                isStreaming={true}
                                                key={index}
                                                answer={streamedAnswer[1]}
<<<<<<< HEAD
=======
                                                index={index}
                                                speechConfig={speechConfig}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                                isSelected={false}
                                                onCitationClicked={c => onShowCitation(c, index)}
                                                onThoughtProcessClicked={() => onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)}
                                                onSupportingContentClicked={() => onToggleTab(AnalysisPanelTabs.SupportingContentTab, index)}
                                                onFollowupQuestionClicked={q => makeApiRequest(q)}
                                                showFollowupQuestions={useSuggestFollowupQuestions && answers.length - 1 === index}
                                                showSpeechOutputAzure={showSpeechOutputAzure}
                                                showSpeechOutputBrowser={showSpeechOutputBrowser}
<<<<<<< HEAD
                                                speechUrl={speechUrls[index]}
=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                            />
                                        </div>
                                    </div>
                                ))}
                            {!isStreaming &&
                                answers.map((answer, index) => (
                                    <div key={index}>
                                        <UserChatMessage message={answer[0]} />
                                        <div className={styles.chatMessageGpt}>
                                            <Answer
                                                isStreaming={false}
                                                key={index}
                                                answer={answer[1]}
<<<<<<< HEAD
=======
                                                index={index}
                                                speechConfig={speechConfig}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                                isSelected={selectedAnswer === index && activeAnalysisPanelTab !== undefined}
                                                onCitationClicked={c => onShowCitation(c, index)}
                                                onThoughtProcessClicked={() => onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)}
                                                onSupportingContentClicked={() => onToggleTab(AnalysisPanelTabs.SupportingContentTab, index)}
                                                onFollowupQuestionClicked={q => makeApiRequest(q)}
                                                showFollowupQuestions={useSuggestFollowupQuestions && answers.length - 1 === index}
                                                showSpeechOutputAzure={showSpeechOutputAzure}
                                                showSpeechOutputBrowser={showSpeechOutputBrowser}
<<<<<<< HEAD
                                                speechUrl={speechUrls[index]}
=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                            />
                                        </div>
                                    </div>
                                ))}
                            {isLoading && (
                                <>
                                    <UserChatMessage message={lastQuestionRef.current} />
                                    <div className={styles.chatMessageGptMinWidth}>
                                        <AnswerLoading />
                                    </div>
                                </>
                            )}
                            {error ? (
                                <>
                                    <UserChatMessage message={lastQuestionRef.current} />
                                    <div className={styles.chatMessageGptMinWidth}>
                                        <AnswerError error={error.toString()} onRetry={() => makeApiRequest(lastQuestionRef.current)} />
                                    </div>
                                </>
                            ) : null}
                            <div ref={chatMessageStreamEnd} />
                        </div>
                    )}

                    <div className={styles.chatInput}>
                        <QuestionInput
                            clearOnSend
<<<<<<< HEAD
                            placeholder="Type a new question (e.g. does my plan cover annual eye exams?)"
=======
                            placeholder={t("defaultExamples.placeholder")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                            disabled={isLoading}
                            onSend={question => makeApiRequest(question)}
                            showSpeechInput={showSpeechInput}
                        />
                    </div>
                </div>

                {answers.length > 0 && activeAnalysisPanelTab && (
                    <AnalysisPanel
                        className={styles.chatAnalysisPanel}
                        activeCitation={activeCitation}
                        onActiveTabChanged={x => onToggleTab(x, selectedAnswer)}
                        citationHeight="810px"
                        answer={answers[selectedAnswer][1]}
                        activeTab={activeAnalysisPanelTab}
                    />
                )}

                <Panel
<<<<<<< HEAD
                    headerText="Configure answer generation"
                    isOpen={isConfigPanelOpen}
                    isBlocking={false}
                    onDismiss={() => setIsConfigPanelOpen(false)}
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={() => <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>Close</DefaultButton>}
=======
                    headerText={t("labels.headerText")}
                    isOpen={isConfigPanelOpen}
                    isBlocking={false}
                    onDismiss={() => setIsConfigPanelOpen(false)}
                    closeButtonAriaLabel={t("labels.closeButton")}
                    onRenderFooterContent={() => <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>{t("labels.closeButton")}</DefaultButton>}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    isFooterAtBottom={true}
                >
                    <TextField
                        id={promptTemplateFieldId}
                        className={styles.chatSettingsSeparator}
                        defaultValue={promptTemplate}
<<<<<<< HEAD
                        label="Override prompt template"
=======
                        label={t("labels.promptTemplate")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        multiline
                        autoAdjustHeight
                        onChange={onPromptTemplateChange}
                        aria-labelledby={promptTemplateId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
                            <HelpCallout
                                labelId={promptTemplateId}
                                fieldId={promptTemplateFieldId}
<<<<<<< HEAD
                                helpText={toolTipText.promptTemplate}
=======
                                helpText={t("helpTexts.promptTemplate")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                label={props?.label}
                            />
                        )}
                    />

                    <TextField
                        id={temperatureFieldId}
                        className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                        label="Temperature"
=======
                        label={t("labels.temperature")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        type="number"
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={temperature.toString()}
                        onChange={onTemperatureChange}
                        aria-labelledby={temperatureId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
<<<<<<< HEAD
                            <HelpCallout labelId={temperatureId} fieldId={temperatureFieldId} helpText={toolTipText.temperature} label={props?.label} />
=======
                            <HelpCallout labelId={temperatureId} fieldId={temperatureFieldId} helpText={t("helpTexts.temperature")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        )}
                    />

                    <TextField
                        id={seedFieldId}
                        className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                        label="Seed"
=======
                        label={t("labels.seed")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        type="text"
                        defaultValue={seed?.toString() || ""}
                        onChange={onSeedChange}
                        aria-labelledby={seedId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
<<<<<<< HEAD
                            <HelpCallout labelId={seedId} fieldId={seedFieldId} helpText={toolTipText.seed} label={props?.label} />
=======
                            <HelpCallout labelId={seedId} fieldId={seedFieldId} helpText={t("helpTexts.seed")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        )}
                    />

                    <TextField
                        id={searchScoreFieldId}
                        className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                        label="Minimum search score"
=======
                        label={t("labels.minimumSearchScore")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        type="number"
                        min={0}
                        step={0.01}
                        defaultValue={minimumSearchScore.toString()}
                        onChange={onMinimumSearchScoreChange}
                        aria-labelledby={searchScoreId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
<<<<<<< HEAD
                            <HelpCallout labelId={searchScoreId} fieldId={searchScoreFieldId} helpText={toolTipText.searchScore} label={props?.label} />
=======
                            <HelpCallout labelId={searchScoreId} fieldId={searchScoreFieldId} helpText={t("helpTexts.searchScore")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        )}
                    />

                    {showSemanticRankerOption && (
                        <TextField
                            id={rerankerScoreFieldId}
                            className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                            label="Minimum reranker score"
=======
                            label={t("labels.minimumRerankerScore")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                            type="number"
                            min={1}
                            max={4}
                            step={0.1}
                            defaultValue={minimumRerankerScore.toString()}
                            onChange={onMinimumRerankerScoreChange}
                            aria-labelledby={rerankerScoreId}
                            onRenderLabel={(props: ITextFieldProps | undefined) => (
                                <HelpCallout
                                    labelId={rerankerScoreId}
                                    fieldId={rerankerScoreFieldId}
<<<<<<< HEAD
                                    helpText={toolTipText.rerankerScore}
=======
                                    helpText={t("helpTexts.rerankerScore")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                    label={props?.label}
                                />
                            )}
                        />
                    )}

                    <TextField
                        id={retrieveCountFieldId}
                        className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                        label="Retrieve this many search results:"
=======
                        label={t("labels.retrieveCount")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        type="number"
                        min={1}
                        max={50}
                        defaultValue={retrieveCount.toString()}
                        onChange={onRetrieveCountChange}
                        aria-labelledby={retrieveCountId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
<<<<<<< HEAD
                            <HelpCallout labelId={retrieveCountId} fieldId={retrieveCountFieldId} helpText={toolTipText.retrieveNumber} label={props?.label} />
=======
                            <HelpCallout
                                labelId={retrieveCountId}
                                fieldId={retrieveCountFieldId}
                                helpText={t("helpTexts.retrieveNumber")}
                                label={props?.label}
                            />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        )}
                    />

                    <TextField
                        id={excludeCategoryFieldId}
                        className={styles.chatSettingsSeparator}
<<<<<<< HEAD
                        label="Exclude category"
=======
                        label={t("labels.excludeCategory")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        defaultValue={excludeCategory}
                        onChange={onExcludeCategoryChanged}
                        aria-labelledby={excludeCategoryId}
                        onRenderLabel={(props: ITextFieldProps | undefined) => (
                            <HelpCallout
                                labelId={excludeCategoryId}
                                fieldId={excludeCategoryFieldId}
<<<<<<< HEAD
                                helpText={toolTipText.excludeCategory}
=======
                                helpText={t("helpTexts.excludeCategory")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                label={props?.label}
                            />
                        )}
                    />

                    {showSemanticRankerOption && (
                        <>
                            <Checkbox
                                id={semanticRankerFieldId}
                                className={styles.chatSettingsSeparator}
                                checked={useSemanticRanker}
<<<<<<< HEAD
                                label="Use semantic ranker for retrieval"
=======
                                label={t("labels.useSemanticRanker")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                onChange={onUseSemanticRankerChange}
                                aria-labelledby={semanticRankerId}
                                onRenderLabel={(props: ICheckboxProps | undefined) => (
                                    <HelpCallout
                                        labelId={semanticRankerId}
                                        fieldId={semanticRankerFieldId}
<<<<<<< HEAD
                                        helpText={toolTipText.useSemanticReranker}
=======
                                        helpText={t("helpTexts.useSemanticReranker")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                        label={props?.label}
                                    />
                                )}
                            />

                            <Checkbox
                                id={semanticCaptionsFieldId}
                                className={styles.chatSettingsSeparator}
                                checked={useSemanticCaptions}
<<<<<<< HEAD
                                label="Use semantic captions"
=======
                                label={t("labels.useSemanticCaptions")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                onChange={onUseSemanticCaptionsChange}
                                disabled={!useSemanticRanker}
                                aria-labelledby={semanticCaptionsId}
                                onRenderLabel={(props: ICheckboxProps | undefined) => (
                                    <HelpCallout
                                        labelId={semanticCaptionsId}
                                        fieldId={semanticCaptionsFieldId}
<<<<<<< HEAD
                                        helpText={toolTipText.useSemanticCaptions}
=======
                                        helpText={t("helpTexts.useSemanticCaptions")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                        label={props?.label}
                                    />
                                )}
                            />
                        </>
                    )}

                    <Checkbox
                        id={suggestFollowupQuestionsFieldId}
                        className={styles.chatSettingsSeparator}
                        checked={useSuggestFollowupQuestions}
<<<<<<< HEAD
                        label="Suggest follow-up questions"
=======
                        label={t("labels.useSuggestFollowupQuestions")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        onChange={onUseSuggestFollowupQuestionsChange}
                        aria-labelledby={suggestFollowupQuestionsId}
                        onRenderLabel={(props: ICheckboxProps | undefined) => (
                            <HelpCallout
                                labelId={suggestFollowupQuestionsId}
                                fieldId={suggestFollowupQuestionsFieldId}
<<<<<<< HEAD
                                helpText={toolTipText.suggestFollowupQuestions}
=======
                                helpText={t("helpTexts.suggestFollowupQuestions")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                label={props?.label}
                            />
                        )}
                    />

                    {showGPT4VOptions && (
                        <GPT4VSettings
                            gpt4vInputs={gpt4vInput}
                            isUseGPT4V={useGPT4V}
                            updateUseGPT4V={useGPT4V => {
                                setUseGPT4V(useGPT4V);
                            }}
                            updateGPT4VInputs={inputs => setGPT4VInput(inputs)}
                        />
                    )}

                    {showVectorOption && (
                        <VectorSettings
                            defaultRetrievalMode={retrievalMode}
                            showImageOptions={useGPT4V && showGPT4VOptions}
                            updateVectorFields={(options: VectorFieldOptions[]) => setVectorFieldList(options)}
                            updateRetrievalMode={(retrievalMode: RetrievalMode) => setRetrievalMode(retrievalMode)}
                        />
                    )}

                    {useLogin && (
                        <>
                            <Checkbox
                                id={useOidSecurityFilterFieldId}
                                className={styles.chatSettingsSeparator}
                                checked={useOidSecurityFilter || requireAccessControl}
<<<<<<< HEAD
                                label="Use oid security filter"
=======
                                label={t("labels.useOidSecurityFilter")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                disabled={!loggedIn || requireAccessControl}
                                onChange={onUseOidSecurityFilterChange}
                                aria-labelledby={useOidSecurityFilterId}
                                onRenderLabel={(props: ICheckboxProps | undefined) => (
                                    <HelpCallout
                                        labelId={useOidSecurityFilterId}
                                        fieldId={useOidSecurityFilterFieldId}
<<<<<<< HEAD
                                        helpText={toolTipText.useOidSecurityFilter}
=======
                                        helpText={t("helpTexts.useOidSecurityFilter")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                        label={props?.label}
                                    />
                                )}
                            />
                            <Checkbox
                                id={useGroupsSecurityFilterFieldId}
                                className={styles.chatSettingsSeparator}
                                checked={useGroupsSecurityFilter || requireAccessControl}
<<<<<<< HEAD
                                label="Use groups security filter"
=======
                                label={t("labels.useGroupsSecurityFilter")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                disabled={!loggedIn || requireAccessControl}
                                onChange={onUseGroupsSecurityFilterChange}
                                aria-labelledby={useGroupsSecurityFilterId}
                                onRenderLabel={(props: ICheckboxProps | undefined) => (
                                    <HelpCallout
                                        labelId={useGroupsSecurityFilterId}
                                        fieldId={useGroupsSecurityFilterFieldId}
<<<<<<< HEAD
                                        helpText={toolTipText.useGroupsSecurityFilter}
=======
                                        helpText={t("helpTexts.useGroupsSecurityFilter")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                        label={props?.label}
                                    />
                                )}
                            />
                        </>
                    )}

                    <Checkbox
                        id={shouldStreamFieldId}
                        className={styles.chatSettingsSeparator}
                        checked={shouldStream}
<<<<<<< HEAD
                        label="Stream chat completion responses"
                        onChange={onShouldStreamChange}
                        aria-labelledby={shouldStreamId}
                        onRenderLabel={(props: ICheckboxProps | undefined) => (
                            <HelpCallout labelId={shouldStreamId} fieldId={shouldStreamFieldId} helpText={toolTipText.streamChat} label={props?.label} />
=======
                        label={t("labels.shouldStream")}
                        onChange={onShouldStreamChange}
                        aria-labelledby={shouldStreamId}
                        onRenderLabel={(props: ICheckboxProps | undefined) => (
                            <HelpCallout labelId={shouldStreamId} fieldId={shouldStreamFieldId} helpText={t("helpTexts.streamChat")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                        )}
                    />

                    {useLogin && <TokenClaimsDisplay />}
                </Panel>
            </div>
        </div>
    );
};

export default Chat;
