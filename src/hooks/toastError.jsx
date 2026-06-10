import { toast } from "react-toastify";
import returnErrorMsg from "./returnErrorMsg";

export const toastError = (err)=>{
    console.log({error:err});
    return toast.error(returnErrorMsg(err))
    
}

