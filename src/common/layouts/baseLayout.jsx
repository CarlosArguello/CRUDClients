import React from "react";
import NavBar from "common/components/navbar"

const BaseLayout = ({ children }) => (
    <>
        <NavBar />
        <div className="container mx-auto">
            { children }
        </div>
    </>
)

export default BaseLayout