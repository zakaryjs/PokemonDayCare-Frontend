import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




export default function DateProvider({children}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    )
}