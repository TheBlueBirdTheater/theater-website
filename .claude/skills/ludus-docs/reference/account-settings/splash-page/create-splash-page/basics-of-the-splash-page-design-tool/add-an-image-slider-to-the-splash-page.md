---
title: "Add an Image Slider to the Splash Page"
source_url: "https://support.ludus.com/add-an-image-slider-to-the-splash-page"
category: "Account Settings > Splash Page > Create Splash Page > Basics of the Splash Page design tool"
scraped_at: "2026-09-01T19:01:41.417Z"
---

# Add an Image Slider to the Splash Page

An image slider can be added to your Splash Page using the HTML feature in the Splash Page editor. You can use a service that provides the HTML code, such as Power IO, to do this. Power IO allows you to make one free image slider with a limited number of images very easily. They offer additional features and options for a fee.

The other option is to use CSS by using the instructions from [W3 Schools.](https://www.w3schools.com/howto/howto_js_slideshow.asp "W3 Schools.")

To use either method, you will want to have images that are the same size or that have been cropped to be the same size as each other.

### Using an external site

If you use an external site to create the image slider, you will want to obtain the HTML / CSS from the site you select. If you are using Power IO, you can get this from the publish button using the Embed with code option.

Copy that code and head over to the Splash Page editor.

In the Splash Page editor:

1.  Add a single column to your splash page in the location you want the slider to appear.
    
2.  From the Content area, select HTML and add it to the column you just created.
    
3.  In the HTML content block that is on the right of the editor screen, paste in the code that you copied from the website.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/ZzWxqs1wepsATvXen8Wuy_t-curtis-performing-arts-centre-admin-15.png?format=webp "Document image")
    
4.  Click to Save your Splash Page.
    

### Using A CSS Template

This is the more complicated of the two methods, but using your own CSS allows for more control of the image slider. It is recommended to utilize the following article as a guide.

Suggested Article: [W3 Schools](https://www.w3schools.com/howto/howto_js_slideshow.asp "W3 Schools")

1.  To begin, you will want to upload your images to a file-sharing location. The easiest method is to upload them as graphics on the splash page while you set up the slider. Ensure all the images are the same size in pixels.
    
2.  Add a Row to the Splash page where you want the slider to appear.
    
3.  Add the HTML content block to the column you just created. Then click on the column/content block where it says "Hello, World!" to open the Content field.
    
    Download the file below and open it to edit.
    
    [CSS for Image Slider.docx](#)
    
4.  Locate the Container Width section (shown in Red) and set the max width to the same size as the images you will use in Pixels. In the document that is currently set to 1080px.
    
5.  Scroll down in the document to locate the actual file URLs for the images (Shown in red)
    
    They will look like this:
    
    <div class="slideshow-container">
    
          <div class="mySlides fade">
    
            <div class="numbertext">1 / 3</div>
    
            <img src="**https://ludus.nyc3.digitaloceanspaces.com/1715806563.png**" style="width:100%">
    
            <div class="text">**Into The Woods**</div>
    
          </div>
    
    Replace the bolded URL with the URL for the image you wish to use. If you added the image to your splash page, you can obtain it by clicking the image, and the URL will be listed on the right side of the screen.
    
    This line -  <div class="text">**Into The Woods**</div> is optional and can be removed if desired. It adds a description to the image, with the text in the bolded area.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/B_WgflBgm5J-XnQSdPgR2_ludus-manual-admin-2024-05-16t095115990.png?format=webp "Document image")
    
6.  Repeat Step 5 for each image you are adding to your slider.
    
7.  You can now delete the images from your splash page by clicking on the image and clicking the Delete Icon.
    
8.  Copy the whole document with your image URLs and paste this in the HTML box you created earlier, and save the page.
    
    ![Document image](https://images.archbee.com/hZcZIA5As4EsukOh0OMVE/rTBQJ-CN8vZPumYv1wRIb_ludus-manual-admin-2024-05-16t095115990.png?format=webp "Document image")
    
9.  Once saved, you will be able to view your image slider on your Splash page.
