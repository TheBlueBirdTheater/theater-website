---
title: "Wix installation"
source_url: "https://support.ludus.com/wix-installation"
category: "Embed Widget > Install the Embed Widget"
scraped_at: "2026-09-01T19:00:40.303Z"
---

# Wix installation

**This article is specific to the Wix website builder.** If you are using WordPress, Squarespace, etc., the issue and workaround described below are not required, as embedding will work as expected.

Wix has a known issue with 3rd party embed scripts that can cause issues with the patron experience if you embed directly through the website designer. This is a reported issue by many developers/companies, and the hope is that Wix will have improved handling of 3rd party widgets, but for now, we have put together this help article.

In this article, we will be utilizing Wix's "Custom Code" feature found under **Settings** -> **Custom Code** in your Wix account — _this is only available for Wix Premium plans and above_. This feature allows you to select specific pages to place your Widget at the top or bottom of your pages.

Using this workaround, we recommend placing all widgets at the bottom of your pages so your top navigation/headers and pre-content load before the Ludus Embed Widget. _This will place the widget below your footers_, so on pages where patrons will be using the Embed Widget, we recommend hiding your footer for the best website design, ultimately treating "ticketing pages" as solely a place for patrons to use the Embed Widget.

Let's get started:

1.  Log in to your Wix account and ensure you have a page where you'd like to embed your Ludus Embed Widget. Remember, you can have a Widget that displays everything (all events, collections, classes, passes, fundraisers, etc.), which is good for an "Everything" page, or you can get a widget for specific things like an event, in which case you'd create a single Wix page for that event.
    
2.  In Wix, navigate to **Settings** in the left sidebar -> **Custom Code** (under the "Advanced" section)
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/i95C1mR50ZbGwdzf-r0qj_screen-shot-2024-02-21-at-103833-am.png?format=webp "Document image")
    
3.  Here we'll want to **Add Code** under the "Body - End" section, which places your widget at the end of your page.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/_-nRNoHXb86kMiB2Y8Bh6_screen-shot-2024-02-21-at-103945-am.png?format=webp "Document image")
    
4.  In the Add Code popup:
    
    1.  For the "Paste the code snippet here" box, paste in your Ludus Embed Widget code.
    
    2.  For the "Name" field, enter something to identify your Widget. For example, if we are using the embed widget that lists all of our events posted, name it something like "All Events". If it's for a specific event, then it's best to name it that event. This is solely for internal use.
    
    3.  For the "Add Code to Pages", select **Choose specific pages** and then select the page where you'd like your Embed Widget to appear.
    
    4.  For the "Place Code In", ensure this is set to "Body - end" for the best look.
    
    
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/pO9_ZhEZkdk6aToPyE03b_screen-shot-2024-02-21-at-104320-am.png?format=webp "Document image")
    
5.  Click **Apply**
    
    Your Widget will now appear on the page(s) you selected in the popup.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/5YpXKNRRu_LIuv6MqKxV9_image.png?format=webp "Document image")
    

If you have multiple pages with different widgets (like one page with events, one page with donations, etc.), you'll want to repeat the above steps any time you are placing a new widget on a new page.
