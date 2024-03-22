# React Firebase Template
高速でReactとFirebaseのプロジェクトを開発するためのテンプレート
- Firebase EmulatorとReactの接続（ローカル開発）
- pre-commit時のコードフォーマット（プロジェクトルートでgit commit時）
- Firebase Hostingへの自動デプロイ（GitHub Actions）

## Setup
- `./firebase`ディレクトリと`./react`ディレクトリの`.firebaserc.sample`をコピーして`.firebaserc`を作成、プロジェクト名を記入
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
