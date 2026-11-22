---
title: Eine einfache eingebettete Google-Karte mit Adressübernahme in Drupal
---
Als Drupal-Neuling ist es mehr als verwirrend, eine einfache eingebettete Google-Karte einzubauen. [Mehr als ein Dutzend Module](http://groups.drupal.org/node/21723) versprechen Kartenfunktionen, aber keines davon konnte ich dazu bringen, das zu tun, was ich brauchte. Also habe ich es selbst gemacht.

### Was will ich erreichen?

Ich möchte ein Verzeichnis mit Adressen anlegen, und beim Aufrufen eines Eintrags soll eine kleine eingebettete Karte die Adresse markieren. Eigentlich ganz einfach.

### Warum nicht einfach ein Modul?

Ich habe es mit einigen Modulen versucht (Location, GMap und ähnliche), aber entweder erschien keine Karte, oder sie konnte die Adressdaten nicht übernehmen. Insgesamt frustrierte mich die Komplexität dieser Module, die leider mit fehlender Dokumentation einhergeht.

Ein Modul, das einfach zu bedienen war und sofort funktionierte, war [Embed Google Maps Field](http://drupal.org/project/embed_gmap). Damit legt man ein CCK-Feld an, das zu einer eingebetteten Karte wird. Der einzige Nachteil: Es übernimmt keine Adressdaten aus anderen Feldern. Die Nutzerin muss die Adresse also noch einmal in das Kartenfeld eintippen, obwohl sie dieselben Daten ein paar Zeilen weiter oben schon in die Felder „Straße“, „Ort“ und „Postleitzahl“ eingegeben hat. Nicht gerade nutzerfreundlich.

Also habe ich mir das iframe-Tag dieses Moduls aus dem HTML-Code geschnappt und mich daran gemacht, das iframe dynamisch mit den Adressdaten zu füttern.

### Womit habe ich angefangen?

Ich arbeite mit Drupal 6.13 (vermutlich geht jede 6.x-Version), und meine kleine Lösung nutzt diese Module:

- [CCK (Content Construction Kit) 6.x-2.5](http://drupal.org/project/cck)
- [Dynamic Field 6.x-1.0](http://drupal.org/project/dynamicfield)

Mit Dynamic Field lassen sich CCK-Felder anlegen, die mit PHP-Code befüllt werden. Das Feld zeigt in der Ansicht also berechnete Daten an.

Außerdem habe ich bereits einen eigenen Inhaltstyp mit den CCK-Feldern „street“ und „town“.

### Was habe ich gemacht?

1) Unter admin/content/node-type/deininhaltstyp/fields ein CCK-Feld zum Inhaltstyp hinzufügen.

2) In der Liste der Feldtypen „Dynamic Field“ wählen.

3) In das Textfeld „PHP-Code“ diesen Code einfügen:
> `$street = $node->field_street[0]['value'];
> $town = $node->field_town[0]['value'];
> return "``";`

Die ersten beiden Zeilen holen die Werte der Felder für Ort und Straße in handlichere Variablen. Der Rest gibt das Google-Maps-iframe aus dem Modul Embed Google Maps Field zurück und setzt Straße und Ort an den richtigen Stellen ein.

Nach meiner Erfahrung reichen Straße und Ort, damit Google die richtige Stelle findet. Nach demselben Muster kann man aber natürlich weitere Felder ergänzen, etwa Land oder Postleitzahl.

Mit den Einstellungen im iframe-Tag kann man gerne herumspielen. Das ist einfaches HTML und lässt sich vermutlich um weitere Einstellungen erweitern.

4) Einen Testeintrag für den Inhaltstyp anlegen, die Adressfelder mit einer echten Adresse füllen und schauen, ob alles klappt.

Als Bonus bleibt die Bearbeitungsansicht frei von hässlichem Code, weil das dynamische Feld dort nicht erscheint.

### Nachtrag: Zoomstufe ändern

Die Zoomstufe der eingebetteten Karte zu ändern ist nicht ganz offensichtlich, deshalb dieser Hinweis: Im iframe-Tag einfach den z-Wert ändern, und zwar hier: ...&amp;ie=UTF8&amp;z=16&amp;output=embed...
Je niedriger der Wert, desto weiter wird herausgezoomt.

### Nachtrag: Infoblase ein- und ausschalten

Lazyburners hat das in den Kommentaren selbst herausgefunden. Ich hatte aber auch danach gesucht, und anderen geht es vermutlich ähnlich: Einfach `&iwloc=near` an die iframe-Adresse anhängen, dann verschwindet die Blase.

Schreib mir einen Kommentar, wenn es bei dir funktioniert hat!
