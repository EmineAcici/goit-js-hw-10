# GoIT JavaScript Homework 10 - Asenkron JavaScript ve Promise Yapısı

Bu proje, GoIT Full Stack Developer eğitimi JavaScript modülünün onuncu ödevidir. Bu çalışmada; zamanlayıcılar (`setTimeout`, `setInterval`), asenkron kod akışı, `Promise` nesnelerinin oluşturulması ve yönetimi ile harici kütüphane entegrasyonları üzerine odaklanılmıştır.

## 📁 Proje Yapısı

Proje, Vite derleyicisi kullanılarak yapılandırılmıştır ve iki ana interaktif görevden oluşmaktadır:

```text
goit-js-hw-10/
├── src/
│   ├── 01-timer.html      # Geri sayım zamanlayıcı arayüzü
│   ├── 01-timer.js        # Zamanlayıcı mantığı ve flatpickr entegrasyonu
│   ├── 02-snackbar.html   # Promise üreteci (Snackbar) arayüzü
│   └── 02-snackbar.js     # Promise oluşturma ve iziToast bildirimleri
├── package.json           # Proje bağımlılıkları (Vite, flatpickr, iziToast)
└── index.html             # Ana giriş sayfası
