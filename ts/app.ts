import { app, BrowserWindow, shell } from 'electron';
import * as path from 'path';

function createWindow() {
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		width: 800,
	});

	mainWindow.loadFile('electron/index.html');

	// mainWindow.setIcon('icons/1024x1024.png');

	mainWindow.setThumbnailToolTip('Scratch For Discord');

	mainWindow.setContentProtection(false);

	mainWindow.setMenuBarVisibility(false);

	setTimeout(() => {
		shell.openExternal(`${__filename}\\..\\..\\run.bat`);
	}, 1);

	// mainWindow.setEnabled(false);
	// mainWindow.hide();

	// mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
