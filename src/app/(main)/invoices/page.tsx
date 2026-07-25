"use client";

import React, { useState } from "react";
import { initialTransactionsList, TransactionItem } from "@/components/invoices/types";
import InvoicesHeader from "@/components/invoices/InvoicesHeader";
import InvoicesStats from "@/components/invoices/InvoicesStats";
import InvoicesFilterBar from "@/components/invoices/InvoicesFilterBar";
import InvoicesTable from "@/components/invoices/InvoicesTable";
import TransactionReceiptModal from "@/components/invoices/TransactionReceiptModal";
import InvoicesCardDetailsModal from "@/components/invoices/InvoicesCardDetailsModal";

export default function InvoicesPage() {
  const [transactions] = useState<TransactionItem[]>(initialTransactionsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);
  const [cardModalTitle, setCardModalTitle] = useState<string | null>(null);

  // Filtered List
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.partner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "All Types" ||
      (typeFilter === "Income" && t.type === "Income") ||
      (typeFilter === "Payout" && (t.type === "Payout" || t.type === "Refund"));

    const matchesStatus =
      statusFilter === "All Statuses" || t.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <InvoicesHeader />

      {/* Stats Cards */}
      <InvoicesStats onOpenCardDetails={(title) => setCardModalTitle(title)} />

      {/* Search & Filter Bar */}
      <InvoicesFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredCount={filteredTransactions.length}
      />

      {/* Data Table */}
      <InvoicesTable
        transactions={filteredTransactions}
        setSelectedTxn={setSelectedTxn}
      />

      {/* Transaction Details / Receipt Modal */}
      <TransactionReceiptModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />

      {/* Card Details Modal */}
      <InvoicesCardDetailsModal
        cardTitle={cardModalTitle}
        onClose={() => setCardModalTitle(null)}
      />
    </div>
  );
}