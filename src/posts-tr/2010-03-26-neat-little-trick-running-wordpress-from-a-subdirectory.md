---
title: 'Netter kleiner Trick: WordPress aus einem Unterverzeichnis betreiben'
---
Als ich die völlig veraltete Website des [Honorarkonsulats von Nepal in Köln](http://www.konsulatnepal.de) für meinen Vater durch eine leicht zu pflegende WordPress-Installation ersetzt habe, bin ich bei [TechCounter](http://www.techcounter.com/wordpress/install-wordpress-files-to-a-subdirectory-but-run-your-blog-off-the-root-directory/) auf einen nützlichen Trick gestoßen: WordPress in einem Unterverzeichnis installieren und trotzdem aufgeräumte Adressen behalten.

Kurz gesagt:

1. In den allgemeinen Einstellungen von WordPress die *WordPress-Adresse* beibehalten, aber die *Blog-Adresse* ändern auf
   `http://www.DeineDomain.de/DeinWordPressUnterverzeichnis`
2. Die index.php von WordPress ins Hauptverzeichnis verschieben.
3. Die index.php bearbeiten:
   `require(’./wp-blog-header.php’);`
   wird zu `require(’./DeinWordPressUnterverzeichnis/wp-blog-header.php’);`
4. Falls im WordPress-Verzeichnis eine .htaccess-Datei liegt, diese ebenfalls ins Hauptverzeichnis verschieben und prüfen, ob darin etwas angepasst werden muss (vielleicht alte Weiterleitungen?).

Hat bei mir wunderbar funktioniert!

Eine ausführlichere Anleitung gibt es im [Originalbeitrag bei TechCounter](http://www.techcounter.com/wordpress/install-wordpress-files-to-a-subdirectory-but-run-your-blog-off-the-root-directory/).
