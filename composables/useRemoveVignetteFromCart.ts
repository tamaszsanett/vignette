interface BaseResponse {
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}

export async function useRemoveVignetteFromCart(
  itemKey: string,
  durationType: string,
  numberOfMonths: number,
  counties: string[]) {

  const cartKey = useCookie('cartKey');
  var items = [];

  // in case of day, week, year this is a simple question
  if (durationType == "DAY" || durationType == "WEEK" || durationType == "YEAR") {
    items = [itemKey];
  }
  // In case of MONTH duration type, add the different between previous and current month 
  else if (durationType == "MONTH") {
    for (let i = 1; i <= numberOfMonths; i++) {
      items[i - 1] = itemKey + "_" + i
    }
  }
  else { // YEAR_11
    // for loup in counties
    for (let i = 0; i < counties.length; i++) {
      items[i] = itemKey + "_" + counties[i];
    }
  }

  if (items.length > 0)
    {

  const requestBody = {
    cartKey: cartKey.value,
    cartItemKeys: items
  };
  
  const apiEndpointBase = 'https://test-gw.voxpay.hu/Webshop.Common';
  try {
    const response = await fetch(apiEndpointBase + "/RemoveFromCart", {
      method: 'DELETE',
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
};