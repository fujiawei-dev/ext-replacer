// 在中英文之间插入空格，处理中英文混合问题
export function insertSpace(newText: string): string {
    newText = newText.
        replace(/[\b\t\v\f\r\u00A0\u2028\u2029\u3000\uFEFF]/g, " ").// 不可见字符

        replace(/(<.+?>)/g, "`$1`").	// 尖括号加引用
        replace(/``+/g, "`").// 多余尖括号

        replace(/ ?[-一] ?(\d+)/g, " -$1").	// 负号
        replace(/([\w(),`<>\-{}/+.\[\]'"“”#$%\\:]+)/g, " $1 ").	// 连续英文数字以及半角标点符号
        replace(/ ?\n ?/g, "\n").// 行首尾空白符
        replace(/^\s+|\s+$/g, "").// 所选内容首尾空白

        // 中文符号前后空白符
        replace(/ ?， ?/g, "，").
        replace(/ ?。 ?/g, "。").
        replace(/ ?、 ?/g, "、").
        replace(/ ?： ?/g, "：").
        replace(/ ?“ ?/g, "“").
        replace(/ ?” ?/g, "”").
        replace(/ ?（ ?/g, "（").
        replace(/ ?） ?/g, "）").

        // 英文符号前后空白符
        replace(/ +,/g, ",").
        replace(/ +\./g, ".").
        replace(/# ?/g, "#").

        replace(/ ?\$ ?/g, " $").
        replace(/(#{2,}) ?/g, "$1 ").// 标题
        replace(/([^|])\n+/g, "$1\n\n").	// 换行
        replace(/--------+/g, "--------").	// 表格
        replace(/ {2,}/g, " ");// 多余空格

    return newText;
}

// 将全角标点替换成半角
export function replacePunctuation(newText: string): string {
    newText = newText.
        // 引号
        replace(/[’|‘]/g, "'").
        replace(/[“|”]/g, "\"").

        // 括号
        replace(/ ?（ ?/g, "(").
        replace(/ ?） ?/g, ")").
        replace(/ ?【 ?/g, "[").
        replace(/ ?】 ?/g, "]").
        replace(/ ?［ ?/g, "[").
        replace(/ ?］ ?/g, "]").
        replace(/ ?｛ ?/g, "{").
        replace(/ ?｝ ?/g, "}").
        replace(/ ?《 ?/g, "<").
        replace(/ ?》 ?/g, ">").

        replace(/ ?， ?/g, ", ").
        replace(/ ?： ?/g, ": ").
        replace(/ ?[。|．] ?/g, ". ").
        replace(/ ?？ ?/g, "? ").
        replace(/ ?！ ?/g, "! ").
        replace(/ ?￥ ?/g, "$").
        replace(/ ?； ?/g, "; ").
        replace(/ ?％ ?/g, "%").
        replace(/ ?— ?/g, "-").
        replace(/ ?～ ?/g, "~").
        replace(/ ?× ?/g, "x");

    return newText;
}

// 将半角标点替换成全角
export function replacePunctuationReversed(newText: string): string {
    newText = newText.
        replace(/\. ?/g, "。").
        replace(/\, ?/g, "，").
        replace(/\: ?/g, "：").
        replace(/\? ?/g, "？").
        replace(/\! ?/g, "！").
        replace(/\; ?/g, "；").
        replace(/\% ?/g, "％").
        replace(/\~ ?/g, "～");

    return newText;
}


// 修复识别文本
export function repairRecognizingText(newText: string): string {
    newText = newText.
        // 括号
        replace(/（）/g, "()").
        replace(/（([a-zA-Z ]+)\(?[)）]?/g, "($1)").
        replace(/([a-z])[（）O0]{1,2}([^a-zA-Z])/g, "$1()$2").
        replace(/ ?【 ?/g, "[").
        replace(/ ?】 ?/g, "]").

        // 列表
        replace(/\n口/g, "\n- ").
        replace(/^口/g, "\n- ").

        // 列表序号后插入空格
        replace(/(\d\.)([^\d])/g, "$1 $2").

        // 全大写英文间的空格改下划线
        replace(/([A-Z]) ([A-Z])/g, "$1_$2").

        // 去除标题中的数字序列
        replace(/# ?[\d.]+/g, "# ");

    return insertSpace(newText);
}

export function removeAllSpaces(newText: string): string {
    return newText.replace(/\s/g, "");
}

export function convertToUnixPathStyle(newText: string): string {
    return newText.replace(/\\/g, "/");
}

// 英文单词间的空格替换为下划线
export function replaceSpacesWithUnderscores(newText: string): string {
    // https://stackoverflow.com/questions/24522046/how-to-match-text-which-the-part-of-it-is-already-matched-previous
    return newText.
        replace(/([a-zA-Z]) ([a-zA-Z])/g, "$1_$2").
        replace(/([a-zA-Z]) ([a-zA-Z])/g, "$1_$2");
}

// 替换笔记顶部属性
export function replaceNoteTopAttributes(newText: string): string {
    let newTextList: Array<string> = [];

    // 逐行读取
    newText.split("\n").forEach((line: string) => {
        if (line.startsWith("categories")) {
            return;
        }

        if (line.startsWith("series")) {
            line = line.replace("series", "categories");
        }

        // 去除尾部注释
        line = line.replace(/#.*$/g, "");

        // 去除首尾空白符
        line = line.replace(/^\s+|\s+$/g, "");

        newTextList.push(line);
    });

    return newTextList.join("\n");
}
