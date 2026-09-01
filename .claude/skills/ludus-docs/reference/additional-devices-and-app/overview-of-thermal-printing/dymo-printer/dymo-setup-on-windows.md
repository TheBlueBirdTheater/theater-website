---
title: "DYMO Setup on Windows"
source_url: "https://support.ludus.com/dymo-setup-on-windows"
category: "Additional Devices & App > Overview of Thermal Printing > DYMO Printer"
scraped_at: "2026-09-01T19:03:07.886Z"
---

# DYMO Setup on Windows

# DYMO Setup on Windows

When it comes to DYMO 450 printing on a Windows computer, you'll have to edit a few settings to get the printer to work with ticket printing.

_DYMO printers are not ticket printers, but we have created custom ticket stock and settings to print thermal tickets. You will need to snap the top lid off your DYMO for easy printing. If you are looking for a new thermal printer, please consider a_ [_Boca_](https://bocasystems.com/ "Boca") _for professional ticket printing, as we do not recommend DYMO printers._

Only DYMO 450 printers are supported — DYMO has removed 3rd party label support for all new devices (550+).

## DYMO Setup Instructions

### Create The Custom Form Size

Prior to creating the custom form, you will need to install the drivers for the Dymo printer.

1.  Set up a new paper size (form)

1.  Open Control Panel (you may have to type in "Control Panel" in your Windows search bar).

2.  Click the **Devices and Printers** link here to get to the screen below. Click on your DYMO printer and then select **Print server properties** in the actions bar.

2.  Once the server properties window is open, check off **Create a new form** and then:

1.  Enter a name for the new form. Our DYMO tickets are 2.5 x 7.5, so that's what we named them in this example.

2.  Units: English

3.  Width: 2.31in

4.  Height: 8.00in

5.  Top: 0.50in

![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/KhSWku8FlzxtYsBLVGenc_image.png?format=webp "Document image")

Be sure to hit **Okay** or **Apply** where applicable.

### Edit your DYMO's printing preferences

Once you complete step #2 above, you should be back on the **Devices and Printers** screen.

Now, right-click on your DYMO printer and select **Printing Preferences** in the dropdown:

-   Select **Landscape** as the orientation

-   Then click **Advanced...** and select the form you created in Step 1 for **Paper Size**.

-   If your printing comes out a little fuzzy, consider going back and changing your **Print Density** to **Dark**.

![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/gDypV-dTFsOQZH_d0tZq6_image.png?format=webp "Document image")

Be sure to hit **Okay** or **Apply** where applicable.

### Turn on DYMO printing in your Ludus admin panel

In your Ludus admin panel, click **More** → **Settings** → **Advanced** and switch "DYMO Printing" to **On**.

Now, when you go to print tickets, you'll see an additional option under "Basic Printing" for your DYMO.

### Tips

1.  DYMO printers are not ticket printers by default, but they can work as one. To properly set up your DYMO to handle fan-folded ticket stock, _remove/snap off_ the lid of your DYMO and remove the spool. (This doesn't break the DYMO, and you can always put the lid back on in the future.)

2.  Feed the ticket stock thermal (blank) side _down_ and _stub first_.

We recommend using **Google Chrome** to print tickets as it remembers your print preferences. The first time you print, you may have to select the DYMO printer, your newly created paper size, and disable the "Headers and footers" option. Chrome will remember your selection so you can quickly print.

![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/SIzXhPWUSI8vIYQGU00v4_image.png?format=webp "Document image")

### Testing

Now that your custom paper size is created and DYMO printing is enabled, you can test DYMO printing by either completing a test order in your admin panel _or_ by pulling up an existing order.
