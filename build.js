const path = require('path');
const resourceHackerPath = path.resolve("./bin/ResourceHacker.exe");
const pkgCachePath = path.resolve("./bin/pkg-cache");

process.env["SOURCE_RESOURCE_HACKER"] = resourceHackerPath;
process.env["PKG_CACHE_PATH"] = pkgCachePath;

const {execSync} = require("child_process");

const fs = require("fs-extra");

const pkg = require("pkg");
const pkgfetch = require("pkg-fetch");

const customIconPath = "./resources/img/icon.ico";
const specificNodeVersion = "14.4.0";
const originalPkgPrecompiledBinaries = path.resolve(`${pkgCachePath}/v2.6/fetched-v${specificNodeVersion}-win-x64.original`);
const customizedPkgPrecompiledBinaries = path.resolve(`${pkgCachePath}/v2.6/fetched-v${specificNodeVersion}-win-x64`);

var downloadOriginalPkgPrecompiledBinaries = async function() {
    if (!fs.existsSync(originalPkgPrecompiledBinaries)) {
        await pkgfetch.need({nodeRange:`node${specificNodeVersion}`,platform:"win",arch:"x64"});
        await fs.rename(
            customizedPkgPrecompiledBinaries,
            originalPkgPrecompiledBinaries
        );
        execSync(`${resourceHackerPath} -open ${pkgCachePath}/v2.6/fetched-v${specificNodeVersion}-win-x64.original -save ${pkgCachePath}/v2.6/fetched-v${specificNodeVersion}-win-x64 -resource ${customIconPath} -action addoverwrite -mask ICONGROUP,1,`);
    }
}

async function build() {
    console.log("Download pkg precompiled libraries");
    await downloadOriginalPkgPrecompiledBinaries();

    pkg.exec(['.', '--target', 'win', '--output', './dist/DCONsRustyUpdater.exe' ]);
}
build();