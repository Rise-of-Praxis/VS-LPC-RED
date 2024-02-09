class SearchResultsTree
{
    /**
     * The container in which the tree will insert the individual nodes into
     * @type {HTMLElement}
     */
    #container = undefined;

    /**
     * The data associated with this tree.
     * @type {Map<string, object[]}
     */
    #nodes = new Map();

    /**
     * @type {EventTarget}
     */
    #eventEmitter = new EventTarget();

    /**
     * @param {HTMLElement} container The HTML Element that will contain the nodes
     */
    constructor(container)
    {
        this.#container = container;
    }

    #onPathClicked(path, element)
    {
        if (element.classList.contains("expanded"))
            this.collapse(element);
        else
            this.expand(element);

        const event = new CustomEvent("path-click", { detail: { path, element } });
        this.#eventEmitter.dispatchEvent(event);
    }

    #onMatchClicked(match, element)
    {
        const event = new CustomEvent("match-click", { detail: { match, element } });
        this.#eventEmitter.dispatchEvent(event);
    }

    #onMatchAdded(match)
    {
        const event = new CustomEvent("match-added", { detail: { match } });
        this.#eventEmitter.dispatchEvent(event);
    }

    #onClear(match)
    {
        const event = new CustomEvent("clear");
        this.#eventEmitter.dispatchEvent(event);
    }


    add(match)
    {
        const key = match.uri.path;
        let entries = [];
        if (this.#nodes.has(key))
        {
            entries = this.#nodes.get(key)
        }
        else
        {
            this.#nodes.set(key, entries);
        }

        entries.push(match);

        this.render();

        this.#onMatchAdded(match);
    }

    /**
     * Expands the contents of a node
     * @param {HTMLElement} node
     */
    expand(node)
    {
        node.classList.add("expanded");
        const matches = node.children[1];
        matches.style.height = `${matches.scrollHeight}px`;
    }

    /**
     * Collapses the contents of a node
     * @param {HTMLElement} node
     */
    collapse(node)
    {
        node.classList.remove("expanded");
        const matches = node.children[1];
        matches.style.height = "";
    }

    clear()
    {
        this.#container.replaceChildren();
        this.#nodes.clear();
        this.#onClear();
    }

    createFileNode(path)
    {
        const node = document.createElement("div");
        node.classList.add("file");
        node.setAttribute("data-path", path)
        node.title = path;
        const titleRow = document.createElement("div");
        titleRow.classList.add("title");
        node.appendChild(titleRow);

        const toggle = document.createElement("i");
        toggle.classList.add("toggle", "codicon", "codicon-chevron-right")
        titleRow.appendChild(toggle);
        titleRow.addEventListener("click", (event) => this.#onPathClicked(path, node));

        const label = document.createElement("label");
        label.innerText = path;
        titleRow.appendChild(label);

        const badge = document.createElement("div");
        badge.classList.add("count-badge");
        badge.innerText = "";
        titleRow.appendChild(badge);

        const matches = document.createElement("div");
        matches.classList.add("matches");
        node.appendChild(matches);

        return node;
    }

    getMatchKey(match)
    {
        const { location } = match;
        const { uri, range } = location;
        const [start, end] = range;

        return `${uri.path}:${start.line},${start.character}-${end.line},${end.character}`;
    }

    createMatchNode(match)
    {
        const { location, lines: text } = match;

        const matchElement = document.createElement("div");
        matchElement.classList.add("match");
        matchElement.setAttribute("data-key", this.getMatchKey(match))
        matchElement.addEventListener("click", (event) => this.#onMatchClicked(match, matchElement));

        const label = document.createElement("label");
        matchElement.appendChild(label);

        // Get the text parts (pre-match, match, post-match)
        let preMatchText = "", matchText = "", postMatchText = "";
        const { range } = location;
        const [start, end] = range;

        const matchStart = start.character;
        let matchEnd = end.character;
        const lines = match.lines.split("\n");
        for (let i = 0; i < end.line - start.line; i++)
            matchEnd += lines[i].length;

        preMatchText = text.substring(0, matchStart);
        matchText = text.substring(matchStart, matchEnd + 1);
        postMatchText = text.substring(matchEnd + 1);

        const preMatchTextElement = document.createElement("span");
        preMatchTextElement.innerText = preMatchText;
        label.appendChild(preMatchTextElement);

        const matchTextElement = document.createElement("span");
        matchTextElement.classList.add("match-text");
        matchTextElement.innerText = matchText;
        label.appendChild(matchTextElement);

        const postMatchTextElement = document.createElement("span");
        postMatchTextElement.innerText = postMatchText;
        label.appendChild(postMatchTextElement);

        return matchElement;
    }

    render()
    {
        this.#nodes.forEach((matches, path) =>
        {
            let fileNode = this.#container.querySelector(`[data-path="${path}"]`)
            if (!fileNode)
            {
                fileNode = this.createFileNode(path)
                this.#container.appendChild(fileNode);
            }
            const matchesContainer = fileNode.querySelector(".matches");
            const badge = fileNode.querySelector(".count-badge");

            for (const match of matches)
            {
                let matchElement = fileNode.querySelector(`[data-key="${this.getMatchKey(match)}"]`);
                if (!matchElement)
                    matchesContainer.appendChild(this.createMatchNode(match));
            }

            const childrenCount = matchesContainer.children.length;
            fileNode.title = `${path} - ${childrenCount} matches`;

            badge.innerText = childrenCount > 99 ? '99+' : childrenCount;
        });
    }

    on(type, handler)
    {
        this.#eventEmitter.addEventListener(type, handler);
    }

    once(type, handler)
    {
        this.#eventEmitter.addEventListener(type, handler, { once: true });
    }

    off(type, handler)
    {
        this.#eventEmitter.removeEventListener(type, handler);
    }
}

class AutoHeightInput
{
    /**
     * The input to auto-adjust the height for
     * @type {HTMLElement}
     */
    #input = null;

    /**
     * The HTML element that is used to calculated the height of the input
     * @type {HTMLElement}
     */
    #mirror = null;

    constructor(input, mirror)
    {
        this.#input = input;
        this.#mirror = mirror;

        input.addEventListener('input', (event) => this.updateHeight());
    }

    updateHeight()
    {
        const value = this.#input.value;
        const lastCharCode = value.charCodeAt(value.length - 1);
        const suffix = lastCharCode === 10 ? ' ' : '';
        const mirrorTextContent = (value + suffix)
            .replace(/\u000c/g, ''); // Don't measure with the form feed character, which messes up sizing

        if (mirrorTextContent)
        {
            this.#mirror.textContent = value + suffix;
        } else
        {
            this.#mirror.innerText = '\u00a0';
        }

        this.#input.style.height = `${this.#mirror.clientHeight + 6}px`;
    };

}

(function ()
{
    const vscode = acquireVsCodeApi();
    const state = vscode.getState();
    const webViewContainer = document.querySelector(".mud-search-view");
    const searchTextInput = document.getElementById('search-text');
    const searchTextMirror = document.querySelector(`.mirror[data-for="search-text"]`);
    const searchResults = new SearchResultsTree(document.getElementById('search-results'));
    const autoHeightInput = new AutoHeightInput(searchTextInput, searchTextMirror);

    function onKeyDown(event)
    {
        if (event.key !== 'Enter')
            return;

        event.preventDefault();
        event.stopPropagation();

        const options = { ...state };
        vscode.postMessage({ command: "search", ...options })
    };

    function onInputChanged()
    {
        const searchOptions = document.querySelectorAll(".search-options [name]");
        for (const element of searchOptions)
        {
            const name = element.getAttribute("name");
            if (element instanceof HTMLTextAreaElement
                || element.type === "text")
            {
                const invalidOptionContainer = document.querySelector(`.search-option:has([name=${name}])`);
                invalidOptionContainer.classList.remove("error");
                state[name] = element.value;
            }
            else if (element.getAttribute("type") === "checkbox")
            {
                state[name] = element.checked;
            }
        }

        vscode.setState(state);
    }

    window.addEventListener('message', event =>
    {
        const message = event.data;

        switch (message.type)
        {
            case 'add-match':
                const { match } = message;
                searchResults.add(match);
                webViewContainer.classList.remove("cancelled");
                webViewContainer.classList.remove("completed");

                vscode.setState(state);
                break;

            case 'clear':
                searchResults.clear();
                break;

            case 'searching':
                webViewContainer.classList.remove("cancelled");
                webViewContainer.classList.remove("completed");
                webViewContainer.classList.add("searching");
                break;
            
            case 'search-completed':
                webViewContainer.classList.remove("searching");
                webViewContainer.classList.add("completed");
                break;

            case 'cancelled':
                webViewContainer.classList.remove("searching");
                webViewContainer.classList.add("cancelled");
                break;
            
            case 'search-error':
                const { name, message: errorText  } = message;

                if (!name)
                    break;
                
                const invalidOptionContainer = document.querySelector(`.search-option:has([name=${name}])`);
                invalidOptionContainer.classList.add("error");

                const errorMessage = invalidOptionContainer.querySelector(".error-message");
                errorMessage.textContent = errorText;
                break;
            
            case 'initialize':
                const searchControls = webViewContainer.querySelector(".search-options");
                if (!message.showSearchOptionControls)
                    searchControls.classList.add("hidden");
                else
                    searchControls.classList.remove("hidden");

                const searchInfo = webViewContainer.querySelector("#search-info");
                if (message.searchInfo)
                {
                    searchInfo.innerHTML = message.searchInfo;
                    searchInfo.classList.remove("hidden");
                }
                else
                {
                    searchInfo.classList.add("hidden");
                    searchInfo.innerHTML = '';
                }

                autoHeightInput.updateHeight();

                break;
        }
    });

    searchResults.on("path-click", (event) =>
    {
        vscode.postMessage({ command: "open", location: event.detail.path });
    });

    searchResults.on("match-click", (event) =>
    {
        vscode.postMessage({ command: "open", location: searchResults.getMatchKey(event.detail.match) });
    });

    searchResults.on("match-added", (event) =>
    {
        vscode.postMessage({ command: "match-added", location: searchResults.getMatchKey(event.detail.match) });
    });

    searchResults.on("clear", (event) =>
    {
        webViewContainer.classList.remove("cancelled");
        webViewContainer.classList.remove("completed");

        vscode.setState(state);
        vscode.postMessage({ command: "clear" });
    });

    const searchOptions = document.querySelectorAll(".search-options [name]");
    for (const element of searchOptions)
    {
        const name = element.getAttribute("name");
        if (element instanceof HTMLTextAreaElement
            || element.type === "text")
        {
            if(state[name])
                element.value = state[name];    
            element.addEventListener("keydown", onKeyDown);
            element.addEventListener("input", onInputChanged);
        }
        else if (element.getAttribute("type") === "checkbox")
        {
            element.checked = state[name];
            element.addEventListener("change", onInputChanged);
        }
    }

    autoHeightInput.updateHeight();
})();