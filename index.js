const p = require('./package');
const col = require('chalk');
const boxen = require('boxen');
const figlet = require('figlet');
const fs = require('fs');
const { execSync } = require("child_process");
const fetch = require('fetch-retry')(require('node-fetch'));
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const mkdirp = require('mkdirp');
const extract = require('extract-zip');
const path = require('path');
const moveFile = require('move-file');

(async function(){
	const config = eval(fs.readFileSync('./config.js').toString());

	global.boxlog=(msg,boxColor,textColor)=>console.log(col[boxColor||'green'](boxen(col[textColor||'white'](msg),{
		padding: 1,
		borderStyle: 'bold',
	})));

	console.log(figlet.textSync('RustyUpdater', {
	    font: 'Standard',
	    horizontalLayout: 'default',
	    verticalLayout: 'default',
	    // width: 80,
	    // whitespaceBreak: true
	}));
	console.log(`${p.author} - 2021 v${p.version}\n`);

	config.CachePath = path.resolve(config.CachePath);
	mkdirp.sync(config.CachePath);

	var steamCMD = config.OverrideUpdateCMD||`${config.SteamCMD}/steamcmd.exe +login anonymous +force_install_dir ${config.Path} +app_update 258550 +quit`;
	// steamCMD = "dir";

	boxlog("Starting Server Update");

	try {
		execSync(steamCMD,{
			stdio: 'inherit'
		});
	}
	catch(err){
		boxlog("There was an error updating your server!","red","red");
		console.log(col.red("This is what we know:"));
		console.log(`${col.redBright('Status:')} ${col.red(err.status)}`);
		console.log(`${col.redBright('Signal:')} ${col.red(err.signal)}`);
		console.log(`${col.redBright('Output:')} ${col.red(err.output)}`);
		console.log(`${col.redBright('PID:')} ${col.red(err.pid)}`);
		console.log(`${col.redBright('Stdout:')} ${col.red(err.stdout)}`);
		console.log(`${col.redBright('Stderr:')} ${col.red(err.stderr)}\n`);
		console.log(col.redBright(`Please send this error to me on Discord: Revolving DCON#1337`));

		return;
	}

	boxlog("Starting Dependency Download & Install");

	for(var dep of config.Dependencies){
		if(!dep.Enabled)continue;

		for(var k in config){
			dep.UnpackPath = path.resolve(dep.UnpackPath.replace(`{${k}}`,config[k]));
		}
		mkdirp.sync(dep.UnpackPath);

		console.log(col.green(`Starting ${dep.Name} Download:`,col.yellowBright(dep.DownloadURL)));
		try {
			var res = await fetch(dep.DownloadURL, {
				retryOn:function(attempt, error, response){
					if(error === null)return false;

					console.log(`retrying, attempt number ${attempt + 1}`);
					return true;
				},
  				credentials: 'include',
				retries: 3,
				retryDelay: 1000
			});
			if(res.status != 200){
				throw res;
			}
		}
		catch(err){
			boxlog("There was an error updating your server!","red","red");
			console.log(col.redBright(`Failed to download ${dep.Name} from: ${dep.DownloadURL}\n`));
			console.log(col.redBright(`Please send this error to me on Discord: Revolving DCON#1337`));
			return;
		}

		if(res.headers.raw()['content-disposition'] && !dep.FileName){
			dep.FileName = res.headers.raw()['content-disposition'][0].split('filename=')[1].replace(/['"]+/g, '').trim();
		}

		var tmpPath = path.resolve(config.CachePath+'/'+dep.FileName);
		mkdirp.sync(dep.UnpackPath);

		await streamPipeline(res.body, fs.createWriteStream(tmpPath));
		
		switch(dep.Type){
			case "zip":
				await extract(tmpPath,{
					dir:dep.UnpackPath
				});
			break;
			default:
				await moveFile(tmpPath, dep.UnpackPath+'/'+dep.FileName);
			break;
		}
		console.log(col.bgCyan(`${dep.Name} installed successfully!\n`));
	}
	
	boxlog("Server Updated Successfully!","greenBright","greenBright");
})();