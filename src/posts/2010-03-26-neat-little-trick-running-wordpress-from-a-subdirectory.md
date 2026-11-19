---
title: 'Neat little trick: Running Wordpress from a subdirectory'
date: '2010-03-26'
categories:
- IT Stuff
old_url: /blog/2010-03-26-neat-little-trick-running-wordpress-from-a-subdirectory/
---

While replacing the terribly outdated homepage of the [honorary consulate of Nepal in Cologne](http://www.konsulatnepal.de) for my father with a easy to maintain Wordpress installation, I stumbled upon a useful little trick at [TechCounter](http://www.techcounter.com/wordpress/install-wordpress-files-to-a-subdirectory-but-run-your-blog-off-the-root-directory/) for running Wordpress from a subdirectory while keeping your URLs uncluttered.

Here is the gist:

1. In Wordpress' General Options, keep your *Wordpress address,* but change *Blog address* to
   `http://www.YourDomain.com/YourWordpressSubdirectory`
2. Move Wordpress' index.php to the root directory.
3. Edit index.php:
   `require(’./wp-blog-header.php’);`
   is changed to`require(’./YourWordpressSubdirectory/wp-blog-header.php’);`
4. If you have a .htaccess file in your Wordpress directory, move this to the root directory too and remember to check whether you have to make any adjustments in the file (maybe some old redirects?).

Worked like a charm for me!

For a more detailed guide, check the [original post at TechCounter](http://www.techcounter.com/wordpress/install-wordpress-files-to-a-subdirectory-but-run-your-blog-off-the-root-directory/).
