# Boilerplate CLI

[日本語](README.ja.md)

A tool that replaces any placeholder text in a template file in bulk.

* Do not run with root / sudo privileges

## Replacement definition
To use it, prepare a replacement definition file:

```yaml
startSigil: "{{"         # placeholder starts with this sign
endSigil: "}}"           # placeholder ends with this sign
templateDir: ./templates # base input directory
outDir: ./               # base output directory

replaces:
    -   template: "./config.template.xml" # input file (templateDir + template)
        out: "./config.xml"               # output file (outDir + out)
        placeholders:                     # replacement key:value
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

The following is the format with `replaces[].out` and `replaces[].placeholders` omitted.

```yaml
startSigil: "{{"
endSigil: "}}"
templateDir: .
outDir: ../../tmp

replaces:
    # Since you didn't write out `../../tmp/depth1/d1-move-only.txt`, it is simply copied because there are no placeholders.
    - template: "depth1/d1-move-only.txt"

    # Since you didn't write out `... /... /tmp/path/to/template.txt`.
    # The placeholder of "{{ ENV }}" is replaced by "development".
    - template: "path/to/template.txt"
      placeholders:
          ENV: development
```

### ⚠️ Common Mistakes ⚠️
#### Wrong

```
startSigil: "{{"
endSigil: "}}"
templateDir: .
outDir: .

replaces:
    - template: "1.png"
      out: out.png
```

#### Correct

```
startSigil: "{{"
endSigil: "}}"
templateDir: .
outDir: .

replaces:
    - template: "1.png"
    - out: out.png # ❌ WRONG!
```

Confirm YAML syntax.

If something wrong is found with syntax, the boilerplate-cli will crash with a `Replacement Definition Syntax Error`.

### Sigil
[Sigil](https://en.wikipedia.org/wiki/Sigil_(computer_programming)) is attached before and after each placeholder.
For example, if you define a placeholder called `PLACEHOLDER`, with sigil defined with `{{` `}}`, write `{{PLACEHOLDER}}`.

In that case, the replacement definition file would be :

```yaml
startSigil: "{{"
endSigil: "}}"
# ...
replaces: 
    # ...
    placeholders:
        PLACEHOLDER: '...'
```

### Path resolution
The path definition is resolved as follows
- template
   - `templateDir` → `replaces[].template`
- output location
   - `outDir` → `replaces[].out`

It's a good idea to squeeze out the common parts with `templateDir` or `outDir` and define only the differences with `template` or `out` of each `replaces`.

If everything is a relative path, it will be resolved with the relative path from the replacement definition file.

If you fix the relative positions of the replacement definition file, template, and output destination, the path of the replacement definition file will be used regardless of the current working directory.

Note that `outDir` can be omitted. If omitted, a directory with the same structure as `template` will be created and output in that directory.

### Placeholder
Placeholders are done with regular expression substitution like 
`startSigil` + `\s*?` + `placeholderText` + `\s*?` + `endSigil`.

So you can write `{{ PLACEHOLDER }}` not only 
`{{PLACEHOLDER}}`.

Can't use regular expression in `startSigil`, `endSigil`, placeholder text.

If you do not write `replaces[].placeholders`, the replacement process will not be performed and the copy will be made as is.

## Run
After writing the replacement definition file, specify the path and execute boilerplate-cli.

```bash
npx @twogate/boilerplate path/to/replacement.yml
```

If you pass a path as the second argument, that path will be the output destination (outDir).

```bash
npx @twogate/boilerplate path/to/replacement.yml path/to/outDir
```
