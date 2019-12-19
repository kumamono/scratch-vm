const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const uid = require('../../util/uid');
const VariableUtil = require('../../util/variable-util');
const log = require('../../util/log');
const Variable = require('../../engine/variable');
const Scratch3DataBlocks = require('../../blocks/scratch3_data');
// hash形式のブロックicon
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==';

// hash形式のメニューicon

const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==';

// これでスプライトisとれる console.log(this.runtime.getSpriteTargetByName("スプライト1"));
// class指定（ちょっとわからないから聞いてみる）
class Scratch3NewBlocks { // とりあえず初期化してる
    constructor(runtime) { // ここからここまであったほうが良い
        this.runtime = runtime; // ランタイム初期化
        this.variables = new Object();
        this.variablesNameList = new Array();
        this.evalvalue = 1;
        this.idval = null; //
        this.lists = [];
        this.loopFlag4Writevaliavle = true; //
        this.datablock = new Scratch3DataBlocks(this.runtime);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'newblocks', // guiで設定するextention id
            name: 'New Blocks', // 拡張機能の名前（自由命名）
            menuIconURI: menuIconURI, // 上で定義したiconを呼び出す
            blockIconURI: blockIconURI, // 上で定義したアイコンを呼び出す
            blocks: [
                {
                    opcode: 'writevaliavle', // 保存時にjsonに書き込まれる:既存のものと被らなければ基本的にok
                    blockType: BlockType.LOOP, // ぶろっくのタイプ（詳しくは公式参照）ブロックの形とかを定義するこれはスタックブロックと呼ばれ上下につながる
                    /*
                    blockType: BlockType.BOOLEAN,   //条件：状態を意味する六角形のやつ
                    blockType: BlockType.HAT,     //上に何も置けない開始のブロック
                    blockType: BlockType.LOOP,   //C型ブロック繰り返しなど中に何かを入れて動かす
                    blockType: BlockType.REPORTER,   // 値を保持するブロック（中に変数として数字や文字列が入る）
                    */
                    branchCount: 1,
                    text: 'リスト:[test2]に中身を代入する', // ブロックの名前。[と]の間に英数字を入れると引数になる。って書いたあったけどよくわからんので聞いてみ
                    arguments: {
                        test2: {
                            type: ArgumentType.STRING,
                            menu: 'dMenu'
                        }
                    }
                },
                {
                    opcode: 'in2value',
                    blockType: BlockType.COMMAND,
                    text: '[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ことば'
                        }
                    }
                },
                {
                    opcode: 'randfruit',
                    blockType: BlockType.REPORTER,
                    text: 'ランダムな果物'
                },
                {
                    opcode: 'evalution2valu',
                    blockType: BlockType.COMMAND,
                    text: '[eval]を評価に追加する',
                    arguments: {
                        eval: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'evalution2show',
                    blockType: BlockType.COMMAND,
                    text: '評価を表示する'
                }
            ],
            menus: {
                dMenu: 'menulistvaliables'
            }
        };
    }

    /**
     * Return a value of variable.
     * @param {string} name - the name of target variable.
     * @return {string} a value of the variable.
     */
    getValue(name) {
        let vals = this.runtime.targets[0].variables;
        return vals[this.variables[name]].value;
    }

    /**
     * Set a value to variable.
     * @params {string} name - the name of target variable.
     * @params {string} value - 代入する値
     * example: this.setValue("hoge",[1,2,3,4])
     */

    setValue(name, value, util) {
        const variable = util.target.lookupOrCreateVariable(this.variables[name], name);
        if(variable.type == "list"){
            if (variable.value.length < Scratch3DataBlocks.LIST_ITEM_LIMIT) {
                variable.value.push(value);
            }
        }else{
            variable.value = value;
        }
        variable._monitorUpToDate = false;

    }

    /**
     * C型ブロック idvalに変数名を入れC型の中が終わったらnullにする
     * @param {object} args - the block arguments.
     * @property {number} TEXT - the text.
     */

    writevaliavle (args, loop, lop) { // オペコードはオペレーションコードで命令 argsは引数上で定義してる変数の中身をもってこれる
        this.idval = args.test2;
        let brachToJump = 1;

        if(this.loopFlag4Writevaliavle){
            loop.sequencer.stepToBranch(loop.thread,brachToJump,this.loopFlag4Writevaliavle);
        }else{
            this.idval = null;
        }
        this.loopFlag4Writevaliavle = !this.loopFlag4Writevaliavle;

    }

    /**
     * {説明}
     * {戻り値}
     * @return {number} - the user agent.
     */

    loop() {}


    /**
     * {説明}
     * {戻り値}
     * @return {number} - the user agent.
     */
    randfruit() {
        const fruits = ['パイナップル', 'バナナ', 'イチゴ', 'リンゴ', 'サクランボ', 'ブドウ', 'スイカ', 'みかん'];
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        return fruit;
    }

    /**
     * {説明}
     * {戻り値}
     * @return {number} - the user agent.
     */
    randfruit2vaule() {
        return fruit;
    }

    /**
     * {説明}
     * {戻り値}
     * @return {number} - the user agent.
     */

    in2value(args,perikan,kawauso) {
        if (this.idval !== null) {
            console.log(this.runtime.targets[0].variables[this.variables[this.idval]].type);
            console.log(this.runtime.targets[0].variables[this.variables[this.idval]].value);
            this.setValue(this.idval, args.TEXT, perikan);
            console.log(this.runtime.targets[0].variables[this.variables[this.idval]].value);

        }
        /*
        console.log(perikan, kawauso);
        let id = uid();
        console.log(this.runtime.targets);
        /*
        this.runtime.createNewGlobalVariable('saiama',uid(),Variable.LIST_TYPE);
        this.runtime.requestBlocksUpdate();
        this.runtime.requestRedraw();
        */
       }

    /** [    *menulistvaliables () {
     *  const valiableslist = [];
     *  const variables = this.runtime.targets[0].variables;
     *  Object.keys(variables).forEach(function (key){
     *    valiableslist.push(variables[key].name);
     *  }
     *);
     *  console.log(valiableslist);
     *  return valiableslist;
     *}
     */
    menulistvaliables() {
        this.updateVariablesInfo();
        return this.variablesNameList;
    }
    evalution2valu(args) {
        this.evalvalue = Number(this.evalvalue) + Number(args.eval);
    }
    evalution2show() {
        alert(this.evalvalue);
    }

    /**
     * update valiables infomation
     */
    updateVariablesInfo() {
        // 変数リストを初期化
        this.variables = new Object();
        this.variablesNameList = new Array();

        // スプライトの一覧を取得
        let targets = this.runtime.targets;
        // 変数の一覧を作る
        for (let target_index of Object.keys(targets)) {
            let target = targets[target_index];
            for (val_index of Object.keys(target.variables)) {
                let val = target.variables[val_index];
                this.variablesNameList.push(val.name); // 名前一覧の配列に名前を追加
                this.variables[val.name] = val.id; // 名前をキーとするObjectの値にidを追加
            }
        }
    }

    // https://qiita.com/higuma/items/5af4e62bdf4df42ce673


    thislist () {
        var generatePermutation = function(perm, pre, post, n) {
            var elem, i, rest, len;
            if (n > 0)
                for (i = 0, len = post.length; i < len; ++i) {
                    rest = post.slice(0);
                    elem = rest.splice(i, 1);
                    generatePermutation(perm, pre.concat(elem), rest, n - 1);
                }
            else
                perm.push(pre);
        };

        /*
        extend Array.prototype
        e.g. [0, 1, 2].permutation(2)
        => [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
        */
        Array.prototype.permutation = function(n) {
            if (n == null) n = this.length;
            var perm = [];
            generatePermutation(perm, [], this, n);
            return perm;
        };
        this.list = ['父', 'と', '私'].permutation();
        console.log(this.list);
    }
}


module.exports = Scratch3NewBlocks;
