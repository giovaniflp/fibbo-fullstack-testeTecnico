"use client"

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
import axiosConfig from "../../../axiosConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    nome: z.string().min(1, {
      message: "Nome precisa ter no mínimo 1 caractere",
    }),
    descricao: z.string().min(1, {
        message: "Descrição precisa ter no mínimo 1 caractere",
    }),
  })

  export function AddItem() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nome: "",
            descricao: "",
        },
      })
    
      function onSubmit(data: z.infer<typeof FormSchema>) {
        axiosConfig.post('/api/items', data).then((response: any) => {
            console.log(response.data)
            toast.success("Item adicionado com sucesso")
            setTimeout(() => {
              window.location.reload();
          }, 3000);
        }).catch((error : any) => {
            console.error(error)
            toast.error("Erro ao adicionar item")
        })
      }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-500 text-white" variant="outline">Adicionar item</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex justify-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Deseja adicionar um novo item?</AlertDialogTitle>
            <AlertDialogDescription className="flex justify-center w-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Pomada" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Serve para tratar dores musculares..." {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit" className="bg-green-500">Adicionar item</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  