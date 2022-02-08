/*
 * @Date: 2021-02-06 19:34:01
 * @LastEditors: Rustle Karl
 * @LastEditTime: 2022.02.08 13:14:06
 */
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let cmdInsertSpace = vscode.commands.registerCommand('replacer.insertSpace', () => {
        insertSpace(context);
    });

    context.subscriptions.push(cmdInsertSpace);

    let cmdReplaceSymbols = vscode.commands.registerCommand('replacer.replaceSymbols', () => {
        replaceSymbols(context);
    });

    context.subscriptions.push(cmdReplaceSymbols);
}

export function deactivate() {
}

// 在中英文之间插入空格
export function insertSpace(context: vscode.ExtensionContext): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const document = editor.document;
    const selection = editor.selection;
    const ordText = document.getText(selection);

    let regex = /([\w(),`<>\-{}/+.\[\]'"“”#$]+)/g;
    let newText = ordText.replace(regex, " $1 ").replace(/ {2,}/g, " ");
    newText = newText.replace(/ ?\n ?/g, "\n").replace(/^\s+|\s+$/g, "");
    newText = newText.replace(/ ?， ?/g, "，").replace(/ ?。 ?/g, "。");
    newText = newText.replace(/ ?、 ?/g, "、").replace(/ ?： ?/g, "：");
    newText = newText.replace(/ ?“ ?/g, "“").replace(/ ?” ?/g, "”");
    newText = newText.replace(/ ?（ ?/g, "（").replace(/ ?） ?/g, "）");
    newText = newText.replace(/# ?/g, "#").replace(/\$ ?/g, "$");
    newText = newText.replace(/ ,/g, ",").replace(/ \./g, ".");

    editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
    });
}

// 中文标点符号转英文标点符号
export function replaceSymbols(context: vscode.ExtensionContext) {
    const editor = vscode.window.activeTextEditor;
    console.log('dddd');

    if (!editor) {
        return;
    }
    const document = editor.document;
    const selection = editor.selection;
    const ordText = document.getText(selection);

    console.log(ordText);

    // 将单引号‘’都转换成'，将双引号“”都转换成"
    let newText = ordText.replace(/[’|‘]/g, "'").replace(/[“|”]/g, "\"");
    // 将中括号【】转换成[]，将大括号｛｝转换成{}
    newText = newText.replace(/【/g, "[").replace(/】/g, "]").replace(/｛/g, "{").replace(/｝/g, "}");
    // 将逗号，转换成,，将：转换成:
    newText = newText.replace(/，/g, ",").replace(/：/g, ":");
    //将《转换为<，将》转换为>
    newText = newText.replace(/《/g, "<").replace(/》/g, ">");
    //将句号。转换成.，将问号？转换为?
    newText = newText.replace(/。/g, ".").replace(/？/g, "?");
    //将！转换为!
    newText = newText.replace(/！/g, "!");
    //将￥转换为$
    newText = newText.replace(/￥/g, "$");
    //将；转换为;
    newText = newText.replace(/；/g, ";");

    editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
    });
}
