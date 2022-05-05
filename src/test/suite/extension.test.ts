import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import * as replacer from '../../replacer';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test replacer.insertSpace', () => {
		assert.strictEqual("中文 English 中文", replacer.insertSpace("中文English中文"));
	});

	test('Test replacer.replacePunctuation', () => {
		assert.strictEqual("[];',./", replacer.replacePunctuation("【】；’，。/"));
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

		assert.strictEqual("repairRecognizingText", replacer.repairRecognizingText("repairRecognizingText"));
	});
});
