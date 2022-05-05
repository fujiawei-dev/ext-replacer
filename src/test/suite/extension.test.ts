import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import { insertSpace, replacePunctuation, repairRecognizingText } from '../../replacer';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test replacer.insertSpace', () => {
		assert.strictEqual("中文 English 中文", insertSpace("中文English中文"));
	});

	test('Test replacer.replacePunctuation', () => {
		assert.strictEqual("[];',./", replacePunctuation("【】；’，。/"));
	});

	test('Test replacer.repairRecognizingText', () => {
		assert.strictEqual("中文 English 中文", repairRecognizingText("中文English中文"));
		assert.strictEqual("3. UDP 协议", repairRecognizingText("3.UDP协议"));
		assert.strictEqual("SOCK_DGRAM", repairRecognizingText("SOCK DGRAM"));
		assert.strictEqual("sendto() 函数", repairRecognizingText("sendto（0函数"));
		assert.strictEqual("send()/sendto().", repairRecognizingText("send（）/sendto（."));

		assert.strictEqual("repairRecognizingText", repairRecognizingText("repairRecognizingText"));
	});
});
