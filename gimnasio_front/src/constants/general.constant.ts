import { TSelectOptions } from "../components/form/SelectReact";

export const FONT_CHOICES = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Tahoma, sans-serif', label: 'Tahoma' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Lucida Console, monospace', label: 'Lucida Console' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Raleway, sans-serif', label: 'Raleway' },
  { value: 'Oswald, sans-serif', label: 'Oswald' },
  { value: 'Roboto Slab, serif', label: 'Roboto Slab' },
  { value: 'Merriweather, serif', label: 'Merriweather' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
];

export const opcionesFuentes: TSelectOptions = FONT_CHOICES.map((fuente) => ({
  value: fuente.value,
  label: fuente.label
}))