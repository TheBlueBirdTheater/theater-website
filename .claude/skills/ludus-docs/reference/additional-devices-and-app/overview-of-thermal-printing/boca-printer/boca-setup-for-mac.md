---
title: "Boca Setup for Mac"
source_url: "https://support.ludus.com/boca-setup-for-mac"
category: "Additional Devices & App > Overview of Thermal Printing > Boca Printer"
scraped_at: "2026-09-01T19:03:05.197Z"
---

# Boca Setup for Mac

When thermal printing is enabled on your account, you'll have access to the "Basic Printing - Thermal Printing (8.5 x 11)" option, which uses your browser's print dialog.

If you'd like a direct connection with FGL commands, you must set up the Boca as a raw printer and download the QZ Tray application. This allows Ludus (a web-based system) to communicate directly with your printer through your web browser, providing fast and seamless printing.

Remember that we can help with printing from Ludus; we cannot help with technical or hardware issues with the Boca itself, as that is a job for Boca's tech support.

When it asks for your username and password, that is the username and password you use to log in to your Mac every day. If you are not sure what the username is, go to **Apple logo** -> **System Preferences** --> **Users & Groups**. Click on the padlock at the lower-left corner and input your administrator password. Right-click on your account name in the left side pane and select "Advanced Options." You should see a dialog box come up that will allow you to change things like your account name, full name, and things like that. Here you can get the "Account Name," which is your username.

1.  ### [](#plug-inconnect-your-boca-to-your-computer)**Plug in/connect your Boca to your computer.**
    
    If the driver isn't automatically installed, ensure you download the Boca driver from their website: [https://bocasystems.com/repairs.html](https://bocasystems.com/repairs.html "https://bocasystems.com/repairs.html") (under Printer Drivers).
    
2.  ### [](#set-up-your-boca-as-a-raw-printer-carefully-follow)Set up your Boca as a raw printer, carefully following the sub-steps below:
    
    1.  **Open Terminal on your Mac** — to find Terminal, click the magnifying glass in your top bar and type in "Terminal"
    
    2.  In the Terminal window, **paste in this command and hit RETURN**:
    
    1.  sudo cupsctl WebInterface=yes
    
    2.  Once you hit Enter, the reply in the terminal will ask you to enter the computer's password. It will not show the password as you enter it. After successfully entering the correct password, it will respond with your username and the name of the computer.
    
    3.  **Open the CUPS dashboard by following this link in your web browser** (Chrome or Safari): [http://localhost:631](http://localhost:631/ "http://localhost:631")
    
    4.  In the CUPS interfac,e click the **Administration** and then select the **Add Printer**
    
    ![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-eJsQRhqhzVqdF0VKfXgvz-20240925-145853.png?format=webp "Document image")
    
    5\. **IMPORTANT**: Select the **AppSocket/HP JetDirect** option and then hit **Continue** (do not select any other options, even if you see your printer listed).
    
    6\. **Open the Terminal application again** and then paste in the following command (once you hit RETURN, it will take 10-20 seconds for something to spit out, so just be patient here): lpinfo -v |grep usb
    
    7\. **Copy the usb://...... part, stopping at the "?".** For example, in the below screenshot, just copy the usb://Zebra/LP2844 (you do not need to include the ? or anything after that).
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/qAOZ3HqMFuofFj6JWrq3G_38a8db06-026d-11e5-8dec-9b6753190430.png?format=webp "Document image")
    
    1.  **Paste the copied URL into the CUPS dashboard where it asks you for a port,** and then continue.
    
    2.  Enter a **Name** for your Boca (no special characters, maybe something like "boca\_ludus".
    
    3.  Enter a simple **Description** for your Boca (something like Boca Ludus).
    
    4.  Enter the location (something like "Box Office Mac").
    
    5.  Leave the "Share this printer" button _unchecked_ and then **Continue.**
    
    6.  Select **Raw** in the menu list and hit **Continue.** (Do not select the "Boca" option; be sure to select "Raw"). _\* Image 1 below_
    
    7.  _Then_ click the **Add Printer** button**.** _\* Image 2 below_
    
    8.  Leave "Starting Banner" and "Ending Banner" set to **None**, then click **Set default options**. _\* Image 3 below._
    
    ![Image 1](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-cKXjJHEEqETzgLLRSX-Gf-20241014-161839.png?format=webp "Image 1")
    
    Image 1
    
    ![Image 2](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-bsJrpm35kj3cQmh_3SQNf-20241014-162424.png?format=webp "Image 2")
    
    Image 2
    
    ![Image3](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-sj-2s8Pdfwl6FXpf3QvGI-20241014-162513.png?format=webp "Image3")
    
    Image3
    
    Your Boca is now set up for raw printing!
    
    If you are on the latest version of CUPS, you may see this screen appear:
    
    ![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-GFLVwdP12cOVAQkFtb-63-20241014-162648.png?format=webp "Document image")
    
3.  ### [](#download-qz-tray)**Download QZ Tray**
    
    Download the QZ Tray software here (v2.2.0 or higher): [https://qz.io/download/](https://qz.io/download/ "https://qz.io/download/") You will always need this running to print to your Boca.
    
4.  ### [](#let-the-ludus-team-know-you-have-your-boca-setup-a)Let the Ludus team know you have your Boca setup as a raw printer and are ready to have thermal printing enabled on your account.
    
    I_f you need to purchase thermal ticket stock, you can do so via the Ludus Supplies Shop under_ _**More**__\->_ _**Supplies.**_
    

If you are not sure if your Boca is set up to work as a Raw Printer, you can open Cups using the above steps and select the printers tab to see a list of your printers. You should see the Boca listed twice. Once as a standard printer, and once as Raw with the name you gave it.

![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-xCuO43rvBw2LsGsNqen-M-20241014-163211.png?format=webp "Document image")
