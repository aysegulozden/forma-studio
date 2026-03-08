# Forma Studio — İç Mimarlık Web Sitesi

React + Vite ile geliştirilmiş iç mimarlık stüdyosu web sitesi.

## Özellikler

- 🌗 Karanlık / Aydınlık mod
- 🗂 Proje detay sayfaları
- ✅ Form validasyonu
- 🖱 Özel cursor animasyonu
- 📱 Responsive tasarım

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## Klasör Yapısı

```
src/
├── App.jsx                  # Ana uygulama, sayfa yönlendirme
├── main.jsx                 # React entry point
├── index.css                # Global stiller
├── context/
│   └── ThemeContext.jsx     # Dark/light mod yönetimi
├── data/
│   └── index.js             # Proje ve ekip verileri
├── hooks/
│   ├── useReveal.js         # Scroll animasyonu hook
│   └── useFormValidation.js # Form doğrulama hook
├── components/
│   ├── Cursor.jsx           # Özel mouse cursor
│   ├── Navbar.jsx           # Navigasyon
│   ├── Footer.jsx           # Alt bilgi
│   └── SectionLabel.jsx     # Tekrar eden bölüm etiketi
└── pages/
    ├── Hero.jsx             # Ana sayfa hero
    ├── Projects.jsx         # Proje galerisi
    ├── ProjectDetail.jsx    # Proje detay sayfası
    ├── About.jsx            # Hakkımızda + Ekip
    └── Contact.jsx          # İletişim formu
```
