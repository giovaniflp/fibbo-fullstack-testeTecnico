/* eslint-disable react-hooks/exhaustive-deps */
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
  import { Button } from "@/components/ui/button"
  import { toast } from "sonner"
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axiosConfig from "../../../axiosConfig"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    nome: z.string().nullable().optional(),
    descricao: z.string().nullable().optional(),
  })

  export function EditItem({idItem}: {idItem: number}) {

    const[nome, setNome] = useState("")
    const[descricao, setDescricao] = useState("")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        },
      })

    const getProductData = async() =>{
        try {
            await axiosConfig.get('/api/items/' + idItem).then((response : any) => {
                setNome(response.data.nome)
                setDescricao(response.data.descricao)
                console.log(nome)
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getProductData()
    },[descricao != null && nome != null])

      function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        axiosConfig.patch('/api/items/' + idItem, data).then((response : any) => {
            console.log(response.data)
            toast.success("Item editado com sucesso")
            setTimeout(() => {
              window.location.reload();
          }, 3000);
        }).catch((error : any) => {
            console.error(error)
            toast.error("Item não editado")
        })
      }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-orange-500 text-white" variant="outline">Editar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex justify-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Deseja editar o produto?</AlertDialogTitle>
            <AlertDialogDescription className="flex justify-center w-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                        control={form.control}
                        name="nome"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder={"Atual: " + nome} {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Atual: " + descricao} {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit" className="bg-orange-500">Editar Produto</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  