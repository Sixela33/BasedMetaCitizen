import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SuccessCard({ name, address }: { name: string; address: string }) {
  return (
    <Card className="border-green-500 bg-green-50 m-12">
      <CardContent className="p-4 flex items-start gap-4">
        <CheckCircle className="text-green-500 w-8 h-8" />
        <div>
          <h3 className="text-green-700 font-semibold text-lg mb-1">¡Factory creado exitosamente!</h3>
          <p className="text-green-600">Nombre: <strong>{name}</strong></p>
          <p className="text-green-600">Address: <strong>{address}</strong></p>
        </div>
      </CardContent>
    </Card>
  );
}
