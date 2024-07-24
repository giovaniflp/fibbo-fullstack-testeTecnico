"use client"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { AddItem } from "./AddItem"
import SearchItem from "./SearchItem"

export function TopBar({name}: {name: string}) {
  return (
    <Breadcrumb className="flex justify-between pl-4 py-4">
      <BreadcrumbList className="flex">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Itens</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
      <div className="pr-4 flex flex-col gap-4">
        <SearchItem></SearchItem>
        <AddItem></AddItem>
      </div>
    </Breadcrumb>
  )
}
