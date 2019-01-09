# Cosmos DB Website

Site is hosted at https://cosmos-web.azurewebsites.net/, with a vanity url of https://gotcosmos.com.

Content updates can be made against the `master` branch. Once merged, changes will auto-deploy to the live site.

If you are working on bigger changes, setup a feature branch and we can create a staging slot to review/verify the rendered site.


## LESS -> CSS compilation

CSS for the site is authored using LESS, which is compiled at dev time (so the CSS files are included in the src, not generated during build).

The CSS for the site is driven from [bootstrap-custom.less](https://github.com/AzureCosmosDB/cosmosweb/blob/master/cosmosweb/wwwroot/less/bootstrap-custom.less). 
When first working on this site, install the [MadsKristensen.WebCompiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler) Visual Studio Extension, then every time you save the LESS file it will be automatically compiled to generate the CSS.


## Authenticated NuGet Feed

The site uses an authenticated Microsoft NuGet feed (UniversalStore) to get the libraries used for EU Cookie consent banners. 

### Visual Studio

If you are working in Visual Studio, you will be promted to authenticate the first time that packages restore (your domain credentials will give you access). Your login is remembered, so you don't need to login each time.

### Other Editors

If you aren't using Visual Studio, you'll need to manually provide credentials to NuGet.

* Go to the [UniversalStore](https://microsoft.visualstudio.com/DefaultCollection/Universal%20Store/_packaging?feed=Universal.Store&_a=feed) feed page
* Drop down on your user profile in the top right and select security
* Add a new Personal Access Token
* Edit your global NuGet.config file (`%APPDATA%\NuGet\NuGet.Config` on Windows) to include a `<packageSourceCredentials>` element - as shown below. 

  NuGet will match the name of the credentials (`<CookieCompliance>`) with the name of the feed in the NuGet.config for the website project. 

``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
  </packageSources>
  <packageSourceCredentials>
    <CookieCompliance>
        <add key="Username" value="anyvalue" />
        <add key="ClearTextPassword" value="<YOUR PERSONAL ACCESS TOKEN HERE>" />
    </CookieCompliance> 
  </packageSourceCredentials>
</configuration>
```

### Deployment

When the site is deployed to Azure, there is an Environment Variable (Application Setting) set on the App Service that contains credentials with a Personal Access Token. This allows the service to access the authenticated feed when building the site for deployment.

This isn't a well documentetd feature of NuGet. The environemnt variable is named `NuGetPackageSourceCredentials_CookiePortal` and the format is `Username=anything;Password=<ACCESS TOKEN>`.