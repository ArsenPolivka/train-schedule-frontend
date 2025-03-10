import { useState } from "react";
import { toast } from "sonner";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertModal } from "@/components/custom/AlertModal";
import { Dropdown } from "@/components/custom/Dropdown/Dropdown";
import { Loading } from "@/components/custom/Loading";
import { UpdateModal } from "@/components/custom/SideModal/SideModal";

import { useTrains } from "@/context/trains";
import type { TTrain } from "@/utils/types";

export const Schedule = () => {
  const { trains, error, loading, refetchTrains } = useTrains();
  const [selectedTrain, setSelectedTrain] = useState<TTrain | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEditClick = (train: TTrain) => {
    setSelectedTrain(train);
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (train: TTrain) => {
    setSelectedTrain(train);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTrain) return;

    try {
      const response = await fetch(`/api/trains/${selectedTrain.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete train schedule");

      toast.success("Train schedule deleted successfully!");
      refetchTrains();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete schedule");
    } finally {
      setIsAlertOpen(false);
      setSelectedTrain(null);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <TableCaption>Train Schedule List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead className="text-right">Origin</TableHead>
              <TableHead className="text-right">Destination</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trains.map((train) => {
              const dropDownItems = [
                { label: "Edit", onClick: () => handleEditClick(train) },
                { label: "Delete", onClick: () => handleDeleteClick(train) },
              ];

              return (
                <TableRow key={train.id}>
                  <TableCell className="font-medium">{train.trainNumber}</TableCell>
                  <TableCell>{train.departure ? new Date(train.departure).toLocaleString("uk-UA") : "N/A"}</TableCell>
                  <TableCell>{train.arrival ? new Date(train.arrival).toLocaleString("uk-UA") : "N/A"}</TableCell>
                  <TableCell className="text-right">{train.origin}</TableCell>
                  <TableCell className="text-right">{train.destination}</TableCell>
                  <TableCell className="text-right">
                    <Dropdown items={dropDownItems} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <UpdateModal train={selectedTrain} isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} />

      {isAlertOpen && (
        <AlertModal
          title="Are you sure?"
          message="This action cannot be undone."
          onContinue={handleDelete}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </div>
  );
};
