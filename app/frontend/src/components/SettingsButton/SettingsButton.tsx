import { Settings24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

import styles from "./SettingsButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
}

export const SettingsButton = ({ className, onClick }: Props) => {
<<<<<<< HEAD
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Settings24Regular />} onClick={onClick}>
                {"Developer settings"}
=======
    const { t } = useTranslation();
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Settings24Regular />} onClick={onClick}>
                {t("developerSettings")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            </Button>
        </div>
    );
};
