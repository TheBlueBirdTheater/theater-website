---
title: "Which sites need to be whitelisted?"
source_url: "https://support.ludus.com/which-sites-need-to-be-whitelisted"
category: "Account Settings > Account Settings and Setup FAQ"
scraped_at: "2026-09-01T19:02:33.761Z"
---

# Which sites need to be whitelisted?

If your network has certain websites restricted, some elements of the Ludus ticketing experience may not appear/function as expected due to your content filter. Check out the menus below to troubleshoot for each area.

In most circumstances, you will not need to worry about whitelisting specific sites. This is most common for those operating on a network, such as a school network, that has a content filter.

### Main Ludus Domain to Whitelist

-   Ludus.com

### Not receiving confirmation emails from Ludus

If you are not receiving confirmation emails from Ludus, you will want to ensure that your email server is allowing messages from "@ludus.com". This, other than an email address not being typed correctly, is the most common reason that a confirmation email is not being received.

### Images such as cover graphics and splash page graphics are not loading

If you have images attached to your event, Add-ons, splash page, Notices, etc., but they are not showing up, it might be due to a network block.

To fix this, you will want to ensure that the following site is whitelisted (which is our CDN where we host all graphic files uploaded to Ludus):

-   ludus.nyc3.digitaloceanspaces.com

### Standard Terminals are not connecting

For the Terminal to communicate with Stripe (the payment network) over a secure connection, it needs to be able to access the main domains used for communication on payments and encryption. This is especially important if you are on a network, such as a school network, that has a content filter.

To help fix Standard Terminals' non-connection, ensure these domains are whitelisted:

-   stripe.com

-   api.stripe.com

-   terminal.stripe.com

-   api.emms.bbpos.com

-   armada.stripe.com

-   gator.stripe.com

-   \*.terminal-events.stripe.com

-   pool.ntp.org

-   time.android.com

-   \*.\[random-string\].device.stripe-terminal-local-reader.net (partially qualified)

-   For a full list of all domains Stripe uses, [click here](https://stripe.com/docs/ips "click here").

**Firewall Ports:** If you think you may have firewall ports that need opening, here is what you'll need open for the Terminal to work:

-   TCP port 4443

-   TCP port 443 (HTTPS)

-   UDP port 53 (DNS)
