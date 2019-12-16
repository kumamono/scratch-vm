const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const VariableUtil = require('../../util/variable-util')
const log = require('../../util/log');
const Variable = require('../../engine/variable')
var valutype = [];
var valunakami = [];
var listnakami = [];
var valiableslist = [];
var idlist = [];
var selectlist = [];
var nameresult = [];
//hash形式のブロックicon
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==';
//hash形式のメニューicon
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==';
//class指定（ちょっとわからないから聞いてみる）
class Scratch3NewBlocks {　　//とりあえず初期化してる
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
            id: 'newblocks',//guiで設定するextention id
            name: 'New Blocks',//拡張機能の名前（自由命名）
            menuIconURI: menuIconURI,//上で定義したiconを呼び出す
            blockIconURI: blockIconURI,//上で定義したアイコンを呼び出す
            blocks: [
                {
                    opcode: 'writeLog',//保存時にjsonに書き込まれる:既存のものと被らなければ基本的にok
                    blockType: BlockType.COMMAND,//ぶろっくのタイプ（詳しくは公式参照）ブロックの形とかを定義するこれはスタックブロックと呼ばれ上下につながる
                  //  //blockType: BlockType.BOOLEAN,   //条件：状態を意味する六角形のやつ
                    //blockType: BlockType.HAT,     //上に何も置けない開始のブロック
                    //blockType: BlockType.LOOP,   //C型ブロック　繰り返しなど中に何かを入れて動かす
                    //blockType: BlockType.REPORTER,   // 値を保持するブロック（中に変数として数字や文字列が入る）
                    text: 'リスト:[test2]に中身を代入する',// ブロックの名前。[と]の間に英数字を入れると引数になる。って書いたあったけどよくわからんので聞いてみ
                    arguments: {
                      test2:{
                        type: ArgumentType.STRING,
                        menu: 'dMenu',
                  //    },
                }
              }
            },
              　 {
                    opcode: 'Looptext',
                    blockType: BlockType.COMMAND,
                      text: '[TEXT]',
                      arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "    ",
                        }
                    }
                },
                {
                    opcode: 'writelist',
                    blockType: BlockType.COMMAND,
                    text: '[test2]に中身を代入する',
                    arguments: {
                      test2:{
                        type: ArgumentType.STRING,
                        menu: 'dMenu',
                      }
                    }
                },
              //  {
              //      opcode: 'getBrowser',
              //      blockType: BlockType.REPORTER,
              //      text: '値HOGE',
              //      arguments: {
              //        test:{
              //          type: ArgumentType.STRING,
              //          defaultValue: "0",
              //        }
              //      }
              //  },
                {
                  opcode: 'randfruit',
                  blockType: BlockType.REPORTER,
                  text: 'ランダムな果物',
                },
              //  {
              //    opcode: 'menutest',
              //    blockType: BlockType.REPORTER,
              //    text: 'menutest',
              //  },
            ],
            menus: {
              dMenu: {
                items: 'menulistvaliables',
              }
            }
        };
    }

    /**
     * Write log.
     * @param {object} args - the block arguments.
     * @property {number} TEXT - the text.
     */
    writeLog (args) {　　　//オペコードはオペレーションコードで命令　argsは引数　上で定義してる変数の中身をもってこれる
      　　                 //引数　tostringは文字列にtoNumberは数値に
      valutype = "value"
      var valiableslist = [];
      var variables = this.runtime.targets[0].variables;
      Object.keys(variables).forEach(function (key){
        valiableslist.push(variables[key].name);
      }
    );
    var idlist = [];
    var ids = this.runtime.targets[0].variables;
    Object.keys(ids).forEach(function (key){
      idlist.push(variables[key].id);
    }
  );
     nameresult = valiableslist.indexOf(args.test2)
     selectlist = idlist.splice(args.nameresult)
     var resultName2 = this.runtime.targets[0].variables[selectlist[nameresult]]
     var resultName3 = this.runtime.targets[0].variables[selectlist[nameresult]].value;
      //console.log(idlist);
     console.log(resultName2)
     console.log(resultName3)
     return nameresult
     return selectlist
    }

    /**
     * Get the browser.
     * @return {number} - the user agent.
     */
    getBrowser (args) {
        //const text = Cast.toNumber(1);
        ///let　定数
        ///const 変数
        //return text;　//true false で真偽を返す
    }
    writelist(args){
      valutype = "value"
      var valiableslist = [];
      var variables = this.runtime.targets[0].variables;
      Object.keys(variables).forEach(function (key){
        valiableslist.push(variables[key].name);
      }
    );
    var idlist = [];
    var ids = this.runtime.targets[0].variables;
    Object.keys(ids).forEach(function (key){
      idlist.push(variables[key].id);
    }
  );
     nameresult = valiableslist.indexOf(args.test2)
     selectlist = idlist.splice(args.nameresult)
     var resultName2 = this.runtime.targets[0].variables[selectlist[nameresult]]
     var resultName3 = this.runtime.targets[0].variables[selectlist[nameresult]].value;
      //console.log(idlist);
     console.log(resultName2)
     console.log(resultName3)
     return nameresult
     return selectlist
    }
    randfruit (){
      const fruits = ["パイナップル","バナナ","イチゴ","リンゴ","サクランボ","ブドウ","スイカ","みかん"];
      const fruit = fruits[Math.floor(Math.random() * fruits.length)];
      return fruit;
    }
    randfruit2vaule (){
        return fruit;
    }
    Looptext (args){
      var ifubunki = "list"
      if (ifubunki == "value") {
        valunakami = Cast.toString(args.TEXT)
        this.runtime.targets[0].variables[selectlist[nameresult]][valutype] = valunakami
      }
        else if (ifubunki == "list") {
        valunakami.push(args.TEXT)
        this.runtime.targets[0].variables[selectlist[nameresult]][valutype] = valunakami
  }
  else {
 x = 1
 }
 return valunakami
}

    /**[    *menulistvaliables () {
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
    menulistvaliables () {
      var valiableslist = [];
      const variables = this.runtime.targets[0].variables;
      Object.keys(variables).forEach(function (key){
        valiableslist.push(variables[key].name);
      }
    );
    //console.log(valiableslist);
    return valiableslist
    }

  //  menutest (){
  //    const namelist = [];
  //    const names = this.runtime.targets[0].variables;
  //    Object.keys(names).forEach(function (key){
  //      namelist.push(names[key].name)
  //    }
  //   );
      //const valiableslist = [];
      ///const variables = this.runtime.targets[0].variables;
      //Object.keys(variables).forEach(function (key){
      //valiableslist.push(variables[key].id);

        //これをフィルターして
        //そのキーの位置の特定の処理を行う
      //}
    //);
    //var items = namelist;
    //var result = items.indexOf('test2',0);
//    console.log(valiableslist);
///    console.log(namelist);
//    console.log(argus.test2);
  //  }
}


module.exports = Scratch3NewBlocks;
