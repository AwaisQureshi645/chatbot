import { ITextFieldProps, DefaultButton, IconButton, IButtonStyles, Callout, IStackTokens, Stack, IStackStyles, initializeIcons } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

const stackTokens: IStackTokens = {
    childrenGap: 4,
    maxWidth: 300
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 20 } };
const iconButtonStyles: Partial<IButtonStyles> = { root: { marginBottom: -3 } };
const iconProps = { iconName: "Info" };

interface IHelpCalloutProps {
    label: string | undefined;
    labelId: string;
    fieldId: string | undefined;
    helpText: string;
}

export const HelpCallout = (props: IHelpCalloutProps): JSX.Element => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const descriptionId: string = useId("description");
    const iconButtonId: string = useId("iconButton");
<<<<<<< HEAD
=======
    const { t } = useTranslation();
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0

    return (
        <>
            <Stack horizontal verticalAlign="center" tokens={stackTokens}>
                <label id={props.labelId} htmlFor={props.fieldId}>
                    {props.label}
                </label>
<<<<<<< HEAD
                <IconButton id={iconButtonId} iconProps={iconProps} title="Info" ariaLabel="Info" onClick={toggleIsCalloutVisible} styles={iconButtonStyles} />
=======
                <IconButton
                    id={iconButtonId}
                    iconProps={iconProps}
                    title={t("tooltips.info")}
                    ariaLabel={t("tooltips.info")}
                    onClick={toggleIsCalloutVisible}
                    styles={iconButtonStyles}
                />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
            </Stack>
            {isCalloutVisible && (
                <Callout target={"#" + iconButtonId} setInitialFocus onDismiss={toggleIsCalloutVisible} ariaDescribedBy={descriptionId} role="alertdialog">
                    <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
                        <span id={descriptionId}>{props.helpText}</span>
<<<<<<< HEAD
                        <DefaultButton onClick={toggleIsCalloutVisible}>Close</DefaultButton>
=======
                        <DefaultButton onClick={toggleIsCalloutVisible}>{t("labels.closeButton")}</DefaultButton>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    </Stack>
                </Callout>
            )}
        </>
    );
};
