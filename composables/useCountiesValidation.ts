import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useCountiesValidation(selectedCounties: Ref<string[]>) {
  const { t } = useI18n();

  const isAtLeastOneCountySelected = computed(() => {
    return selectedCounties.value.length > 0;
  });

  const errorCountiesMessage = ref("");

  const validateCounties = async () => {
    if (!isAtLeastOneCountySelected.value) {
      // If no county is selected, set the error message
      errorCountiesMessage.value = t("type.is_at_least_one_county_selected");
      return false;
    }
    return true; // Return true to indicate successful validation
  };

  return { isAtLeastOneCountySelected, validateCounties, errorCountiesMessage };
}