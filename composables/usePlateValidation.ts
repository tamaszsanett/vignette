import type { FormData, PlateValidation } from "~/types/purchaseTypes";

export function usePlateValidation(apiEndpoint: string): PlateValidation {

  const validateAllPlates = async (multiples: FormData[], t: Function) => {
    for (const item of multiples) {
      if (!item.selectedCountry || !item.plateNumber) {
        item.invalidPlate = t("type.invalid_plate");
        continue;
      }

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            countryCode: item.selectedCountry.countryCode,
            plateNumber: item.plateNumber,
          }),
        });
        const responseData = await response.json();

        if (
          !responseData.isSuccess ||
          (responseData.value && !responseData.value.isValid)
        ) {
          item.invalidPlate =
            responseData.value.error || t("type.invalid_plate");
        } else {
          item.invalidPlate = "";
        }
      } catch (error) {
        item.invalidPlate = t("type.error_validating_plate");
        console.error("Error validating data:", error);
      }
    }
  };

  return {
    validateAllPlates,
  };
}
