import { useOutletContext } from "react-router-dom";
type status =  "brand" | "group" | "measurement" |"closed"
type setStatus = React.Dispatch<React.SetStateAction<"brand" | "group" | "measurement" | "closed">>

export function usePopup() {
    return useOutletContext<[status, setStatus]>();
}
