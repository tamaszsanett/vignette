export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      type: {
        empty_plate: "Filling in the registration number is mandatory!",
        invalid_plate: "The number plate is wrong. For example, it cannot contain a hyphen or does not meet the standard represented by your country.",
        incorrect_plate_num: "Incorrect number plate in Hungarian format!",
        car_country: "Car country",
        licence_plate_number: "License plate number",
        add_another_widget: "+ add another vignette",
        next: "next",
        back: "back",
        selected_box_title: "Selected vignettes",
        month: "month",
        day: "day",
        year: "year",
        total: "Total",
        select_country_placeholder: "Select a Country",
        regional_error: "Selecting a county is mandatory!",
        number_of_month: "How many months",
        validity_period: "Validity period",
        is_at_least_one_county_selected: "Selection of one county is mandatory!",
        image: {
          alt_vignette: "Vignette EN",
          desktop_path: "under-plate-number-line_en_EN.svg",
          mobile_path: "under-plate-number-line_en_EN.svg",
        },
        title: {
          year_11: "County region",
          weekly: "Weekly",
          monthly: "Monthly",
          annual: "Annual",
          ten_days: "10 day",
          after_title: "national highway sticker",
        },
      },
      invoice_data: {
        title: "Enter billing information",
        phone: "Phone number",
        mailTooltipText: "We will send the sticker confirmation to this address",
      }
    },
    de: {
      type: {
        empty_plate: "Das Ausfüllen der Registrierungsnummer ist Pflicht!",
        invalid_plate: "Das Nummernschild ist falsch. Es darf beispielsweise keinen Bindestrich enthalten oder entspricht nicht dem in Ihrem Land vertretenen Standard.",
        incorrect_plate_num: "Incorrect number plate in Hungarian format!",
        car_country: "Nationalitätszeichen",
        licence_plate_number: "Nummernschild",
        add_another_widget: "+ eine weitere Vignette hinzufügen",
        next: "nächste",
        back: "zurück",
        selectedBoxTitle: "Ausgewählte Vignetten",
        month: "Monat",
        day: "Tag",
        year: "Jahr",
        total: "Gesamt",
        select_country_placeholder: "Wähle ein Land",
        regional_error: "Die Auswahl eines Landkreises ist obligatorisch!",
        number_of_month: "Wie viele Monate",
        validity_period: "Gültigkeitszeitraum",
        is_at_least_one_county_selected: "Die Auswahl eines Landkreises ist zwingend erforderlich!",
        image: {
          alt_vignette: "Vignette DE",
          desktop_path: "under-plate-number-line_de_DE.svg",
          mobile_path: "under-plate-number-line_de-DE.svg",
        },
        title: {
          year_11: "Landkreisregion",
          annual: "Jährlich",
          weekly: "Wöchentlich",
          monthly: "Monatliche",
          ten_days: "10 Tag",
          after_title: "Nationalstraßenaufkleber",
        },
      },
      invoice_data: {
        title: "Enter billing information",
        phone: "Phone number",
        mailTooltipText: "We will send the sticker confirmation to this address",
      }
    },
  },
}));
