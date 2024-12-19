"use client"

import * as React from "react"
import { Search, RotateCcw, ChevronDown, Pencil, Copy, Eye } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function LinkTable<T extends { id?: string; name?: string; username?: string }>({ head, data, linkBase, linkPath }: { head: string[], data: T[], linkBase: string, linkPath: string }) {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [resultsPerPage, setResultsPerPage] = React.useState("25")

    const filteredData = data?.filter(
        (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.id?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2">
                <Input
                    placeholder="Search on name or Id"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-full bg-gray-50"
                />
                <div className="flex gap-2">
                    <Button variant="default" >
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                    <Button variant="default" >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {head.map((item) => (
                            <TableHead key={item}>{item}</TableHead>
                        ))}
                        <TableHead className="text-right text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Link
                                    href={`/${linkBase}/${item.id}${linkPath}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {item?.name || item?.username || '(Empty)'}
                                </Link>
                            </TableCell>
                            <TableCell className="font-mono">{item.id}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-[100px]">
                                            Select
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[160px]">
                                        <DropdownMenuItem>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Duplicate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Displaying 1 to {filteredData.length} of {filteredData.length}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Results per page:</span>
                    <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue>{resultsPerPage}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

