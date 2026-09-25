# Azure frontend deployment

The current deployment temporarily serves only the React frontend on the existing
Linux Node.js Azure App Service `nghexuanetmoi`.

The GitHub Actions workflow `.github/workflows/main_nghexuanetmoi.yml`:

1. Installs frontend dependencies and builds `@ocnv/fe`.
2. Uploads only the contents of `apps/fe/dist`.
3. Deploys the static files and sets the Azure startup command to
   `pm2 serve /home/site/wwwroot --no-daemon --spa`.

PM2 serves the frontend and falls back to `index.html` for React Router routes,
so opening or refreshing a nested page works. No NestJS process runs, and no
MongoDB, JWT, or cookie secrets are required for this deployment.

Push the changes to `main` to trigger deployment, or run the workflow manually
from GitHub Actions after the changes are available on GitHub. The existing
Azure login secrets and permission to update the startup command are required.

Backend-dependent features (authentication, orders, payments, and live API data)
remain unavailable until the backend is deployed. This change does not provide
mock API responses or a separate backend endpoint.

To restore the backend later, restore the combined deployment package and its
startup command, then configure production backend environment variables in
Azure App Service.

Reference: [Microsoft: static serving with PM2 on Azure Linux Web Apps](https://techcommunity.microsoft.com/blog/appsonazureblog/azure-linux-web-app-and-http-server/4224475/).
