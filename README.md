# FitTrack – Offline-Web-App fürs iPhone

Kalorien, Nährstoffe und Training im iOS-Stil. Läuft als App vom Home-Bildschirm, ohne App Store und ohne Mac.

## Was offline funktioniert

| Funktion | Offline | Hinweis |
|---|---|---|
| Tagebuch, Mahlzeiten, Ziele | ✓ | Daten liegen nur auf dem iPhone (IndexedDB) |
| Live-Barcode-Scanner | ✓ | 318.749 Produkte aus DE/AT/CH (Open Food Facts), einmalig ~23 MB |
| Suche | ✓ | Beliebte Markenprodukte, eigene Produkte, Richtwerte |
| Training, Fortschritt, Gewicht | ✓ | |
| Foto-Erkennung mit KI | – | Braucht Internet und einen eigenen Anthropic-API-Key |
| Apple Health | ✓ | Über zwei Kurzbefehle (Anleitung in der App unter Profil) |

## Veröffentlichen mit GitHub Pages (kostenlos)

1. Kostenloses Konto auf github.com anlegen.
2. Neues Repository `fittrack` erstellen. Es muss **Public** sein, nur dann ist GitHub Pages kostenlos. Öffentlich ist nur der App-Code, deine Daten und dein API-Key bleiben auf dem iPhone.
3. Den Inhalt dieses Ordners ins Repository hochladen. Am einfachsten macht das Claude für dich.
4. Im Repository unter **Settings › Pages** bei *Branch* `main` und `/ (root)` wählen und speichern.
5. Nach ein bis zwei Minuten läuft die App unter `https://DEIN-NAME.github.io/fittrack/`.

## Auf dem iPhone installieren

1. Die Adresse in **Safari** öffnen.
2. **Teilen** › **Zum Home-Bildschirm**.
3. FitTrack vom Home-Bildschirm starten. Die Produktdatenbank lädt sich im Hintergrund herunter. Den Stand siehst du unter *Profil › Produktdatenbank offline*.

## Daten aus der Claude-Version übernehmen

1. In der Claude-Version: **Profil › Backup exportieren (für die Offline-App)** und die Datei in *Dateien* sichern.
2. In der neuen App: **Profil › Daten importieren** und die Datei wählen.

## Backups

Die Daten liegen nur auf diesem iPhone. Unter **Profil › Backup exportieren** sicherst du sie als Datei, zum Beispiel in iCloud Drive. Wichtig: Wenn du die App vom Home-Bildschirm löschst, löscht iOS auch ihre Daten.

## Updates

Neue Versionen lädt die App beim Start automatisch im Hintergrund und nutzt sie ab dem nächsten Öffnen.

## Inhalt

```
index.html            App (HTML, CSS, JavaScript)
sw.js                 Service Worker: Offline-Start und Datenbank-Cache
manifest.webmanifest  App-Name, Icons, Vollbild
vendor/zxing.min.js   Barcode-Erkennung (ZXing, Apache-2.0)
vendor/anthropic.min.js  Offizielles Anthropic-SDK (gebündelt)
db/                   Produktdatenbank in 48 Teilen + Suchindex (Open Food Facts, ODbL)
icons/                App-Icons
```

Produktdaten: © Open Food Facts contributors, Lizenz Open Database License (ODbL).
