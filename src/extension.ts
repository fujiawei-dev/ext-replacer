// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as replacer from './replacer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "replacer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	{
		let disposable = vscode.commands.registerCommand('replacer.insertSpace', () => {
			// The code you place here will be executed every time your command is executed
			insertSpaceCmd(context);
		});

		context.subscriptions.push(disposable);
	}

	{
		let disposable = vscode.commands.registerCommand('replacer.replacePunctuation', () => {
			// The code you place here will be executed every time your command is executed
			replacePunctuationCmd(context);
		});

		context.subscriptions.push(disposable);
	}

	{
		let disposable = vscode.commands.registerCommand('replacer.repairRecognizingText', () => {
			// The code you place here will be executed every time your command is executed
			repairRecognizingTextCmd(context);
		});

		context.subscriptions.push(disposable);
	}

	{
		let disposable = vscode.commands.registerCommand('replacer.removeAllSpaces', () => {
			// The code you place here will be executed every time your command is executed
			removeAllSpacesCmd(context);
		});

		context.subscriptions.push(disposable);
	}

	{
		let disposable = vscode.commands.registerCommand('replacer.convertToUnixPathStyle', () => {
			// The code you place here will be executed every time your command is executed
			convertToUnixPathStyleCmd(context);
		});

		context.subscriptions.push(disposable);
	}

	{
		let disposable = vscode.commands.registerCommand('replacer.replaceSpacesWithUnderscores', () => {
			// The code you place here will be executed every time your command is executed
			replaceSpacesWithUnderscoresCmd(context);
		});

		context.subscriptions.push(disposable);
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }


export function insertSpaceCmd(context: vscode.ExtensionContext): void {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.insertSpace(newText));
	});
}

export function replacePunctuationCmd(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.replacePunctuation(newText));
	});
}

export function repairRecognizingTextCmd(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.repairRecognizingText(newText));
	});
}

// 清除全部空白符
export function removeAllSpacesCmd(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.removeAllSpaces(newText));
	});
}

// 转换为 Unix 路径风格
export function convertToUnixPathStyleCmd(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.convertToUnixPathStyle(newText));
	});
}

export function replaceSpacesWithUnderscoresCmd(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const selection = editor.selection;

	let newText = document.getText(selection);

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, replacer.replaceSpacesWithUnderscores(newText));
	});
}
