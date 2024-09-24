import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

import styles from "./Answer.module.css";
import { AnswerIcon } from "./AnswerIcon";

export const AnswerLoading = () => {
<<<<<<< HEAD
=======
    const { t, i18n } = useTranslation();
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    const animatedStyles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <animated.div style={{ ...animatedStyles }}>
            <Stack className={styles.answerContainer} verticalAlign="space-between">
                <AnswerIcon />
                <Stack.Item grow>
                    <p className={styles.answerText}>

                        Generating answer

                        {t("generatingAnswer")}

                        <span className={styles.loadingdots} />
                    </p>
                </Stack.Item>
            </Stack>
        </animated.div>
    );
};
