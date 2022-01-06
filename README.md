# Remote Editor for LPC MUDs

This VS Code extension enables you to create a workspace that connects to an LPC MUD to edit files directly in VS Code

## Features

Different MUDs that have Remote Editor ports likely have different implementations.  This extension has been 
developed to support multiple types of protocols.  The following Remote Editor protocols are currently supported:

* Rise of Praxis Remote Editor - A rewrite of the original Nightmare remote editor protocol for Rise of Praxis

The extension is automatically activated when a workspace has a folder in to with the Uri scheme of `lpc-remote-ed`.

Additional features in the Remote Editor are:

* LPC syntax support validates your LPC code as well as provides you with rename, find reference, and find declaration functionality.
* Save a copy of your files when you change them to a local directory

## Getting started using the VS Code Command Palette

You can quickly get started by simply opening the VS Code Command Palette (View > Command Palette...) and select `Remote Editor for LP Muds: Create new LPC Remote Editor workspace`.  This will prompt you for all the information needed to connect to the
MUD, such as host (hostname:port), username, and password.  

It will automatically create the workspace file for you and you can save it to a directory of your chosing.

## Getting started with a workspace file

Below is an example of a `.code-workspace` used to connect to _Rise of Praxis_ MUD.  You can create your own workspace
file and modify the connection information under `settings`.

```
{
	"folders": [
		{
			"name": "Rise of Praxis",
			"uri": "lpc-remote-ed:/"
		}
	],
	"settings": {
		"[lpc-remote-ed]": {
			"uri": "tcp://www.riseofpraxis.net:6656",
			"userName": "supercre",
			"password": "not-my-password"
		}
	}
}
```

Since this extension simply builds on top of existing VS Code functionality, you can add as many folders under the `folders`
properties as you would like for quicker access to certain directories.  For example:

```
{
	"folders": [
		{
			"name": "Rise of Praxis",
			"uri": "lpc-remote-ed:/"
		},
		{
			"name": "My Realm",
			"uri": "lpc-remote-ed:/realms/supercre"
		}
	],
	"settings": {
		"[lpc-remote-ed]": {
			"uri": "tcp://www.riseofpraxis.net:6656",
			"userName": "supercre",
			"password": "not-my-password"
		}
	}
}
```

This would create a workspace folder called `Rise of Praxis` which would start at the root folder of `/` and `My Realm` 
which is limited to only the directories and files located under `/realms/supercre`.

## Requirements

The Remote Editor for LPC MUDs does not have a dependency on the LPC Language extension, but is strongly recommended.  This extension helps provide the appropriate syntax highlighting for the LPC language for any `.c` or `.h` file that is 
opened in the editor.

## Known issues

The following are known issues:

* Remote Editor's LPC Parser performance - The LPC Parser used in the Remote Editor to enable coding functionality, like
rename or find references, can take longer than anticipated on large files.  When this is occurring, other functions, like saving, will not respond immediately.  You can notice this is occuring when you save a file and it doesn't save immediately, or by the blue bar that scrolls along the time of Explorer sidebar. 
* Remote Editor does not reconnect successfully when disconnected - The Remote Editor does not always successfully reconnect when it is disconnected from the MUD.

## Release Notes

This version of Remote Editor for LP MUDs is still in a pre-release stage (i.e.: 0.x).  All signficant changes can be found in the [Change Log](./CHANGELOG.md) file.