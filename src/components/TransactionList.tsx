import { Transaction } from "@/types/budget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

export default function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No hay transacciones registradas
          </p>
        ) : (
          displayTransactions.map((transaction) => {
            const isIncome = transaction.categoria?.id_tipo === 1;
            return (
              <div
                key={transaction.id_transaccion}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      isIncome ? "bg-income/10" : "bg-expense/10"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpCircle className="h-5 w-5 text-income" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-expense" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.descripcion || "Sin descripción"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.fecha), "d 'de' MMMM, yyyy", {
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      isIncome ? "text-income" : "text-expense"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.monto)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.categoria?.nombre}
                  </Badge>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
