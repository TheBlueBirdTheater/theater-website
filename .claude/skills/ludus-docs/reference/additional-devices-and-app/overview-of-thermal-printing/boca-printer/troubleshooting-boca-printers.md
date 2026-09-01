---
title: "Troubleshooting Boca Printers"
source_url: "https://support.ludus.com/troubleshooting-boca-printers"
category: "Additional Devices & App > Overview of Thermal Printing > Boca Printer"
scraped_at: "2026-09-01T19:03:05.733Z"
---

# Troubleshooting Boca Printers

# Troubleshooting Boca Printers

In Ludus, we have built-in tools allowing our web-based system to print directly to your thermal ticket printers.

First, thermal printing must be set up and enabled on your account. If you have not done this, use our chat widget and select "🖨 Hardware, Printers, & Scanning," and our Printer Bot will walk you through the steps.

### Once you've confirmed that you have set up thermal printing in Ludus, here are the troubleshooting tips:

## **QZ Tray isn't operating properly**

The first place to check is your QZ Tray. It may not be installed, running, or may need to be restarted. QZ Tray always needs to be running in order for Ludus to communicate with your thermal printer.

-   If QZ Tray isn't installed, go to this link and download: [https://qz.io/download/](https://qz.io/download/ "https://qz.io/download/")

-   To check if QZ Tray is running, simply open the application.

-   If QZ Tray needs to be restarted, quit the application and re-open it.

**You'll know QZ Tray is running properly if you see a list of your printers under "Thermal Printers" in the dropdown in your Ludus admin panel when you go to print.**

## **Not plugged in correctly**

This is an easy one. Sometimes things just need to be plugged back in.

1.  Try unplugging and replugging the printer's USB.

2.  Try turning the printer on/off (yes, sometimes that really does do the trick)

3.  Try restarting your computer completely

## **The print queue needs to be cleared**

If the problem persists, try clearing the printer queue. To do this:

1.  Open the printer application on your operating system

2.  If jobs are open, you'll see them here as _Pending_. Close the jobs out to clear the queue and restart them.

## **(Windows): Restart or clear the print spooler**

Sometimes the "Printer Spooler" application on your Windows may be stuck.

You have to manually disable the Print Spooler service and delete the files in the queue. The process is easy — here's how to do it:

-   Switch the **printer off.**

-   Click the Windows 10 Cortana button. Type **Services** in the search box.

-   In the Services window, navigate to **Print Spooler**.

-   Double-click **Print Spooler.**

-   In the window, click on the **Stop** button to disable Print Spooler.

-   Open **File Explorer** on the Windows 10 taskbar.

-   Go to **C:\\Windows\\System32\\spool\\PRINTERS.** You’ll find the folder that contains a log of documents on the print queue.

-   Press **Ctrl** + **A** on your keyboard to select all the files in the folder. Delete them.

-   Open the Printer Spooler dialogue box again. Click on the **Start** button to turn the Printer Spooler on.

-   Turn your printer on and try to print.

## **(Mac): Clear all print jobs and resume printer in CUPS**

1.  Go to [http://localhost:631](http://localhost:631/ "http://localhost:631") (if you do not have CUPS enabled, you will have to enable it using 'sudo cupsctl WebInterface=yes' in Terminal)

2.  Open the Terminal app and enter: _cancel_

3.  Click the **Printers** tab in the top navigation

4.  Click on Boca Printer (raw version)

5.  In the "Maintenance" dropdown → select **Resume Printer** _if that is an option._

## **Open port 8181**

Port 8181 may be blocked on your computer, which QZ Tray needs to run, especially if on a networked computer with firewall settings enabled.

1.  Have the user follow this link in their web browser: [https://localhost:8181](https://localhost:8181/ "https://localhost:8181")

2.  It may appear as untrusted or a security warning. **Proceed** anyway, and they should be brought to a page with QZ Tray information.

3.  Then have them reload QZ Tray and try to print again.

## **Still not working?**

1.  **Get console logs from your browser**
    
    1.  Go to print a ticket like normal, where it opens up the grey "Printing to..." screen
    
    2.  Once on the grey printing page, press the following keys on Windows in Google Chrome: **Shift + CTRL + J** or Option + ⌘ + J if on Mac.
    
    3.  This will bring up the **Console** that will look similar to the screenshot below (if it doesn't, be sure you're on the "Console" tab). Please scroll through this and take screenshots of any red error messages.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/DWorLbuCwoy5ab3PilkpP_screen-shot-2023-09-26-at-120441-pm.png?format=webp "Document image")
    
2.  Send the screenshots of the console log to Ludus customer support and we'll see what we can do to help!
