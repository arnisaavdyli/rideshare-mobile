# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova

Në projektin RideShare implementova funksionalitetet bazë të Progressive Web App (PWA), duke përdorur Next.js.

Manifesti përcakton emrin e aplikacionit dhe ikonat për instalim në pajisje. U shtuan ikonat `icon-192.png` (192×192) dhe `icon-512.png` (512×512).

Service Worker (`public/sw.js`) ruan burimet e nevojshme dhe përgjigjen e API-së në Cache Storage. Kjo mundëson që përdoruesi t'i shohë tri udhëtimet e ruajtura edhe kur nuk ka internet.

U krijua edhe faqja `public/offline.html`, e cila shfaq kopjen e fundit të udhëtimeve dhe njofton që rezervimet nuk mund të kryhen offline.

## Provat që bëra

### Prova 1: Manifesti dhe vizita online

Hapa aplikacionin në `http://localhost:3000` dhe API-në `http://localhost:3000/api/udhetimet`.

U shtuan ikonat `icon-192.png` (192×192) dhe `icon-512.png` (512×512). Chrome shfaqi opsionin **Install**.

Service Worker u aktivizua me statusin `activated and is running`. Në Cache Storage u verifikua `rideshare-data-v1`, me hyrjen `/api/udhetimet`.

Lista përmbante tri udhëtime: Lipjan → AAB (09:00), Prishtinë → AAB (08:15) dhe Fushë Kosovë → AAB (08:00).

**Rezultati: Kaloi.**

### Prova 2: Pa internet dhe pas rifreskimit

Në Chrome DevTools → Network zgjodha opsionin `Offline` dhe rifreskova faqen.

U shfaq faqja `RideShare – Offline`, bashkë me tri udhëtimet e ruajtura. Për udhëtimin nga Prishtina shfaqej ora 08:15.

Faqja shfaqi mesazhin **“Të dhënat janë nga ruajtja e fundit”**, pa treguar orën e saktë të ruajtjes.

Gjithashtu shfaqi mesazhin **“Rezervimet nuk mund të bëhen pa internet”**. Kjo ishte vetëm kopje për lexim dhe jo konfirmim i ndonjë rezervimi.

**Rezultati: Kaloi.**

### Prova 3: Lidhja rikthehet

Në Neon, udhëtimi me ID 2 kishte fillimisht orën **08:15**.

E ndryshova përkohësisht në **08:25**. Gjatë testimit offline, lista vazhdoi të shfaqte **08:15**, sepse përdorte kopjen e ruajtur.

Pas rikthimit të internetit dhe hapjes përsëri të `/api/udhetimet`, API shfaqi orën e përditësuar **08:25**.

Në fund e riktheva orën fillestare **08:15** në Neon.

**Rezultati: Kaloi për përditësimin e kopjes përmes API-së. Butoni i veçantë “Rifresko listën” nuk u testua.**

## Ku gjendet puna

Repository: https://github.com/arnisaavdyli/rideshare-mobile

Skedarët kryesorë të implementimit:

- `aplikacioni/src/app/manifest.ts`
- `aplikacioni/public/icon-192.png`
- `aplikacioni/public/icon-512.png`
- `aplikacioni/public/sw.js`
- `aplikacioni/public/offline.html`
- `aplikacioni/src/components/Pwa.tsx`
- `aplikacioni/src/app/layout.tsx`
- `aplikacioni/src/app/api/udhetimet/route.ts`

Testimi i PWA-së u krye lokalisht në `http://localhost:3000`. Publikimi i versionit të Javës 6 në Vercel nuk është verifikuar.

## Çfarë mbetet për përmirësim

Nëse përdoruesi hyn për herë të parë pa internet dhe nuk ka të dhëna të ruajtura, lista e udhëtimeve nuk mund të shfaqet.

Leximi offline është i kufizuar te tri udhëtimet e fundit të ruajtura. Rezervimet dhe ndryshimet në databazë kërkojnë lidhje interneti.

Si përmirësim i ardhshëm mund të shtohet butoni “Rifresko listën”, së bashku me kohën e saktë të ruajtjes së fundit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për ndihmë në implementimin e manifestit PWA.

Vetë i krijova dhe i ruajta skedarët në VS Code, kontrollova Service Worker dhe Cache Storage në Chrome DevTools, testova aplikacionin online dhe offline, si dhe ndryshova dhe riktheva orën e udhëtimit ID 2 në Neon.