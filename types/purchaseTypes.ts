export type Country = {
  name: string;
  countryCode: string;
};

export type Countries = {
  [key: string]: Country[];
};

export type InvoiceCountry = {
  name: string;
};

export type InvoiceCountries = {
  [key: string]: InvoiceCountry[];
};

export type Counties = {
  [key: string]: County[];
};

export type County = {
  name: string;
  key: string;
};

//plate validation form data

export type FormData = {
  formShowError: boolean;
  invalidPlate: string;
  selectedCountry: { name: string; countryCode: string } | undefined;
  countryCode: string;
  plateNumber: string;
  startDate: Date | null;
  endDate: Date | null;
}

export type PlateValidation = {
  validateAllPlates: (multiples: FormData[], t: Function) => Promise<void>;
}