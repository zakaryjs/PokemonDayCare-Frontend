import { useState } from "react";


export function usePasswordToggle() {

    // hook to toggle whether the password is visible in login and register forms

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    return { passwordVisibility, togglePassword }
}