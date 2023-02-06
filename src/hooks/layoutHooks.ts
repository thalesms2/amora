import React from 'react'

const layoutHooks = () => {
    const [popUpStatus, setPopUpStatus] = React.useState<
        "brand" | "group" | "measurement" | "closed"
    >("closed");
    const [login, setLogin] = React.useState(() => {
        const result = window.sessionStorage.getItem("userId")
            ? "logged"
            : "login";
        return result;
    });
    const setLogout = () => {
        setLogin("login");
        window.sessionStorage.clear();
    };
    return { popUpStatus, setPopUpStatus, login, setLogin, setLogout}
}

export default layoutHooks