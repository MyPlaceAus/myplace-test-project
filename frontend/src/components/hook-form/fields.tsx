import { RHFTextArea } from './rhf-textarea';
import { RHFTextField } from './rhf-text-field';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFSelect, RHFMultiSelect } from './rhf-select';
import { RHFDatePicker, RHFTimePicker, RHFDateTimePicker } from './rhf-date-picker';

// ----------------------------------------------------------------------

export const Field = {
  Select: RHFSelect,

  Text: RHFTextField,

  TextArea: RHFTextArea,

  RadioGroup: RHFRadioGroup,
  MultiSelect: RHFMultiSelect,

  Autocomplete: RHFAutocomplete,

  // Pickers
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  DateTimePicker: RHFDateTimePicker,
};
