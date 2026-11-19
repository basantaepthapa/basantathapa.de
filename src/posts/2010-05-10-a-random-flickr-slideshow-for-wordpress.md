---
title: A "random" Flickr slideshow for Wordpress
date: '2010-05-10'
categories:
- IT Stuff
- Wordpress
image: /uploads/2010/05/8266567308_fe899e2b83_k.jpg
old_url: /blog/2010-05-10-a-random-flickr-slideshow-for-wordpress/
---

Back in my hardcoding PHP days, I built a homepage for the honorary consulate of Nepal for my father.
Looking back, I can't really agree with my concept of good webdesign back then ([just look at that old page](http://konsulatnepal.de/static.php?bereich=anschrift&id=1)). However, one idea still strikes me as good for a consular homepage: Showing random images from the country you're representing.
For the new, Wordpress-powered homepage, I wanted a similar thing. And because I didn't want to spend hours collecting worthy pictures of Nepal from the family photo stock, I followed the latest trend in laziness: [crowdsourcing](http://en.wikipedia.org/wiki/Crowdsourcing).

### The Idea

Just use flickr as a easy to use photo stock. My first idea was to embed a slideshow with images from flickr that have the tag "Nepal". Alternatively, using the [Nepal Images group](http://www.flickr.com/groups/nepal/) image pool to have some standard of quality, avoiding nasty "Look at my frozen off fingers at the Everest!" or "Look at my rotting feet in the Terai swamps!" photos.
Additionally, it has to be autostart and without much clutter in the in the slideshow box (like size sliders, company logos and the like).

### The Execution

While the idea is simple, realizing it took some hours of googling and trying out different possible solutions. Here is how I ended up doing it:

#### Get the slideshow

While there are a number of flickr slideshow plugins for Wordpress, you don't really need one. Flickr offers its own embeddable slideshows. Here is the iframe-tag:

```
<iframe
style="margin-top:10px;margin-left:-20px;"
src="http://www.flickr.com/slideShow/index.gne?&amp;tags=Nepal&amp;group_id=&amp;user_id=&amp;set_id=&amp;text="
frameBorder=0 width=275 height=275 scrolling=no>
```

This will embed a slideshow of photos with the tag "Nepal" (see yellow highlight) in your page.
This iframe can be integrated as an HTML widget on its own and works perfectly. The drawback is that it starts again and again from the same photo when the user changes page on your blog.

#### Make it look random

Unfortunately, flickr doesn't offer a way to make the slideshow start with a random image. So, instead of a real shuffle function, I emulated it.
 
The idea is to randomly feed the flickr iframe with different tags (instead of the standard "Nepal" in the snippet above).

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

This snippet first initializes an array $array with a number of tags that will return Nepal-related photos from flickr.
The values of this array are then called randomly by the PHP standard function array\_rand() and inserted into the flickr iframe code.
 
As this code is run every time the user changes page on your blog, the illusion of random photos can be kept up if the array contains enough different tags.

#### Make it run as a widget

The above snippet will not work in your vanilla Wordpress installation because unlike HTML, PHP code isn't by default executed in a widget.
The simple solution is, of course, a plugin:

- [PHP Code Widget](http://wordpress.org/extend/plugins/php-code-widget/)

This plugin enables a "PHP Code" widget where PHP code is executed. Just paste your iframe-plus-php-code there and see if it works.

#### See the result

You can see a running example at [www.konsulatnepal.de](http://www.konsulatnepal.de).
 
Let me know if this trick worked for you!

```
Photo credit: "Sarangkot Sunrise, Pokhara, Nepal" by Dhilung Kirat
```
