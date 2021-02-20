module.exports = {
	// the absolute path to your server directory
	Path:"D:/Projects/DCONsRustyWorld/Servers/Main",

	// the absolute path to Steam CMD
	SteamCMD:"D:/Projects/DCONsRustyWorld/SteamCMD",

	// LEAVE BLANK UNLESS YOU KNOW WHAT YOU'RE DOING!
	OverrideUpdateCMD:"",

	// the path that downloaded files are stored to before moving them to the final location.
	// you don't need to edit this unless you understand what you're doing
	CachePath:"./cache",

	// server addons / plugins we want to download every time we update the server
	// note: these will be downloaded in the order they're displayed
	Dependencies:[
		{
			Enabled:true, // do we download the file
			Name:"uMod", // name of the dependency (for console only)
			Type:"zip", // type of file so we know how to unpack it
			FileName:"", // custom name for the saved file
			DownloadURL:"https://umod.org/games/rust/download", // location of dependency
			UnpackPath:"{Path}", // location we will download / unpack the file
		},
		{
			Enabled:true, // do we download the file
			Name:"RustIO", // name of the dependency (for console only)
			Type:"dll", // type of file so we know how to unpack it
			FileName:"", // custom name for the saved file
			DownloadURL:"http://playrust.io/latest/oxide", // location of dependency
			UnpackPath:"{Path}/RustDedicated_Data/Managed", // location we will download / unpack the file
		},
		{
			Enabled:false, // do we download the file
			Name:"Analytics Plugin", // name of the dependency (for console only)
			Type:"cs", // type of file so we know how to unpack it
			FileName:"", // custom name for the saved file
			DownloadURL:"https://umod.org/plugins/Analytics.cs", // location of dependency
			UnpackPath:"{Path}/oxide/plugins", // location we will download / unpack the file
		}
	]
}