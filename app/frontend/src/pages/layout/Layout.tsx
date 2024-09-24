import React, { useState, useEffect, useRef, RefObject } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
<<<<<<< HEAD

=======
import { useTranslation } from "react-i18next";
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";
import { IconButton } from "@fluentui/react";

const Layout = () => {
<<<<<<< HEAD
=======
    const { t } = useTranslation();
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef: RefObject<HTMLDivElement> = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer} ref={menuRef}>
                    <Link to="/" className={styles.headerTitleContainer}>
<<<<<<< HEAD
                        <h3 className={styles.headerTitle}>Azure OpenAI + AI Search</h3>
=======
                        <h3 className={styles.headerTitle}>{t("headerTitle")}</h3>
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    </Link>
                    <nav>
                        <ul className={`${styles.headerNavList} ${menuOpen ? styles.show : ""}`}>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
<<<<<<< HEAD
                                    Chat
=======
                                    {t("chat")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/qa"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
<<<<<<< HEAD
                                    Ask a question
=======
                                    {t("qa")}
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.loginMenuContainer}>
                        {useLogin && <LoginButton />}
<<<<<<< HEAD
                        <IconButton iconProps={{ iconName: "GlobalNavButton" }} className={styles.menuToggle} onClick={toggleMenu} ariaLabel="Toggle menu" />
=======
                        <IconButton
                            iconProps={{ iconName: "GlobalNavButton" }}
                            className={styles.menuToggle}
                            onClick={toggleMenu}
                            ariaLabel={t("labels.toggleMenu")}
                        />
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
                    </div>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
