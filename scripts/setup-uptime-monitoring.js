/**
 * This script helps you set up Uptime Robot monitoring for Swoosh Bots
 * 
 * To use this script:
 * 1. Get your Uptime Robot API key from https://uptimerobot.com/dashboard#apiKeys
 * 2. Run the script with: 
 *    API_KEY=your_uptime_robot_api_key node scripts/setup-uptime-monitoring.js
 */

const fs = require('fs');
const https = require('https');
const querystring = require('querystring');

// Get the API key from environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('Error: API_KEY environment variable is required');
  console.error('Usage: API_KEY=your_uptime_robot_api_key node scripts/setup-uptime-monitoring.js');
  process.exit(1);
}

// Read the configuration file
const config = JSON.parse(fs.readFileSync('./uptime-robot.json', 'utf8'));

// Function to create a monitor
async function createMonitor(monitor) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      api_key: API_KEY,
      format: 'json',
      friendly_name: monitor.friendly_name,
      url: monitor.url,
      type: monitor.type === 'http' ? 1 : 2, // 1 for HTTP, 2 for Keyword
      http_method: monitor.http_method === 'GET' ? 1 : 2, // 1 for GET, 2 for POST
      keyword_type: monitor.keyword_type === 'exists' ? 1 : 2, // 1 for exists, 2 for not exists
      keyword_value: monitor.keyword_value,
      interval: monitor.interval
    });

    const options = {
      hostname: 'api.uptimerobot.com',
      port: 443,
      path: '/v2/newMonitor',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.stat === 'ok') {
            resolve(parsedData);
          } else {
            reject(new Error(`API Error: ${JSON.stringify(parsedData)}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request error: ${e.message}`));
    });

    req.write(postData);
    req.end();
  });
}

// Main function to set up all monitors
async function setupMonitors() {
  console.log('Setting up Uptime Robot monitoring for Swoosh Bots...');

  try {
    for (const monitor of config.monitors) {
      console.log(`Creating monitor: ${monitor.friendly_name}`);
      const result = await createMonitor(monitor);
      console.log(`✅ Monitor created successfully: ${monitor.friendly_name}`);
    }

    console.log('\n🎉 All monitors have been set up!');
    console.log('You can view your monitors at https://uptimerobot.com/dashboard');
  } catch (error) {
    console.error('❌ Error setting up monitors:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupMonitors();