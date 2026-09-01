---
title: "Import Templates and Instructions"
source_url: "https://support.ludus.com/import-templates-and-instructions"
category: "Imports > What can be imported?"
scraped_at: "2026-09-01T19:01:13.278Z"
---

# Import Templates and Instructions

Each type of import has its own template and requirements. This article covers imports that an account holder can set up and provides links from the support team. Below are the CSV templates required for each of these imports, along with links to additional resources and help.

Special characters (such as "&") can cause disruptions during import, and we recommend removing them before attempting to import.

Patron, Student, and Authentication imports can be performed by any account user with **Full Admin** permissions. Instructions for those imports can be found in their respective locations within Ludus and the manual.

## Imports available on your admin account:

### Authentication

CSV Example:

[authenticators\_example.csv](#)

Before you can upload, you will first want to organize your records into a CSV file or Excel sheet. Each bit of information (ID, email, first name, last name, grade) will need to be in its own column. Each row will represent an individual record. For more information about what bits of information are needed for an Authentication record, check out this article.

_Suggested Article_: [What information is needed for an Authentication record?](https://support.ludus.com/what-information-is-needed-for-an-authentication-record)

To import Authentication:

1.  Navigate to **More** \--> **Authentication** from the top navigation bar.
    
2.  Click **Import**.
    
3.  Drag your file to the grey area or click the space to choose a file from your computer. Click **Continue**.
    
4.  Use the drop-down boxes to make sure the columns match up to the desired import area (i.e., email to email and Auth ID to Auth ID).
    
5.  Click **Import**.
    

**Note** - See [Authentication](https://support.ludus.com/authentication) for more information, including how to enable Authentication on your account. Import information is also provided in that resource.

### Patrons

CSV Example:

[patron\_example.csv](#)

To import Patrons:

1.  Navigate to **Patrons** \--> **Database** from the top navigation bar.
    
2.  Click **Import**
    
3.  Drag your file to the grey area or click the space to choose a file from your computer. Click **Continue**.
    

**Note** - check out [Import Patrons to Ludus](https://support.ludus.com/import-patrons-to-ludus) for more detailed instructions/information.

**Note**: Check out [Signup Patrons for a Mailing List Using Imports](https://support.ludus.com/signup-patrons-for-a-mailing-list-using-imports) for how to use imports to update your mailing lists.

### Students

CSV Example:

[student\_example.csv](#)

To import Students:

1.  Go to **More** (at the top of your account) -> **Students**.
    
2.  Select the **More Dropdown** (on the students page) -> Select **Import**.
    
    **Note** - Only the Student's first and last names are required upon import.
    

**Note** - Check out [Students](https://support.ludus.com/students) for more detailed instructions and background information on the Students feature.

### Volunteers

CSV Example:

[volunteers\_example.csv](#)

To import Volunteers:

1.  Navigate to **More** (at the top of your account) -> **Volunteers**.
    
2.  Once there, navigate again to **Volunteers** (located along the top bar).
    
3.  From here, select **Import Volunteers.**
    

**Note** - You can also Import Volunteer Hours through Ludus support. Scroll further down this page for that information.

## Imports that need to be done by Ludus Support:

### Access Codes

CSV Sample:

[access\_code\_example 9-25-2024.csv](#)

To import **Access Codes** the following information can be included in the appropriate column of the CSV.

-   **Access code:** **(Required)** Can be letters or numbers, and must be unique. Can not contain special characters.

-   **Reference Text: (Optional)** Internal note for Admins that appears on the Access code screen.

-   **Total Tickets: (Optional)** Used to set the total number of tickets a code can be used for.

-   **Showtimes: (Optional)** Used to limit the code to unlocking a specific event time or times. Event time ID is obtained via the URL for the Event (using the New Order button to get to that URL). Multiple time codes would be separated by a comma. _**See the example below.**_

-   **Email: (Optional)** If provided the Access code will be emailed to the address provided immediately on import.

![Highlighted - where to locate the time ID for the Showtimes column](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/dWidZlhoTkGQkS0u1uelE_chrome-n11j7rkk6e.png?format=webp "Highlighted - where to locate the time ID for the Showtimes column")

Highlighted - where to locate the time ID for the Showtimes column

**Any column not used on the CSV should be deleted**

Access codes will be set to individual/Family if the Total TIckets column is used.

### Discount Codes

Both **Flat Rate discounts** and **Percentage Off** discounts can be imported. Each type has its own CSV template.

### **Flat Rate Discount Template**

[flat\_discount\_codes\_example.csv](#)

For Flat Rate discounts, the following items can be set by import:

-   **Code (Required)**: Can be Letters, words, or numbers, or a combination of those. Must be unique, with no special characters or spaces.

-   **Flat Amount (Required)**: The amount of the discount.

-   **Flat Type(Required)**: This sets the discount to be either per **Order** or per **Ticket.**

-   **Total Available (Optional)**: This is the total inventory for the discount code and is not the per-patron limit. Set to **0** to not use this feature (this will "uncheck" that option in the interface)

-   **Tickets Limit (Optional)**: this is the total number of tickets the discount code can be used on. Set to **0** to not use this feature.

-   **Ticket limit Type (Optional)**: if 'tickets\_limit' is set, you can set this to **all** or **patron**. Use 'all' if the discount code should expire after being used on that many tickets in total across all orders. Use 'patron' if it's a shared discount code amongst multiple patrons (per patron).

-   **Global (Optional)**: Set this discount code to be a global discount. Set to **1** to enable, leave as **0** or blank to not use.

-   **Global Shows (Optional)**: if global is set to 1, you can set the global events using their IDs, from the URL like this: '100073 100016 100023' <- each of those is an event ID, be sure to put a _space_ between each ID (commas are not accepted)

**Percentage Off Discount Code Template**

[discount\_codes\_example 8-24.csv](#)

Importing percentage off discount codes allows for using the following settings via import.

-   **Code (Required)**: Must be unique and not contain any spaces or special characters.

-   **Percentage (Required)** The percentage to take off of ticket prices.

-   **Total Available (Optional)**: This is the total inventory of tickets for the discount code and is not a per-patron limit. Set to **0** to not use this feature.

-   **Tickets Limit (Optional)**: This is the total number of tickets the discount code can be used on. Set to **0** to not use this feature.

-   **Ticket limit Type (Optional)**: if 'tickets\_limit' is set, you can set this to **all** or **patron**. Use 'all' if the discount code should expire after being used on that many tickets in total across all orders. Use 'patron' if it's a shared discount code amongst multiple patrons (per patron).

-   **Global (Optional)**: Set the discount code to be a global discount. Set to **1** to enable, leave as **0** or blank to not use.

-   **Global Shows (Optional)**: if global is set to 1, you can set the global events using their IDs, from the URL like this: '100073 100016 100023' <- each of those is an event ID, be sure to put a _space_ between each ID (commas are not accepted)

It is important to know that not all settings for discount codes can be imported. Only settings listed above can be imported at this time.

### Donations

It is possible to import historical donations. These will appear as comped donations. Donation Import Template:

[donations\_example 8 24.csv](#)

**Note** - Patrons must be imported first, before importing historical donations.

**Note** - The format for the "submit date" column must be Year-Month-date (YYYY/MM/DD). If the year is the only date on the donation, import the donation in as 2025-01-01. It must have the formatting of a four-digit year, a two-digit month, and a two-digit day to import correctly.

To import donations, the following columns are available:

-   **Submit Date (Optional)**: The date of the original donation.

-   **Amount (Required)**: The amount of the donation

-   **Full Name (Required)**: The First and Last names of the patron can be entered

-   **Email (Required)**: The email address creates the record of donation.

-   **Street Address (Optional)**: Street Address for Patron Record

-   **City (Optional)**: For the Patron Record

-   **State (Optional)**: For the Patron Record

-   **Zip Code (Optional)**: For the Patron Record

-   **Phone number (Optional)**: For the Patron Record

-   **Company (Optional)**: For company-based donations.

-   **Memo (Optional)**: Short message about the donation that appears on the confirmation email.

-   **Category ID (Optional)**: If you have categories set, you can include the Category ID, listed on the Donation Categories page.

-   **Level ID (Optional)**: If using levels, you can enter the Level ID number (located in the URL when clicking **Edit** next to the level to assign the donation to your specific levels. See the example below.

### Flex Passes

Importing Flex passes can be done for many reasons. While normally used when onboarding to set up existing sales from your prior system for events that will take place on Ludus, you can also use them for other purposes, such as an alternative to discount codes, where they can be used for comp tickets.

Flex Passes must be set up within your account before an import can take place. When requesting an import, let us know if patrons should be emailed the passes or not. **Flex Pass Import Template:**

[pass\_example 8-24.csv](#)

The following fields are utilized for Flex Pass imports:

-   **Pass ID (Required)**: Obtained via the Pass URL (example below)

![Document image](https://images.archbee.com/-Wjcg2-gpBfUKvBZQaMyV-Ul8hH8rc9jIU6nihWeGwT-20250618-133157.png?format=webp "Document image")

**Note** - IDs are unique to each pass. Two different passes (IE, Student Flex Pass vs. Senior Flex Pass) will have different IDs.

-   **Code (Required)**: The code you want to assign to the Passholder must be unique and can be letters, numbers, or a combination of both. Special characters are not allowed.

-   **First Name (Optional):** Passholder's first name

-   **Last Name (Optional)**: Passholder's last name

-   **Email (Required)**: This assigns the pass to the patron's record

-   **Address (Optional**): Patron Address

-   **Phone Number (Optional)**: Patron's phone number

**Note** - Importing passes can optionally send an email of the passcode to the recipient. Let Support know if you want the patrons emailed the pass at the time of import, or if you will later send the passes out.

### Patron Properties

See [Import Properties](https://support.ludus.com/import-properties) for instructions and assistance (as well as the CSV).

### Prior Gift Card Sales

See [Import Prior Gift Card Sales](https://support.ludus.com/import-prior-gift-card-sales) for instructions and assistance (as well as the CSV).

### Prior Ticket Sales

See [Import Prior Ticket Sales](https://support.ludus.com/import-prior-ticket-sales) for instructions and assistance (as well as the CSV).

### Recurring Memberships

This is primarily done when importing memberships from a prior system into Ludus during onboarding.

Your existing memberships paid for in another system can be imported with their expiration dates. 7 days before the imported memberships are set to expire, an email will be sent allowing patrons to set up a payment method to continue their membership by adding a credit card.

Membership passes need to be set up before an import can be performed, and any fee settings should be configured in advance.

Before importing the membership passes, it is strongly advised that you email your patrons to let them know they will receive an email about the new membership in Ludus, so they don't think it is spam and that the links are safe.

**Recurring Membership template.**

[Recurring membership 8-24.csv](#)

The following lists all fields, including what is required and what is optional for the import.

-   **Pass ID (Required):** Obtained from the URL of the pass

-   **Code (Required):** The passcode you assign must be unique.

-   **First Name (Optional)**

-   **Last Name (Optional)**

-   **Address (Optional)**

-   **Phone # (Optional)**: preferred formating would be (###) ###-####

-   **Email (Required)**: Patron's email address

-   **Expiration Date (Required)**: Formatted as DD-Month-YY (IE, 29-Jul-24

### Volunteer Hours

Volunteer hours can be imported to existing volunteer profiles. This is primarily meant for recording hours accumulated in a prior system when moving to Ludus. This import would be completed after volunteer profiles are imported or created.

**CSV Sample file:**

[volunteer\_hours\_example\_8\_2024.csv](#)

To import volunteer hours, the following fields are available:

-   **Email** (required)

-   **Hours:** Number of hours to apply.

-   **Notes:** Any information to record for these hours. (Optional)

-   **Role ID:** Associated Role ID in Ludus. (Optional)

-   **Volunteered Date:** Date to record the hours worked on. (Optional)

-   **Submit Date:** Date submitted. (Optional)

**Note** - The Role ID number can be located by clicking on the Volunteer tab and using the filter for the role you need the ID number. Once filtered, the ID number is in the URL for the page.

![Document image](https://images.archbee.com/y_yS_sVZWor_q35Q4f09J-1JJFrsKI-lvH-Fy3z1CS--20240809-133411.png?format=webp "Document image")

## How to Handle Season Tickets/Passes

Season Passes are not imported. You will manually go in and "resell" the passes to those patrons.

For Season Passes, we cannot import that information. Instead, you will want to:

1.  **Import Patrons** into Ludus
    
    This can be done under **Patrons** -> **Database** -> **Import** (at the top).
    
2.  Once patrons have been imported, you will want to **build your current season passes**.
    
    Make sure your events for the passes are set up before creating the pass.
    
    This can be accomplished under **More** (at the top of your account) -> **Passes** -> **+Create Pass**.
    
3.  Finally, you will "**sell**" those passes to current passholders.
    
    This means you will go to **More** (at the top of your account) -> **Passes.**
    
    From here, you will "sell" the pass to the patron. You will select the events for the pass and reserve seats for them. This will need to be done for each pass.
    
    Once you do this, you can check out and choose to comp the order if they have already paid for this season ticket.
    

**Want to see the steps above? Check out the following video:**
