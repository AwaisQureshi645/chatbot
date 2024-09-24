import { useEffect, useState } from "react";
import { Stack, IDropdownOption, Dropdown, IDropdownProps } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

import styles from "./VectorSettings.module.css";
import { HelpCallout } from "../../components/HelpCallout";
import { RetrievalMode, VectorFieldOptions } from "../../api";
<<<<<<< HEAD
import { toolTipText } from "../../i18n/tooltips.js";
=======
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

interface Props {
    showImageOptions?: boolean;
    defaultRetrievalMode: RetrievalMode;
    updateRetrievalMode: (retrievalMode: RetrievalMode) => void;
    updateVectorFields: (options: VectorFieldOptions[]) => void;
}

export const VectorSettings = ({ updateRetrievalMode, updateVectorFields, showImageOptions, defaultRetrievalMode }: Props) => {
    const [retrievalMode, setRetrievalMode] = useState<RetrievalMode>(RetrievalMode.Hybrid);
    const [vectorFieldOption, setVectorFieldOption] = useState<VectorFieldOptions>(VectorFieldOptions.Both);

    const onRetrievalModeChange = (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<RetrievalMode> | undefined) => {
        setRetrievalMode(option?.data || RetrievalMode.Hybrid);
        updateRetrievalMode(option?.data || RetrievalMode.Hybrid);
    };

    const onVectorFieldsChange = (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<RetrievalMode> | undefined) => {
        setVectorFieldOption(option?.key as VectorFieldOptions);
        updateVectorFields([option?.key as VectorFieldOptions]);
    };

    useEffect(() => {
        showImageOptions
            ? updateVectorFields([VectorFieldOptions.Embedding, VectorFieldOptions.ImageEmbedding])
            : updateVectorFields([VectorFieldOptions.Embedding]);
    }, [showImageOptions]);

    const retrievalModeId = useId("retrievalMode");
    const retrievalModeFieldId = useId("retrievalModeField");
    const vectorFieldsId = useId("vectorFields");
    const vectorFieldsFieldId = useId("vectorFieldsField");
<<<<<<< HEAD
=======
    const { t } = useTranslation();
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

    return (
        <Stack className={styles.container} tokens={{ childrenGap: 10 }}>
            <Dropdown
                id={retrievalModeFieldId}
<<<<<<< HEAD
                label="Retrieval mode"
                selectedKey={defaultRetrievalMode.toString()}
                options={[
                    { key: "hybrid", text: "Vectors + Text (Hybrid)", selected: retrievalMode == RetrievalMode.Hybrid, data: RetrievalMode.Hybrid },
                    { key: "vectors", text: "Vectors", selected: retrievalMode == RetrievalMode.Vectors, data: RetrievalMode.Vectors },
                    { key: "text", text: "Text", selected: retrievalMode == RetrievalMode.Text, data: RetrievalMode.Text }
=======
                label={t("labels.retrievalMode.label")}
                selectedKey={defaultRetrievalMode.toString()}
                options={[
                    {
                        key: "hybrid",
                        text: t("labels.retrievalMode.options.hybrid"),
                        selected: retrievalMode == RetrievalMode.Hybrid,
                        data: RetrievalMode.Hybrid
                    },
                    {
                        key: "vectors",
                        text: t("labels.retrievalMode.options.vectors"),
                        selected: retrievalMode == RetrievalMode.Vectors,
                        data: RetrievalMode.Vectors
                    },
                    { key: "text", text: t("labels.retrievalMode.options.texts"), selected: retrievalMode == RetrievalMode.Text, data: RetrievalMode.Text }
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                ]}
                required
                onChange={onRetrievalModeChange}
                aria-labelledby={retrievalModeId}
                onRenderLabel={(props: IDropdownProps | undefined) => (
<<<<<<< HEAD
                    <HelpCallout labelId={retrievalModeId} fieldId={retrievalModeFieldId} helpText={toolTipText.retrievalMode} label={props?.label} />
=======
                    <HelpCallout labelId={retrievalModeId} fieldId={retrievalModeFieldId} helpText={t("helpTexts.retrievalMode")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                )}
            />

            {showImageOptions && [RetrievalMode.Vectors, RetrievalMode.Hybrid].includes(retrievalMode) && (
                <Dropdown
                    id={vectorFieldsFieldId}
<<<<<<< HEAD
                    label="Vector fields (Multi-query vector search)"
                    options={[
                        { key: VectorFieldOptions.Embedding, text: "Text Embeddings", selected: vectorFieldOption === VectorFieldOptions.Embedding },
                        { key: VectorFieldOptions.ImageEmbedding, text: "Image Embeddings", selected: vectorFieldOption === VectorFieldOptions.ImageEmbedding },
                        { key: VectorFieldOptions.Both, text: "Text and Image embeddings", selected: vectorFieldOption === VectorFieldOptions.Both }
=======
                    label={t("labels.vector.label")}
                    options={[
                        {
                            key: VectorFieldOptions.Embedding,
                            text: t("labels.vector.options.embedding"),
                            selected: vectorFieldOption === VectorFieldOptions.Embedding
                        },
                        {
                            key: VectorFieldOptions.ImageEmbedding,
                            text: t("labels.vector.options.imageEmbedding"),
                            selected: vectorFieldOption === VectorFieldOptions.ImageEmbedding
                        },
                        { key: VectorFieldOptions.Both, text: t("labels.vector.options.both"), selected: vectorFieldOption === VectorFieldOptions.Both }
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    ]}
                    onChange={onVectorFieldsChange}
                    aria-labelledby={vectorFieldsId}
                    onRenderLabel={(props: IDropdownProps | undefined) => (
<<<<<<< HEAD
                        <HelpCallout labelId={vectorFieldsId} fieldId={vectorFieldsFieldId} helpText={toolTipText.vectorFields} label={props?.label} />
=======
                        <HelpCallout labelId={vectorFieldsId} fieldId={vectorFieldsFieldId} helpText={t("helpTexts.vectorFields")} label={props?.label} />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    )}
                />
            )}
        </Stack>
    );
};
