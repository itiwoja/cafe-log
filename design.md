# カフェ日記 — デザイン方針（Material Design 3 / 麺帳と統一）

## 路線：Material Design 3（麺帳とシステム統一・シードで差別化）
カフェ記録アプリ。**コーヒー/モカ系の暖色シード**（麺帳=ラーメンの橙より茶色寄り・クリーミー）。
M3で麺帳とUIシステムを揃えつつ、配色でカフェらしさ（ラテ/モカ＋ほんのり可愛い差し色）を出す。
anti-ai-design 常時併用（素のAndroid量産感を避ける）。font-selection 準拠。
※機能・データ（localStorage `cafeLog.v1` ＋ 写真IndexedDB `cafechoDB`/`photos`）・全ページ（index/stats/trophy/wiki）・PWAは維持。**見た目をM3へ刷新**。

## カラー（M3 26ロール／6グループ・モカ系シード）
M3ロール構造で light/dark を定義（最小3:1ペア・指定ペアのみ使用・AA確認必須）。
**Light（目安・要AA確認/調整）**
- primary `#7E5539`（モカ）/ on-primary `#FFFFFF` / primary-container `#FFDCC2` / on-primary-container `#2D1600`
- secondary `#9C4458`（ダスティローズ＝可愛い差し色）/ on-secondary `#FFFFFF` / secondary-container `#FFD9DF` / on-secondary-container `#3E0017`
- tertiary `#6B5D2F`（オリーブ）/ tertiary-container `#F4E3A6` / on-tertiary-container `#211B00`
- error `#BA1A1A` / error-container `#FFDAD6` / on-error-container `#410002`
- surface `#FFF8F4`（ラテ）/ surface-container-lowest `#FFFFFF` / -low `#FCF0E8` / -default `#F7EAE0` / -high `#F1E4DA` / -highest `#EBDED4`
- on-surface `#221A14` / on-surface-variant `#51453B` / outline `#847469` / outline-variant `#D6C3B6`
**Dark**
- primary `#F3B98C` / on-primary `#48280F` / primary-container `#623E23` / on-primary-container `#FFDCC2`
- secondary `#FFB2BF` / surface `#19120D` / surface-container `#261D17` / -high `#312720` / on-surface `#EFE0D6` / on-surface-variant `#D6C3B6` / outline `#9F8C80` / error `#FFB4AB`
> 麺帳(橙)より**茶色・クリーム寄り**で差別化。ローズの差し色で「可愛い」をほんのり。純黒/純白の塗りなし。`prefers-color-scheme`両対応・全ペアAA(本文4.5:1/大文字・非テキスト3:1)。

## タイポグラフィ（麺帳と統一：M PLUS 2 ／ font-selection）
- 全体 **M PLUS 2**（Webフォント・麺帳と統一・軽量モダン）。ウェイト **400/500/700/800**（500=中字, 700=太字, 800=ワードマーク）。`display=swap`・preconnect・自動サブセット。
- M3 type scale（sp→rem=sp/16）。本文 Body Large(16px)。見出しは800で強調。
> ※現行の Zen Maru Gothic / Klee One は統一のため M PLUS 2 に置換（可愛い手書きアクセントを少し残したい場合は Klee One を見出し限定で併用可）。

## シェイプ / エレベーション / モーション（M3・麺帳と同じ）
- 角丸: カード Medium12〜Large16／ボタン Full／チップ Small8〜Full／FAB Large16／ボトムシート・ダイアログ Extra-large28(上端)／テキストフィールド Extra-small4。
- elevation: 影でなく surface-container のトーン差で高さ（level0〜5・FAB level3・hover+1）。
- motion: easing Standard `cubic-bezier(0.2,0,0,1)`／Emphasized decelerate `cubic-bezier(0.05,0.7,0.1,1)`。duration 選択200/シート400/全画面500ms。state layer hover8/focus10/pressed10%。**ボトムシートはovershoot無し**（下空白の既知不具合回避）。

## コンポーネント（M3パターン）
- Top app bar（カフェ日記＋検索/設定）／**Extended FAB「＋記録する」**／Filter chips（種類・タグ）／filled 検索／記録カード（写真＋メニュー＋店＋★＋価格＋日付＋タグ）／**Bottom sheet詳細（Extra-large28・overshoot無し）**／filled フォーム／Snackbar。
- 既存の 2段階スワイプ削除・写真ビューア・実績(trophy)・統計(stats)・wiki も同M3トークンで再スキン。

## 維持（不変・厳守）
- データ: `cafeLog.v1`＋写真IndexedDB（`cafechoDB`/`photos`）・migrate・全フィールド不変。**既存記録・写真がそのまま表示**。
- 機能: 一覧/検索/フィルタ/記録の追加・編集・削除/写真/バックアップ/設定/実績/統計/wiki/PWA(SW)。
- 用語はカフェ仕様（「麺」残骸を出さない＝過去に修正済みを踏襲）。`lang="ja"`。
- overscroll白対策（html背景=surface一致）・文字選択無効（入力欄除く）・背景スクロールロック。

## 出力前チェック
- [ ] M3ロールで配色・全ペアAA・light/dark両対応（純黒/純白なし）・麺帳と差別化された茶/クリーム
- [ ] M PLUS 2(400/500/700/800・swap・preconnect)・M3 type scale・角丸/トーン面色elevation/motion
- [ ] FAB/AppBar/Chips/Card/BottomSheet/TextField が M3
- [ ] 既存データ(cafeLog.v1＋写真)読込OK・全機能/全ページ動作
- [ ] シートovershoot無し・量産感回避(anti-ai)・カフェ用語(麺残骸なし)
