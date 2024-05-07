export type FormData = {
  selectedCountry: { name: string; code: string } | undefined;
  licensePlate: string;
  startDate: Date | null;
  endDate: Date | null;
};