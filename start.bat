@echo off

title ScratchForDiscord/Server • Initializing

cd %APPDATA%\ScratchForDiscord-Files\sfd-source

cls

title ScratchForDiscord/Server 

call yarn run serve

PAUSE

exit
