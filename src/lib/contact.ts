/**
 * Phone helpers. Site Settings stores the number as displayed, e.g. "(412) 913 3089";
 * links and structured data need E.164, e.g. "+14129133089".
 */
export const phoneE164 = (phone?: string | null): string | null => {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  if (phone.trim().startsWith('+')) return `+${digits}`
  // Ten-digit numbers are North American (the business is in Pennsylvania).
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return `+${digits}`
}

export const telHref = (phone?: string | null) => {
  const e164 = phoneE164(phone)
  return e164 ? `tel:${e164}` : undefined
}

export const whatsappHref = (number?: string | null, text?: string) => {
  const e164 = phoneE164(number)
  if (!e164) return undefined
  return `https://wa.me/${e164.slice(1)}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
