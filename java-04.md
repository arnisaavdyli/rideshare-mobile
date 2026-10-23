# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Ndërtova aplikacionin RideShare me Next.js dhe e lidha me databazën PostgreSQL në Neon. Funksioni `merrUdhetimetNgaDB()` lexon udhëtimet nga tabela `udhetimet`. Faqja kryesore shfaq listën e udhëtimeve, ndërsa faqja e detajeve shfaq informacionin për udhëtimin e zgjedhur.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Ndryshova orën e udhëtimit me ID 2 nga 08:50 në 08:25 përmes Neon SQL Editor. Pas përditësimit dhe rifreskimit të aplikacionit, ora 08:25 u shfaq në listë dhe në detaje. Më pas e riktheva orën në 08:50 dhe verifikova ndryshimin.

### Prova 2: Lista bosh dhe rikthimi

Shtova përkohësisht `WHERE false` në pyetjen SQL të funksionit `merrUdhetimetNgaDB()`, për të testuar rastin kur databaza nuk kthen udhëtime. Gjatë testimit lokal u paraqit një gabim në `package.json`, prandaj mesazhi i listës bosh nuk u verifikua. Pas heqjes së `WHERE false` dhe rinisjes së aplikacionit, tri kartat u shfaqën përsëri.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Ndryshova përkohësisht emrin `DATABASE_URL` në `.env.local` dhe rinisa serverin. Aplikacioni shfaqi gabimin “DATABASE_URL nuk është konfiguruar”. Më pas riktheva emrin origjinal, rinisa serverin dhe verifikova që tri kartat e udhëtimeve shfaqeshin përsëri.


## Ku gjendet puna

- Databaza: Neon PostgreSQL
- Skedarët kryesorë: `src/lib/db.ts`, `src/lib/udhetimet.ts`, `src/lib/kerkesat.ts`, `src/app/page.tsx` dhe faqet e detajeve dhe kërkesave
- Repository: https://github.com/arnisaavdyli/rideshare-mobile
- Aplikacioni: https://rideshare-mobile-omega.vercel.app

## Çfarë mbetet për përmirësim

Aktualisht sistemi i kërkesave është prototip dhe nuk ofron rezervim real të vendeve. Përmirësimi i ardhshëm është identifikimi i përdoruesve dhe menaxhimi i kërkesave sipas vendeve të disponueshme.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për udhëzime gjatë lidhjes me Neon, dhe Vercel.
Vetë kontrollova rezultatet në Neon, aplikacionin lokal dhe versionin online.