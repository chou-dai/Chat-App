# Chat App
表題のみのチャットアプリ。
表題をクリックすると展開され内容を確認できる。<br/>
https://irace-chat-dev.web.app/

【課題】団体運営においてメッセージの文字数が多いと読む気の低下や、読まない人が出てくる<br/>
【目的】伝えたい内容を端的に伝えることのできるチャットアプリを開発する<br/>
【概要】メッセージの表題をチャットで表示し、クリックすると展開され内容が表示される
<img width="1066" alt="image" src="https://github.com/idea-race/Chat-App/assets/154674924/a90385ae-4fd0-4cd8-a8f8-165e07bd169f">


## Setup
- `./firebase`ディレクトリの`.firebaserc.sample`をコピーして`.firebaserc`を作成、プロジェクト名を記入
- `./react`ディレクトリの`.firebaserc.sample`をコピーして`.firebaserc`を作成、プロジェクト名を記入
- `./react`ディレクトリの`.env.sample`をコピーして`.env`を作成、環境変数を定義
- Docker Compose をビルド
    ```
    docker compose build
    ```
- GCPへログイン：以下コマンドを実行し、Googleアカウントでログイン
    ```
    docker compose run --rm firebase firebase login --no-localhost
    ```
- Firebase EmulatorサーバーとReactサーバーの立ち上げ
    ```
    docker compose up
    ```
- Firebase EmulatorのFirestoreに`rooms`を登録
    - Collection IDが`rooms`のコレクションを作成（自動精製された乱数がroomIdになる）
- 動作確認
    - Firebase Emulator：http://localhost:4000
    - React：http://localhost:3000

## Setup（プロジェクト管理者）
- Firebaseのプロジェクト作成
    - Fireabase Authentication
    - Firestore
    - Hosing
    - storage 
- GitHub Actionsの環境変数を設定


## Tips
- React Formatter
    ```
    cd react
    npm run format
    prettier --write 'src/**/*.{js,jsx,ts,tsx}'
    ```
