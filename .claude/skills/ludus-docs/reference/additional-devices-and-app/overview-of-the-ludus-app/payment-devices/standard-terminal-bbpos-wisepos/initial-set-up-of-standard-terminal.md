---
title: "Initial Set Up of Standard Terminal"
source_url: "https://support.ludus.com/initial-set-up-of-standard-terminal"
category: "Additional Devices & App > Overview of the Ludus App > Payment Devices > Standard Terminal BBPOS WisePOS"
scraped_at: "2026-09-01T19:02:58.909Z"
---

# Initial Set Up of Standard Terminal

## Overview

This article will walk through everything you need to know to collect payments with a Standard Terminal. From unboxing to accepting payments in person, each step is outlined below. Some steps might have some additional information that you'd like to read up on. To dive deeper into a particular step and learn about the FAQs and troubleshooting, click the "_Suggested Article_" for the step.

# Instructions

1.  ### [](#unbox-your-device-and-power-on)Unbox your device and Power On
    
    Once you receive your Terminal, you'll find the Terminal and battery in the box. Your Terminal acts like a mobile device so it can be used wirelessly without having to plug it in for use — you'll see the battery percentage on your device's screen when in use.
    
    **To install the battery, the back panel snaps up and off (it does not slide).** With the battery installed correctly, the panel will snap back into place. If you have issues putting the panel back on (i.e., it won't close completely), this means the battery may be installed the wrong way.
    
    Power on the device.
    
2.  ### [](#connect-the-terminal-to-the-wifi-network)Connect the Terminal to the WiFi network
    
    Upon first boot, you'll be asked to connect to your private WiFi network (it may also have you update your Terminal to the latest firmware). If you have the optional Ethernet dock, plug your dock into your Ethernet and slide the Terminal into the dock.
    
    **Your Terminal must be on the same WiFi network as the computer you are selling tickets on in your Ludus admin panel, or you will receive connection errors.**
    
    Your WiFi network must use WPA-Personal or WPA2-Personal encryption and be password protected. WiFi is not supported for non-password-protected networks or enterprise networks. Please consult your tech department or an expert for any questions about your network.
    
    If you need help with the Ethernet setup, check out the "Using the Ethernet Dock" section at the bottom of this article.
    
3.  ### [](#generate-pairing-code)Generate Pairing Code
    
    -   Once connected to WiFi and updated, **swipe right from the left side of the Terminal's screen**.
    
    -   Select **Settings** on the Terminal's screen and enter **07139** for the "Admin PIN."
    
    -   Click **Generate Pairing Code** (Example Below)
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/h0y3HnJ6GdPBhti3gw-gd_image.png?format=webp "Document image")
    
4.  ### [](#add-standard-terminal-to-your-admin-panel)Add Standard Terminal to your Admin Panel
    
    You are now ready to connect your Standard Terminal to your Ludus account. This is done by clicking the **Settings wheel icon** (⚙️) in the upper right-hand corner and navigating to the **Payments** tab. At the bottom of the page, click **+Add Payment Device**. Click **Standard Terminal** and insert the Pairing Code displayed on your terminal. Name your terminal and click **Save**.
    
    _Suggested Article_: [Add payment device](https://support.ludus.com/add-payment-device)
    
5.  ### [](#sell-tickets)Sell tickets!
    
    At this point, your Terminal is connected to your Ludus and ready to start accepting payments. When you first go to sell tickets as an admin, it'll have you connect to your Terminal and then will remember which one you connected — if you have multiple Terminals, you can choose and switch between them at any time via your admin cart page when selling tickets.
    
    _Suggested Article_: [Sell tickets to an Event](https://support.ludus.com/sell-tickets-to-an-event)
    

## Using the Ethernet Dock

By default, the Terminal works over WiFi. However, you can purchase the _optional_ Ethernet Dock, which provides wired Ethernet connectivity and keeps your smart reader fully charged using the included charging cable. The Ethernet Dock features a 10/100 Ethernet port and rubber feet for stable countertop use.

To set up the dock:

-   Connect the Ethernet cable from your dock to your router.

-   Connect the dock to power. It has a minimum power requirement of 5V-2A (10W) and includes a charging cable, which you can plug into any USB-A power adapter (not included).

-   When both cables are connected, insert the Terminal reader into the dock.

To confirm that the reader is properly docked, verify the reader is charging and the Ethernet icon is visible in the status bar.

![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-g4FSUJoFtsN7TDMTvVyic-20240828-132916.png?format=webp "Document image")

The reader obtains an IP address using DHCP. As soon as the network cable is plugged in, the reader attempts to establish communication with Stripe.

The BBPOS WisePOS E prioritizes connecting through Ethernet if possible. Even if previously configured for WiFi, the reader switches to using an Ethernet connection when connected to the dock with a plugged-in Ethernet cable. If the reader is removed from the dock, it switches back to the WiFi connection. If you have to use Ethernet, ensure the Terminal reader is always in the dock.

The BBPOS WisePOS E resets its priority to Ethernet when rebooting. Even if previously configured for WiFi, the reader switches to Ethernet if it detects an Ethernet cable connection while starting up.

If you dock the reader but you don’t have an Ethernet cable plugged in, it uses WiFi. Regardless of connectivity while docked, you can still connect to WiFi and manage networks on the device.

Any help connecting to Ethernet should be provided by your IT department/person.

## Troubleshooting and more

-   **Same WiFi network -** it is important to note that your Terminal and the computer you are selling tickets on must be connected to the same private WiFi network; otherwise, you will receive connection errors.

-   **One Terminal can be connected to an admin cart at a time -** For example, if you have 2 box office computers selling tickets, each computer should have its own Terminal. It is best to label your Terminals like "Box Office 1", "Box Office 2", etc, so you can easily tell them apart. Otherwise, you'll have to be aware of what the other admin seller is doing before submitting your Terminal payment, and it may require you to refresh your cart page to re-establish the connection.

-   **Consistent connection errors -** If you get consistent connection errors even though your Terminal is connected to your WiFi, this could be due to a firewall or router configuration error that is blocking the connection and ports needed. Please contact your IT department or expert to allow the device permission or give your device access to an internal network used for internet-connected devices.

-   **Saying not connected to the Internet after saving WiFi details -** if this happens, you may have something blocking the connection, such as a firewall. To double-check, try temporarily connecting to your phone's hotspot: if it connects without issue, it means your WiFi network is causing the issue, so you can at least have that narrowed down.

-   **Try connecting both the computer and your terminal to a hotspot -** If it connects using the hotspot on a mobile device, then this would point to there being something on your network that is blocking the communication between the two devices.

-   **Firewall Ports -** If you think you may have firewall ports that need opening, here is what you'll need to open for the Terminal to work:

-   TCP port 4443

-   TCP port 443 (HTTPS)

-   UDP port 53 (DNS)

-   **Whitelist fully qualified domain names** **(FQDNs) -** for the Terminal to communicate with Stripe, the payment network, over a secure connection, it needs to access the main domains used for communication. This is especially important if you are on a network, such as a school network, that has a content filter:

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

-   **Unable to Connect -** If you are still getting an "unable to connect" error message, please open Console within the Chrome browser while that error message is showing. This will show you an error message that may help resolve the issue. In the Console, there will be an error message in red. Also, below that, there may be a link to help with troubleshooting the network issue. This is generally in yellow.

-   **Keyboard shortcuts to open the console**

-   Windows: Press Control + Shift + J or just use F12

-   Mac: Press Command + Option + J

-   If you see - **Failed to Load Resource** **\- net::ERR\_CERT\_DATE\_INVALID**, turning off your firewall can fix that. If you find that corrects the issue, be sure that the ports listed above are open on both your firewall and computer.

-   **DNS** \- The Terminal creates a DNS entry for itself of 1.1.1.1. If you are seeing an issue connecting, you may find that ensuring your computer can resolve addresses on that DNS server will help you connect.

-   **Try a splitter** - in cases where wired Ethernet is used on both the terminal/dock and computer, connecting both devices via a splitter may help. Some clients have successfully found this to get both devices to communicate.

-   **At this time, Stripe does not allow for the setup of a Static IP on the standard terminal.**
