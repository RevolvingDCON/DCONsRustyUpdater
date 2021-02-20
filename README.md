# DCON's Rusty Updater
<img align="right" src="https://i.imgur.com/eqw9VBX.png" width="200"/>

> A Simple Windows tool for updating rust servers with support for [uMod](https://umod.org/games/rust) and remote dependency support.

###### What does it actually do?
It downloads and updates your rust dedicated server and downloads uMod and any other dependencies then installs them to paths that you define in a simple and easy to use config.

## Getting Started
### Installation
Download the latest build and install it to a directory (preferably within your servers parent folder)

### Configuration
In the configuration file `config.js` you'll find a straight forward list of properties to edit.

1. Set the `Path` property to the directory of your server instaliation directory
1. Set the `SteamCMD` property to the install directory for SteamCMD

###### Example
```javascript
{
    // This is the path to your server
    Path:"D:/Projects/DCONsRustyWorld/Servers/Main",

    // Path to SteamCMD
    SteamCMD:"D:/Projects/DCONsRustyWorld/SteamCMD",
}
```
Dependencies can be any valid remote resource, it will be downloaded and moved to a path you specify.

###### Example
```javascript
{
  Dependencies:[
    {
      Enabled:true, // if this dependency is being used
      Name:"uMod", // display name in the console
      Type:"zip", // type of file
      FileName:"", // custom name for the saved file
      DownloadURL:"https://umod.org/games/rust/download", // location of dependency
      UnpackPath:"{Path}", // location we will download / unpack the file
    }
  ]
}
```
In the above example the `UnpackPath` property has a special keyword called `{Path}` this is a reference to the `Path` property.

## Usage
### Updating
To update the server, just run the `DCONsRustyUpdater.exe` and if you did everything correctly, the server will update and dependencies will install as expected.

### Updating and Start
You can include this in your start script with one line.
```batch
@echo off
:start
D:Path/To/Updater/DCONsRustyUpdater.exe
RustDedicated.exe^
 -batchmode^
 -nographics^
 -server.port 28015^
 -server.hostname "[EU] DCON's Rusty World | x3 | BPs | Kits | Money | Custom | Balanced"^
 -server.description "Drop the rock or die"^
 -server.url ""^
 -server.headerimage ""^
 -server.maxplayers 1337^
 -server.worldsize 4000^
 -server.level "Procedural Map"^
 -server.seed 27012021^
 -server.identity dcon^
 -server.saveinterval 600^
 -rcon.password "nope"^
 -rcon.ip 0.0.0.0^
 -rcon.port 28016^
goto start
```

## ToDo
1. Streamline the boot process
1. Include boot script in config

## Collaborating
If you're interested in this project and want to help out, feel free to submit pull requests as usual.

## Contact
You can contact me on Discord at: [Revolving DCON#1337](https://discord.gg/5BqtyY4pvU)
