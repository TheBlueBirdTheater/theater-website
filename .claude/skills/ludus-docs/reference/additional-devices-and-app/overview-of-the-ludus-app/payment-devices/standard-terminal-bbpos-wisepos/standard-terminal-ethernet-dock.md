---
title: "Standard Terminal Ethernet Dock"
source_url: "https://support.ludus.com/standard-terminal-ethernet-dock"
category: "Additional Devices & App > Overview of the Ludus App > Payment Devices > Standard Terminal BBPOS WisePOS"
scraped_at: "2026-09-01T19:02:58.524Z"
---

# Standard Terminal Ethernet Dock

# Standard Terminal Ethernet Dock

![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/nLG4AI1LIhRxqM1tIdhE2_image.png?format=webp "Document image")

The Standard Terminal Ethernet Dock provides hardwired ethernet connectivity and keeps your smart reader fully charged for all-day use with the included USB-C to USB-A charging cable. It features a 10/100 Ethernet port, rubber feet for stable countertop usage, and is designed for easy docking and undocking using the pins on the back of the reader.

When you place the Standard Terminal in the dock, it will automatically connect to the internet without the need for WiFi as long as the dock is successfully connected to a network.

Purchase this if you need an ethernet connection for your Standard Terminal (default is WiFi), especially if the computer you're using to sell through Ludus is hardwired through ethernet.

## Using the Ethernet Dock

By default, the Terminal works over WiFi. However, you can purchase the _optional_ Ethernet Dock, which provides wired Ethernet connectivity and keeps your smart reader fully charged using the included charging cable. The Ethernet Dock features a 10/100 Ethernet port and rubber feet for stable countertop use.

To set up the dock:

-   Connect the Ethernet cable from your dock to your router.

-   Connect the dock to power. It has a minimum power requirement of 5V-2A (10W) and includes a charging cable, which you can plug into any USB-A power adapter (not included).

-   When both cables are connected, insert the Terminal reader into the dock.

To confirm that the reader is properly docked, verify the reader is charging and the Ethernet icon is visible in the status bar.

![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-g4FSUJoFtsN7TDMTvVyic-20240828-132916.png?format=webp "Document image")

The reader obtains an IP address using DHCP. As soon as the network cable is plugged in, the reader attempts to establish communication with Stripe.

The BBPOS WisePOS E prioritizes connecting through Ethernet if possible. Even if previously configured for WiFi, the reader switches to using an Ethernet connection when connected to the dock with a plugged-in Ethernet cable. If the reader is removed from the dock, it switches back to the WiFi connection. If you have to use ethernet, ensure the Terminal reader is always in the dock.

The BBPOS WisePOS E resets its priority to Ethernet when rebooting. Even if previously configured for WiFi, the reader switches to Ethernet if it detects an Ethernet cable connection while starting up.

If you dock the reader, but you don’t have an Ethernet cable plugged in, it uses WiFi. Regardless of connectivity while docked, you can still connect to WiFi and manage networks on the device.

Any help connecting to ethernet should be provided by your IT department/person.
