import type { FormData, PlateValidation } from "~/types/purchaseTypes";

export function usePlateValidation(apiEndpoint: string): PlateValidation {
  const validateAllPlates = async (multiples: FormData[], t: Function) => {
    var hasError = false;

    for (const item of multiples) {
      
      if (!item.selectedCountry) {
        hasError = true;
        continue;
      }

      for (const subitem of multiples) {
        if (subitem.itemKey != item.itemKey) {
          if (
            subitem.startDate != null &&
            item.startDate != null &&
            item.endDate != null
          ) {
            if (
              subitem.plateNumber.toUpperCase() ==
                item.plateNumber.toUpperCase() &&
              item.startDate.toISOString().substring(0, 10) <=
                subitem.startDate.toISOString().substring(0, 10) &&
              item.endDate.toISOString().substring(0, 10) >
                subitem.startDate.toISOString().substring(0, 10)
            ) {
              item.invalidPlate = t("type.plate_number_duplicated");
              hasError = true;
              continue;
            }
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
            countryCode: item.selectedCountry!.countryCode,
            plateNumber: item.plateNumber,
          }),
        });
        const responseData = await response.json();
        if (item.plateNumber.trim() === "") {
          item.formShowError = true;
          item.emptyMessage = t("type.empty_plate");
          hasError = true;
        } else {
          item.formShowError = false;
          item.emptyMessage = "";
        }

        if (
          item.plateNumber.trim() != "" &&
          responseData.value.isValid === false
        ) {
          item.invalidPlate =
            responseData.value.error || t("type.invalid_plate");
          hasError = true;
        } else {
          item.invalidPlate = "";
        }
      } catch (error) {
        console.error("Error validating data:", error);
        hasError = true;
      }
    }

    return hasError;
  };

  return {
    validateAllPlates,
  };
}
