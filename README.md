# Forma Studio — İç Mimarlık Web Sitesi

> React + Three.js ile geliştirilmiş modern, responsive iç mimarlık stüdyosu web sitesi.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.162-black?style=flat&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)

---

## ✨ Özellikler

- **3D Oda Animasyonu** — Hero bölümünde parçalarından birleşen wireframe iç mekan (Three.js)
- **Mouse Parallax** — 3D sahne fareyle kontrol edilebilir
- **Scroll Animasyonları** — Her bölüm, içeriğiyle bağlantılı özgün animasyonlarla açılır
- **Sayfa Geçiş Animasyonları** — Sayfalar arası akıcı fade + slide geçişleri
- **Karanlık / Aydınlık Mod** — Context API ile global tema yönetimi
- **Proje Detay Sayfaları** — Her proje için ayrı detay görünümü
- **Custom Dropdown** — Kütüphane kullanmadan sıfırdan yazılmış select komponenti
- **Form Validasyonu** — Custom hook ile gerçek zamanlı hata kontrolü
- **Custom Cursor** — useRef + requestAnimationFrame ile akıcı cursor animasyonu
- **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu; mobilde hamburger menü

---

## 🛠 Kullanılan Teknolojiler

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| React | 18 | UI framework |
| Three.js | 0.162 | 3D oda animasyonu |
| Vite | 5 | Build tool |
| CSS-in-JS | — | Inline stil yönetimi |

---

## 📁 Klasör Yapısı

```
forma-studio/
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── README.md
└── src/
    ├── App.jsx                        # Ana uygulama, sayfa yönlendirme
    ├── main.jsx
    ├── index.css                      # Global stiller, mobile reset
    │
    ├── context/
    │   └── ThemeContext.jsx           # Karanlık/aydınlık mod
    │
    ├── data/
    │   └── index.js                  # Proje, ekip, iletişim verileri
    │
    ├── hooks/
    │   ├── useInView.js              # IntersectionObserver — scroll animasyonu
    │   ├── useReveal.js              # Genel reveal animasyonu
    │   ├── useMediaQuery.js          # useIsMobile, useIsTablet
    │   └── useFormValidation.js      # Form doğrulama mantığı
    │
    ├── components/
    │   ├── HeroCanvas.jsx            # Three.js 3D oda animasyonu
    │   ├── Cursor.jsx                # Özel mouse cursor
    │   ├── Navbar.jsx                # Navigasyon (mobil hamburger menü dahil)
    │   ├── Footer.jsx
    │   ├── PageTransition.jsx        # Sayfa geçiş animasyonu
    │   ├── Dropdown.jsx              # Custom select komponenti
    │   └── SectionLabel.jsx
    │
    └── pages/
        ├── Hero.jsx                  # Ana sayfa hero — 3D animasyon
        ├── Projects.jsx              # Proje galerisi — mimari grid
        ├── ProjectDetail.jsx         # Proje detay sayfası
        ├── About.jsx                 # Hakkımızda + Ekip
        └── Contact.jsx               # İletişim formu
```

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/kullanici-adin/forma-studio.git

# Klasöre gir
cd forma-studio

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

### Production Build

```bash
npm run build
# dist/ klasörü oluşur — Netlify, Vercel vb. servislere deploy edilebilir
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti

| İsim | Renk | Kullanım |
|------|------|----------|
| Clay | `#c4a882` | Ana aksan |
| Rust | `#b05a3a` | Vurgu, CTA |
| Sage | `#8a9e84` | İkincil metin |
| Soil | `#3a2e24` | Başlıklar |

### Tipografi

- **Cormorant Garamond** — Başlıklar, serif
- **Outfit** — Gövde metni, UI elemanları, sans-serif

---

## 💡 Öğrenilen React & JS Kavramları

| Kavram | Nerede Kullanıldı |
|--------|-------------------|
| `useState` | Form, tema, sayfa, menü state yönetimi |
| `useEffect` | Event listener, IntersectionObserver, Three.js lifecycle |
| `useRef` | DOM erişimi, cursor animasyonu, rAF ID saklama |
| `useContext` | Global tema sistemi (dark/light mod) |
| Custom hooks | `useInView`, `useFormValidation`, `useMediaQuery` |
| Three.js | Sahne, kamera, geometri, malzeme, animasyon döngüsü |
| Component composition | Tekrar kullanılabilir `Field`, `Dropdown`, `SectionLabel` |
| Responsive design | `useIsMobile` hook + koşullu stil |

---

## 📝 Notlar

Bu proje [Claude](https://claude.ai) ile birlikte geliştirilmiştir.

---

## 📄 Lisans

MIT
