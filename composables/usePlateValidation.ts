import type { FormData, PlateValidation } from "~/types/purchaseTypes";

export function usePlateValidation(apiEndpoint: string): PlateValidation {

  const validateAllPlates = async (multiples: FormData[], t: Function) => {
    var hasError = false;

    for (const item of multiples) {
      item.invalidPlate = "";
      
      if (!item.selectedCountry || !item.plateNumber) {
        item.invalidPlate = t("type.invalid_plate");
        hasError = true;
        continue;
      }

      for (const subitem of multiples) {
        
        if (subitem.itemKey != item.itemKey)
          {
            if (subitem.plateNumber.toUpperCase() == item.plateNumber.toUpperCase() && subitem.startDate?.toISOString().substring(0,10) == item.startDate?.toISOString().substring(0,10) )
            {
              item.invalidPlate = t("type.plate_number_duplicated");
              hasError = true;
              continue;
            }
        }
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
            hasError = true;
        } else {
          //item.invalidPlate = "";
        }
      } catch (error) {
        item.invalidPlate = t("type.error_validating_plate");
        console.error("Error validating data:", error);
        hasError = true;
      }
    }

    return hasError;
  };

  return {
    validateAllPlates
  };
}
