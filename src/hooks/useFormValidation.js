import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim())                          errors.name    = 'Ad soyad gerekli.'
  if (!form.email.trim())                         errors.email   = 'E-posta gerekli.'
  else if (!EMAIL_RE.test(form.email))            errors.email   = 'Geçerli bir e-posta girin.'
  if (!form.type)                                 errors.type    = 'Proje türü seçin.'
  if (!form.message.trim())                       errors.message = 'Mesajınızı yazın.'
  else if (form.message.trim().length < 10)       errors.message = 'En az 10 karakter girin.'
  return errors
}

export function useFormValidation() {
  const [form, setForm]         = useState({ name: '', email: '', type: '', budget: '', message: '' })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    // Simulate API call
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return { form, errors, submitted, loading, setField, setForm, submit }
}
