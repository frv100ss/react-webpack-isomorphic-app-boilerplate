### Download the boilerplate and install all required dependencies

#### `git clone https://github.com/frv100ss/Isomorph-app.git`
#### `npm install` 

### Development environment

#### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will **hot-reload** if you make edits.<br>
You will also see any lint errors in the console.

* React **hot loader is activated** 
* Routes are in **synchronous mode** on client side
* There is **no server side rendering** 

### Production environment

#### `npm run build`

Runs the app in the production mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

* React **hod loader** is **unactivated** 
* Routes are **asynchronous** on client side
* **server side rendering** is **activated**

### Troubleshooting
* 1) If the `dist/build` folder is empty, webpack will crash 
Just comment or remove those following line in `server/server.js` :
```
const manifestPath = path.resolve(__dirname, './../dist/build/asset-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const bundleJS = manifest['main.js'];
const bundleCSS = manifest['main.css'];
```

Then do `npm run dev` (to rebuild the build folder)
Uncomment or replace above lines in `server/server.js` 
Then you can do `npm run dev` again or `npm run build`

* 2) if there is **"an unexpected character < error"** (which means an empty page) with `npm run build`
Just redo `npm run build` and it should be good