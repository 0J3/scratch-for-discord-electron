@echo off

title ScratchForDiscord/Server • Initializing

cd %APPDATA%\ScratchForDiscord-Files\sfd-source

cls

title ScratchForDiscord/Server - Installing/Updating Dependencies

call yarn install

EXIT 0
