export type FieldErrors = Partial<Record<string, string>>
export type QuoteState = { error?: string; fieldErrors?: FieldErrors; values?: Record<string, string>; attempt?: number }

export const quantityUnits = ['pieces', 'dozens', 'cases', 'cartons', 'pounds'] as const

export const inquiryTypes = [
  { value: 'pricing', label: 'Pricing' },
  { value: 'samples', label: 'Samples' },
  { value: 'custom-sourcing', label: 'Custom sourcing' },
] as const

export type InquiryType = (typeof inquiryTypes)[number]['value']
