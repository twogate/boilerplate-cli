# Boilerplate CLI

テンプレートファイル中の任意のプレースホルダーテキストを一括で置き換えるツール。

## Replacement definition (置換定義ファイル)
使うには、置換定義ファイルを用意します：

```yaml
startSigil: "{{"         # 置き換えプレースホルダー開始sigil
endSigil: "}}"           # 置き換えプレースホルダー終了sigil
templateDir: ./templates # 入力側ディレクトリのベース
outDir: ./               # 出力側ディレクトリのベース

replaces:
    -   template: "./config.template.xml" # 入力 (templateDir + template)
        out: "./config.xml"               # 出力 (outDir + out)
        placeholders:                     # 置き換えるプレースホルダー: 置き換え先の値
            name: ZOC
            CFBundleDisplayName: ZOC
            APP_NAME: ZOC

    -   template: "./GoogleService-Info.template.plist"
        out: "./GoogleService-Info.plist"
        placeholders:    
            CLIENT_ID: xxx.apps.googleusercontent.com
            REVERSED_CLIENT_ID: 
            API_KEY: AIzaxxxxxxxxxxxx
            GCM_SENDER_ID: 123
            BUNDLE_ID: com.example.zoc
            PROJECT_ID: xxx.appspot.com
            GOOGLE_APP_ID: 1:123123123:ios:123123123
            DATABASE_URL: https://xxxxxxxx.firebaseio.com
            mobilesdk_app_id: xxx
            package_name: com.example.zoc
```

以下は `replaces[].out` と `replaces[].placeholders` を省略した形式です。

```yaml
startSigil: "{{"
endSigil: "}}"
templateDir: .
outDir: ../../tmp

replaces:
    # out を書いていないので ../../tmp/depth1/d1-move-only.txt に出力され、placeholders がないため単純にコピーだけされる
    - template: "depth1/d1-move-only.txt"

```

### Sigil
[シジル](https://en.wikipedia.org/wiki/Sigil_(computer_programming))は各プレースホルダーの前後につけるものです。
例えば `{{` `}}` というシジルで `PLACEHOLDER` というプレースホルダーを定義して、それをテンプレートに埋め込む場合 `{{PLACEHOLDER}}` を埋め込みます。

その場合、置換定義ファイルは:

```yaml
startSigil: "{{"
endSigil: "}}"
# ...
replaces: 
    # ...
    placeholders:
        PLACEHOLDER: '...'
```

のように定義します。

### Path resolution
パスの定義は、 
- テンプレート
   - `templateDir` → `replaces[].template`
- 出力先
   - `outDir` → `replaces[].out`

と解決されます。

基本的に共通する部分を `templateDir` または `outDir` にくくり出して、差異がある部分だけ各 `replaces` の `template` または `out` で定義すると良いでしょう。

全てが相対パスだった場合、置換定義ファイルから見た相対パスで解決されます。

置換定義ファイルとテンプレート、出力先の相対的位置を固定しておけば、どこのカレントワーキングディレクトリにいても置換定義ファイルの定義どうりのパスが使われます。

なお、 `outDir` は省略することができ、省略した場合は `template` と同じような構造のディレクトリが作られ、その中に出力されます。

### Placeholder
プレースホルダーは `startSigil` + `\s*?` + `placeholderText` + `\s*?` + `endSigil` のような正規表現置換で行われているので、`{{PLACEHOLDER}}` だけでなく `{{ PLACEHOLDER }}` のような表記も可能です。

なお、`startSigil` `endSigil` とプレースホルダーテキストには正規表現は利用できません。

`replaces[].placeholders` を書かなかった場合、そのままコピーされます。

## 実行
置換定義ファイルを書いたら、そのパスを指定して実行します。

```bash
npx @twogate/boilerplate path/to/replacement.yml
```
