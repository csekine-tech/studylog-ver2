# Study Log の概要

[StudyLog](https://csworks.tech/)<br/>
主な使用技術は、バックエンド:<b>PHP/Laravel</b>, フロントエンド:<b>JavaScript/React/Next</b>,開発環境は<b>Docker</b>,本番環境は<b>AWS(EC2,S3,RDS など)</b>です。Laravel は API として使用しました。

## 制作者について

メインでは塾講師をやっています。副業で Web 制作をやりつつ、アプリケーション開発を独学で勉強しています。

## 制作した経緯

生徒が効率よく勉強していけるよう、<b>問題集の進捗を管理するための学習管理アプリ</b>を制作しました。

生徒「先生、どうすれば数学で高得点が取れますか？」<br/>
私「青チャートを完璧にこなしてください」<br/>
生徒「ええ、、、どうやって、、、？」<br/>

ちょっと無責任すぎたかもしれません。そこで次。<br/>

私「青チャートをめくって適当に開いたページの解法が頭に浮かぶようになるまで勉強してください」<br/>
生徒「、、、」<br/>

<b>具体的な行動</b>に落とし込めていないのでまだ無責任な気がします。<br/>

そこで次のやり方を提案しました。<br/>

1. <b>まずは一度解いてみましょう</b>
1. <b>評価と解いた日付をメモしてください。</b>

   | 出来                                               | 評価 |
   | -------------------------------------------------- | ---- |
   | 全然解けなかった。何も思いつかなかった。           | 1    |
   | 途中まで解けたが最後まで辿り着かなかった。         | 2    |
   | 解けたが時間がかかった。もっといい解き方があった。 | 3    |
   | 完璧！もう二度と解かなくて OK                      | 4    |

1. <b>復習の日付を下表にならってスケジュールしてください。</b>

   | 評価 | 次に解く日（一例です） |
   | ---- | ---------------------- |
   | 1    | 3 日後                 |
   | 2    | 10 日後                |
   | 3    | 20 日後                |
   | 4    | なし                   |

1. <b>1〜3 を繰り返して、全ての問題を完璧にしよう！</b>

そしてこれを表にして提出してもらいます。
ただこの管理が<b>なかなか面倒</b>なのです。<br>
そこで本アプリを制作しました！
自動化できれば生徒が<b>さらに学習に集中できるんじゃないか？</b>という想いからです。

## Study Log ができること

### 画面構成

#### 未ログインページ

集中力の上がる＆信頼度の高まる青を基調とした落ち着いたデザインにしました。

<img width="1512" alt="guest" src="https://user-images.githubusercontent.com/87169706/197311159-1f9ac3dc-2af6-4a33-9dd0-d0c19b01dd2f.png">

#### ログインページ

Google ログインもできます。是非ログインしてみてください！
<img width="1512" alt="スクリーンショット 2022-10-22 11 06 57" src="https://user-images.githubusercontent.com/87169706/197313495-0ea449b9-0e03-4331-b17c-2f0602393d8a.png">

#### ホーム画面

ダッシュボード形式で、必要な情報にすぐにアクセスすることができます。<br/>
あと何問マスターしていない問題があるのか、「学習の成果」から一目で確認できます。
<img width="1512" alt="home" src="https://user-images.githubusercontent.com/87169706/197311165-2016d65d-992f-499f-bc1b-e431f2953edc.png">

#### 教材一覧

<img width="1512" alt="wb" src="https://user-images.githubusercontent.com/87169706/197311166-719d4037-d18a-4e95-a29f-6b3ae26da73b.png">

#### 教材登録

<img width="1512" alt="wbreg" src="https://user-images.githubusercontent.com/87169706/197311160-094bdc4f-9f9e-44aa-a39c-315d95f3e65e.png">

#### Google カレンダーに似たカレンダービューでタスクを可視化

<img width="1512" alt="cal" src="https://user-images.githubusercontent.com/87169706/197311164-273080e8-6ca6-4b7c-85c8-db009dbbd426.png">

#### 教材ごとの最新予定をチェック

<img width="1512" alt="plan" src="https://user-images.githubusercontent.com/87169706/197311167-cbb6e1fa-6d90-4a1b-8184-51efd3a5f0e7.png">

#### 満点評価の問題にはチェックがつく

全ての問題にチェックがつく状態を目指していきます！

<img width="1512" alt="plan2" src="https://user-images.githubusercontent.com/87169706/197311162-48404f70-9b2e-45de-a5b9-2cdadb029a05.png">

#### タスクをまとめて入力する

お休みする曜日を設定できるのがイチオシポイントです。

<img width="1512" alt="bulkmodal" src="https://user-images.githubusercontent.com/87169706/197311161-818bfb19-42d6-4b04-a786-c93e62905858.png">

#### タスクを一覧で表示する

科目毎に色分けされているのでカラフルなタスク一覧になっています。

<img width="1512" alt="task" src="https://user-images.githubusercontent.com/87169706/197311168-0d3d70d0-6b0a-4882-b5d2-59b0ba4a4800.png">

### 動作例

#### タスクを評価する

評価後タスクカードが非表示となり、トーストが表示されます。
満点評価の時は褒められてやる気アップ！
![ver2_rate](https://user-images.githubusercontent.com/87169706/197311033-da37ff1e-23a8-4b00-ba13-faf72ee34fa0.gif)

#### 教材を登録する

教材の構成を章立て/通し番号から選べます。
![ver2_wbregister](https://user-images.githubusercontent.com/87169706/197311045-97ede23a-a245-4cfc-b277-daa3335ff158.gif)

#### タスクの予定日を個別で編集/まとめて登録

動作完了後にトーストが表示されます。
![ver2_wb](https://user-images.githubusercontent.com/87169706/197311042-198527a3-9a23-4a32-b5e5-2893a4960179.gif)

#### カレンダービュー

サイドバーには今日のタスクが表示され、ワンタッチで評価登録できます。
カレンダーの日付欄をクリックすると、新しいタスクを登録することができます。
![ver2_cal](https://user-images.githubusercontent.com/87169706/197311058-e4929f9e-7fdb-4499-9584-bf27d6f58eb2.gif)

#### タスクを評価する

![ver2_task](https://user-images.githubusercontent.com/87169706/197311051-784486d5-d55f-4e47-bc45-53f704f3e3bf.gif)

# 技術について

## デザイン

- XD
- Photoshop

XD でモックを作成しました。
画面遷移先やコンポーネント、使用するメソッドなどを細かく決めておくと開発がかなり楽でした。

## DB 設計

小規模アプリのため厳密な正規化はしませんでした。
扱いやすいですが、機能拡張などを考えると正規化した方が良いのだと思います。

## フロントエンド

- JavaScript
- React
- Next.js
- axios
- Bootstrap
- SCSS
- FullCalendar

HTML と CSS はゴリゴリ書きました。
レスポンシブに Bootstrap を使っています。
React 関連では、<b>useState,useEffect,useReducer,useContext,カスタムフック等</b>を使用しました。
認証には[Laravel Breeze - Next.js Edition](https://github.com/laravel/breeze-next)を使用しました。
API 通信に axios を使用しました。カスタムフックにまとめています。<br>
また、カレンダーを実装したく、第一弾ポートフォリオに引き続き、FullCalendar を使用しました。Google カレンダーに似ていてかなり便利！

トーストを自力で作るのは地味に骨の折れる作業でした、、、（ちょうどいいライブラリがなかった）
これには Reducer を使いました。

## バックエンド

- Laravel,sanctum
- MySQL
- OAuth
- Socialite
- MailHog

Laravel は API として使用しました。<br/>
開発過程で Postman を使用しました。<br/>
Controller はまだまだリファクタリングできる気がするので今後の課題です。<br/>
Google の API を用いて Google の登録情報でログインできるようにしています。<br/>
パスワードを忘れた際にメール送信機能を使用します。

## インフラ/その他

- AWS(EC2, S3, SES, VPC, RDS, Route 53, Certificate Manager 等)
- nginx
- Docker
- Github

nginx に 80 番で接続して、フロントを 3000 番、バックエンドを 9000 番に振り分けました。(CORS 防止)<br/>
一旦バックエンド URL にフロントからアクセスする際、URL に/backend をつけ、nginx 側で外して Laravel に送り込む方法でアクセスしています。

# 勉強方法

触りは Udemy で勉強しました。本はざっくり読んで、辞書的に使用しています。

## Laravel

- 公式
- [Udemy](https://www.udemy.com/course/laravel-multi-ec/learn/lecture/26255676?start=0#content)
- [PHP フレームワーク Laravel 入門](https://www.amazon.co.jp/PHP%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AFLaravel%E5%85%A5%E9%96%80-%E7%AC%AC2%E7%89%88-%E6%8E%8C%E7%94%B0-%E6%B4%A5%E8%80%B6%E4%B9%83/dp/4798060992/ref=sr_1_1_sspa?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=3GARNTSVC20PN&keywords=laravel&qid=1659245327&sprefix=laravel%2Caps%2C200&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFMME1TWEFTQzlIMDMmZW5jcnlwdGVkSWQ9QTA4MzkwOTQxWkRWTTAyVEo2V01OJmVuY3J5cHRlZEFkSWQ9QTNIVjdNMEVMTFNYOEomd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl)
- [プロフェッショナル Web プログラミング Laravel〈最新 Laravel 9 対応〉](https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%ABWeb%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0-Laravel%E3%80%88%E6%9C%80%E6%96%B0Laravel-9%E5%AF%BE%E5%BF%9C%E3%80%89-%E4%B9%85%E4%BF%9D%E7%94%B0-%E8%B3%A2%E4%BA%8C%E6%9C%97/dp/4295202835/ref=sr_1_4_sspa?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=3GARNTSVC20PN&keywords=laravel&qid=1659245327&sprefix=laravel%2Caps%2C200&sr=8-4-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFMME1TWEFTQzlIMDMmZW5jcnlwdGVkSWQ9QTA4MzkwOTQxWkRWTTAyVEo2V01OJmVuY3J5cHRlZEFkSWQ9QTM4MU42VUIzM0JJRk0md2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl)
- [PHP フレームワーク Laravel Web アプリケーション開発 バージョン 8.x 対応](https://www.amazon.co.jp/PHP%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AFLaravel-Web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E9%96%8B%E7%99%BA-%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B38-x%E5%AF%BE%E5%BF%9C-%E7%AB%B9%E6%BE%A4%E6%9C%89%E8%B2%B4-ebook/dp/B096ZSB658/ref=sr_1_6?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=3GARNTSVC20PN&keywords=laravel&qid=1659245327&sprefix=laravel%2Caps%2C200&sr=8-6)

## React

- 公式
- [React ハンズオンラーニング 第 2 版 ―Web アプリケーション開発のベストプラクティス](https://www.amazon.co.jp/React%E3%83%8F%E3%83%B3%E3%82%BA%E3%82%AA%E3%83%B3%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0-%E7%AC%AC2%E7%89%88-%E2%80%95Web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E9%96%8B%E7%99%BA%E3%81%AE%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9-Alex-Banks/dp/4873119383/ref=sr_1_10?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2P54BXT8LZFI7&keywords=react&qid=1659245464&sprefix=react%2Caps%2C251&sr=8-10)
- [Udemy](https://www.udemy.com/course/react-hooks-101/learn/lecture/29080088?start=0#content)
- [Udemy](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25616892?start=0#content) ← 一番お世話になりました

## Next

- 公式

## DB

- [達人に学ぶ DB 設計 徹底指南書](https://www.amazon.co.jp/%E9%81%94%E4%BA%BA%E3%81%AB%E5%AD%A6%E3%81%B6DB%E8%A8%AD%E8%A8%88-%E5%BE%B9%E5%BA%95%E6%8C%87%E5%8D%97%E6%9B%B8-%E3%83%9F%E3%83%83%E3%82%AF-ebook/dp/B00EE1XPAI/ref=sr_1_3?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=3JY0C0M4N63NU&keywords=DB&qid=1659245600&sprefix=react%2Caps%2C279&sr=8-3)

## 制作期間

<b>一ヶ月半</b>かかりました。
(実は一度アプリを制作して、その後まっさらな状態から作り直しています。それも合わせると 4 ヶ月くらいでしょうか)

# まとめ

今後のために、気をつけたことや反省点をまとめておきます。

## 気をつけたこと

### 単なる CRUD アプリにはしない

実務では今回の比ではない API やコントローラを使用すると考えられます。そのため、CRUD アプリケーションまでしか作成出来ない状態で実務に飛び込むのはかなり無理があると思います。<br/>
また、誰かに与えられた課題ではなく、<b>自分で感じた課題 → アプリケーションで解決する</b>という流れにこそ意味がある考え、本アプリを作成しました。

### 実際の使用を想定する

生徒が実際に使用しているところを想定しながら機能を充実させていきました。特に、教材登録後に一括でタスクを登録できる機能はかなり便利な仕様になったと思います。

### React の機能を活用する

現在主流の書き方である、関数コンポーネントで記述するよう意識して学習しました。useState,useEffect,useContext,useReducer,カスタムフック等も積極的に活用することで、理解も深まりました。

### Laravel の機能を活用する

<b>Model,Controller,Request,Seeder,eloquent</b>を主に使用しました。<br/>
eloquent 特有の書き方などは都度都度調べて、まとめながら使用しました。
エラーの原因を明確にするため、Postman や Laravel のエラーログを活用しました。

## 勉強になったこと

### 設計がいかに重要か

一度アプリを作り直したと書きましたが、これは設計不足が原因です。UI 設計や DB 設計を細かく練っておくことで、場当たり的でなく無駄のない開発ができると実感しました。

### Model の意義を再確認

いわゆる Todo アプリでは DB のリレーションも複雑でないため、Model を活用する機会がありません。今回は多重リレーションの構造だったため Model の意義を改めて確認することができました。

### インフラ周りの理解が深まった

EC2 に 1 から構築していくことで、nginx の理解が深まりました。エラーの際は nginx の設定ファイルを見直したり、ログを確認することで解決していきました。

## 反省と今後の課題

### Next の機能をあまり活用できなかった

今回 Next の機能は pages,useRouter しか使えていないので、次回は SSR の良し悪しを活かして使用します。

### Model と Controller の使い分けに悩んだ

リレーショナルがさらに複雑になると太刀打ちできないような書き方をしてしまっているので、あらためて MVC の棲み分けについて勉強し直します。

### ネットワーク関連の理解が浅い

基本情報技術者試験で学んだ内容以上のことは、今回実践しながら学びました。あらためて体系的に勉強し直します。

### AWS の体系的な学習をする

AWS に関しては調べながら構築＆やり直しを行いました。(無料プランではメモリが足りなかった)<br/>
言語の理解がままならない箇所がまだあるので、こちらは体系的な学習で補いたいと思います。<br/>
また、Lambda や ECS 等を次回は使用していきたいので、そちらも学習していきます。

### 本アプリの機能拡張

以下の機能を追加で実装できそうです。

- Google カレンダー API で連携
- 解き直すまでの日数・科目をユーザー毎に管理する
- 教材データを全ユーザーで共有する
- カレンダーの予定をドラッグ&ドロップで移動できるようにする

まずは最小構成で、徐々に拡大していく方が、不要な機能の追加を防げそうなので、その辺りは生徒に実際に使用してもらい、フィードバックをもらおうと思います。

### その他

- デプロイの自動化
- テストコードを書く

# 最後に

[第一弾自作アプリケーション](https://github.com/csekine-tech/MyConditionAnalysis-withReactHooks)ではフロントのみのアプリケーションだったので、今回はバックエンドやインフラも実践できるようなアプリケーションを作成しました。<br/>
実際に身近な人が抱えている課題を解決することを目的に制作できたことも大きな経験となりました。
