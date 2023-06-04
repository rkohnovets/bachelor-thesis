import Loader from "./loader";
import React, { useState } from "react";

const ButtonWithLoader = (props) => {
    // у props есть text, loadingtext, click, textTailwind, bgTailwind

    let [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.disabled = true;

        await props.click();

        setIsLoading(false); 
        e.disabled = false;
    };

    const standardstyle = "inline-flex justify-center border border-transparent " +
    "px-4 py-2 text-sm font-medium focus:outline-none " +
    "disabled:active:bg-gray-300 disabled:bg-gray-300 " +
    "relative items-center ";

    const textstyle = " " + (props.textTailwind ? props.textTailwind : "text-blue-900 rounded-md") + " ";
    const bgstyle = " " + (props.bgTailwind ? props.bgTailwind : "bg-blue-100  active:bg-blue-400  hover:bg-blue-200") + " ";

    return (
        <button type="button"
            className={standardstyle + textstyle + bgstyle}
            onClick={(e) => handleSubmit(e.target)}>
            {isLoading
            ? <><p className="block">{props.loadingtext}</p><Loader/></>
            : <>{props.text}</>}
        </button>
    );
};

export default ButtonWithLoader;