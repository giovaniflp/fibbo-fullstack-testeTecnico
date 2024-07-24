import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import axiosConfig from "../../../axiosConfig"
import { toast } from "sonner"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { format } from "date-fns"

export default function SearchItem(){

    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [dataCriacao, setDataCriacao] = useState("")

    const [idInput, setIdInput] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    const formatarData = (data: string) => {
        const dataFormatada = format(new Date(data), "dd/MM/yyyy 'às' HH:mm")
        return dataFormatada
    }

    const getProductData = async() =>{
        try {
            await axiosConfig.get('/api/items/' + idInput).then((response : any) => {  
                    setModalOpen(true)              
                    setId(response.data.id)
                    setNome(response.data.nome)
                    setDescricao(response.data.descricao)
                    setDataCriacao(response.data.dataCriacao)
                    toast.success("Item com esse ID encontrado com sucesso")
                
            })
        } catch (error) {
            setModalOpen(false)
            toast.error("Item não encontrado com esse ID")
            console.error(error)
        }
    }

    return (
        <div className="flex">
            <Input value={idInput} onChange={(e)=>{setIdInput(e.target.value)}} className="border-2 border-black rounded-l-lg rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 w-40" type="number" placeholder="Buscar detalhes ID"></Input>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button onClick={getProductData} className="rounded-r-lg rounded-l-none">
                        <Search></Search>
                    </Button>
                </AlertDialogTrigger>
                {
                    modalOpen ? <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Informações do Item</AlertDialogTitle>
                    <AlertDialogDescription>
                        <h1>ID - {id}</h1>
                        <h1>Nome - {nome}</h1>
                        <h1>Descrição - {descricao}</h1>
                        <h1>Data de Criação/Edição - {formatarData(dataCriacao)}</h1>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Fechar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
                : null
                }
            </AlertDialog>
        </div>
    )
}