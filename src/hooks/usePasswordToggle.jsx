import { useState } from "react";


export function usePasswordToggle() {

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    return { passwordVisibility, togglePassword }
}