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
          value: validityStart == null ? "" : validityStart.toISOString()
        },{
          key: "ValidityEnd",
          value: validityEnd == null ? "" : validityEnd.toISOString()
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
    for (let i = previousNumberOfMonths+1; i <= numberOfMonths; i++)
      {
        
        if (validityStart !== null && validityEnd !== null) {

          let currentValidityStart = new Date(validityStart.toISOString());
          let currentValidityEnd = new Date(validityStart.toISOString());

          currentValidityStart.setMonth(validityStart.getMonth() + i-1);
          currentValidityEnd.setMonth(validityStart.getMonth() + i);


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
              value: plateNumber
            },{
              key: "ValidityStart",
              value: currentValidityStart == null ? "" : currentValidityStart.toISOString().substring(0,10)
            },{
              key: "ValidityEnd",
              value: currentValidityEnd == null ? "" : currentValidityEnd.toISOString().substring(0,10)
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
            value: validityStart == null ? "" : validityStart.toISOString()
          },{
            key: "ValidityEnd",
            value: validityEnd == null ? "" : validityEnd.toISOString()
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