@echo off

title ScratchForDiscord/Server • Initializing

cd %APPDATA%\ScratchForDiscord-Files\sfd-source

cls

title ScratchForDiscord/Server - Building Dependency

call yarn run build

EXIT 0
