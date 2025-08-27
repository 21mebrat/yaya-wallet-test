import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
export function TransactionTable({ data, columns, currentUser, onSearch }) {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: { sorting, rowSelection },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        <Input
          placeholder="Search by sender, receiver, cause or ID..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const tx = row.original;
                const isIncoming =
                  tx.receiver?.name === currentUser ||
                  tx.sender?.name === tx.receiver?.name;

                return (
                  <TableRow
                    key={tx.id || tx.transactionId}
                    className={`hover:bg-gray-50 transition-colors border-l-4 ${
                      isIncoming ? "border-green-400" : "border-red-400"
                    }`}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <TableCell key={cell.id}>
                        {idx === 0 ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex-shrink-0 ${
                                isIncoming ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {isIncoming ? (
                                <ArrowDownCircle className="h-5 w-5" />
                              ) : (
                                <ArrowUpCircle className="h-5 w-5" />
                              )}
                            </div>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 py-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
