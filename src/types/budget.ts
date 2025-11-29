export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono?: string;
  usuario: string;
  fecha_registro: string;
}

export interface TransactionType {
  id_tipo: number;
  descripcion: "Ingreso" | "Gasto";
}

export interface Category {
  id_categoria: number;
  id_usuario: number;
  id_tipo: number;
  nombre: string;
  descripcion?: string;
  activa: boolean;
}

export interface Transaction {
  id_transaccion: number;
  id_usuario: number;
  id_categoria: number;
  fecha: string;
  monto: number;
  descripcion?: string;
  fecha_registro: string;
  categoria?: Category;
}

export interface BudgetState {
  id_estado: number;
  descripcion: string;
}

export interface Budget {
  id_presupuesto: number;
  id_usuario: number;
  id_categoria: number;
  año: number;
  mes: number;
  monto_limite: number;
  activo: boolean;
  id_estado: number;
  categoria?: Category;
  estado?: BudgetState;
}

export interface GlobalBudget {
  id_presupuesto_global: number;
  id_usuario: number;
  año: number;
  mes: number;
  monto_limite: number;
  id_estado: number;
  estado?: BudgetState;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyChange: number;
}

export interface CategoryReport {
  categoria: string;
  monto: number;
  porcentaje: number;
}

export interface MonthlyReport {
  mes: string;
  ingresos: number;
  gastos: number;
  balance: number;
}
