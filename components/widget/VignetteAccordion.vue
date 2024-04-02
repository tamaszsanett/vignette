<template>
    <AccordionComponent
      :content="accordionContent.content"
      :mainTitle="accordionContent.mainTitle"
      containerClass="max-w-[856px] mx-auto w-full"
      titleClass="bg-green-grad"
      descClass="vignette-title-desc"
      iconClass="green-arrow"
    ></AccordionComponent>
  </template>
  <script setup>
  
  const accordionContent = ref({
    mainTitle: "Motorway vignette Hungary - Highway sticker purchase 2023",
    mainIcon:
      "https://www.new.hungary-vignette.eu/Content/new-site-content/!_icon.svg",
    content: [
      {
        title: "When should the highway sticker be purchased?",
        desc: "In accord with effective regulations, the e-sticker must always be purchased before entering a toll road (practically before the journey). Always purchase stickers prior to travel: e-sticker purchase has no retroactive validity; stickers purchased after travel means any previous travel is qualified as unauthorized road usage and a driver is subject to a surcharge.",
      },
      {
        title: "What to consider after a purchase?",
        desc: "A dated email confirming purchase is sent to the customer following a successful transaction. Retain the notification: it confirms authorization. Printing the authorization is unnecessary, but please retain the electronic version; it certifies authorization for highway use. When buying a highway sticker, financial performance itself does not automatically authorize highway use. If an email confirmation is not received, please call our Customer Service number. If a Customer enters a toll road without a valid receipt, they accept all responsibility and any possible fines. The Service Provider bears no responsibility.",
      },
      {
        title:
          "How is an official invoice received after purchase?How is an official invoice received after purchase?",
        desc: "When selecting a sticker, check the box indicating an invoice is required and then enter an invoicing address. By clicking on the link that appears after successful purchase the invoice can be viewed and printed. An email will be received later to allow invoice viewing or printing. Only a printed invoice is valid.",
      },
      {
        title:
          "How long will I not be fined, what should I do if I drive onto a motorway",
        desc: "If you have driven onto the toll road network by mistake, you have a maximum of 60 minutes from the moment you drive onto the toll road to buy your toll entitlement. Don't forget to buy a sticker - even a weekly (10-day) sticker purchase can save you a significant surcharge.",
      },
      {
        title: "Why did I get a penalty?",
        desc: "The most common reason for a penalty is a missing sticker, i.e., driving on a toll road for which you are not entitled to use. In addition to missing stickers, the most common offences are registration plate misprints, using the road outside the period of validity, incorrect vehicle tariff category and incorrect registration plate.",
      },
      {
        title: "I have been penalised, how can I ask for information, complain?",
        desc: "In case of problems with toll sticker surcharges, penalties, road use and sticker administration (e.g.: overwriting, number plate replacement, windscreen replacement, lost card), please contact the National Toll Payment Service Ltd. The customer service telephone number of the NÚSZ Zrt. is +36-36-587-500 and is available 24 hours a day. Before making a complaint, it is advisable to check the details of the surcharge against the confirmation and the ticket you received when you bought the toll sticker.",
      },
    ],
  });
  </script>
  