import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fse from 'fs-extra';
import { ChildProcess, exec } from 'child_process';

let latestCmdWindow: ChildProcess;

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInSubFrames: false,
			nodeIntegrationInWorker: false,
		},
		width: 800,
	});

	mainWindow.loadFile('electron/index.html');

	// mainWindow.setIcon('icons/1024x1024.png');

	mainWindow.setThumbnailToolTip('Scratch For Discord');

	mainWindow.setContentProtection(false);

	mainWindow.setMenuBarVisibility(false);

	mainWindow.setEnabled(false);
	mainWindow.hide();

	setTimeout(() => {
		let baseDir = `${__filename}\\..\\..`;
		baseDir = path.resolve(baseDir);

		let targetDir = `${
			process.env.APPDATA ||
			(process.platform == 'darwin'
				? process.env.HOME + 'Library/Preferences'
				: '/var/local')
		}/ScratchForDiscord-Files`;

		try {
			fse.mkdirSync(targetDir);
		} catch (error) {}

		fse.copySync(baseDir, targetDir);

		latestCmdWindow = exec(`start cmd.exe /k ${targetDir}\\init.bat`, () => {
			// latestCmdWindow = exec(`start cmd.exe /k ${baseDir}\\init2.bat`, () => {
			let sfdInstall = `${targetDir}\\sfd-source\\dist`;
			let sfdMain = `${sfdInstall}\\discord.min.js`;

			sfdInstall = path.resolve(sfdInstall);
			sfdMain = path.resolve(sfdMain);

			mainWindow.setEnabled(true);
			mainWindow.show();

			latestCmdWindow = exec(`start cmd.exe /k ${targetDir}\\start.bat`, () => {
				mainWindow.close();
			});
			// });
		});
	}, 1);

	// mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		try {
			// fse.emptyDirSync(tmpPath);
			// fse.rmdirSync(tmpPath);
		} finally {
			try {
				latestCmdWindow.kill('SIGINT');
			} finally {
				app.quit();
			}
		}
	}
});
