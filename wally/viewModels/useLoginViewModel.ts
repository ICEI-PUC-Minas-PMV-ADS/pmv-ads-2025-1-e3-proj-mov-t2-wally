import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { API_URL } from "@env";

interface LoginFormData {
    email: string
    senha: string
}

export function useLoginViewModel() {
    const { login } = useAuthStore()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            senha: "",
        },
    });

    const { mutateAsync: signIn } = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await fetch(`${API_URL}/sign-in`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            console.log({ response })
            const responseData = await response.json()
            console.log({ responseData })

            return responseData
        }
    })

    const handleSubmitLogin = useCallback(() => {
        try {
            handleSubmit(async (data) => {
                console.log({ data })
                const { token, usuario } = await signIn(data)
                console.log({ token, usuario })
                await login(token, usuario)

                router.replace("/(tabs)")
            })()
        } catch (error) {
            console.log(error)
        }
    }, [handleSubmit])

    return {
        control,
        handleSubmitLogin,
    }

}