---
title: 'Eine „zufällige“ Flickr-Diashow für WordPress'
---
Zu meinen Zeiten als PHP-Handwerker habe ich für meinen Vater eine Website für das Honorarkonsulat von Nepal gebaut.
Im Rückblick kann ich meinem damaligen Verständnis von gutem Webdesign nicht mehr ganz zustimmen ([man sehe sich nur die alte Seite an](http://konsulatnepal.de/static.php?bereich=anschrift&id=1)). Eine Idee finde ich für eine Konsulatsseite aber immer noch gut: zufällige Bilder aus dem Land zu zeigen, das man vertritt.
Für die neue Website auf WordPress-Basis wollte ich etwas Ähnliches. Und weil ich nicht stundenlang die Familienfotos nach brauchbaren Nepal-Bildern durchsuchen wollte, bin ich dem neuesten Trend der Bequemlichkeit gefolgt: [Crowdsourcing](http://de.wikipedia.org/wiki/Crowdsourcing).

### Die Idee

Flickr einfach als bequemes Fotoarchiv nutzen. Meine erste Idee war, eine Diashow mit Flickr-Bildern einzubetten, die das Schlagwort „Nepal“ tragen. Alternativ hätte ich den Bilderpool der [Gruppe Nepal Images](http://www.flickr.com/groups/nepal/) nehmen können, um eine gewisse Qualität zu sichern und unschöne Fotos à la „Seht meine abgefrorenen Finger am Everest!“ oder „Seht meine faulenden Füße in den Sümpfen des Terai!“ zu vermeiden.
Außerdem sollte die Diashow automatisch starten und ohne viel Beiwerk auskommen (Größenregler, Firmenlogos und dergleichen).

### Die Umsetzung

So einfach die Idee ist, die Umsetzung hat einige Stunden Googeln und Ausprobieren gekostet. So habe ich es schließlich gemacht:

#### Die Diashow besorgen

Es gibt zwar eine Reihe von Flickr-Diashow-Plugins für WordPress, aber man braucht eigentlich keines. Flickr bietet selbst einbettbare Diashows an. Hier ist das iframe-Tag:

```
<iframe
style="margin-top:10px;margin-left:-20px;"
src="http://www.flickr.com/slideShow/index.gne?&amp;tags=Nepal&amp;group_id=&amp;user_id=&amp;set_id=&amp;text="
frameBorder=0 width=275 height=275 scrolling=no>
```

Damit wird eine Diashow mit Fotos zum Schlagwort „Nepal“ in die Seite eingebettet.
Dieses iframe lässt sich als HTML-Widget einbinden und funktioniert einwandfrei. Der Nachteil: Die Diashow beginnt immer wieder beim selben Foto, wenn man auf eine andere Seite des Blogs wechselt.

#### Zufällig wirken lassen

Leider bietet Flickr keine Möglichkeit, die Diashow mit einem zufälligen Bild beginnen zu lassen. Statt einer echten Zufallsfunktion habe ich sie deshalb nachgeahmt.
 
Die Idee: Das Flickr-iframe bekommt zufällig verschiedene Schlagwörter (statt des festen „Nepal“ im Code oben).

```
<?php
$array=array("nepal", "kathmandu", "pokhara", "bhaktapur", "nepal,himalaya", "nepal,sherpa", "lumbini", "swayambunath", "bodhnat", "nepal,temple", "nepal,guru", "nepal,mountains", "nepal,hindu", "chitwan", "lukla", "nepal,children", "nepal,everest", "nepal, trekking", "patan", "bharatpur", "nepal,terai", "tharu", "newar, nepal", "birganj", "jomsom");
?>

<iframe style="margin-top:10px;margin-left:-20px;" src="http://www.flickr.com/slideShow/index.gne?&tags=
<?php
$rand=array_rand($array);
echo $array[$rand];
?>
&group_id=&user_id=&set_id=&text=" frameBorder=0 width=275 height=275 scrolling=no>
</iframe>
```

Dieser Code legt zuerst ein Array $array mit Schlagwörtern an, die bei Flickr Fotos mit Nepal-Bezug liefern.
Die PHP-Standardfunktion array\_rand() wählt daraus zufällig einen Wert, der in den iframe-Code eingesetzt wird.
 
Da der Code bei jedem Seitenwechsel neu ausgeführt wird, entsteht der Eindruck zufälliger Fotos, solange das Array genug verschiedene Schlagwörter enthält.

#### Als Widget laufen lassen

Der Code oben funktioniert in einer normalen WordPress-Installation nicht, weil PHP-Code in Widgets anders als HTML standardmäßig nicht ausgeführt wird.
Die einfache Lösung ist natürlich ein Plugin:

- [PHP Code Widget](http://wordpress.org/extend/plugins/php-code-widget/)

Das Plugin stellt ein Widget „PHP Code“ bereit, in dem PHP-Code ausgeführt wird. Einfach den iframe-plus-PHP-Code dort einfügen und schauen, ob es funktioniert.

#### Das Ergebnis

Ein laufendes Beispiel gibt es auf [www.konsulatnepal.de](http://www.konsulatnepal.de).
 
Sag mir Bescheid, ob der Trick bei dir funktioniert hat!

```
Foto: „Sarangkot Sunrise, Pokhara, Nepal“ von Dhilung Kirat
```
