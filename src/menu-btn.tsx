import { MenuOutline } from "@emotion-icons/evaicons-outline/MenuOutline";
import { MenuOpen } from "@emotion-icons/material-outlined/MenuOpen"
import { Dispatch, SetStateAction } from "react";

export const MenuBtn = ({
    isOpen, setIsOpen
}: {
    isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {

    return <button
        onClick={() => { setIsOpen(!isOpen) }}
        style={{
            fontSize: "14px",
            height: '2em',
            borderRadius: "0.3rem",
            marginBottom: "1rem",
        }}
    > Menu &nbsp;
        <span style={{ display: "inline-block", height: "1.5em" }} >
            {isOpen ? <MenuOpen height={"100%"} /> : <MenuOutline height={"100%"} />}
        </span>
    </button>
}


