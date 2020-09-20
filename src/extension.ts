import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('replacer.insertSpace', () => {
		insertSpace(context);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

// Insert space between English and Chinese words.
export function insertSpace(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }
	const document = editor.document;
	const selection = editor.selection;
	const ordText = document.getText(selection);

	let regex = /([\w\.(),`<>-]+)/g;
	let newText = ordText.replace(regex, " $1 ").replace(/ {2,}/g, " ");
	newText = newText.replace(/ ?\n ?/g, "\n").replace(/^\s+|\s+$/g, "");
	newText = newText.replace(/ ?， ?/g, "，").replace(/ ?。 ?/g, "。");
	newText = newText.replace(/ ?、 ?/g, "、").replace(/ ?： ?/g, "：");;
	newText = newText.replace(/ ,/g, ",").replace(/ \./g, ".");

	editor.edit(editBuilder => {
		editBuilder.replace(selection, newText);
	});
}
