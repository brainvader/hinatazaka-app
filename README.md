# 日向坂46アプリ

## 技術スタック

* Next.js
* Neo4j
* Yoga (GraphQLサーバー)

## 定義ファイル

Neo4j用のデータとしてHTMLで記述したファイルを利用する.

### Neo4jの構成

Neo4jにはノードとその関係を定義するリレーションシップから構成されている.

ノードとリレーションシップは, それぞれラベルとプロパティを持つことができる. ラベルはノードやリレーションシップをグループ化するための名前で, プロパティは各ノードの固有の値セットを表す.

### ノード

ノードは以下のようにHTMLで定義している.

```html
<div class=".node"
    data-label="Member"
    data-name="佐々木　久美"
    data-ruby="ささき　くみ"
    data-birthplace="千葉県"
    data-birthday="1996/01/22"
    data-generation="1">
</div>
```

この場合以下のようにJavaScriptでデータを取得する.

```js
const node = document.querySelector('.node');
const name = node.dataset.name;
```

リレーションシップはハイパーリンクを利用して定義している.

```html
<a href="../group/Hinatazaka46.html"
    class=".relationship"
    data-label="BELONGS_TO"
    data-since="2019/3/27">
</a>
```

ノードの時と同様でDOM APIを利用してデータを取得する.

```js
const relationship = document.querySelectorAll('.relationship')
const since = relationship.dataset.since;
```

## HTMLを使う理由

何故HTMLというのはあると思う.

特にないが, 比較的慣れているからとグラフデータ特有の関係をリンクを使って簡単に定義できるからというのがある. Next.jsからはRSC(React Server Component)を使うこともあり, [jsdom](https://github.com/jsdom/jsdom)を使えば, フロントエンドへも直接データを渡しやすいかなと思う.

データベースがない状態である程度フロントエンドを別々に開発できる.

ただ記法としては面倒だなぁという思いもあるが大量の文章を書くのはどんな形式でもある程度のめんどくさが伴うものである.