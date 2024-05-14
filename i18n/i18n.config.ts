export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      type: {
        empty_plate: "Filling in the registration number is mandatory!",
        invalid_plate:
          "The number plate is wrong. For example, it cannot contain a hyphen or does not meet the standard represented by your country.",
        plate_num_required: "Plate number required!",
        car_country: "Car country",
        licence_plate_number: "License plate number",
        add_another_widget: "add another vignette",
        next: "next",
        back: "back",
        selected_box_title: "Selected vignettes",
        month: "month",
        day: "day",
        year: "year",
        select_country_placeholder: "Select a Country",
        regional_error: "Selecting a county is mandatory!",
        number_of_month: "How many months",
        validity_period: "Validity period",
        is_at_least_one_county_selected:
          "Selection of one county is mandatory!",
        plate_num_placeholder: "e.g. ABC-123",
        country_error: "Country required!",
        image: {
          alt_vignette: "Vignette",
        },
        title: {
          year_11: "County region",
          weekly: "Weekly",
          monthly: "Monthly",
          annual: "Annual",
          ten_days: "10 day",
          daily: "Daily",
          one_day: "1-day",
          after_title: "national highway sticker",
        },
        purchase_calculator: {
          title: "Selected vignettes",
          total: "Total",
          one_day: "1 day",
          currency: "€",
          day: "day",
          month: "month",
        },
      },
      billing: {
        title: "Enter billing information",
        phone: "Phone number",
        mail_tooltip_text:
          "We will send the sticker confirmation to this address",
        email: "E-mail",
        phone_tooltip_text: "In case of connection problems",
        invoice_request_title: "I would like a VAT invoice",
        request_title_tooltip_text:
          "If you want to pay by bank transfer, please check the I want an invoice option",
        request_after_text1:
          "If you want to pay by bank transfer, please check the I want an invoice option. We are unable to issue an invoice afterwards.",
        request_after_text2:
          "Without requesting a VAT invoice, you can only pay by credit card on our website",
        company: "Company",
        private_person: "Private person",
        checkbox_tooltip_text: "Your selection is mandatory",
        company_name: "Company name",
        private_name: "Name",
        name_tooltip_text: "Billing Name/Company Name",
        country: "Country",
        billing_country: "Billing Country",
        zip_code: "Invoice ZIP code",
        tax_number: "Tax Number",
        city: "City",
        address: "Address (street, number)",
        tax_number_tooltip_text: "Filling in the tax number is mandatory!",
        zip_code_tooltip_text: "Billing Zip Code",
        city_tooltip_text: "Billing City",
        address_tooltip_text: "Billing address (street, house number)",
      },
      confirm: {
        main_title: "Check the entered data",
        phone_number: "Phone number:",
        email_address: "E-mail address:",
        vignette_info: {
          vignette_type_title: "Vignette type",
          plate_number: "Plate number",
          car_country: "Car country",
          validity_period: "Validity period",
        },
        billing_info: {
          title: "Billing information",
          name_title: "Name / Company name",
          country: "Country",
          zip_code: "Zip code",
          city: "City",
          address: "Address (street, number)",
        },
        price: {
          price_title: "Vignette price",
          convenience_fee: "Convenience fee",
          total: "Total",
          currency: "EUR",
        },
        errors: {
          payment_required: "Payment method required!",
          terms_error:
            "Terms and Conditions and Privacy Statement are required!",
        },
        payment: {
          title: "Choice of payment method",
          card_type_label_barion: "Bank card - Barion",
          barion_desc:
            "Instead of entering the bank card data on the Barion payment interface, you can also choose the Barion wallet, Apple Pay or Google Pay payment option.",
          subscribe_label: "Subscribe vignette newsletter!",
          terms_label: `I state that I have read and accepted the
            <a class="whiteLink" href="https://www.new.hungary-vignette.eu/gtcc" target="_blank">General Terms and Conditions of Contract</a>
            as well as the
            <a class="whiteLink" target="_blank" href="https://www.new.hungary-vignette.eu/privacy">Privacy Statement</a>
            and I consent to the data management contained therein. I accept the terms and conditions of use.`,
          important_text:
            "You can only drive onto the highway if, after payment, you have received a confirmation of successful vignette validation by e-mail or in your browser.",
          important_text_old:
            "IMPORTANT! Using the motorway is only allowed with a valid vignette!",
          back: "back",
          order_vignette_btn_title: "Order vignette",
        },
      },
      confirm_failed: {
        title: "Vignette purchase failed!",
        payment_result_text: "Payment result",
        payment_result_desc: `In the case of online bank card purchases, due to the strong
          customer authentication introduced on January 1st, the rate of
          unsuccessful payments increased in the initial period.`,
        reorder_btn_title: "Reorder",
        card: {
          contact_us_text: `If you think that your payment was successful, but the sticker
            validation failed, please contact us!`,
          important_text: `IMPORTANT: The fact that the financial performance has been
            fulfilled does not automatically mean that you are entitled to
            use the track! You can only drive onto the highway if you have
            a successful vignette after paying received confirmation of
            validation by e-mail, or in your browser.`,
        },
      },
      confirm_successful: {
        title: "Successful vignette orders",
        card: {
          download_order_btn_title: "Download order summary",
          ty_text: "Thank you for your purchase!",
          info_text: "We will send you the purchase receipt by e-mail.",
          spam_text: `ATTENTION: if you can't find the notification letter, look for
            it in the SPAM folder of your account.`,
        },
      },
      confirm_under_payment: {
        title: "Transaction being processed",
        card: {
          refresh_text:
            "To review the result, please refresh the page in some seconds!",
          refresh_btn_title: "Refresh",
          info_text: `Please check your mailbox. <br />We will send you confirmation
            of the successful purchase and the validation of the vignette!`,
        },
      },
      global: {
        contact_data: {
          title: "Customer Service:",
          phone: "Phone: (36-1) 225-7603",
          email_title: "E-mail:",
          mail: "support@hungary-vignette.eu",
        },
        confirm_trid: {
          trans_id: "Transaction identifier",
          e_mail: "E-mail",
          table_plate_num_title: "License plate number",
          table_validity_period_title: "Validity period",
          table_vignette_num_title: "Vignette number",
          card_time_text: `<p>
            <strong>Payment by bank card</strong> will take only a few
            minutes.
          </p>`,
        },
      },
    },
    de: {
      type: {
        empty_plate: "Das Ausfüllen der Registrierungsnummer ist Pflicht!",
        invalid_plate:
          "Das Nummernschild ist falsch. Es darf beispielsweise keinen Bindestrich enthalten oder entspricht nicht dem in Ihrem Land vertretenen Standard.",
        plate_num_required: "Plate number required!",
        car_country: "Nationalitätszeichen",
        licence_plate_number: "Nummernschild",
        add_another_widget: "eine weitere Vignette hinzufügen",
        next: "nächste",
        back: "zurück",
        selected_box_title: "Ausgewählte Vignetten",
        month: "Monat",
        day: "Tag",
        year: "Jahr",
        select_country_placeholder: "Wähle ein Land",
        regional_error: "Die Auswahl eines Landkreises ist obligatorisch!",
        number_of_month: "Wie viele Monate",
        validity_period: "Gültigkeitszeitraum",
        is_at_least_one_county_selected:
          "Die Auswahl eines Landkreises ist zwingend erforderlich!",
        plate_num_placeholder: "e.g. ABC-123",
        country_error: "Country required!",
        image: {
          alt_vignette: "Vignette DE",
        },
        title: {
          year_11: "Landkreisregion",
          weekly: "Wöchentlich",
          monthly: "Monatliche",
          annual: "Jährlich",
          ten_days: "10 Tag",
          daily: "Täglich",
          one_day: "1 Tag alt",
          after_title: "Nationalstraßenaufkleber",
        },
        purchase_calculator: {
          title: "Ausgewählte Vignetten",
          total: "Gesamt",
        },
      },
      billing: {
        title: "Enter billing information",
        phone: "Phone number",
        mail_tooltip_text:
          "We will send the sticker confirmation to this address",
        email: "E-mail",
        phone_tooltip_text: "In case of connection problems",
        invoice_request_title: "I would like a VAT invoice",
        request_title_tooltip_text:
          "If you want to pay by bank transfer, please check the I want an invoice option",
        request_after_text1:
          "If you want to pay by bank transfer, please check the I want an invoice option. We are unable to issue an invoice afterwards.",
        request_after_text2:
          "Without requesting a VAT invoice, you can only pay by credit card on our website",
        company: "Company",
        private_person: "Private person",
        checkbox_tooltip_text: "Your selection is mandatory",
        company_name: "Company name",
        private_name: "Name",
        name_tooltip_text: "Billing Name/Company Name",
        country: "Country",
        billing_country: "Billing Country",
        zip_code: "Invoice ZIP code",
        tax_number: "Tax Number",
        city: "City",
        address: "Address (street, number)",
        tax_number_tooltip_text: "Filling in the tax number is mandatory!",
        zip_code_tooltip_text: "Billing Zip Code",
        city_tooltip_text: "Billing City",
        address_tooltip_text: "Billing address (street, house number)",
      },
      confirm: {
        main_title: "Check the entered data",
        phone_number: "Phone number:",
        email_address: "E-mail address:",
        vignette_info: {
          vignette_type_title: "Vignette type",
          plate_number: "Plate number",
          car_country: "Car country",
          validity_period: "Validity period",
        },
        billing_info: {
          title: "Billing information",
          name_title: "Name / Company name",
          country: "Country",
          zip_code: "Zip code",
          city: "City",
          address: "Address (street, number)",
        },
        price: {
          price_title: "Vignette price",
          convenience_fee: "Convenience fee",
          total: "Total",
          currency: "EUR",
        },
        errors: {
          payment_required: "Payment method required!",
          terms_error:
            "Terms and Conditions and Privacy Statement are required!",
        },
        payment: {
          title: "Choice of payment method",
          card_type_label_barion: "Bank card - Barion",
          barion_desc:
            "Instead of entering the bank card data on the Barion payment interface, you can also choose the Barion wallet, Apple Pay or Google Pay payment option.",
          subscribe_label: "Subscribe vignette newsletter!",
          terms_label: `I state that I have read and accepted the
            <a class="whiteLink" href="https://www.new.hungary-vignette.eu/gtcc" target="_blank">General Terms and Conditions of Contract</a>
            as well as the
            <a class="whiteLink" target="_blank" href="https://www.new.hungary-vignette.eu/privacy">Privacy Statement</a>
            and I consent to the data management contained therein. I accept the terms and conditions of use.`,
          important_text:
            "You can only drive onto the highway if, after payment, you have received a confirmation of successful vignette validation by e-mail or in your browser.",
          important_text_old:
            "IMPORTANT! Using the motorway is only allowed with a valid vignette!",
          back: "back",
          order_vignette_btn_title: "Order vignette",
        },
      },
      confirm_failed: {
        title: "Vignette purchase failed!",
        payment_result_text: "Payment result",
        payment_result_desc: `In the case of online bank card purchases, due to the strong
          customer authentication introduced on January 1st, the rate of
          unsuccessful payments increased in the initial period.`,
        reorder_btn_title: "Reorder",
        card: {
          contact_us_text: `If you think that your payment was successful, but the sticker
            validation failed, please contact us!`,
          important_text: `IMPORTANT: The fact that the financial performance has been
            fulfilled does not automatically mean that you are entitled to
            use the track! You can only drive onto the highway if you have
            a successful vignette after paying received confirmation of
            validation by e-mail, or in your browser.`,
        },
      },
      confirm_successful: {
        title: "Successful vignette orders",
        card: {
          download_order_btn_title: "Download order summary",
          ty_text: "Thank you for your purchase!",
          info_text: "We will send you the purchase receipt by e-mail.",
          spam_text: `ATTENTION: if you can't find the notification letter, look for
            it in the SPAM folder of your account.`,
        },
      },
      confirm_under_payment: {
        title: "Transaction being processed",
        card: {
          refresh_text:
            "To review the result, please refresh the page in some seconds!",
          refresh_btn_title: "Refresh",
          info_text: `Please check your mailbox. <br />We will send you confirmation
            of the successful purchase and the validation of the vignette!`,
        },
      },
      global: {
        contact_data: {
          title: "Customer Service:",
          phone: "Phone: (36-1) 225-7603",
          email_title: "E-mail:",
          mail: "support@hungary-vignette.eu",
        },
        confirm_trid: {
          trans_id: "Transaction identifier",
          e_mail: "E-mail",
          table_plate_num_title: "License plate number",
          table_validity_period_title: "Validity period",
          table_vignette_num_title: "Vignette number",
          card_time_text: `<p>
            <strong>Payment by bank card</strong> will take only a few
            minutes.
          </p>`,
        },
      },
    },
  },
}));
