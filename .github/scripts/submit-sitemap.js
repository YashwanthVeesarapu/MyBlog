const fs = require('fs');
const { google } = require('googleapis');

async function submitSitemap() {
  try {
    const sitemapPath = 'dist/sitemap.xml';
    if (!fs.existsSync(sitemapPath)) {
      console.error(`Sitemap not found at ${sitemapPath}`);
      process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urls = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);

    if (urls.length === 0) {
      console.log('No URLs found in sitemap.xml');
      return;
    }

    console.log(`Found ${urls.length} URLs in sitemap`);

    // Authenticate using the GOOGLE_SERVICE_ACCOUNT_KEY environment variable
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is missing.');
      process.exit(1);
    }
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    console.log('Publishing URLs to Google Web Indexing API...');

    let successCount = 0;
    let errorCount = 0;

    for (const url of urls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Submitted: ${url}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to submit ${url}:`, error.message || error.response?.data?.error?.message || error);
        errorCount++;
      }

      // Add a small delay to avoid hitting rate limits too aggressively
      // The Indexing API has strict quotas (e.g. 200 per day default)
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`\nSubmission Complete!`);
    console.log(`Successfully submitted: ${successCount}`);
    console.log(`Failed submissions: ${errorCount}`);

    if (errorCount > 0) {
      console.warn('Some URLs failed to submit. This could be due to quota limits (default 200 URLs/day) or invalid Service Account permissions.');
    }

  } catch (err) {
    console.error('Fatal error during sitemap submission:', err.message || err);
    process.exit(1);
  }
}

submitSitemap();
