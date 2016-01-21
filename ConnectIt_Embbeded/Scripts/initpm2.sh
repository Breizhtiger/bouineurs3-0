#Before, install pm2 : sudo npm install pm2 -g
#Start applications with pm2 for the first time

#Start the dashboard
pm2 start ../dashboard.js --name="dashboard"

#Start the collect
pm2 start ../collect.js --name="collect"

#Start the dashboard
pm2 start ../provisioning.js --name="provisioning"
