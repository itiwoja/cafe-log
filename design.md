# カフェ日記 — デザイン方針（Apple HIG / iOS × 可愛い）

## 路線：iOSデザイン（Apple HIG）をベースに「もっと可愛い」
iOSの作法（Large Title・インセットグループ・SF的システム書体・44pt・ライト/ダーク・マテリアル/blur）に、
**パステル×クリーム＋丸み＋ふんわり影**の可愛さを重ねる。甘すぎず大人可愛い寄り。
apple-hig 準拠＋ anti-ai-design（テンプレ感回避）＋ font-selection。
※機能・データ（localStorage `cafeLog.v1` ＋写真IndexedDB `cafechoDB`/`photos`）・全ページ（index/stats/trophy/wiki）・PWAは維持。**見た目のみ刷新**。

## カラー（iOSセマンティック＋可愛いパステル）
iOSのセマンティック構造（label/secondaryLabel/separator/systemGroupedBackground/elevated）で light/dark を定義。AA必須。
**Light**
- アクセント(tint)＝**ストロベリーミルク系ローズ** `#E8729A`（CTA・選択・リンク・★）。サブ差し色＝ピーチ `#FFB59E` / ミント `#9FD8C2`（少量）。
- 背景(systemGroupedBackground)＝ブラッシュクリーム `#FBF1F1` / カード(elevated)＝`#FFFFFF`。
- label＝ココアブラウン `#3B2E2C`（純黒回避）/ secondaryLabel `#8A7A77` / separator `rgba(60,40,40,.12)`。
**Dark**
- tint `#FF9CB6` / 背景 `#1A1416` / カード `#241B1E` / label `#F2E7E5` / secondaryLabel `#B8A6A3` / separator `rgba(255,235,235,.14)`。
> 純黒/純白の塗りなし。`prefers-color-scheme`両対応・全ペアAA(本文4.5:1/大文字・非テキスト3:1)。tintは可愛いローズで統一感。

## タイポグラフィ（iOS Dynamic Type ＋ 丸ゴシックで可愛く）
- 書体＝**Zen Maru Gothic**（丸ゴシック＝可愛い・高可読、Webフォント・display=swap・preconnect）＋ `-apple-system, system-ui` フォールバック（iOS実機はSF/ヒラギノに近い丸み）。ウェイト 400/500/700/900。
- iOSテキストスタイルを rem 化：Large Title 34/41・Title1 28/34・Title2 22/28・Headline 17/22(Semibold)・**Body 17/22**・Subhead 15/20・Footnote 13/18・Caption 12/16。本文 **17px(1.0625rem)** 基準。
- 「カフェ日記」は **Large Title**（左上・大きめ・太め）。Dynamic Type相当の拡大耐性。

## 形・素材・モーション（iOS×可愛い）
- **角丸を大きめ＆連続的**に（continuous風）：カード/グループ **20〜22**・ボタン/チップ Full(pill)・シート上端 大きめ。可愛さは丸みで出す。
- **ふんわり影**（iOSは控えめだが可愛さで少し柔らかく）：`0 6px 20px rgba(80,40,50,.08)`（純黒なし）。境界はインセットの薄いseparatorも併用。
- **インセットグループ**（iOS定番）でカード/設定/フォームをまとめる。
- マテリアル/blur：ナビバー・シートに軽い `backdrop-filter: blur` （`-webkit-`併記・@supports/reduced-transparencyフォールバック）。
- モーション：iOSらしい spring/ease（**ただしボトムシートは overshoot 無し**＝下空白の既知不具合回避）・reduced-motion対応。
- 可愛い小物：☕/♡ 等の控えめモチーフは**アクセント程度**（絵文字をロゴ化しない＝anti-ai）。やり過ぎない。

## コンポーネント（iOSパターン）
- **Large Title ナビ**（カフェ日記＋検索/設定アイコン、スクロールで縮小は任意）。
- **検索フィールド**（iOS角丸グレー）／**フィルタ**（pillチップ or セグメント、選択=tint）。
- **記録カード**（白・大角丸・ふんわり影・写真＋ドリンク名＋カフェ＋★＋価格＋日付＋タグpill）。インセットで並べる。
- **詳細＝iOSシート**（上端grabber・大角丸・overshoot無し）／**記録フォーム＝インセットグループ**（iOS入力行）。
- **「＋記録する」**＝tintの丸ピル（下部に浮かせる or ナビの＋）。Snackbar/トースト。
- 2段階スワイプ削除・写真ビューア・実績(trophy)・統計(stats)・wiki も iOS×可愛いトークンで再スキン。

## 維持（不変・厳守）
- データ: `cafeLog.v1`＋写真IndexedDB（`cafechoDB`/`photos`）・migrate・全フィールド不変。**既存記録・写真がそのまま表示**。
- 機能: 一覧/検索/フィルタ/追加・編集・削除/写真/バックアップ/設定/実績/統計/wiki/PWA(SW)。カフェ用語（「麺」残骸を出さない）。`lang="ja"`。
- overscroll白対策（html背景=背景色一致）・文字選択無効（入力欄除く）・背景スクロールロック。

## 出力前チェック
- [ ] iOS作法（Large Title・インセットグループ・44pt・ライト/ダーク・マテリアル）に沿う
- [ ] パステル(ローズtint)＋大角丸＋ふんわり影で「もっと可愛い」、純黒/純白なし・全ペアAA
- [ ] Zen Maru Gothic(swap/preconnect)＋iOS Dynamic Type相当・本文17px
- [ ] 既存データ(cafeLog.v1＋写真)読込OK・全機能/全ページ動作
- [ ] シートovershoot無し・量産感回避(anti-ai)・カフェ用語(麺残骸なし)
