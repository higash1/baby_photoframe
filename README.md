# baby_photoframe

## 概要
baby_smile_docker内にて取得された笑顔認識結果を表示することができます。
`/baby_photoframe/web/static/img/photoframe/`内に笑顔認識された画像を保存することでwebアプリケーション上で確認することができます。

※現在heroku停止中のため、リンク先にて結果の確認をすることができません。

## herokuアプリケーションの利用方法
herokuのログイン及び登録を行う。

自身のローカルgitリポジトリを初期化

```sh
cd baby_photoframe
rm -rf .git 
git init
```
リポジトリの登録
```sh
git add .
git commit -m ""
```
herokuとgit間でアプリケーションの連携を行うために新規アプリケーションの作成及びpush
```sh
heroku create -a baby_photoframe
git push heroku main
```

## 使用結果例
![sample](https://github.com/higash1/baby_photoframe/assets/106146319/42763449-a037-4760-8a3a-53a9263f6c46)

### 表示リンク
・[baby_photoframe](https://php-practice-f8f38bfc7710.herokuapp.com/)
