---
title: A simple embedded Google map with address fetching in Drupal
date: '2009-08-22'
categories:
- Drupal
- IT Stuff
image: /uploads/2009/08/pexels-photo-68704.jpeg
old_url: /blog/2009-08-22-a-simple-embedded-google-map-with-address-fetching-in-drupal/
---

As a newbie to Drupal, implementing a simple embedded Google map is more than confusing. [More than a dozen modules](http://groups.drupal.org/node/21723) claim to offer mapping functionality, but I just couldn't get any of them to do what I needed. So I just did it myself.

### What do I seek to accomplish?

I want to set up a directory with adresses and when viewing those nodes, I'd like to have a small embedded map that pinpoints the address. Very basic, really.

### Why didn't I just use a module?

I tried to get the job done with a couple of modules (Location, GMap and the like) but either no map showed up, if it did, it failed to fetch the address data and I generally became frustrated with the complexity of these modules that unfortunately coincides with a lack of documentation.

One module that was easy to use and worked just out of the box was [embed google maps field](http://drupal.org/project/embed_gmap), which lets you create a CCK field that turns into an embedded map. The only drawback is that it does not fetch address data from other fields but the user has to enter the address again into the embedded map field, which does not seem very user friendly when the user just entered the same data into special "street", "town" and "zip code" fields a few lines above.

Hijacking this module's iframe tag from the HTML code, I set out myself to feed the iframe dynamically with the address data.

### What did I start from?

I'm in a Drupal 6.13 environment (I suppose any 6.x will do) and my little solution utilises the following modules:

- [CCK (Content Construktion Kit) 6.x-2.5](http://drupal.org/project/cck)
- [Dynamic Field 6.x-1.0](http://drupal.org/project/dynamicfield)

Dynamic Field lets you create CCK fields that can be filled with PHP code and thus dynamically fills the field in view mode with computed data.

I also already have a custom content type with the CCK fields "street" and "town".

### What did I do?

1) Add a CCK field to your content type under admin/content/node-type/yourcontentype/fields

2) Choose "Dynamic Field" from the field type droplist

3) In the text field titled "PHP-Code", add this code:
> `$street = $node->field_street[0]['value'];
> $town = $node->field_town[0]['value'];
> return "``";`

The first two lines just fetch the values of the current node's town and street fields into more handy variables. The rest returns the Google maps iframe I hijacked from the Emded Google Maps Field module and inserts street and town in the right places.

In my experience, street and town are sufficient for Google to pinpoint the right spot on the map, but following the pattern above, you could of course also add more fields, like country or zip code.

Also, feel free to tinker with the settings in the iframe tag, that's just plain HTML and can probably also be extended with further settings.

4) Create a test node for your content type, fill the address fields with an existing address and see if it all works.

As a plus, it doesn't even clutter the edit view with ugly code, because the dynamic field does not show up here.

### Update: Changing the zoom level

To change the zoom level of the embedded map is not straightforward, so I add this hint.
In the iframe tag, just change the z-value, right here: ...&amp;ie=UTF8&amp;z=16&amp;output=embed...
The lower the value, the farther out you zoom.

### Update: Turn the info balloon on/off

Lazyburners figured this out by himself in the comments, but I was also looking for this functionality and I guess some others might be, too. Just add `&iwloc=near` to your iframe src and the balloon should vanish.

Leave me a comment if it worked for you!
