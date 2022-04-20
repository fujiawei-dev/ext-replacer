/*
 * @Date: 2021-02-06 19:34:01
 * @LastEditors: Rustle Karl
 * @LastEditTime: 2022.04.08 20:56:41
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

    let newText = document.getText(selection);

    newText = newText.replace(/（）/g, "()");

    // 去除孤立括号
    newText = newText.replace(/（/g, "");
    newText = newText.replace(/）/g, "");

    // 去除标题中的数字序列
    newText = newText.replace(/\d+\.[\d.]+/g, "");

    // OCR 容易将 () 识别成 O
    newText = newText.replace(/O/g, "()");

    newText = newText.replace(/([\w(),`<>\-{}/+.\[\]'"“”#$]+)/g, " $1 ")
    newText = newText.replace(/ ?\n ?/g, "\n").replace(/^\s+|\s+$/g, "");
    newText = newText.replace(/ ?， ?/g, "，").replace(/ ?。 ?/g, "。");
    newText = newText.replace(/ ?、 ?/g, "、").replace(/ ?： ?/g, "：");
    newText = newText.replace(/ ?“ ?/g, "“").replace(/ ?” ?/g, "”");
    newText = newText.replace(/ ?（ ?/g, "（").replace(/ ?） ?/g, "）");
    newText = newText.replace(/# ?/g, "#").replace(/\$ ?/g, "$");
    newText = newText.replace(/ ,/g, ",").replace(/ \./g, ".");
    newText = newText.replace(/(#{2,}) ?/g, "$1 ");

    // Markdown 中两个换行符才能换行显示
    newText = newText.replace(/\n+/g, "\n\n");

    newText = newText.replace(/ {2,}/g, " ");

    editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
    });
}

// 中文标点符号转英文标点符号
export function replaceSymbols(context: vscode.ExtensionContext) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const document = editor.document;
    const selection = editor.selection;

    let newText = document.getText(selection);

    // 将单引号‘’都转换成'，将双引号“”都转换成"
    newText = newText.replace(/[’|‘]/g, "'").replace(/[“|”]/g, "\"");
    // 将小括号（）转换成()，将中括号【】转换成[]，将大括号｛｝转换成{}
    newText = newText.replace(/（/g, "(").replace(/）/g, ")").replace(/【/g, "[").replace(/】/g, "]").replace(/｛/g, "{").replace(/｝/g, "}");
    // 将逗号，转换成,，将：转换成:
    newText = newText.replace(/，/g, ",").replace(/：/g, ":");
    //将《转换为<，将》转换为>
    newText = newText.replace(/《/g, "<").replace(/》/g, ">");
    //将句号。转换成.，将问号？转换为?
    newText = newText.replace(/[。|．]/g, ".").replace(/？/g, "?");
    //将！转换为!
    newText = newText.replace(/！/g, "!");
    //将￥转换为$
    newText = newText.replace(/￥/g, "$");
    //将；转换为;
    newText = newText.replace(/；/g, ";");
    //将×转换为x
    newText = newText.replace(/ ?× ?/g, "x");
    //将％转换为%
    newText = newText.replace(/ ?％ ?/g, "%");
    //将 —转换为-
    newText = newText.replace(/ ?— ?/g, "-");
    //将 —转换为-
    newText = newText.replace(/ ?～ ?/g, "~");
    //将［转换为[，将］转换为]
    newText = newText.replace(/［/g, "[").replace(/］/g, "]");

    editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
    });
}
