'use stript';
{
  const words = [
    'apple', 
    'sky', 
    'blue', 
    'middle', 
    'set',
  ]
  let word;
  let loc; //いま何文字目か location 場所、位置
  let score;
  let miss;
  const timeLimit = 3 * 1000;
  let startTime;
  let isPlaying = false;


  const target = document.getElementById('target');  //id=target を取得
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');


  function updateTarget() { //updateTarget処理の中身 最初からloc番目までを_で埋める
    let placeholder = '';   //＿を格納していくための変数 空の文字列で初期化
    for (let i = 0; i < loc; i++) {  //0からloc番目まで繰り返す
      placeholder += '_';  //placeholderに＿を連結
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now(); //開始時刻＋制限時間ー現時刻＝残り時間
    timerLabel.textContent = (timeLeft / 1000).toFixed(2); //秒単位、小数点以下２桁

     const timeoutId = setTimeout(() => { //タイマー
      updateTimer();  //10ミリ秒ごとにupdateTimerを実行 === １秒づつ残り時間が減る
    },10);

    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId); //タイマーキャンセル
      timerLabel.textContent ='0.00';
      setTimeout(() => {  //タイマーの不具合修正
        showResult();    // 定義した関数showResult
      },100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {  //結果を表示する処理
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    //条件演算子（ifを簡単に) 条件式 ? trueの処理 : falseの処理
    //割る数が0だと計算できない 
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!` );
  }  //accuracy === 正確さ 

  window.addEventListener('click' , () => {
    if(isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];



    target.textContent = word; //targetのテキストにwordを表示
    startTime = Date.now();
    updateTimer();  //定義した関数updateTimer
  });

  window.addEventListener('keydown' , e => {     //イベント（キー入力）  eという引数
    if(isPlaying !== true) {
      return;
    }
   if (e.key === word[loc]) { //（キー入力loc番目とメインに表示されている文字が同じ
     loc++;
     if (loc === word.length) {
     word = words [Math.floor(Math.random() * words.length)];
      loc = 0;
     }
     updateTarget();  //定義した関数updateTarget  正解した場合に実行
     score++;
     scoreLabel.textContent = score;
    }else{
      miss++;
      missLabel.textContent = miss;
   }

  });
}