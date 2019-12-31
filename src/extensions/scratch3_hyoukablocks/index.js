const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const uid = require('../../util/uid');
const VariableUtil = require('../../util/variable-util');
const log = require('../../util/log');
const Variable = require('../../engine/variable');
const Scratch3DataBlocks = require('../../blocks/scratch3_data');
const Blocks = require('../../engine/blocks');
// hash形式のブロックicon
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS4yNjEzNiIgaGVpZ2h0PSI0MCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNC4wNTkwMiwtMTM5LjkzNzQ5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjA1LjA1OTAyLDE3OC45Mzc0OXYtMzhoMzcuMjYxMzZ2Mzh6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMGZmYzciIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMy41MzIwMywxNjYuOTM3NDgpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7mloc8L3RzcGFuPjwvdGV4dD48L2c+PC9nPjwvc3ZnPg==';

// hash形式のメニューicon

const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS4yNjEzNiIgaGVpZ2h0PSI0MCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNC4wNTkwMiwtMTM5LjkzNzQ5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjA1LjA1OTAyLDE3OC45Mzc0OXYtMzhoMzcuMjYxMzZ2Mzh6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMGZmYzciIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMy41MzIwMywxNjYuOTM3NDgpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7mloc8L3RzcGFuPjwvdGV4dD48L2c+PC9nPjwvc3ZnPg==';

// これでスプライトisとれる console.log(this.runtime.getSpriteTargetByName("スプライト1"));
// class指定（ちょっとわからないから聞いてみる）
class Scratch3NewBlocks { // とりあえず初期化してる
    constructor(runtime) { // ここからここまであったほうが良い
        this.runtime = runtime; // ランタイム初期化
        this.evalvalue = 1;
        this.listName4setItems = null;  //writevaliavle関数内でアイテムを追加するリスト
        this.listName4makePattern = null;  //writevaliavle関数内でアイテムを追加するリスト
        this.listName4makeAllPattern = null;  //writevaliavle関数内でアイテムを追加するリスト
        this.list4generate = new Array();
        this.list4allGenerate = new Array();
        this.lists = [];
        this.loopFlag4Writevaliavle = true; //
        this.loopFlag4MakePattern = true; //
        this.loopFlag4MakeAllPattern = true; //
        (function() {
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

            Array.prototype.permutation = function(n) {
                if (n == null) n = this.length;
                var perm = [];
                generatePermutation(perm, [], this, n);
                return perm;
            };
        })();
        this.datablock = new Scratch3DataBlocks(this.runtime);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'hyoukablocks', // guiで設定するextention id
            color1: '#c2c93a',
            name: 'hyouka Blocks', // 拡張機能の名前（自由命名）
            menuIconURI: menuIconURI, // 上で定義したiconを呼び出す
            blockIconURI: blockIconURI, // 上で定義したアイコンを呼び出す
            blocks: [
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
        if(args.LIST.id){
            this.listName4setItems = args.LIST.name;
        }else{
            this.listName4setItems = util.target.lookupVariableById(args.LIST.name).name;
        }
        let brachToJump = 1;

        if(this.loopFlag4Writevaliavle){
            console.log(args)
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
     * 渡されたリストの順番を維持した全組み合わせリストを作る
     * @return {Array} - names of lists.
     */
    generateCombinationAllay(targetArray,util){
        console.log(targetArray)
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
        targetArray.forEach(function(listName){
            temp.push(util.target.lookupVariableById(listName).value);
        });
        temp = temp.getallcombinationarray();
        return temp;
    }

    /**
     * return menu of list names.
     * @return {Array} - names of lists.
     */
    makePattern(args, util){
        this.listName4makePattern = args.LIST.id || args.LIST.name;
        const variable = util.target.lookupVariableById(this.listName4makePattern);
        let brachToJump = 1;
        if(!variable){
            return;
        }

        if(this.loopFlag4MakePattern){
            console.log(args)
            variable.value = new Array();
            this.list4generate = new Array();
            util.startBranch(brachToJump,this.loopFlag4MakePattern);
        }else{
            temp = this.generateCombinationAllay(this.list4generate,util);
            if(this.list4generate.length >= 2){
                temp.forEach(function(item){
                    variable.value.push(item.join(' '));
                });
            }
            variable._monitorUpToDate = false;
            this.listName4makePattern = null;
        }
        this.loopFlag4MakePattern = !this.loopFlag4MakePattern;

    }

    /**
     * return menu of list names.
     * @return {Array} - names of lists.
     */
    makeAllPattern(args, util){
        this.listName4makeAllPattern = args.LIST.id || args.LIST.name;
        const variable = util.target.lookupVariableById(this.listName4makeAllPattern);
        let brachToJump = 1;
        if(!variable){
            return;
        }

        if(this.loopFlag4MakeAllPattern){
            console.log(args)
            variable.value = new Array();
            this.list4generate = new Array();
            util.startBranch(brachToJump,this.loopFlag4MakeAllPattern);
        }else{
            allPatternOfListId = this.list4generate.permutation()
            for(aPttern of allPatternOfListId){
                temp = this.generateCombinationAllay(aPttern,util);
                if(this.list4generate.length >= 2){
                    temp.forEach(function(item){
                        variable.value.push(item.join(' '));
                    });
                }
            }
            variable._monitorUpToDate = false;
            this.listName4makeAllPattern = null;
        }
        this.loopFlag4MakeAllPattern = !this.loopFlag4MakeAllPattern;

    }

    nominateItem(args,util,ob){
        console.log(args,util,ob)
        if(this.listName4makePattern != null || this.listName4makeAllPattern != null){
            this.list4generate.push(args.LIST.id || args.LIST.name);
        }
        args.LIST._monitorUpToDate=false;
    }

    /**
     * return menu of list names.
     * @return {Array} - names of lists.
     */
    makeListsMenu() {
        const type = Variable.LIST_TYPE;
        let list = this.runtime.getEditingTarget().getAllVariableNamesInScopeByType(Variable.LIST_TYPE);
        console.log(list)
        if(list.length == 0){
            return [""];
        }
        let obj_list = new Array();
        for(let name of list){
            let variable = this.runtime.getEditingTarget().lookupVariableByNameAndType(name,Variable.LIST_TYPE);
            let item = new Object();
            item.text = variable.name;
            item.value = variable.id;
            //item.id = variable.id;
            obj_list.push(item);
            //obj_list.push(name)
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
