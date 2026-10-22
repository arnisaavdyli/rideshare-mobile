# RideShare — Java 3

## Çfarë ndërtova

Përfundova faqen kryesore të RideShare me tri karta udhëtimesh, ekranin e detajeve për secilin udhëtim dhe ekranin e simulimit të kërkesës për vend. Shtova edhe trajtimin e udhëtimeve që nuk ekzistojnë dhe gjendjen kur nuk ka vende të lira.

## Provat që bëra

### Prova 1: Lista në telefon

Hapa faqen kryesore në pamjen e telefonit me madhësi 390 × 838. Prisja të shfaqeshin tri karta udhëtimesh pa lëvizje horizontale. Pashë që të tria kartat shfaqeshin dhe përmbajtja përshtatej me ekranin e telefonit.

### Prova 2: Detajet e udhëtimit të dytë

Klikova kartën e dytë dhe prisja të hapet adresa `/udhetimi/2`, me detajet e udhëtimit të Sarës dhe vendtakimin te Stacioni i autobusëve. Pashë që faqja e detajeve u hap dhe shfaqi informacionin e duhur.

Te karta e tretë, që kishte zero vende të lira, butoni për kërkesë nuk ishte aktiv. Kur hapa `/udhetimi/99`, u shfaq mesazhi “Udhëtimi nuk u gjet” dhe lidhja për kthim në faqen kryesore.

### Prova 3: Kërkesa në pritje

Klikova “Kërko vend” te një udhëtim me vende të lira. Prisja të shfaqej “Simulim: Në pritje”, pa krijuar rezervim real. Pashë mesazhin “Kërkesa për vend është në pritje” dhe sqarimin se kërkesa nuk ruhet. Provova edhe kthimin në listën e udhëtimeve përmes lidhjes së anulimit.

## Çfarë do të përmirësoj

Javën tjetër dua të përmirësoj procesin e kërkesës për vend, duke shtuar ruajtjen e kërkesave dhe mundësinë për të parë statusin e tyre.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të kuptuar strukturën e projektit Next.js, dhe zgjidhjen e disa problemeve gjatë implementimit.
Vetë e provova aplikacionin në shfletues, kontrollova pamjen në telefon dhe testova listën, detajet, kërkesën në pritje dhe rastet me zero vende ose udhëtim të panjohur.