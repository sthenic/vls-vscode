import { workspace, ExtensionContext } from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions
} from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    /* Get the configuration object. */
    const configuration = workspace.getConfiguration();
    const vlsCommand = String(configuration.get('vls.path'));

    let serverOptions: ServerOptions = {
        run: {command: vlsCommand},
        debug: {command: vlsCommand},
    };

    let clientOptions: LanguageClientOptions = {
        /* Register the server for Verilog documents. */
        documentSelector: [{ scheme: 'file', language: 'verilog' }],
    };

    /* Create and start the language client. */
    client = new LanguageClient(
        'vls',
        'Verilog Language Server',
        serverOptions,
        clientOptions
    );
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
