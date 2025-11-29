import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Reports() {
  const monthlyData = [
    { mes: "Enero", ingresos: 3200, gastos: 1800 },
    { mes: "Febrero", ingresos: 3500, gastos: 2100 },
    { mes: "Marzo", ingresos: 3800, gastos: 2300 },
    { mes: "Abril", ingresos: 4100, gastos: 2600 },
    { mes: "Mayo", ingresos: 3900, gastos: 2400 },
    { mes: "Junio", ingresos: 4300, gastos: 2800 },
  ];

  const categoryData = [
    { nombre: "Alimentación", valor: 850, color: "hsl(var(--expense))" },
    { nombre: "Transporte", valor: 450, color: "hsl(217, 91%, 35%)" },
    { nombre: "Entretenimiento", valor: 320, color: "hsl(158, 64%, 45%)" },
    { nombre: "Servicios", valor: 680, color: "hsl(38, 92%, 50%)" },
    { nombre: "Otros", valor: 500, color: "hsl(var(--muted-foreground))" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Reportes Financieros</h2>
        <p className="text-muted-foreground">
          Analiza tus patrones de ingreso y gasto
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Reporte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Año</Label>
              <Select defaultValue="2025">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Mes</Label>
              <Select defaultValue="11">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Enero</SelectItem>
                  <SelectItem value="2">Febrero</SelectItem>
                  <SelectItem value="3">Marzo</SelectItem>
                  <SelectItem value="4">Abril</SelectItem>
                  <SelectItem value="5">Mayo</SelectItem>
                  <SelectItem value="6">Junio</SelectItem>
                  <SelectItem value="7">Julio</SelectItem>
                  <SelectItem value="8">Agosto</SelectItem>
                  <SelectItem value="9">Septiembre</SelectItem>
                  <SelectItem value="10">Octubre</SelectItem>
                  <SelectItem value="11">Noviembre</SelectItem>
                  <SelectItem value="12">Diciembre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-income/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-income" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ingresos</p>
                <p className="text-2xl font-bold text-income">{formatCurrency(22800)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Período: Enero - Junio 2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-expense/10 rounded-xl">
                <TrendingDown className="h-6 w-6 text-expense" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Gastos</p>
                <p className="text-2xl font-bold text-expense">{formatCurrency(14000)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Período: Enero - Junio 2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance Neto</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(8800)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Período: Enero - Junio 2025
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos vs Gastos Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value) => formatCurrency(value as number)}
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
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.nombre}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose Detallado por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Categoría</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Monto</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">% del Total</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category) => {
                  const total = categoryData.reduce((sum, cat) => sum + cat.valor, 0);
                  const percentage = ((category.valor / total) * 100).toFixed(1);
                  return (
                    <tr key={category.nombre} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground">{category.nombre}</td>
                      <td className="text-right py-3 px-4 font-medium text-foreground">
                        {formatCurrency(category.valor)}
                      </td>
                      <td className="text-right py-3 px-4 text-muted-foreground">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
