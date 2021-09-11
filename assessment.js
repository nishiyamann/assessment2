'use strict';

const userNameInput = document.getElementById('user-name'); // 入力エリアuserNameInputは作った変数
const assessmentButton = document.getElementById('assessment'); // 診断ボタン
const resultDivided = document.getElementById('result-area'); // 結果表示エリア
const tweetDivided = document.getElementById('tweet-area'); // ツイートボタンエリア

// 入力欄でEnterキーを押しても診断できるようにする
userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

// ボタンが押された時の処理 functionの代わりに=>無名関数新方式
assessmentButton.onclick = () => {
  const userName = userNameInput.value; // ユーザーが入力した文字をhtmlから取得value
  if (userName.length === 0){
    //　名前が空(から)の時は処理を終了する
    return; // 処理を中断
  }
    
    // 今ある診断結果を削除する
    // 診断結果表示エリアの子要素をすべて削除する
    removeAllChileren(resultDivided);
    removeAllChileren(tweetDivided);

  console.log(userName);

  // 診断結果表示エリアの作成 htmlにh3タグを無理やり追加で作ったりする
  const header = document.createElement('h3'); // h3タグを新しく作るcreateElementは新しくjs上でタグ（Element）を作成
  header.innerText = '診断結果'; // h3タグにテキストを設定
  resultDivided.appendChild(header); // h3タグを診断結果表示エリアに追加

  const p = document.createElement('p');
  const result = assessment(userName);
  p.innerText = result;
  resultDivided.appendChild(p);
  
    // ツイートエリアの作成
    tweetDivided.innerText = "";

    // ツイートボタンの設置(表示は別)
    const anchor = document.createElement('a');
    // リンク先を作成
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue); // リンク先設定　setAttributeはタグに属性をset設定する
    // widgets.jsがツイートボタンに変換するためのマーカー
    anchor.className = 'twitter-hashtag-button';
    // ツイート本文
    anchor.setAttribute('data-text', result); // data-textはツイートするの自由記入欄
    anchor.innerText = 'Tweet #あなたのいいところ'; // ボタンの表示内容
    tweetDivided.appendChild(anchor); // aタグをHTML上（ツイートエリア）に表示

    const script = document.createElement('script'); // scriptのタグ（Element）を新しく作る。表示とは別
    // 読み込むjsファイル（ツイッターが提供しているwidjets.jsファイルを読込）
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    // scriptタグをHTML上（ツイートエリア）に設置＝表示append
    tweetDivided.appendChild(script);
  }

/**
 * 指定した要素の子要素をすべて削除する関数
 * @param {HTMLElement} element
 */
function removeAllChileren(element){
  // 子要素がある限りループする
  while (element.firstChild){
    //最初の子要素を削除する
    element.removeChild(element.firstChild);
  }
}

const answers = [
'{userName}のいいところはオーラです。{userName}の特徴的なオーラは皆を惹きつけ、心に残ります。',
'{userName}のいいところは速さです。{userName}の素早さは皆の憧れです。',
'{userName}のいいところは腕です。{userName}の特徴的な腕っぷしは皆を惹きつけ、胸に残ります。',
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
]

/**
 * 名前の文字列をパラメータとして渡すと、診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
  
    //{userName} をユーザーの名前に置き換える
    result = result.replaceAll('{userName}',userName);
    return result;
  }

   //診断結果の名前の置き換えが正しいか診断
  console.assert(
    assessment('太郎') ===
      '太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //診断結果の名前が同じなら同じ文になるか診断
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の名前が同じなら同じ文になる処理が正しくありません。'
  );
