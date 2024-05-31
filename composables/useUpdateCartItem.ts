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
          value: plateNumber.toUpperCase()
        }, {
          key: "ValidityStart",
          value: validityStart == null ? "" : calcIsoDateStr(validityStart)
        }, {
          key: "ValidityEnd",
          value: validityEnd == null ? "" : calcIsoDateStr(validityEnd)
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
    
    let currentValidityStart = new Date();
    let currentValidityEnd = new Date();

    if (validityStart !== null && validityEnd !== null) {
      currentValidityStart = new Date(validityStart);
    }

    for (let i = 1; i <= numberOfMonths; i++) {
      if (validityStart !== null && validityEnd !== null) {
        currentValidityEnd = calcEndDate(new Date(currentValidityStart), 1);

        var startStr = calcIsoDateStr(currentValidityStart);
        var endStr = calcIsoDateStr(currentValidityEnd)
        console.log(startStr + " #> " + endStr);

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
              value: currentValidityStart == null ? "" : startStr
            }, {
              key: "ValidityEnd",
              value: currentValidityEnd == null ? "" : endStr
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
      
      currentValidityStart = new Date(currentValidityEnd);
      currentValidityStart.setDate(currentValidityStart.getDate()+1);
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
            value: validityStart == null ? "" : calcIsoDateStr(validityStart)
          }, {
            key: "ValidityEnd",
            value: validityEnd == null ? "" : calcIsoDateStr(validityEnd)
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

  console.log(items);

  for (let i = 0; i < items.length; i++) {
    if (items[i].cartItemKey) {
      
    const config = useRuntimeConfig();
    const apiEndpointBase = config.public.apiEndpoint.webshopEndpoint;
      try {
        const response = await fetch(apiEndpointBase + "/UpdateCartItem", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(items[i])
        });
        if (!response.ok) {
          setTimeout(async function () {
            const response = await fetch(apiEndpointBase+"/RemoveFromCart", {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(items[i])});
              if (response.ok) {
                const data: BaseResponse = await response.json();
                return data;
              }
          }, 1000);
        }
        const data: BaseResponse = await response.json();
      } catch (error) {
        console.error("Failed to fetch end date:", error);
      }
    }
    else {
    }
  }

  
  return null;
}

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


function calcEndDate(startDate:Date, numberOfMonths: number) {
  //console.log("-----------------start # calcEndDate");
  var validityEnd = startDate;
  let sdate = new Date(startDate);
  //console.log(calcIsoDateStr(sdate));

  for (let i = 1; i<=numberOfMonths; i++) {
    //console.log("numberOfMonths: " +i);
    var Syear = sdate.getFullYear();
    var Smonth= sdate.getMonth()+1;
    var Sday = sdate.getDate();

    console.log("start : " + Syear +"|"+Smonth+"|"+Sday);
    
    var firstDayOfNextMonth = new Date(Syear, Smonth, 1);

    console.log("firstDayOfNextMonth : " + firstDayOfNextMonth);

    var Nyear = firstDayOfNextMonth.getFullYear();
    var Nmonth = firstDayOfNextMonth.getMonth();
    
    var DayInTheNextMonth = new Date(Nyear, Nmonth+1, 0);
    console.log("lastDayOfNextMonth : " + DayInTheNextMonth);
    var DaysInNextMonth = DayInTheNextMonth.getDate();

    var DayInNextMonth = DaysInNextMonth < Sday ? DaysInNextMonth : Sday
    validityEnd = new Date(Nyear, Nmonth, DayInNextMonth);
    
    sdate.setDate(validityEnd.getDate()+1);
  }
  //console.log("-----------------end # calcEndDate");
  //console.log(calcIsoDateStr(validityEnd));
  return validityEnd;
}

function calcIsoDateStr(date:Date) {
  const offset = date.getTimezoneOffset()
  var startBase = new Date(date.getTime() - (offset*60*1000))
  var startStr = startBase.toISOString().split('T')[0]
  return startStr;
}