# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Në aplikacionin RideShare implementova autentikimin me GitHub, menaxhimin e sesionit, rolet e përdoruesve dhe kontrollin e pronësisë së udhëtimeve.

**Identiteti** tregon se cili përdorues është i kyçur në aplikacion. Përdoruesi identifikohet përmes GitHub ID, që merret nga sesioni pas hyrjes me GitHub.

**Roli** përcakton se çfarë veprimesh mund të kryejë përdoruesi. Në tabelën `profilet` ruhet roli i përdoruesit, si `shofer` ose `pasagjer`.

**Pronësia** përcakton cilat udhëtime i përkasin një shoferi. Kjo kontrollohet përmes kolonës `shofer_id` në tabelën `udhetimet`.

Kështu, vetëm një përdorues i kyçur me rolin `shofer` mund ta ndryshojë orën e udhëtimeve që i përkasin atij.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Fillimisht hapa faqen `/panel` pa qenë e kyçur. Aplikacioni shfaqi mesazhin që duhet të kyçem dhe butonin për hyrje me GitHub.

Pastaj u kyça përmes GitHub. Në panel u shfaqën emri i përdoruesit, GitHub ID dhe roli im.

Pas rifreskimit të faqes, sesioni mbeti aktiv dhe vazhdova të isha e kyçur.

Në fund klikova butonin për dalje nga llogaria. Paneli u kthye në gjendjen fillestare dhe kërkoi përsëri hyrjen me GitHub.

**Rezultati:** Prova 1 përfundoi me sukses.

### Prova 2: Shoferi ndryshon udhëtimin e vet

U kyça me GitHub si përdorues me rolin `shofer`.

Në panelin tim u shfaq udhëtimi me ID `2`, me emrin e shoferit Sara K. dhe orën fillestare `08:15`.

Përmes formularit të ndryshimit të orës, vendosa orën `08:25` dhe klikova butonin **Ruaj orën**.

Paneli shfaqi orën e përditësuar `08:25` dhe mesazhin:

“Ora u ndryshua me sukses.”

Gjatë testimit, ndryshimin e orës e verifikova edhe në Neon SQL Editor.

Pas përfundimit të testit, e riktheva orën e udhëtimit në `08:15` dhe kontrollova që ajo shfaqej saktë në panel, në listën e udhëtimeve dhe në faqen e detajeve.

**Rezultati:** Prova 2 përfundoi me sukses. Shoferi mund ta ndryshojë orën e udhëtimit të vet dhe ndryshimi ruhet në bazën e të dhënave.

### Prova 3: Veprimi pa leje refuzohet

Për të testuar autorizimin, provova ta ndryshoj orën e udhëtimit me ID `1`, i cili nuk i përket përdoruesit tim.

Kërkesën `PATCH` e dërgova përmes Console të shfletuesit, duke kërkuar ndryshimin e orës në `09:30`.

API-ja e refuzoi kërkesën dhe ktheu:

```text
Status: 403 (Forbidden)
Nuk ke leje ta ndryshosh këtë udhëtim.
```

Kjo provë u realizua me versionin e përditësuar të API-së, i cili kontrollon rolin `shofer` dhe pronësinë përmes kolonës `shofer_id`.

Pas kërkesës së refuzuar, hapa Neon SQL Editor dhe kontrollova udhëtimin me ID `1`.

Rezultati tregoi se ora kishte mbetur `08:00`, pra kërkesa pa leje nuk i kishte ndryshuar të dhënat.

**Rezultati:** Prova 3 përfundoi me sukses. API-ja refuzon ndryshimet e udhëtimeve që nuk i përkasin përdoruesit të kyçur.

## Ku gjendet puna

**Repository në GitHub:**

https://github.com/arnisaavdyli/rideshare-mobile

**Demo në Vercel:**

https://rideshare-mobile-omega.vercel.app

Skedarët kryesorë të projektit:

- `aplikacioni/src/lib/auth.ts` — konfigurimi i autentikimit me GitHub.
- `aplikacioni/src/app/api/auth/[...nextauth]/route.ts` — API-ja e autentikimit.
- `aplikacioni/src/app/panel/page.tsx` — paneli i shoferit.
- `aplikacioni/src/components/AuthButtons.tsx` — butonat e hyrjes dhe daljes.
- `aplikacioni/src/components/NdryshoOren.tsx` — formulari për ndryshimin e orës.
- `aplikacioni/src/app/api/udhetimet/[id]/ora/route.ts` — API-ja për ndryshimin e orës dhe kontrollin e autorizimit.
- `java-05.md` — raporti i ushtrimeve.

Për ruajtjen e të dhënave përdoret Neon PostgreSQL me tabelat `udhetimet` dhe `profilet`.

## Çfarë mbetet për përmirësim

Aktualisht, kërkesa për rezervimin e një vendi në udhëtim është ende simulim dhe nuk ruhet si rezervim i vërtetë në bazën e të dhënave.

Në të ardhmen do të shtoja ruajtjen e rezervimeve në Neon PostgreSQL, kontrollin e vendeve të lira dhe përditësimin automatik të numrit të vendeve pas çdo rezervimi.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Gjatë realizimit të projektit përdora AI për të zgjidhur disa probleme të vogla gjatë implementimit.

Vetë i vendosa ndryshimet në VS Code, ekzekutova komandat, testova hyrjen dhe daljen me GitHub, ndryshova orën e udhëtimit nga paneli dhe kontrollova rezultatet në Neon SQL Editor dhe Console të shfletuesit.