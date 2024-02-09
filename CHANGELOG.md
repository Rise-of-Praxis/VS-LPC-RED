# Change Log

All notable changes to the "lpc-remote-editor" extension will be documented in 
this file.

## [0.4.1]

### Fixed

- Fixed issue where symbol rename failed on every other validation check.

## [0.4.0]

### Fixed

- Fixed issue where functions that were declared prior to being defined caused
issues with "Find Definition" and "Find Occurences".

### Added

- Added support for `#include` and `inherits` document links.


## [0.3.1]

### Fixed

- Fixed issue where functions that were declared prior to being defined did
not work with "Find Definition" and "Find Occurences".

## [0.3.0]

### Added

- Added preprocessor constants (i.e.: `#define`) to the symbols listing

### Updated

- LPC Grammar to support preprocessor directives
- Symbols in Symbol browser are now properly nested within their appropriate
scope
- Enhanced file parsing to improve performance

### Fixed

- Fixed issue where symbol highlighting did not highlight all occurrences of the
symbol within its scope
- Fixed issue where renaming a function parameter did not rename all occurrences
within the function scope

## [0.2.4]

### Added

- Copy MUD Path context-menu entry (right-click on the explorer window file or 
document tab) to get the MUD specific path to the a file.

### Updated

- LPC Grammar so that `efun::` is properly recognized
- LPC Grammar to support class initializers
- LPC Grammer to support `case` ranges

### Fixed

- Scoping issue where renaming a variable would rename it everywhere in the file
- Fixed issue where for and foreach loop variable declarations were not properly detected

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