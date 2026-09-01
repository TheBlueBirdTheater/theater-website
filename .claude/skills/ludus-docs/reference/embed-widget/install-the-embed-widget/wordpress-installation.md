---
title: "WordPress Installation"
source_url: "https://support.ludus.com/wordpress-installation"
category: "Embed Widget > Install the Embed Widget"
scraped_at: "2026-09-01T19:00:36.674Z"
---

# WordPress Installation

For the Embed Widget to work in WordPress, you'll need to give WordPress the ability to embed JavaScript widgets in posts/pages.

## Embedding the code

The [**Code Embed**](https://wordpress.org/plugins/simple-embed-code/ "Code Embed") plugin is best for embedding widgets in WordPress. It'll allow you to paste in the Ludus Embed Widget JavaScript right into a page/post in WordPress without the editor blocking it due to the script tags.

**Activating and using the Code Embed plugin**:

1.  On the left Admin Panel, select **Settings** and then select **Code Embed.**
    
    In the Keyword field, enter a base name (the default is CODE). This is what you will use to embed on your pages. Then click Save.
    
    In our example, we will use LUDUS as the keyword.
    
    ![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-zf0k-hINDAHuh3bYH2WDy-20240729-180623.png?format=webp "Document image")
    
2.  Ensure that you have **Custom Fields** activated in **Preferences**.
    
    To get to Preferences, open one of your pages/posts to edit. Then select the three dots on the right of the screen, and select **Preferences**.
    
    Under **General,** you should see Custom Fields at the bottom of the list. Verify it is turned on and close this window.
    
    ![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-g-T0woJDiumCju2-R26BK-20240729-180544.png?format=webp "Document image")
    
3.  When you open/edit a page or post, you will now see the custom fields option at the bottom of the page.
    
    -   Enter the name of the custom field, which would be the keyword you created, plus a number or descriptor for this field. In our example, that would be **LUDUSMANUAL**. As the Keyword was LUDUS, and we want to call this MANUAL for this particular Embed. It could also have been LUDUS1, or LUDUSVOLUNTEER if we wanted.
    
    -   Paste the **embed code** from your Ludus Account in the Value field.
    
    Now that the Custom field is set up. Simply type {{code}} wherever on the page you want the embed to be. In our example, that would be: {{LUDUSMANUAL}}
    
    Click to save your page/post.
    
    Note that the embed will only show on the public page once published.
    
    Click to view your published page.
    
    ![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-Gg8o6yH0NQEZIDVe2ABVg-20240729-181413.png?format=webp "Document image")
    

_If_ you do not see "Custom Fields" for Step #2, you'll want to click the **Screen Options** button at the top of the page/post and check on "Custom Fields". If Custom Fields isn’t an option under “Screen Options”, then Advanced Custom Fields (ACF) may be installed. Jump to “Troubleshooting” in the article. Here is a more in-depth article if you need help finding Screen Options: [https://www.wpbeginner.com/wp-tutorials/how-to-fix-custom-fields-not-showing-in-wordpress/](https://www.wpbeginner.com/wp-tutorials/how-to-fix-custom-fields-not-showing-in-wordpress/ "https://www.wpbeginner.com/wp-tutorials/how-to-fix-custom-fields-not-showing-in-wordpress/")

## 🚨 Handling WP Rocket

_If_ the WP Rocket plugin is installed on your WordPress, WP Rocket can interfere with the Embed Widget loading on public pages when logged out of WordPress. The most common issue is that you'll see the Embed Widget when previewing your website while logged into WordPress, but anyone visiting your site cannot see it.

To fix this issue, ensure that Minify JS and Defer JS are _not_ enabled on the post/page in the WP Rocket settings.
