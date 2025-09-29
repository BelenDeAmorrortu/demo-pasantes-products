import { toast } from "react-hot-toast";

const ErrorService = {
    handleError(errorMsg: string) {
        console.log('Error: ' + errorMsg); // Mostrar el error en la consola o UI
        toast.error(errorMsg);
    },
};

export { ErrorService };