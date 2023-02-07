import { useOutletContext } from "react-router-dom";
type status =  "brand" | "group" | "measurement" |"closed" | "city" | "state"
type setStatus = React.Dispatch<React.SetStateAction<"brand" | "group" | "measurement" | "city" | "state" | "closed">>

export function usePopup() {
    return useOutletContext<[status, setStatus]>();
}
