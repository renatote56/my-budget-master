import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import StatCard from "@/components/StatCard";
import TransactionList from "@/components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, mockTransactions, mockBudgets } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Dashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  const chartData = [
    { name: "Ene", ingresos: 3200, gastos: 1800 },
    { name: "Feb", ingresos: 3500, gastos: 2100 },
    { name: "Mar", ingresos: 3800, gastos: 2300 },
    { name: "Abr", ingresos: 4100, gastos: 2600 },
    { name: "May", ingresos: 3900, gastos: 2400 },
    { name: "Jun", ingresos: 4300, gastos: 2800 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Resumen general de tus finanzas personales
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance Total"
          value={formatCurrency(mockDashboardStats.balance)}
          icon={<Wallet className="h-6 w-6" />}
          variant="default"
          trend={{ value: mockDashboardStats.monthlyChange, isPositive: true }}
        />
        <StatCard
          title="Ingresos del Mes"
          value={formatCurrency(mockDashboardStats.totalIncome)}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="income"
        />
        <StatCard
          title="Gastos del Mes"
          value={formatCurrency(mockDashboardStats.totalExpenses)}
          icon={<TrendingDown className="h-6 w-6" />}
          variant="expense"
        />
        <StatCard
          title="Presupuestos Activos"
          value={mockBudgets.length.toString()}
          icon={<PiggyBank className="h-6 w-6" />}
          variant="warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="ingresos" fill="hsl(var(--income))" name="Ingresos" radius={[8, 8, 0, 0]} />
                <Bar dataKey="gastos" fill="hsl(var(--expense))" name="Gastos" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Presupuestos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBudgets.map((budget) => {
              const spent = 250.50; // Mock value
              const percentage = (spent / budget.monto_limite) * 100;
              const isOverBudget = percentage > 100;

              return (
                <div key={budget.id_presupuesto} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {budget.categoria?.nombre}
                    </span>
                    <span
                      className={`font-semibold ${
                        isOverBudget ? "text-expense" : "text-muted-foreground"
                      }`}
                    >
                      {formatCurrency(spent)} / {formatCurrency(budget.monto_limite)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isOverBudget ? "bg-expense" : "bg-income"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {isOverBudget && (
                    <p className="text-xs text-expense font-medium">
                      ⚠️ Has excedido el presupuesto en {percentage.toFixed(0)}%
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <TransactionList transactions={mockTransactions} limit={5} />
    </div>
  );
}
