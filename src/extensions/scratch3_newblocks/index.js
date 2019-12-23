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
        this.evalvalue = 1;
        this.listName4setItems = null;  //writevaliavle関数内でアイテムを追加するリスト
        this.listName4makePattern = null;  //writevaliavle関数内でアイテムを追加するリスト
        this.list4generate = new Array();
        this.lists = [];
        this.loopFlag4Writevaliavle = true; //
        this.loopFlag4MakePattern = true; //
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
                    blockType: BlockType.CONDITIONAL, // ぶろっくのタイプ（詳しくは公式参照）ブロックの形とかを定義するこれはスタックブロックと呼ばれ上下につながる
                    /*
                    blockType: BlockType.BOOLEAN,   //条件：状態を意味する六角形のやつ
                    blockType: BlockType.HAT,     //上に何も置けない開始のブロック
                    blockType: BlockType.LOOP,   //C型ブロック繰り返しなど中に何かを入れて動かす
                    blockType: BlockType.REPORTER,   // 値を保持するブロック（中に変数として数字や文字列が入る）
                    */
                    branchCount: 1,
                    text: '[TARGET]に単語を追加する', // ブロックの名前。[と]の間に英数字を入れると引数になる。って書いたあったけどよくわからんので聞いてみ
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            menu: 'listMenu'
                        }
                    }
                },
                {
                    opcode: 'addValue2List',
                    blockType: BlockType.COMMAND,
                    text: '[TEXT]を追加',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ことば'
                        }
                    }
                },
                {
                    opcode: 'makePattern', // 保存時にjsonに書き込まれる:既存のものと被らなければ基本的にok
                    blockType: BlockType.CONDITIONAL, // ぶろっくのタイプ（詳しくは公式参照）ブロックの形とかを定義するこれはスタックブロックと呼ばれ上下につながる
                    /*
                    blockType: BlockType.BOOLEAN,   //条件：状態を意味する六角形のやつ
                    blockType: BlockType.HAT,     //上に何も置けない開始のブロック
                    blockType: BlockType.LOOP,   //C型ブロック繰り返しなど中に何かを入れて動かす
                    blockType: BlockType.REPORTER,   // 値を保持するブロック（中に変数として数字や文字列が入る）
                    */
                    branchCount: 1,
                    text: '[TARGET]をパターンリストにする', // ブロックの名前。[と]の間に英数字を入れると引数になる。って書いたあったけどよくわからんので聞いてみ
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            menu: 'listMenu'
                        }
                    }
                },
                {
                    opcode: 'nominateItem',
                    blockType: BlockType.COMMAND,
                    text: '[TARGET]をパターンに追加',
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            menu: 'listMenu'
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
                listMenu: {
                    items: 'makeListsMenu',
                },
                variableMenu :{
                    items:'makeVariablesMenu'
                }
            }
        };
    }

    /**
     * Return a value of variable.
     * @param {string} name - the name of target variable.
     * @param {string} type - the type of target variable. ex : Variable.LIST_TYPE, Variable.SCALAR_TYPE
     * @return {string} a value of the variable.
     */
    getValue(name,type) {
        const variable = util.target.lookupVariableByNameAndType(name, type);
        return variable.value;
    }

    /**
     * Set a value to variable.
     * @params {string} name - the name of target variable.
     * @params {string} type - type of variable.
     * @params {string} value - value to set variable.
     * @params {!BlockUtility} util - utilities of block.
     */

    setValue(name, type, value, util) {
        const variable = util.target.lookupVariableByNameAndType(this.listName4setItems, type);
        console.log(variable)

        if(variable.type == Variable.LIST_TYPE){
            if (variable.value.length < Scratch3DataBlocks.LIST_ITEM_LIMIT) {
                variable.value.push(value);
            }
        }else{
            variable.value = value;
        }
        variable._monitorUpToDate = false;

    }

    /**
     * C型ブロック this.listName4setItemsを対象のリストとして内部ブランチを処理する
     * @param {object} args - the block arguments.
     * @property {number} TARGET - the name of target list.
     */

    writevaliavle (args, util, info) { // オペコードはオペレーションコードで命令 argsは引数上で定義してる変数の中身をもってこれる
        console.log(args)
        this.listName4setItems = args.TARGET;
        let brachToJump = 1;

        if(this.loopFlag4Writevaliavle){
            util.startBranch(brachToJump,this.loopFlag4Writevaliavle);
        }else{
            this.listName4setItems = null;
        }
        this.loopFlag4Writevaliavle = !this.loopFlag4Writevaliavle;

    }

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

    addValue2List(args,perikan,kawauso) {
        console.log(args,perikan.arguments,kawauso);
        if (this.listName4setItems !== null) {
            this.setValue(this.listName4setItems, Variable.LIST_TYPE, args.TEXT, perikan);
        }
       }


    /**
     * return menu of list names.
     * @return {Array} - names of lists.
     */
    makePattern(args, util){
        console.log(args)
        this.listName4makePattern = args.TARGET;
        const variable = util.target.lookupVariableByNameAndType(this.listName4makePattern, Variable.LIST_TYPE);
        let brachToJump = 1;

        if(this.loopFlag4MakePattern){
            variable.value = new Array();
            this.list4generate = new Array();
            util.startBranch(brachToJump,this.loopFlag4MakePattern);
        }else{
            console.log(this.list4generate)

            // ObjectをArray型にキャストするためのメソッド
            Object.prototype._2array = function(){
                if(Array.isArray(this.valueOf())){
                    return this.valueOf()
                }else{
                    return [this.valueOf()]
                }
            }
            //２次元配列を引数にとり、配列の全組み合わせを出力する
            Array.prototype.getallcombinationarray = function(){
                const _array = Object.assign([],this.valueOf())
                const tmpCombinationArray = new Array()
                if(_array.length >= 2){
                    _array[0].forEach(element0 => {
                        _array[1].forEach(element1 => {
                            element0 = element0._2array()
                            element1 = element1._2array()
                            tmpCombinationArray.push(element0.concat(element1))
                        })
                    })
                    _array.shift()
                    _array.shift()
                    _array.unshift(tmpCombinationArray)
                    return _array.getallcombinationarray()
                }else{
                    return _array[0]
                }
            }

            let temp = new Array();
            this.list4generate.forEach(function(listName){
                temp.push(util.target.lookupVariableByNameAndType(listName,Variable.LIST_TYPE).value);
            });
            temp = temp.getallcombinationarray();
            console.log(temp);
            if(this.list4generate.length >= 2){
                temp.forEach(function(item){
                    console.log(item);
                    variable.value.push(item.join(' '));
                });
            }
            variable._monitorUpToDate = false;
            this.listName4makePattern = null;
        }
        this.loopFlag4MakePattern = !this.loopFlag4MakePattern;

    }

    nominateItem(args,util,ob){
        console.log(args,util,ob)
        args._monitorUpToDate = false;
        if(this.listName4makePattern != null){
            this.list4generate.push(args.TARGET);
        }
        console.log(args.TARGET);

    }

    /**
     * return menu of list names.
     * @return {Array} - names of lists.
     */
    makeListsMenu() {
        const type = Variable.LIST_TYPE;
        let list = this.runtime.getTargetForStage().getAllVariableNamesInScopeByType(Variable.LIST_TYPE);
        console.log(list)
        if(list.length == 0){
            return [""];
        }
        let obj_list = new Array();
        for(let name of list){
            /*
            let variable = this.runtime.getTargetForStage().lookupVariableByNameAndType(name,Variable.LIST_TYPE);
            variable.text = variable.name;
            obj_list.push(variable);
             */
            obj_list.push(name)
        }
        console.log(obj_list)
        return obj_list;
    }

    /**
     * return menu of variable names.
     * @return {Array} - names of variable.
     */
    makeVariablesMenu() {
        const type = Variable.SCALAR_TYPE;
        const list = this.runtime.getTargetForStage().getAllVariableNamesInScopeByType(Variable.SCALAR_TYPE);
        if(list.length == 0){
            list.push("変数なし");
        }
        return list;
    }

    evalution2valu(args) {
        this.evalvalue = Number(this.evalvalue) + Number(args.eval);
    }
    evalution2show() {
        alert(this.evalvalue);
    }

    // https://qiita.com/higuma/items/5af4e62bdf4df42ce673


    thislist () {

        this.list = ['父', 'と', '私'].permutation();
        console.log(this.list);
    }
}


module.exports = Scratch3NewBlocks;
