import React from "react";

const App: React.FC = () => {
    return <div>Hello World { window.sessionStorage.getItem('name')}</div>;
};

export default App;
