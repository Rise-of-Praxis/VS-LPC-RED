# Change Log

All notable changes to the "lpc-remote-editor" extension will be documented in this file.

## [0.2.3]

### Fixed

- Fixed connectivity issues and re-establishing connection issues.

## [0.2.2]

### Fixed

- Fixed issue that caused numerous sockets to be opened.

## [0.2.1]

### Fixed

- Fixed bug due to multiple responses from the server not being handled by the client

## [0.2.0]

### Added

- Auto-save to local, if specified.  Under Workspace Settings > Lpc Remote Editor : Local Workspace

### Fixed

- Fixed various random issues caused by Promise not being returned by the Remote Editor File System Provider


## [0.1.0]

### Added

- Updated LPC Grammar
- Added LPC Language features support:
	- Document Outline support
	- Proper symbol highlighting support
	- Rename symbol support
	- Reference lookup
	- Syntax Error reporting Problems window


## [0.0.3]

### Added

- Added 'Create new LPC Remote Editor workspace' command.


## [0.0.2]

### Added

- Added use of Output Channel for debugger
- Added Workspace settings so the user can change them directly in VS Code under 'Preferences: Open Workspace Settings'
- Fixed issue where Remote Editor was leaving connections open on the Rise of Praxis (required RoP Remote Editor protocol update)

## [0.0.1]

### Added

- Initial release of Remote Editor for LPC MUDs