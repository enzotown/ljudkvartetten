# Ljudkvartetten — rimma och lyssna

## Målgrupp
Barn 4–7 år, iPad (touch) eller mus. Spelet kräver ingen läsning: varje ord sägs högt,
varje bild är ritad, och antal stavelser visas som prickar.

## Lärandemål
- **Fonologisk medvetenhet:** höra att *mus* och *hus* låter likadant i slutet — den
  enskilt starkaste förkunskapen för att knäcka läskoden.
- **Stavelser:** dela ord i klappar (*ka-ka* = 2, *ka-ni-nen* = 3) och sortera.
- **Lyssna noga:** orden spelas upp en gång till om man vill, och igen efter ett fel.

## Tre lekar
1. **Rimma** — ett ord sägs ("Vilket rimmar på mus?"), tre bilder visas, barnet trycker på
   den som rimmar. Rätt: korten flyger ihop, konfetti och en stjärna.
2. **Långt eller kort?** — kortet sägs, barnet drar det till korgen med 1, 2 eller 3
   prickar (stavelser). Rätt korg ger trumljud med rätt antal slag.
3. **Första ljudet** — ett ord sägs och visas, och barnet väljer bland tre kort det ord som
   börjar med samma ljud (*katt* → *kaka*). Orden på korten läses inte upp: det är ljudet i
   början barnet ska lyssna efter, inte hela ordet. Grupperna är h, k, s och b — tillräckligt
   många ord för att varje omgång ska kännas ny.

Sex rim/åtta stavelse- och ljudomgångar per lek, sedan en glad slutskärm. Inga förluster, inga timers.

## Ordförråd (18 ord)
Rimpar: mus/hus, katt/hatt, sol/stol, bil/pil, boll/troll, gris/spis.
Stavelser: sol, mus, boll, hatt (1), kaka, blomma, bilar (2), kaninen, fjärilen, apelsin (3).

## Motor
`engine.js` (yta, WebAudio, röstspelare med kö), `data.js` (ord, rimpar, stavelser),
`pics.js`+`pics2.js` (ritade bilder, inga emoji — fungerar likadant på alla enheter),
`art.js`+`art2.js` (kort, korgar, Kotten), `app.js` (skärmar och inmatning), `loop.js` (spelvarv).

Rösten är förinspelad (edge-tts, sv-SE-SofieNeural) i `snd/` — 18 ord, 6 frågor och 4
berömfraser. Det gör upplevelsen identisk på alla enheter och kräver ingen nätverksröst.

## Tillgänglighet
Alla träffytor ≥ 90 px i designytan, kort och bilder i stark kontrast mot bakgrunden,
och spelet fungerar både stående och liggande.