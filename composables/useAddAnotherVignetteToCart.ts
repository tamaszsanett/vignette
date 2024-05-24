import { ref } from 'vue';

interface BaseResponse {
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}

export async function useAddAnotherVignetteToCart(
  language: string,
  itemKey: string,
  currency: string,
  productCode: string, 
  durationType: string, 
  carCountry: string, 
  plateNumber: string, 
  validityStart: Date | null, 
  validityEnd: Date | null, 
  vignettePrice: number, 
  transactionFee: number,
  previousNumberOfMonths: number,
  numberOfMonths: number,
  counties: string[]) {

  const cartKey = useCookie('cartKey');

  var items = [{} as CartItem];

  // in case of day, week, year this is a simple question
  if (durationType == "DAY" || durationType == "WEEK" || durationType == "YEAR" )
  {
    items = [{
      cartItemKey: itemKey,
      productCode: productCode,
      quantity: 1,
      netUnitPrice: Math.round((vignettePrice + transactionFee) * 100 / 1.27) / 100,
      grossUnitPrice: vignettePrice + transactionFee,
      vat: 27,
      properties: [
        {
          key: "CountryCode",
          value: carCountry
        },{
          key: "PlateNumber",
          value: plateNumber
        },{
          key: "ValidityStart",
          value: validityStart == null ? "" : calcIsoDateStr(validityStart)
        },{
          key: "ValidityEnd",
          value: validityEnd == null ? "" : calcIsoDateStr(validityEnd)
        },{
          key: "VignettePrice",
          value: vignettePrice.toString()
        },{
          key: "TransactionFee",
          value: transactionFee.toString()
        }
      ]
    }];
  }
  // In case of MONTH duration type, add the different between previous and current month 
  else if (durationType == "MONTH")
  {
    var j = 0;

    let currentValidityStart = new Date();
    let currentValidityEnd = new Date();

    if (validityStart !== null && validityEnd !== null) {
      currentValidityStart = new Date(validityStart);
    }

    for (let i = 1; i <= numberOfMonths; i++)
      {
        currentValidityEnd = calcEndDate(new Date(currentValidityStart), 1);

        var startStr = calcIsoDateStr(currentValidityStart);
        var endStr = calcIsoDateStr(currentValidityEnd)
        console.log(startStr + " #> " + endStr);

        if (i >= previousNumberOfMonths + 1) // add to items if necesseraly
        {

          items[j] = {
            cartItemKey: itemKey + "_" + i,
            productCode: productCode,
            quantity: 1,
            netUnitPrice: Math.round((vignettePrice + transactionFee) * 100 / 1.27) / 100,
            grossUnitPrice: vignettePrice + transactionFee,
            vat: 27,
            properties: [
              {
                key: "CountryCode",
                value: carCountry
              },{
                key: "PlateNumber",
                value: plateNumber.toUpperCase()
              },{
                key: "ValidityStart",
                value: currentValidityStart == null ? "" : startStr
              },{
                key: "ValidityEnd",
                value: currentValidityEnd == null ? "" : endStr
              },{
                key: "VignettePrice",
                value: vignettePrice.toString()
              },{
                key: "TransactionFee",
                value: transactionFee.toString()
              }
            ]
          };

        j++;
      }
      
      currentValidityStart = new Date(currentValidityEnd);
      currentValidityStart.setDate(currentValidityStart.getDate()+1);
      }
  }
  else { // YEAR_11
    // for loup in counties
    for (let i = 0; i < counties.length; i++) {
      items[i] = {
        cartItemKey: itemKey + "_" + counties[i],
        productCode: counties[i],
        quantity: 1,
        netUnitPrice: Math.round((vignettePrice + transactionFee) * 100 / 1.27) / 100,
        grossUnitPrice: vignettePrice + transactionFee,
        vat: 27,
        properties: [
          {
            key: "CountryCode",
            value: carCountry
          },{
            key: "PlateNumber",
            value: plateNumber
          },{
            key: "ValidityStart",
            value: validityStart == null ? "" : calcIsoDateStr(validityStart)
          },{
            key: "ValidityEnd",
            value: validityEnd == null ? "" : calcIsoDateStr(validityEnd)
          },{
            key: "VignettePrice",
            value: vignettePrice.toString()
          },{
            key: "TransactionFee",
            value: transactionFee.toString()
          }
        ]
      };
    }
  }

  console.log(items);
  if (items.length > 0 && items[0].cartItemKey !== undefined)
    {
    const requestBody = {
      cartKey: cartKey.value,
      sessionId: "0",
      clientId: "0",
      serviceKey: "HungaryVignette",
      cultureKey: language,
      currency: currency,
      cartItems: items
    };

    const apiEndpointBase = 'https://test-gw.voxpay.hu/Webshop.Common';
    try {
      const response = await fetch(apiEndpointBase+"/AddToCart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) { // retry 1 sec later
        setTimeout(async function () {
          const response = await fetch(apiEndpointBase+"/AddToCart", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)});
            if (response.ok) {
              const data: BaseResponse = await response.json();
              return data;
            }
        }, 1000);
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