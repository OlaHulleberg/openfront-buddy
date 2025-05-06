const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

// Attempt to enable smoother scrolling via command line switch
app.commandLine.appendSwitch("enable-smooth-scrolling", "true");

function createWindow() {
  // Get primary display work area size
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } =
    primaryDisplay.workAreaSize;

  // Determine window size
  const desiredWidth = 1600;
  const desiredHeight = 900;
  const windowWidth = Math.min(desiredWidth, screenWidth);
  const windowHeight = Math.min(desiredHeight, screenHeight);

  // Create the browser window.
  const win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    icon: path.join(__dirname, "assets/icon512_maskable.png"),
    webPreferences: {
      nodeIntegration: false, // Keep false for security
      contextIsolation: true, // Keep true for security
    },
  });

  // Load openfront.io
  win.loadURL("https://openfront.io/");

  // Hide the default menu bar
  win.setMenu(null);

  // Optional: Open the DevTools.
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
