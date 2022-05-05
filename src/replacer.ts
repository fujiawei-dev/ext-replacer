// 在中英文之间插入空格，处理中英文混合问题
export function insertSpace(newText: string): string {
    newText = newText.
        replace(/(<.+?>)/g, "`$1`").	// 尖括号加引用
        replace(/ ?[-一] ?(\d+)/g, " -$1").	// 负号
        replace(/([\w(),`<>\-{}/+.\[\]'"“”#$\\]+)/g, " $1 ").	// 连续英文
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
        replace(/（/g, "(").
        replace(/）/g, ")").
        replace(/【/g, "[").
        replace(/】/g, "]").
        replace(/［/g, "[").
        replace(/］/g, "]").
        replace(/｛/g, "{").
        replace(/｝/g, "}").
        replace(/《/g, "<").
        replace(/》/g, ">").

        replace(/，/g, ",").
        replace(/：/g, ":").
        replace(/[。|．]/g, ".").
        replace(/？/g, "?").
        replace(/！/g, "!").
        replace(/￥/g, "$").
        replace(/；/g, ";").
        replace(/ ?％ ?/g, "%").
        replace(/ ?— ?/g, "-").
        replace(/ ?～ ?/g, "~").
        replace(/ ?× ?/g, "x");

    return newText;
}

// 修复识别文本
export function repairRecognizingText(newText: string): string {
    newText = newText.
        // 括号
        replace(/（）/g, "()").
        replace(/（([a-z])\(?[)）]?/g, "($1)").
        replace(/([a-z])[（）O0]{1,2}([^a-zA-Z])/g, "$1()$2").

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
