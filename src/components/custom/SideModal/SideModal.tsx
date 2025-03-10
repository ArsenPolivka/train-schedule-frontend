import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useTrains } from '@/context/trains';
import type { CreateTrainScheduleDto, TTrain } from '@/utils/types';

export const SideModal = () => {
  const [formData, setFormData] = useState<CreateTrainScheduleDto>({
    trainNumber: '',
    departure: '',
    arrival: '',
    origin: '',
    destination: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const { refetchTrains } = useTrains();

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/trains/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast("Failed to create train schedule");
        return;
      }

      toast("Train schedule created successfully!");
      setIsOpen(false);
      setFormData({ trainNumber: '', departure: '', arrival: '', origin: '', destination: '' });
      refetchTrains();
    } catch (error) {
      console.error(error);
      toast('Failed to create schedule');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>New item</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new schedule item</SheetTitle>
          <SheetDescription className='space-y-2'>
            <Input
              placeholder="Train Number"
              value={formData.trainNumber}
              onChange={(e) => setFormData({ ...formData, trainNumber: e.target.value })}
            />

            <Input
              type="datetime-local"
              placeholder="Departure"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
            />

            <Input
              type="datetime-local"
              placeholder="Arrival"
              value={formData.arrival}
              onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Origin"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />

            <Button onClick={handleCreate} className='w-full'>Submit</Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

interface UpdateModalProps {
  train: TTrain | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateModal = ({ train, isOpen, onClose }: UpdateModalProps) => {
  const [formData, setFormData] = useState<TTrain | null>(train);
  const { refetchTrains } = useTrains();

  useEffect(() => {
    if (train) setFormData(train);
  }, [train]);

  const handleUpdate = async () => {
    if (!formData) return;

    try {
      const response = await fetch(`/api/trains/${formData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update train schedule");

      toast.success("Train schedule updated successfully!");
      onClose();
      refetchTrains();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update schedule");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Train Schedule</SheetTitle>
          <SheetDescription className="space-y-2">
            <Input
              placeholder="Train Number"
              value={formData?.trainNumber || ""}
              onChange={(e) => setFormData({ ...formData!, trainNumber: e.target.value })}
            />
            <Input
              type="datetime-local"
              placeholder="Departure"
              value={formData?.departure ? new Date(formData.departure).toISOString().slice(0, 16) : ""}
              onChange={(e) => setFormData({ ...formData!, departure: new Date(e.target.value) })}
            />
            <Input
              type="datetime-local"
              placeholder="Arrival"
              value={formData?.arrival ? new Date(formData.arrival).toISOString().slice(0, 16) : ""}
              onChange={(e) => setFormData({ ...formData!, arrival: new Date(e.target.value) })}
            />
            <Input
              type="text"
              placeholder="Origin"
              value={formData?.origin || ""}
              onChange={(e) => setFormData({ ...formData!, origin: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Destination"
              value={formData?.destination || ""}
              onChange={(e) => setFormData({ ...formData!, destination: e.target.value })}
            />
            <Button onClick={handleUpdate} className="w-full">Update</Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
