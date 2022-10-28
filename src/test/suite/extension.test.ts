import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import * as replacer from '../../replacer';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test replacer.insertSpace', () => {
		assert.strictEqual("中文 English 中文", replacer.insertSpace("中文English中文"));
		assert.strictEqual("字符 \"\\0\" 为空", replacer.insertSpace("字符\"\\0\"为空"));
		assert.strictEqual("%H 中文 %% 中文", replacer.insertSpace("%H中文%%中文"));
		assert.strictEqual("| -------- | -------- |", replacer.insertSpace("| ------------ | ------------ |"));
		assert.strictEqual("A 大小", replacer.insertSpace("A  　大小"));
		assert.strictEqual("- -h `< 行数 >` 指定视窗的缓冲区行数", replacer.insertSpace("- -h   `< 行数 >`  　指定视窗的缓冲区行数"));
		assert.strictEqual("中文 1-1 中文", replacer.insertSpace("中文1-1中文"));
		assert.strictEqual("中文 -1 中文", replacer.insertSpace("中文-1中文"));
		assert.strictEqual("English-1 中文", replacer.insertSpace("English-1中文"));
		assert.strictEqual("表示为 1.36×2^-4", replacer.insertSpace("表示为1.36×2^-4"));
	});

	test('Test replacer.replacePunctuation', () => {
		assert.strictEqual("sv[1]", replacer.replacePunctuation("sv 【 1 】 "));
	});

	test('Test replacer.removeAllSpaces', () => {
		assert.strictEqual("ABCD", replacer.removeAllSpaces("A B C D"));
	});

	test('Test replacer.convertToUnixPathStyle', () => {
		assert.strictEqual("A/B/C/D", replacer.convertToUnixPathStyle("A\\B\\C\\D"));
	});

	test('Test replacer.replaceSpacesWithUnderscores', () => {
		assert.strictEqual("A_B_C_D", replacer.replaceSpacesWithUnderscores("A B C D"));
		assert.strictEqual("中文English中文", replacer.replaceSpacesWithUnderscores("中文English中文"));
	});

	test('Test replacer.repairRecognizingText', () => {
		assert.strictEqual("中文 English 中文", replacer.repairRecognizingText("中文English中文"));
		assert.strictEqual("3. UDP 协议", replacer.repairRecognizingText("3.UDP协议"));
		assert.strictEqual("SOCK_DGRAM", replacer.repairRecognizingText("SOCK DGRAM"));
		assert.strictEqual("sendto() 函数", replacer.repairRecognizingText("sendto（0函数"));
		assert.strictEqual("send()/sendto().", replacer.repairRecognizingText("send（）/sendto（."));
		assert.strictEqual("用 write() 函数", replacer.repairRecognizingText("用writeO）函数"));
		assert.strictEqual("(c) 路径", replacer.repairRecognizingText("（c() 路径"));
		assert.strictEqual("进程 A 中关闭 `sv[0]`，在进程 B 中关闭 `sv[1]`", replacer.repairRecognizingText("进程A中关闭sv【0】，在进程B中关闭sv【1】"));
		assert.strictEqual("目的 MAC 地址为 00:00:00:00:00:02", replacer.repairRecognizingText("目的MAC地址为00:00:00:00:00:02"));
		assert.strictEqual("可聚集全球单播地址 (Aggregatable Global Unicast Address)。", replacer.repairRecognizingText("可聚集全球单播地址（Aggregatable Global Unicast Address）。"));
		assert.strictEqual("- 1\n- 2", replacer.repairRecognizingText("·1\n·2"));
		assert.strictEqual("将 `ht[1]` 设置为 `ht[0]`", replacer.repairRecognizingText("将ht[1]设置为ht[0]"));

		assert.strictEqual("repairRecognizingText", replacer.repairRecognizingText("repairRecognizingText"));
	});

	test('Test replacer.replaceNoteTopAttributes', () => {
		assert.strictEqual(replacer.replaceNoteTopAttributes("---\ndate: 2022-06-22T15:04:12+08:00\nauthor: \"Rustle Karl\"\n\ntitle: \"submodule 子模块\"\nurl:  \"posts/git/docs/submodule\"  # 永久链接\ntags: [ \"Git\", \"README\" ]  # 标签\nseries: [ \"Git 学习笔记\" ]  # 系列\ncategories: [ \"学习笔记\" ]  # 分类\n\ntoc: true  # 目录\ndraft: false  # 草稿\n---"), "---\ndate: 2022-06-22T15:04:12+08:00\nauthor: \"Rustle Karl\"\n\ntitle: \"submodule 子模块\"\nurl:  \"posts/git/docs/submodule\"\ntags: [ \"Git\", \"README\" ]\ncategories: [ \"Git 学习笔记\" ]\n\ntoc: true\ndraft: false\n---");
	});
});
