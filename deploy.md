🚀 Deploy Your Portfolio - Professional Clean URLs
🎯 What You'll Get
✅ Clean URLs: vardanagarwal.dev/portfolio (NOT /portfolio.html)
✅ 100% FREE hosting forever
✅ Lightning fast (global CDN)
✅ Automatic HTTPS
✅ Professional appearance
We'll use Netlify - the BEST free option for clean URLs!

📝 Step-by-Step Deployment
Part 1: Prepare Your Files (5 minutes)
Step 1: Rename Your HTML Files
We need to create a folder structure for clean URLs:

Open File Explorer

Navigate to: c:\Users\varda\Downloads\My Portfolio\Ashley html template\vardan portfolio

Create this folder structure:

vardan portfolio/
├── index.html (rename home-1.html to this)
├── portfolio/
│   └── index.html (rename portfolio-3.html to this)
├── publication/
│   └── index.html (rename publication.html to this)
├── services/
│   └── index.html (rename services.html to this)
├── contact/
│   └── index.html (rename contact.html to this)
├── css/
├── js/
├── img/
└── _redirects (we'll create this)
Detailed Steps:

Rename home-1.html:

Right-click home-1.html
Select "Rename"
Change to index.html
Create portfolio folder:

Right-click in the folder → New → Folder
Name it portfolio
Move portfolio-3.html into this folder
Rename portfolio-3.html to index.html
Create publication folder:

Create new folder named publication
Move publication.html into it
Rename to index.html
Create services folder:

Create new folder named services
Move services.html into it
Rename to index.html
Create contact folder:

Create new folder named contact
Move contact.html into it
Rename to index.html
✅ Done! Your structure is ready for clean URLs.

Step 2: Update Internal Links
Now we need to update links in your HTML files to use clean URLs:

Open each index.html file and find/replace:

Old Link	New Link
home-1.html	/
portfolio-3.html	/portfolio
publication.html	/publication
services.html	/services
contact.html	/contact
How to do this quickly:

Open index.html (main homepage) in Notepad or VS Code
Press Ctrl + H (Find and Replace)
Find: home-1.html → Replace with: /
Find: portfolio-3.html → Replace with: /portfolio
Find: publication.html → Replace with: /publication
Find: services.html → Replace with: /services
Find: contact.html → Replace with: /contact
Save the file
Repeat for ALL index.html files in each folder!

Step 3: Create netlify.toml Configuration
Create a new file in your main folder
Name it: netlify.toml (exactly like this)
Copy and paste this content:
# Netlify configuration for clean URLs
[[redirects]]
  from = "/home"
  to = "/"
  status = 301
[[redirects]]
  from = "/portfolio.html"
  to = "/portfolio"
  status = 301
[[redirects]]
  from = "/publication.html"
  to = "/publication"
  status = 301
[[redirects]]
  from = "/services.html"
  to = "/services"
  status = 301
[[redirects]]
  from = "/contact.html"
  to = "/contact"
  status = 301
# Remove .html extension from all URLs
[[redirects]]
  from = "/*"
  to = "/:splat"
  status = 200
  force = false
# Custom headers for performance
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
Save the file
✅ Done! Configuration is ready.

Part 2: Deploy to Netlify (10 minutes)
Step 4: Create Netlify Account
Go to netlify.com
Click "Sign up" (top right)
Choose "Sign up with Email" (or GitHub if you prefer)
Enter your email and create a password
Verify your email
✅ Done! You have a Netlify account.
Step 5: Deploy Your Website
Method 1: Drag and Drop (Easiest!)

Log in to Netlify
You'll see a box that says "Want to deploy a new site without connecting to Git?"
Drag your ENTIRE portfolio folder into this box
Select all files and folders
Drag them into the Netlify drop zone
Wait for upload (30 seconds - 2 minutes)
🎉 Your site is live!
You'll get a random URL like: https://random-name-123456.netlify.app

Step 6: Change Site Name (Optional but Recommended)
Click "Site settings"
Click "Change site name"
Enter: vardanagarwal (or any available name)
Click "Save"
Now your site is at: https://vardanagarwal.netlify.app

✅ Test it! Open the URL and check:

https://vardanagarwal.netlify.app → Homepage
https://vardanagarwal.netlify.app/portfolio → Portfolio (NO .html!)
https://vardanagarwal.netlify.app/publication → Publications
https://vardanagarwal.netlify.app/services → Services
https://vardanagarwal.netlify.app/contact → Contact
Beautiful clean URLs! 🎉

Part 3: Connect Your Custom Domain (10 minutes)
Step 7: Add Custom Domain in Netlify
In Netlify, go to your site dashboard
Click "Domain settings" (or "Set up a custom domain")
Click "Add custom domain"
Enter: vardanagarwal.dev
Click "Verify"
Click "Add domain"
Netlify will show you DNS instructions.

Step 8: Configure DNS on name.com
Log in to name.com

Go to "My Domains"

Click on "vardanagarwal.dev"

Click "Manage DNS Records"

Delete any existing A or CNAME records

Add these DNS records:

For Root Domain (vardanagarwal.dev):

Option A: Using Netlify DNS (Recommended)

Type: A
Host: @
Answer: 75.2.60.5
TTL: 3600
Option B: Using CNAME (Alternative)

Type: ALIAS or ANAME (if name.com supports it)
Host: @
Answer: vardanagarwal.netlify.app
TTL: 3600
For www subdomain:

Type: CNAME
Host: www
Answer: vardanagarwal.netlify.app
TTL: 3600
Save all records

Note: If name.com doesn't support ALIAS/ANAME records, use the A record option with IP 75.2.60.5

Step 9: Enable HTTPS in Netlify
Go back to Netlify → Domain settings
Scroll down to "HTTPS"
Wait for DNS to propagate (15-30 minutes)
Click "Verify DNS configuration"
Once verified, click "Provision certificate"
Wait 1-2 minutes
✅ HTTPS is enabled!
Step 10: Test Your Website
Open these URLs and verify:

✅ https://vardanagarwal.dev → Homepage
✅ https://vardanagarwal.dev/portfolio → Portfolio (clean URL!)
✅ https://vardanagarwal.dev/publication → Publications
✅ https://vardanagarwal.dev/services → Services
✅ https://vardanagarwal.dev/contact → Contact
✅ https://www.vardanagarwal.dev → Redirects to main domain
Check for:

🔒 Padlock icon (HTTPS)
✅ No .html in URLs
✅ All pages load correctly
✅ Navigation works
✅ Images and CSS load
🎉 CONGRATULATIONS! Your professional website is live!

🔄 How to Update Your Website
Method 1: Netlify Drop (Easiest)

Make changes to your local files
Go to Netlify → Deploys
Drag your updated folder to the drop zone
Wait 30 seconds → Live!
Method 2: Connect to GitHub (Best for frequent updates)

Upload your files to GitHub (see previous guide)
In Netlify, click "New site from Git"
Connect your GitHub repository
Every time you push to GitHub → Auto-deploys!
🎨 Alternative Option: Vercel
If you want to try Vercel instead (also excellent):

Quick Vercel Setup:
Go to vercel.com
Sign up with email or GitHub
Click "Add New Project"
Drag and drop your folder
Click "Deploy"
Add custom domain: vardanagarwal.dev
Configure DNS (same as Netlify but use Vercel's IPs)
Vercel DNS:

A record: 76.76.21.21
CNAME (www): cname.vercel-dns.com
📊 Comparison: Netlify vs Vercel vs GitHub Pages
Feature	Netlify	Vercel	GitHub Pages
Clean URLs	✅ Yes	✅ Yes	❌ No (needs workaround)
Free Plan	✅ Yes	✅ Yes	✅ Yes
Custom Domain	✅ Yes	✅ Yes	✅ Yes
HTTPS	✅ Auto	✅ Auto	✅ Auto
Deployment	Drag & Drop	Drag & Drop	Git only
Speed	⚡ Very Fast	⚡ Very Fast	⚡ Fast
Ease of Use	🟢 Easy	🟢 Easy	🟡 Medium
Best For	Static sites	Static sites	Simple sites
Recommendation: Use Netlify - Best balance of features and ease of use!

🔧 Troubleshooting
Problem: URLs still show .html
Solution:

Check netlify.toml file is in the root folder
Make sure folder structure is correct
Redeploy the site
Clear browser cache (Ctrl + Shift + Delete)
Problem: 404 errors on subpages
Solution:

Verify each folder has an index.html file
Check folder names are lowercase
Update all internal links to use clean URLs
Problem: CSS/JS not loading
Solution:

Make sure CSS/JS paths are relative: /css/style.css (not css/style.css)
Check folder structure is maintained
Redeploy
Problem: Domain not working
Solution:

Wait 24-48 hours for DNS propagation
Check DNS records on name.com
Verify domain in Netlify settings
Use whatsmydns.net to check propagation
✅ Final Checklist
 Created folder structure with index.html files
 Updated all internal links to clean URLs
 Created netlify.toml configuration file
 Created Netlify account
 Deployed website to Netlify
 Changed site name to vardanagarwal
 Tested clean URLs work (no .html)
 Added custom domain in Netlify
 Configured DNS on name.com
 Enabled HTTPS
 Tested all pages
 Verified clean URLs: /portfolio, /services, etc.
 Checked mobile responsiveness
 Celebrated! 🎉
🎯 Your Professional URLs
Main Site:

Homepage: https://vardanagarwal.dev
Portfolio: https://vardanagarwal.dev/portfolio
Publications: https://vardanagarwal.dev/publication
Services: https://vardanagarwal.dev/services
Contact: https://vardanagarwal.dev/contact
No .html anywhere! ✨

💡 Pro Tips
Use Netlify CLI for faster deployments:

npm install -g netlify-cli
netlify deploy
Enable form submissions (Netlify feature): Add netlify attribute to your contact form

Add analytics (free): Enable Netlify Analytics in settings

Set up redirects for old URLs: Already configured in netlify.toml!

Preview deployments: Netlify creates preview URLs for every change

🎉 You're Done!
Your website now has:

✅ Professional clean URLs (no .html)
✅ Custom domain (vardanagarwal.dev)
✅ Free hosting forever
✅ Lightning-fast global CDN
✅ Automatic HTTPS
✅ Easy updates via drag-and-drop
Share your professional portfolio:

LinkedIn: https://vardanagarwal.dev
Resume: https://vardanagarwal.dev/portfolio
Email signature: https://vardanagarwal.dev/contact
You're now a professional web developer with a live portfolio! 🚀

📞 Need Help?
Netlify Docs: docs.netlify.com
Netlify Support: answers.netlify.com
DNS Checker: whatsmydns.net
Test Speed: pagespeed.web.dev
Enjoy your beautiful, professional website! ✨


Comment
Ctrl+Alt+M
