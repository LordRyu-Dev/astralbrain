const app = Vue.createApp({
  data: () => ({
    newText: '', //内容入力欄
    newName: '', //名前入力欄
    responses: [], //投稿格納
    names: [], //名前格納

  }),
  methods: {
    cookiesGet: function (event) {
      //cookie取得
      if ($cookies.isKey('responses')) this.responses = JSON.parse($cookies.get('responses')); //書き込み
      if($cookies.isKey('names')) this.names = JSON.parse($cookies.get('names')); //名前
    },
    cookiesSet: function (event) {
      //cookie代入
      $cookies.config(60 * 60 * 24 * 30,''); //cookie設定
      $cookies.set('responses', JSON.stringify(this.responses)); //書き込み
      $cookies.set('names', JSON.stringify(this.names)); //名前
    },
    addResponse: function (event) {
      //console.log('Clicked!');
      if(this.newText === '' || this.newName === '') return //テキストと名前のどちらかが空欄になっていたら処理を中断する
      let response = {
        //入力したテキストをレスポンスオブジェクトに変換する
        text: this.newText,
        name: this.newName,
        check: false // 太字にする
      };
      this.responses.push(response); // 代入
      if (!this.names.includes(this.newName)) this.names.push(this.newName); //名前が既存のものと重複してなければ代入
      this.cookiesSet(); //cookie代入
      this.newText = ''; // 再び入力欄を空欄に
      this.newName = ''; // 同上
    },
    deleteResponse: function (index) {
      // console.log('Delete!');
      // console.log(index);
      this.responses.splice(index, 1); //indexの位置から1つ投稿を削除
      this.cookiesSet();//cookie代入
    },
    deleteName: function (index) {
      this.names.splice(index, 1); //indexの位置から1つ名前を削除
      this.cookiesSet();//cookie代入
    },
    reset: function (event) {
      //投稿を全削除する
      if (window.confirm("本当に投稿をリセットしますか？")) {
        this.responses.splice(0); //削除処理
        this.cookiesSet(); //cookie代入
      }
    }
  },
  mounted() {
    window.onload = () => {
      //アクセスされた時に実行
      $cookies.config('30d') //cookie設定
      this.cookiesGet();
    }
  },
})
app.mount('#app')
