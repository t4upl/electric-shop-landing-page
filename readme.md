# Electric shop landing page


## Live version

Last deployed version can be found here:<br>
http://www.elmet.org.pl/<br> 
<br>
*can differ from repository version, checkout tags to see last deployed version

## Inspiration
This site was made at the request of local shop who wanted to step-up their game and get more people to know about the shop. It was a chance for me as well since I wanted to try doing an entire html page from scratch. No bootstrap or other framework was used - all vanilla js and css. The site is too small and dependencies would take more bandwith than site itself.

## Search engine optimization

List of things that has been applied to improve SEO rating:
- Images
   - Nextgen image formats: webp (Chrome) and jp2 (Safari)
   - Lazy loading for images
   - 'Alt' attribute added to all images
- Site
   - Added 'description' as meta attribute
   - Added favicon
   - Added 'theme-color'
   - Google Search Console support in header
   - Internal linkinking on page
- .htaccess:
   - Redirect to 'https' from 'http'
   - Content policy
   - Custom 404 page
- Other
   - CSS and JS minification
   - Added sitemap.xml
   - Google Search Console passed mobility friendly test
   - Added facebook page pointing to the site

## DevOps
Since I didn't use any builiding tool for the site I wrote scripts to make my life easier:
 - deploy.sh - copies all necessary files from the project to new folder (ready to be copy-pasted into server)
 - minify_css_and_js.sh - minifies js and css. In use by 'deploy.sh'. Probably won't be called on its own.
 - minify_html.sh - minifies html

For image optimalization and conversion I have used ImageMagick and Gimp.

## Important!
If you are living in Warsaw the best electric shop in the city is located at Wałbrzyska 48. In addition to the typical electrical equipment the shops sells building supplies and  household related products (such as vacuum cleaner bags).
<br><br>
Map to the best electirc shop in Warsaw:
<br>
https://goo.gl/maps/PY24yVtbmP5ZS5bw5

<br>
<b>Like us on facebook!</b><br>
https://www.facebook.com/ElmetWalbrzyska/