import { ref } from 'vue';
import type { CartItemToUpdate } from '~/types/types';

interface BaseResponse {
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}

export async function useUpdateCartItem(
  itemKey: string,
  carCountry: string,
  durationType: string,
  plateNumber: string,
  validityStart: Date | null,
  validityEnd: Date | null,
  vignettePrice: number,
  transactionFee: number,
  numberOfMonths: number,
  counties: string[]) {

  const cartKey = useCookie('cartKey');

  var items = [{} as CartItemToUpdate];

  // in case of day, week, year this is a simple question
  if (durationType == "DAY" || durationType == "WEEK" || durationType == "YEAR") {
    items = [{
      cartKey: cartKey.value?.toString(),
      cartItemKey: itemKey,
      quantity: 1,
      propertiesToUpdate: [
        {
          key: "CountryCode",
          value: carCountry
        }, {
          key: "PlateNumber",
          value: plateNumber
        }, {
          key: "ValidityStart",
          value: validityStart == null ? "" : validityStart.toISOString()
        }, {
          key: "ValidityEnd",
          value: validityEnd == null ? "" : validityEnd.toISOString()
        }, {
          key: "VignettePrice",
          value: vignettePrice.toString()
        }, {
          key: "TransactionFee",
          value: transactionFee.toString()
        }
      ]
    }];
  }
  // In case of MONTH duration type, add the different between previous and current month 
  else if (durationType == "MONTH") {
    for (let i = 1; i <= numberOfMonths; i++) {
      if (validityStart !== null && validityEnd !== null) {
        var currentValidityStart = addMonths(validityStart, i - 1);
        var currentValidityEnd = addMonths(validityEnd, i - 1);

        items[i - 1] = {
          cartKey: cartKey.value?.toString(),
          cartItemKey: itemKey + "_" + i,
          quantity: 1,
          propertiesToUpdate: [
            {
              key: "CountryCode",
              value: carCountry
            }, {
              key: "PlateNumber",
              value: plateNumber
            }, {
              key: "ValidityStart",
              value: currentValidityStart == null ? "" : currentValidityStart.toISOString()
            }, {
              key: "ValidityEnd",
              value: currentValidityEnd == null ? "" : currentValidityEnd.toISOString()
            }, {
              key: "VignettePrice",
              value: vignettePrice.toString()
            }, {
              key: "TransactionFee",
              value: transactionFee.toString()
            }
          ]
        };
      }
    }
  }
  else { // YEAR_11
    // for loup in counties
    for (let i = 0; i < counties.length; i++) {
      items[i] = {
        cartKey: cartKey.value?.toString(),
        cartItemKey: itemKey + "_" + counties[i],
        quantity: 1,
        propertiesToUpdate: [
          {
            key: "CountryCode",
            value: carCountry
          }, {
            key: "PlateNumber",
            value: plateNumber
          }, {
            key: "ValidityStart",
            value: validityStart == null ? "" : validityStart.toISOString()
          }, {
            key: "ValidityEnd",
            value: validityEnd == null ? "" : validityEnd.toISOString()
          }, {
            key: "VignettePrice",
            value: vignettePrice.toString()
          }, {
            key: "TransactionFee",
            value: transactionFee.toString()
          }
        ]
      };
    }
  }

  for (let i = 0; i < items.length; i++) {
    if (items[i].cartItemKey !== undefined) {
      const apiEndpointBase = 'https://test-gw.voxpay.hu/Webshop.Common';
      try {
        const response = await fetch(apiEndpointBase + "/UpdateCartItem", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(items[i])
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: BaseResponse = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch end date:", error);
        return null; // or handle errors as appropriate for your application context
      }
    }
    else {
      return null;
    }
  }
}

function addMonths(date: Date, months: number) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}