import { Delete24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

import styles from "./ClearChatButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
<<<<<<< HEAD
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Delete24Regular />} disabled={disabled} onClick={onClick}>
                {"Clear chat"}
=======
    const { t, i18n } = useTranslation();
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Delete24Regular />} disabled={disabled} onClick={onClick}>
                {t("clearChat")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            </Button>
        </div>
    );
};
