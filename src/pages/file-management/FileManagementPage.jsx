import { useState } from "react";
import {
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImportFilePopup from "./ImportFilePopup";

import columns from "./columns";
import FileManagement from "./FileManagement";

const placeholderData = [
  {
    id: "m5gr84i9",
    title: "file-name1.txt",
    type: "file",
    size: "14B",
    date: 639873769520,
  },
  {
    id: "3u1reuv4",
    title: "file-name2.txt",
    type: "file",
    size: "14B",
    date: 654454802939,
  },
  {
    id: "derv1ws0",
    title: "file-name3.txt",
    type: "file",
    size: "14B",
    date: 1597008670714,
  },
  {
    id: "5kma53ae",
    title: "projects",
    type: "Folder",
    size: "26M",
    date: 1272290725140,
  },
  {
    id: "bhqecj4p",
    title: "file-name5.txt",
    type: "file",
    size: "14B",
    date: 1350577804495,
  },
];

export default function FileManagementPage() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: placeholderData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full md:w-4/5 px-5 md:px-0 mb-5">
      <FileManagement />
    </div>
  );
}
