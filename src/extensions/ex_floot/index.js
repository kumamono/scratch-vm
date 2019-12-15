const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
//hash形式のブロックicon
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS4yNzE1IiBoZWlnaHQ9IjM5LjYyNzE4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3LjA4MywtMTQxLjM1NDI5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjE4LjA4MywxNzkuOTgxNDh2LTM3LjYyNzE4aDM3LjI3MTV2MzcuNjI3MTh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI0Ni45MTE3OSwxNjMuMTUyMjFjMCw1LjU3MjYgLTQuNTE3NDgsMTAuMDkwMDggLTEwLjA5MDA4LDEwLjA5MDA4Yy01LjU3MjYsMCAtMTAuMDkwMDcsLTQuNTE3NDggLTEwLjA5MDA3LC0xMC4wOTAwOGMwLC01LjU3MjYgNC41MTc0OCwtMTAuMDkwMDggMTAuMDkwMDcsLTEwLjA5MDA4YzUuNTcyNiwwIDEwLjA5MDA4LDQuNTE3NDggMTAuMDkwMDgsMTAuMDkwMDh6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSIjZmYwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM2LjYxNTc5LDE1OS4yMzk3M3YtOC42NDg2NHYtMi40NzEwNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+'
//hash形式のメニューicon
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS4yNzE1IiBoZWlnaHQ9IjM5LjYyNzE4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3LjA4MywtMTQxLjM1NDI5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjE4LjA4MywxNzkuOTgxNDh2LTM3LjYyNzE4aDM3LjI3MTV2MzcuNjI3MTh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI0Ni45MTE3OSwxNjMuMTUyMjFjMCw1LjU3MjYgLTQuNTE3NDgsMTAuMDkwMDggLTEwLjA5MDA4LDEwLjA5MDA4Yy01LjU3MjYsMCAtMTAuMDkwMDcsLTQuNTE3NDggLTEw'
//class指定（ちょっとわからないから聞いてみる）
class Scratch3ex_floot {　　//とりあえず初期化してる
    constructor (runtime) {  //ここからここまであったほうが良い

        this.runtime = runtime;　//ランタイム初期化

        //this._onTargetCreated = this._onTargetCreated.bind(this);
        //this.runtime.on('targetWasCreated', this._onTargetCreated);
    }


    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'ex_floot',//guiで設定するextention id
            name: 'Floot ippai',//拡張機能の名前（自由命名）
            menuIconURI: menuIconURI,//上で定義したiconを呼び出す
            blockIconURI: blockIconURI,//上で定義したアイコンを呼び出す
            blocks: [
                {
                    opcode: 'randfloot',//保存時にjsonに書き込まれる:既存のものと被らなければ基本的にok
                    blockType: BlockType.COMMAND,//ぶろっくのタイプ（詳しくは公式参照）ブロックの形とかを定義するこれはスタックブロックと呼ばれ上下につながる
                    //blockType: BlockType.BOOLEAN,   //条件：状態を意味する六角形のやつ
                    //blockType: BlockType.HAT,     //上に何も置けない開始のブロック
                    //blockType: BlockType.LOOP,   //C型ブロック　繰り返しなど中に何かを入れて動かす
                    //blockType: BlockType.REPORTER,   // 値を保持するブロック（中に変数として数字や文字列が入る）
                    text: 'floot [hoge]',// ブロックの名前。[と]の間に英数字を入れると引数になる。って書いたあったけどよくわからんので聞いてみる
                    arguments: {
                        hoge: {       //上で指定した引数
                            type: ArgumentType.STRING, //数値入力
                            //type: ArgumentType.BOOLEAN //true false
                            //type: ArgumentType.STRING //文字列が入る
                            defaultValue: "ringo" //初期値
                        }
                    }
                },
                {
                    opcode: 'ringo_number',
                    text: 'browser',
                    blockType: BlockType.REPORTER
                }
            ],
            menus: {
            }
        };
    }

    /**
     * Write log.
     * @param {object} args - the block arguments.
     * @property {number} TEXT - the text.
     */
    randfloot (args) {　　　//オペコードはオペレーションコードで命令　argsは引数　上で定義してる変数の中身をもってこれる
        const text = Cast.toString(args.hoge);　　//引数　tostringは文字列にtoNumberは数値に
        log.log(text);  //logに書くやつ
    }

    /**
     * Get the browser.
     * @return {number} - the user agent.
     */
    ringo_number () {
        return 1;　//true false で真偽を返す
    }
}

module.exports = Scratch3ex_floot;
