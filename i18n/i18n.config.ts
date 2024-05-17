export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      vignette_type: {
        D124: "D1 - 1 day",
        D110: "D1 - 10 days",
        D130: "D1 - 30 days",
        D1365: "D1 - 1 year",
        D1365_11: "Bács-Kiskun county",
        D1365_12: "Baranya county",
        D1365_13: "Békés county",
        D1365_14: "Borsod-Abaúj-Zemplén county",
        D1365_15: "Csongrád county",
        D1365_16: "Fejér county",
        D1365_17: "Győr-Moson-Sopron county",
        D1365_18: "Hajdú-Bihar county",
        D1365_19: "Heves county",
        D1365_20: "Jász-Nagykun-Szolnok county",
        D1365_21: "Komárom-Esztergom county",
        D1365_23: "Pest county",
        D1365_24: "Somogy county",
        D1365_25: "Szabolcs-Szatmár-Bereg county",
        D1365_26: "Tolna county",
        D1365_27: "Vas county",
        D1365_28: "Veszprém county",
        D1365_29: "Zala county",
        D1M24: "D1M - 1 day",
        D1M10: "D1M - 10 days",
        D1M30: "D1M - 30 days",
        D224: "D2 - 1 day",
        D210: "D2 - 10 days",
        D230: "D2 - 30 days",
        D2365: "D1 - 1 year",
        D2365_11: "Bács-Kiskun county",
        D2365_12: "Baranya county",
        D2365_13: "Békés county",
        D2365_14: "Borsod-Abaúj-Zemplén county",
        D2365_15: "Csongrád county",
        D2365_16: "Fejér county",
        D2365_17: "Győr-Moson-Sopron county",
        D2365_18: "Hajdú-Bihar county",
        D2365_19: "Heves county",
        D2365_20: "Jász-Nagykun-Szolnok county",
        D2365_21: "Komárom-Esztergom county",
        D2365_23: "Pest county",
        D2365_24: "Somogy county",
        D2365_25: "Szabolcs-Szatmár-Bereg county",
        D2365_26: "Tolna county",
        D2365_27: "Vas county",
        D2365_28: "Veszprém county",
        D2365_29: "Zala county",
        U24: "U - 1 day",
        U10: "U - 10 days",
        U30: "U - 30 days",
        U365: "U - 1 year",
        U365_11: "Bács-Kiskun county",
        U365_12: "Baranya county",
        U365_13: "Békés county",
        U365_14: "Borsod-Abaúj-Zemplén county",
        U365_15: "Csongrád county",
        U365_16: "Fejér county",
        U365_17: "Győr-Moson-Sopron county",
        U365_18: "Hajdú-Bihar county",
        U365_19: "Heves county",
        U365_20: "Jász-Nagykun-Szolnok county",
        U365_21: "Komárom-Esztergom county",
        U365_23: "Pest county",
        U365_24: "Somogy county",
        U365_25: "Szabolcs-Szatmár-Bereg county",
        U365_26: "Tolna county",
        U365_27: "Vas county",
        U365_28: "Veszprém county",
        U365_29: "Zala county",
        "1week": "1 week",
        "1day": "1 day",
        "1year": "1 year",
        "1month": "1 month",
        "2month": "2 months",
        "3month": "3 months",
        "4month": "4 months",
        "5month": "5 months",
      },
      type: {
        empty_plate: "Filling in the registration number is mandatory!",
        plate_number_duplicated: "Plate number duplicated on same time",
        invalid_plate:
          "The number plate is wrong. For example, it cannot contain a hyphen or does not meet the standard represented by your country.",
        plate_num_required: "Plate number required!",
        car_country: "Car country",
        licence_plate_number: "License plate number",
        add_another_widget: "add another vignette",
        next: "Next",
        back: "Back",
        selected_box_title: "Selected vignettes",
        month: "month",
        day: "day",
        year: "year",
        select_country_placeholder: "Select a Country",
        regional_error: "Choose at least one county!",
        number_of_month: "Number of month",
        validity_period: "Validity period",
        is_at_least_one_county_selected: "Choose at least one county!",
        plate_num_paceholder: "e.g. ABC-123",
        country_error: "Country required!",
        image: {
          alt_vignette: "Vignette",
          desktop_path: "under-plate-number-line_en_EN.svg",
          mobile_path: "under-plate-number-line_en_EN.svg",
          desktop_billing: "under-invoice-data-line_en_EN.svg",
          mobile_billing: "under-invoice-data-line_en_EN.svg",
        },
        title: {
          year_11: "County region",
          weekly: "Weekly",
          monthly: "Monthly",
          annual: "Annual",
          ten_days: "10 day",
          daily: "Daily",
          one_day: "1-day",
          after_title: "national highway vignette",
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
          "We will send the vignette confirmation to this address",
        email: "E-mail",
        phone_tooltip_text: "In case of connection problems",
        invoice_request_title: "I would like a VAT invoice",
        request_title_tooltip_text:
          "If you want an invoice, please check the I want an invoice option",
        request_after_text1:
          "If you want an invoice, please check the I want an invoice option. We are unable to issue an invoice afterwards.",
        request_after_text2:
          "Without requesting a VAT invoice, you can only pay by credit card on our website",
        company: "Company",
        private_person: "Private person",
        checkbox_tooltip_text: "Your selection is mandatory",
        company_name: "Company name",
        private_name: "Name",
        name_tooltip_text: "Billing Name/Company Name",
        country: "Country",
        country_tooltip_text: "Billing Country",
        zip_code: "Invoice ZIP code",
        tax_number: "Tax Number",
        city: "City",
        address: "Address (street, number)",
        tax_number_tooltip_text: "Filling in the tax number is mandatory!",
        zip_code_tooltip_text: "Billing Zip Code",
        city_tooltip_text: "Billing City",
        address_tooltip_text: "Billing address (street, house number)",
        company_name_placeholder: "Start writing for suggestions...",
        zip_code_placeholder: "Start writing for suggestions...",
      },
      confirm: {
        main_title: "Check the entered data",
        phone_number: "Phone number:",
        email_address: "E-mail address:",
        vignette_info: {
          vignette_type_title: "Vignette type:",
          plate_number: "Plate number:",
          car_country: "Car country:",
          validity_period: "Validity period:",
        },
        billing_info: {
          title: "Billing information",
          name_title: "Name / Company name:",
          country: "Country:",
          zip_code: "Zip code:",
          city: "City:",
          address: "Address (street, number):",
        },
        price: {
          price_title: "Vignette price:",
          convenience_fee: "Convenience fee:",
          total: "Total:",
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
          barion_accordion_title:
            "Payment takes place through Barion’s secure payment page.",
          barion_desc:
            "Instead of entering the bank card data on the Barion payment interface, you can also choose the Barion wallet, Apple Pay or Google Pay payment option.",
          subscribe_label: "Subscribe vignette newsletter!",
          terms_label: `I state that I have read and accepted the
            <a class="whiteLink" href="https://new-hungary-vignette.voxpay.hu/en/gtcc" target="_blank">General Terms and Conditions of Contract</a>
            as well as the
            <a class="whiteLink" target="_blank" href="https://new-hungary-vignette.voxpay.hu/en/privacy">Privacy Statement</a>
            and I consent to the data management contained therein.`,
          important_text:
            "You can only drive onto the highway if, after payment, you have received a confirmation of successful vignette validation by e-mail or in your browser.",
          important_text_old:
            "IMPORTANT! Using the motorway is only allowed with a valid vignette!",
          back: "Back",
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
          contact_us_text: `If you think that your payment was successful, but the vignette
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
          mail: "support[at]hungary-vignette.eu",
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
      resend: {
        title: "Resend vignette confirmation",
        desc: `
          Resend confirmation of e-vignettes bought exclusively from
          <a href="http://www.ungarn-vignette.eu">www.ungarn-vignette.eu</a>,
          <a href="http://www.hungary-vignette.eu">www.hungary-vignette.eu</a>
          &nbsp;&nbsp; and
          <a href="http://www.autopalyamatrica.hu/">autopalyamatrica.hu</a>
          within the last 8 hours, to the email address provided when purchasing
          the vignettes.
        `,
        important_text: "Please take special care to enter the e-mail address used at the time of purchase.",
        email_label: "E-mail",
        reg_plate_num: "Registration plate number",
        mail_tooltip_text: "E-mail address used when purchasing a motorway sticker.",
        reg_num_tooltip_text: `The registration number of the vehicle whose road use
          authorization you are querying. Only English ABC letters and
          numbers can be used (e.g. ABC123)`,
        checkbox_label: ` I declare that the <a class="base-link" href="/privacy">Privacy Statement</a>
        I have read and accept it, I consent to the data processing included
        in it.`,
        resend_btn_title: "Resend notification",
      },
    },
    de: {
      vignette_type: {
        D124: "D1 - 1 day",
        D110: "D1 - 10 days",
        D130: "D1 - 30 days",
        D1365: "D1 - 1 year",
        D1365_11: "Bács-Kiskun county",
        D1365_12: "Baranya county",
        D1365_13: "Békés county",
        D1365_14: "Borsod-Abaúj-Zemplén county",
        D1365_15: "Csongrád county",
        D1365_16: "Fejér county",
        D1365_17: "Győr-Moson-Sopron county",
        D1365_18: "Hajdú-Bihar county",
        D1365_19: "Heves county",
        D1365_20: "Jász-Nagykun-Szolnok county",
        D1365_21: "Komárom-Esztergom county",
        D1365_23: "Pest county",
        D1365_24: "Somogy county",
        D1365_25: "Szabolcs-Szatmár-Bereg county",
        D1365_26: "Tolna county",
        D1365_27: "Vas county",
        D1365_28: "Veszprém county",
        D1365_29: "Zala county",
        D224: "D2 - 1 day",
        D210: "D2 - 10 days",
        D230: "D2 - 30 days",
        D2365: "D1 - 1 year",
        D2365_11: "Bács-Kiskun county",
        D2365_12: "Baranya county",
        D2365_13: "Békés county",
        D2365_14: "Borsod-Abaúj-Zemplén county",
        D2365_15: "Csongrád county",
        D2365_16: "Fejér county",
        D2365_17: "Győr-Moson-Sopron county",
        D2365_18: "Hajdú-Bihar county",
        D2365_19: "Heves county",
        D2365_20: "Jász-Nagykun-Szolnok county",
        D2365_21: "Komárom-Esztergom county",
        D2365_23: "Pest county",
        D2365_24: "Somogy county",
        D2365_25: "Szabolcs-Szatmár-Bereg county",
        D2365_26: "Tolna county",
        D2365_27: "Vas county",
        D2365_28: "Veszprém county",
        D2365_29: "Zala county",
        D1M24: "D1 - 1 day",
        D1M110: "D1 - 10 days",
        D1M130: "D1 - 30 days",
        D1M365: "D1 - 1 year",
        D1M365_11: "Bács-Kiskun county",
        D1M365_12: "Baranya county",
        D1M365_13: "Békés county",
        D1M365_14: "Borsod-Abaúj-Zemplén county",
        D1M365_15: "Csongrád county",
        D1M365_16: "Fejér county",
        D1M365_17: "Győr-Moson-Sopron county",
        D1M365_18: "Hajdú-Bihar county",
        D1M365_19: "Heves county",
        D1M365_20: "Jász-Nagykun-Szolnok county",
        D1M365_21: "Komárom-Esztergom county",
        D1M365_23: "Pest county",
        D1M365_24: "Somogy county",
        D1M365_25: "Szabolcs-Szatmár-Bereg county",
        D1M365_26: "Tolna county",
        D1M365_27: "Vas county",
        D1M365_28: "Veszprém county",
        D1M365_29: "Zala county",
        U24: "U - 1 day",
        U110: "U - 10 days",
        U130: "U - 30 days",
        U365: "U - 1 year",
        U365_11: "Bács-Kiskun county",
        U365_12: "Baranya county",
        U365_13: "Békés county",
        U365_14: "Borsod-Abaúj-Zemplén county",
        U365_15: "Csongrád county",
        U365_16: "Fejér county",
        U365_17: "Győr-Moson-Sopron county",
        U365_18: "Hajdú-Bihar county",
        U365_19: "Heves county",
        U365_20: "Jász-Nagykun-Szolnok county",
        U365_21: "Komárom-Esztergom county",
        U365_23: "Pest county",
        U365_24: "Somogy county",
        U365_25: "Szabolcs-Szatmár-Bereg county",
        U365_26: "Tolna county",
        U365_27: "Vas county",
        U365_28: "Veszprém county",
        U365_29: "Zala county",
      },
      type: {
        empty_plate: "Das Ausfüllen der Registrierungsnummer ist Pflicht!",
        plate_number_duplicated: "Plate number duplicated on same time",
        invalid_plate:
          "Das Nummernschild ist falsch. Es darf beispielsweise keinen Bindestrich enthalten oder entspricht nicht dem in Ihrem Land vertretenen Standard.",
        plate_num_required: "Plate number required!",
        car_country: "Nationalitätszeichen",
        licence_plate_number: "Nummernschild",
        add_another_widget: "eine weitere Vignette hinzufügen",
        next: "Nächste",
        back: "Zurück",
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
          alt_vignette: "Vignette",
          desktop_path: "under-plate-number-line_de_DE.svg",
          mobile_path: "under-plate-number-line_de_DE.svg",
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
          "We will send the vignette confirmation to this address",
        email: "E-mail",
        phone_tooltip_text: "In case of connection problems",
        invoice_request_title: "I would like a VAT invoice",
        request_title_tooltip_text:
          "If you want an invoice, please check the I want an invoice option",
        request_after_text1:
          "If you want an invoice, please check the I want an invoice option. We are unable to issue an invoice afterwards.",
        request_after_text2:
          "Without requesting a VAT invoice, you can only pay by credit card on our website",
        company: "Company",
        private_person: "Private person",
        checkbox_tooltip_text: "Your selection is mandatory",
        company_name: "Company name",
        private_name: "Name",
        name_tooltip_text: "Billing Name/Company Name",
        country: "Country",
        country_tooltip_text: "Billing Country",
        zip_code: "Invoice ZIP code",
        tax_number: "Tax Number",
        city: "City",
        address: "Address (street, number)",
        tax_number_tooltip_text: "Filling in the tax number is mandatory!",
        zip_code_tooltip_text: "Billing Zip Code",
        city_tooltip_text: "Billing City",
        address_tooltip_text: "Billing address (street, house number)",
        company_name_placeholder: "Start writing for suggestions...",
        zip_code_placeholder: "Start writing for suggestions...",
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
          barion_accordion_title:
            "Payment takes place through Barion’s secure payment page.",
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
          back: "Back",
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
          contact_us_text: `If you think that your payment was successful, but the vignette
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
