export type TUser = {
  id: number,
  username: string,
  password?: string,
}

export type TTrain = {
  id: number,
  trainNumber: string,
  departure: Date | null,
  arrival: Date | null,
  origin: string | null,
  destination: string | null,
}

export interface CreateTrainScheduleDto {
  trainNumber: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
}
