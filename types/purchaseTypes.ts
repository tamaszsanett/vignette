export type Country = {
  name: string;
  countryCode: string;
};

export type Countries = {
  [key: string]: Country[];
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
  itemKey: string;
  formShowError: boolean;
  invalidPlate: string;
  selectedCountry: { name: string; countryCode: string } | undefined;
  countryCode: string;
  plateNumber: string;
  startDate: Date | null;
  endDate: Date | null;
}

export type PlateValidation = {
  validateAllPlates: (multiples: FormData[], t: Function) => Promise<boolean>;
}

export type AutoCompleteCompleteEvent = {
  query: string;
};

export type InvoiceAddressData = {
  companyName: string;
  invoiceCountry: string;
  invoicePostalCode: string;
  invoiceCity: string;
  invoiceStreetAddress: string;
  invoiceHUTaxNumber: string;
};

export type InvoiceAddressResponse = {
  value: {
    invoiceAddressData: InvoiceAddressData[];
    statusCode: string;
    errors: null | string[];
  };
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
};

export type PostalCodeChangeEvent = {
  query: string;
};

export type PostalCodeResponse = {
  value: {
    postalCodeData: PostalCodeData[];
    statusCode: string;
    errors: null | string[];
  };
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
};

export type PostalCodeData = {
  postalCode: string;
  city: string;
};

export type Suggestion = {
  label: string;
  value: string;
  city: string;
};