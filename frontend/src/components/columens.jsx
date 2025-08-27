export const transactionColumns = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => {
      const sender = row.getValue("sender");
      return <div>{typeof sender === "object" ? sender.name : sender}</div>;
    },
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
    cell: ({ row }) => {
      const receiver = row.getValue("receiver");
      return (
        <div>{typeof receiver === "object" ? receiver.name : receiver}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency || "ETB",
      }).format(amount);
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "cause",
    header: "Cause",
    cell: ({ row }) => <span>{row.getValue("cause") || "-"}</span>,
  },
  {
    accessorKey: "created_at_time",
    header: "Created At",
    cell: ({ row }) => {
      const dateValue = row.getValue("created_at_time");
      return dateValue ? new Date(dateValue).toLocaleString() : "Unknown";
    },
  },
];
