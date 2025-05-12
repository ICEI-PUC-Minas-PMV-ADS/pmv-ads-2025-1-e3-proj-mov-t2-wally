import { useAuthStore } from "@/store/authStore"
import { API_URL } from "@env"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

interface Grupo {
    id: string
    nome: string
    descricao: string
    avatar_url: string | null
    usuario_id: string
    data_criacao: string
    data_atualizacao: string | null
    data_exclusao: string | null
}

interface GrupoForm {
    nome: string
    descricao: string
    avatar_url: string | null
    usuario_id: string
    membros: string[]
}

export function useGruposViewModel() {
    const queryClient = useQueryClient()
    const token = useAuthStore((state) => state.token)
    const usuario = useAuthStore((state) => state.user)

    const { data: grupos = [], isPending: isLoadingGrupos, refetch: refetchGrupos } = useQuery<Grupo[]>({
        queryKey: ['grupos', usuario?.id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/grupos?usuario_id=${usuario?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.json()
        },
        enabled: !!token && !!usuario,
        gcTime: 0,
        staleTime: 0,
    })

    

    const grupoForm = useForm<GrupoForm>({
        defaultValues: {
            nome: '',
            descricao: '',
            avatar_url: null,
            usuario_id: usuario ? usuario.id : '',
            membros: usuario ? [usuario.id] : [],
        }
    })

    const { mutateAsync: criarGrupo } = useMutation({
        mutationFn: async (grupo: GrupoForm) => {
            const response = await fetch(`${API_URL}/grupos`, {
                method: 'POST',
                body: JSON.stringify(grupo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const responseData = await response.json()

            console.log({ responseData })
            return responseData
        },
    })


    const handleSubmitGrupo = useCallback(async () => {
        grupoForm.handleSubmit(async (data) => {
            await criarGrupo(data)

            await queryClient.invalidateQueries({ queryKey: ['grupos', usuario?.id] })

            grupoForm.reset()

            router.back()
        })()
    }, [criarGrupo, grupoForm, refetchGrupos])

    return {
        grupos,
        grupoForm,
        handleSubmitGrupo,
        refetchGrupos,
        isLoadingGrupos,

    }
}
