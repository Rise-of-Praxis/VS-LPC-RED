const { WebviewPanel, window, ViewColumn } = require("vscode");

class LoginView {
	constructor(panel, extensionUri) {
		this.#panel = panel;
		this.extensionUri= extensionUri;
	}

	/**
	 * 
	 * @returns {string}
	 */
	viewType() { return 'login-view'; }

	/**
	 * @type {WebviewPanel}
	 */
	#panel;

	dispose() {
		if(this.#panel){
			this.#panel.dispose();
			this.#panel = null;
		}
	}
}