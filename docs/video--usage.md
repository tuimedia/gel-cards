## Install

---

### Bower

    bower install git@github.com:tuimedia/gel-cards.git

To get started with cards in your project take a look at the code samples and demos on this site.

### Manual

    git clone git@github.com:tuimedia/gel-cards.git


---

### Modernizr

Cards require the following tests from [Modernizr](https://modernizr.com/) to support older devices

+ `flexbox`

Get [a custom build](https://modernizr.com/download?flexbox-setclasses&q=flexbox)

### GEL Typography

Cards make use of the GEL typography classes like `gel-double-pica`, `gel-brevier` etc.  

If you do not have GEL typography available then `gel.css` has these additional styles included.

### GEL Icons

Cards use GEL icons in SVG format. To load them into your application you can:

+ Include them directly in the body
+ Load them with the [Shovel.js library]()

They are installed as dependencies when you use Bower.  

In addition to the GEL icons there are a few custom icons for the cards that have yet to be included in the GEL library.

#### Including directly in the body

    <div class="u-hidden">
        <%= partial 'icons/gel-icons-core.svg' %>
        <%= partial 'icons/gel-icons-media.svg' %>
        <%= partial 'icons/gel-icons-social.svg' %>
        <%= partial 'icons/gel-icons.svg' %>
    </div> 

[Edit this](https://github.com/tuimedia/gel-cards/edit/master/docs/video--usage.md) 
