# First install all required dependencies

npm install 

# Development environment

-React hot loader is activated 
-Routes are in synchronous mode on client side
-There is no server side rendering 

npm run dev 
then go to localhost:8080

# Production environment

-React hod loader is unactivated 
-Routes are asynchronous on client side
-server side rendering is activated

npm run build
then go to localhost:8080

#Troubleshooting
If the build folder is empty just comment those following line in server/server.js :

const manifestPath = path.resolve(__dirname, './../dist/build/asset-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const bundleJS = manifest['main.js'];
const bundleCSS = manifest['main.css'];

then do npm run dev(to rebuild the build folder)

then uncomment above mentionned lines
then you can do npm run dev again or npm run build


if there is "a unexpected character < error"
just redo npm run build

