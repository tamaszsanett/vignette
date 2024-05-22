interface BaseResponse {
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}

export async function useRemoveVignetteFromCartByMoth(
  itemKey: string,
  fromMonth: number,
  toMonth: number) {

  const cartKey = useCookie('cartKey');
  var items = [];

  for (let i = fromMonth+1; i <= toMonth; i++) {
    items.push(itemKey + "_" + i);
  }

  if (items.length > 0) {

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
        setTimeout(async function () {
          const response = await fetch(apiEndpointBase+"/RemoveFromCart", {
            method: 'DELETE',
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
};