import { useState } from "react";
import { Plus, Edit2, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockCategories } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    toast({
      title: "Categoría creada",
      description: `La categoría "${formData.get("nombre")}" ha sido agregada exitosamente.`,
    });
    
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Categoría eliminada",
      description: "La categoría ha sido eliminada correctamente.",
      variant: "destructive",
    });
    setDeleteId(null);
  };

  const incomeCategories = mockCategories.filter((c) => c.id_tipo === 1);
  const expenseCategories = mockCategories.filter((c) => c.id_tipo === 2);

  const CategoryCard = ({ category }: { category: typeof mockCategories[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${category.id_tipo === 1 ? "bg-income/10" : "bg-expense/10"}`}>
              <FolderOpen className={`h-5 w-5 ${category.id_tipo === 1 ? "text-income" : "text-expense"}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{category.nombre}</h3>
              <Badge variant="outline" className="mt-1">
                {category.id_tipo === 1 ? "Ingreso" : "Gasto"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => setDeleteId(category.id_categoria)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {category.descripcion && (
          <p className="text-sm text-muted-foreground">{category.descripcion}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Categorías</h2>
          <p className="text-muted-foreground">
            Organiza tus transacciones con categorías personalizadas
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Categoría</DialogTitle>
              <DialogDescription>
                Agrega una nueva categoría para clasificar tus transacciones
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select name="tipo" defaultValue="2" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ingreso</SelectItem>
                    <SelectItem value="2">Gasto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Categoría</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Alquiler, Salario, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Agrega una descripción para esta categoría"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Crear Categoría
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Income Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-income">Categorías de Ingreso</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {incomeCategories.map((category) => (
            <CategoryCard key={category.id_categoria} category={category} />
          ))}
        </div>
      </div>

      {/* Expense Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-expense">Categorías de Gasto</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expenseCategories.map((category) => (
            <CategoryCard key={category.id_categoria} category={category} />
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La categoría será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
