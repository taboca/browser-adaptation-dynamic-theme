# Chameleon Dynamic Theme — Adapting the Browser Toolbar to Web Sites & An User Experience Experiment for Firefox

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/logo.png)

## Introduction

This is a prototype for a Firefox theme, however using a UX-oriented mindset; this project is aimed as a reflection, therefore it's beyond its initial code. The Add-on experiment is currently available for Firefox Quantum and published at [Chameleon Dynamic Theme Firefox Add-on](https://addons.mozilla.org/pt-BR/firefox/addon/chameleon-dynamic-theme/).

The idea is to consider how a browser can/should blend with the actual content that the user is visiting, and to specially consider the dichotomy between external and internal browser pages.

When publishing this work, I have noticed myself using the Mozilla add-on site as a place for UX discussions. For example, I have decided to add screenshots however each screenshot aimed to discuss cases. At the same time noticed how add-ons sites could be improved around these discussions perhaps. If you want to jump to a reflection about the Add-ons site see bellow.

## What it does and why it does?

This dynamic theme adapts the browser main theme (toolbar) to web sites or content from sites. The aim of the project is to explore a phenomena that can be perceived as immersion experience. When an user is visiting a web site she or he in fact partially surrender an interface to the site. The proposition here, or a provocation since we don't know yet this is ideal or not, is to allow a reflection — can or should a web site also affect the browser interface partially?

This can be a complex discussion exactly because the user needs a resting place, a place to be safe when navigating the web. Since the user can eventually stumble in malicious web content, there is always the question about how the browser interfaces endorses the content.

Nevertheless, this project is here so we can explore the good opportunities, first. Can we imagine a safe web and if so would it make sense to have the browser fully adapt to the site? Of course, once you allow yourself to reason about that; it's of course quite important to reason about the negative aspects as well.  

## What it shows and what is aimed at:

* How to use the dynamic theme API. For additional information please refer to [Dynamic themes](https://developer.mozilla.org/en-US/Add-ons/Themes/Theme_concepts#Dynamic_themes).
* A reflection about the notion of a browser adapting to site contents.
* Collecting user experience data and expand the discussion.

## Related

* https://hacks.mozilla.org/2017/12/using-the-new-theming-api-in-firefox/
* Properties for theme https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/theme

## Add-on listing

*

## Heuristics

* When navbar — If the site has navbar, adapts to navbar and removes the bottom border of the theme;
* When bgcolor – If the site has background color, adapts to background color
* When chrome — Page background and removes bottom border

### Calculations

* Graphics analysis looks at a section cut, vertical line, first 10 pixels
* Text color calculation heuristics
* Favicon analysis

## Screenshots and use cases

### Matching the master header

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/40_addons_developer_main.png)

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/50_developer_hub.png)

### Browser blends with tab content's navbar

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/20_blend_navbar.png)

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/30_blend_navbar_2.png)

### Browser blends with its own content (about:)

![](https://raw.githubusercontent.com/taboca/themematcher/master/images/10_blend_about.png)

# Research

## Android Status Bar Color Setting from Apps

* Users of Android are used to the experience of the mobile status bar matching certain apps (first became apparent with Google apps) since Lollipop. In the Android framework, the behavior can be accomplished via directly using the [Android View API's setStatusBarColor method](https://developer.android.com/reference/android/view/Window.html#setStatusBarColor(int)). Reflections about color matching, including the means to disambiguate content from colors in the status bar, are also brought in the [Google Material Design — Style Color](https://material.io/guidelines/style/color.html#color-color-system) documentation.

## Inverting Page Contents Inverts Toolbars

* Use Case @ FirefoxInvertColors Project — this project is an extension that promises to invert the colors. This is an interesting case to pay attention and to reason about what would happen when the page change content color. This may also signal some interesting ways to sniff/check current page color values. https://github.com/Max-Github/FireFoxInvertColors.

* In theory, inverting the content should seamlessly work; however we do not trigger a change in the theme just based on any change. Therefore, one consideration here would be to put some theme filters built in the extension, or, alternatively, have a system to recheck page contents. At the earliest version, 1.0, all the times a tab is switched/updated the theme is updated anyway. But with an optimization, such feature would go away since an ideal scenario is to take the content from the cache.

## Adapting the Firefox Theme to the Operating System

* Jacob Birkett, in his project Firefox Native Dark, explores the concept of adaptation however focusing in the exercise of matching against the operating system. https://github.com/spikespaz/firefox-nativedark. Jacob have mentioned that his extension gets the accent color from the Windows 10 operating system, which is defined by the user in the Windows Personalization Settings. He also informed that his extension can't get the data in Linux.

# Other

## Analysis of Add-ons as a distribution channel

Since this is an experiment, yet functional within the guides of Mozilla Add-ons framework, I had also the chance to reflect about the actual channel of distribution, the Mozilla Add-ons web site.

When working in publishing the Add-on, again, as an experiment, I noticed my mindset: a publisher, or author, aiming to connect with potential early adopters, aiming to connect with developers, aiming to connect with UX experienced professionals; willing to expand the realm of UX discussions around the work. As an example, I have decided to add screenshots as means to discuss specific cases — screenshots of the user visiting the browser internal pages versus screenshots of an user visiting external sites; screenshots of the user visiting a site where the content shows a navbar, and more.

When working with a view oriented to the UX discussion, however, I have allowed myself to stumble into the analysis of reviewing, or less naively, reflecting about the role of the Add-ons site itself.

My first naive thought was — oh, after about 10 years without visiting Add-ons, I confess surprised it's sort of the same thing.

But a less naive reflection is more like a subtle proposition — could Add-ons become a place for scaling extensions and ideas? what UI elements and social network key indicators could help to better match tests, usage, feedback, discussions around the development for next generation features?

A lot of developers, specially within the Mozilla realm, really understand that Add-on space have always served the purpose of evolving Firefox — however in a chaotic way — which Mozilla always benefited even if one or other developer-user had no idea how they have participated in the chain.  

I wonder if it would be possible to better integrate Add-ons, APIs, tests and the community to improve how new UX insights could be evaluated and evolve.
