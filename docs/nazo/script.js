/* ========================================
   使用する要素の取得
======================================== */

const menuButton =
  document.querySelector("#menu-button");

const globalMenu =
  document.querySelector("#global-menu");

const menuBackdrop =
  document.querySelector("#menu-backdrop");

const menuLinks =
  document.querySelectorAll(".global-menu__link");

const horizontalGallery =
  document.querySelector(".horizontal-gallery");

const navigationPanel =
  document.querySelector(".navigation-panel");


/* ========================================
   ハンバーガーメニュー
======================================== */

function openMenu() {
  if (
    !menuButton ||
    !globalMenu ||
    !menuBackdrop
  ) {
    return;
  }

  menuButton.classList.add("is-open");
  globalMenu.classList.add("is-open");
  menuBackdrop.classList.add("is-open");

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  menuButton.setAttribute(
    "aria-label",
    "メニューを閉じる"
  );

  globalMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("menu-open");
}


function closeMenu() {
  if (
    !menuButton ||
    !globalMenu ||
    !menuBackdrop
  ) {
    return;
  }

  menuButton.classList.remove("is-open");
  globalMenu.classList.remove("is-open");
  menuBackdrop.classList.remove("is-open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "メニューを開く"
  );

  globalMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("menu-open");
}


if (
  menuButton &&
  globalMenu
) {
  menuButton.addEventListener(
    "click",
    function () {
      const menuIsOpen =
        globalMenu.classList.contains("is-open");

      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }
  );
}


if (menuBackdrop) {
  menuBackdrop.addEventListener(
    "click",
    closeMenu
  );
}


menuLinks.forEach(function (link) {
  link.addEventListener(
    "click",
    closeMenu
  );
});


/* ========================================
   マウスホイールを横スクロールへ変換
======================================== */

if (horizontalGallery) {
  horizontalGallery.addEventListener(
    "wheel",
    function (event) {

      /*
        詳細画面またはメニューが開いている間は、
        背景を横スクロールさせない
      */
      if (
        document.body.classList.contains("item-modal-open") ||
        document.body.classList.contains("menu-open")
      ) {
        event.preventDefault();
        return;
      }

      if (
        Math.abs(event.deltaY) >
        Math.abs(event.deltaX)
      ) {
        event.preventDefault();

        horizontalGallery.scrollLeft +=
          event.deltaY;
      }
    },
    {
      passive: false
    }
  );
}


/* ========================================
   ハンバーガーを目次の左側へ移動
======================================== */

function stopMenuBeforeNavigation() {
  if (
    !horizontalGallery ||
    !navigationPanel ||
    !menuButton
  ) {
    return;
  }

  /*
    目次全体の左端。
    現在の並びではHomeバーの左端。
  */
  const navigationLeft =
    navigationPanel.getBoundingClientRect().left;

  /*
    ハンバーガーが通常いる位置の右端。
    ヘッダーの右paddingが24pxなので、
    画面右端から24px手前。
  */
  const normalButtonRight =
    window.innerWidth - 24;

  /*
    Homeバーとの間に空ける余白。
  */
  const gap = 24;

  /*
    ハンバーガーの右端を置きたい位置。
  */
  const targetButtonRight =
    navigationLeft - gap;

  /*
    目次が近づいたときだけ左へ移動する。
  */
  const shift =
    Math.min(
      0,
      targetButtonRight - normalButtonRight
    );

  menuButton.style.setProperty(
    "--menu-shift",
    `${shift}px`
  );
}


if (horizontalGallery) {
  horizontalGallery.addEventListener(
    "scroll",
    stopMenuBeforeNavigation
  );
}


window.addEventListener(
  "resize",
  stopMenuBeforeNavigation
);


window.addEventListener(
  "load",
  stopMenuBeforeNavigation
);


/* ========================================
   落とし物の詳細データ
======================================== */

const itemData = {

  cd: {
    section: "Section 05　謎",

    title: "CD",

    date: "2026/7/3",

    location: "帰り道",

    finder: "久下力斗",

    description:
      "　発売日を楽しみにして買った新品のCD。帰り道はどんな曲が入っているのか想像するだけで胸が弾んでいた。バッグにしまったつもりが、気づかないうちに落としてしまう。家で聴こうとした瞬間に初めてなくしたことに気づき、高揚感は一気に落胆へ変わる",

    photo:
      "images/cd.png",

    photoAlt:
      "道に落ちていたCD",

    subImage:
      "images/facecd.png",

    subImageAlt:
      "CDの落とし主イメージ",

    caption:
      "落とし主イメージ"

  },

  hane: {
    section: "Section 05　謎",

    title: "羽",

    date: "2026/7/14",

    location: "自宅付近の道路",

    finder: "山口貴悠",

    description:
      "　それを落としたのはきっと、人間ではない。それはきっと渡り鳥の落とし物だろう。カッコウは東南アジアやアフリカといった温暖な環境から日本にやってきて、卵を産む。托卵といって、特定の巣を持たず、他の種の鳥たちの巣に卵を産んでそのまま彼らに育ててもらうという、何とも親としてあるまじき生態をもつ。さらに醜悪なことに、カッコウの雛は他の種の鳥たちに比べ少し卵から早くかえる。そしてまだ生まれてない他の種の卵を背中に乗せて巣から落としては、仮の親が運んできてくれた餌を独り占めするのである。<br>　そんな一見極悪非道なカッコウであるが、托卵されたらそのまま、本当の親鳥の顔を見ることなく一人で旅立っていかなければならない。寂しい生き物なのだ。きっとこの羽は、去年巣立ったカッコウが、また日本に帰ってきた時に落としていったのだろう。だからこれは、産みの親の顔も知らずに一羽強く生き抜いた証である。もしこの羽の持ち主であるカッコウの産んだ雛が独り立ちした時、この羽と運命的に出会えるなんて奇跡を、人間という部外者の立場からではあるが、密かに願っている。",

    photo:
      "images/hane.png",

    photoAlt:
      "道に落ちていた鳥の羽",

    subImage:
      "images/facehane.png",

    subImageAlt:
      "鳥の羽の落とし主イメージ",

    caption:
      "落とし主イメージ"

  },

  sukuizu: {
    section: "Section 05　謎",

    title: "スクイーズ",

    date: "2026/7/10",

    location: "駅付近の歩道",

    finder: "山口貴悠",

    description:
      "「ママ！クレーンゲームでとれたやつみて！ピンク色でかわいい！」<br>「はいはい、よかったね〜。大事にするんだよ〜」<br>「うん！帰ったら幼稚園のバッグにつける！」<br>　西陽が射す夕方、手を繋いだゲームセンター帰りの親子は、休日の楽しいひとときを終えて駅に向かって歩いていた。土曜の立川駅は人でごった返しており、上機嫌な娘が飛び跳ねながら歩くのを、母親は人にぶつからないように少し強引に手を引いて歩く。改札をくぐり、5番線、八王子行きの電車に乗った親子は今日の夕飯の話で盛り上がっていた。豊田駅を少し過ぎたあたりで、娘が先ほど取ったピンクのスライムを落としてしまったことに気づいた。両ポケットや肩にかけたちいかわのポシェット、思いつく限りを探っても出てくる気配はなかった。きっと駅の人混みでぶつかった際に落としてしまったのだろう。今にも泣き出しそうな娘を見て母親は <br>「もう5歳でお姉さんなんだから、泣かないよ〜。また今度きた時にもっかい取れるようにがんばろ！」<br>と言ってなだめた。少し間が空いて、娘も泣きそうなところをグッとこらえ、また元気な声で「うん！」と頷き、夕飯の話へと戻った。きっと辛いとは思うが、また一つ成長した娘を見て母親は胸をうたれ、今日は娘の好きなハンバーグにしてあげようかな、などと考え微笑んだ",

    photo:
      "images/sukuizu,png",

    photoAlt:
      "道に落ちていたスクイーズ",

    subImage:
      "images/facesukuizu.png",

    subImageAlt:
      "スクイーズの落とし主イメージ",

    caption:
      "落とし主イメージ"

  },


};


/* ========================================
   詳細モーダルの要素
======================================== */

const itemModal =
  document.querySelector("#item-modal");

const itemModalBackdrop =
  document.querySelector("#item-modal-backdrop");

const itemModalClose =
  document.querySelector("#item-modal-close");

const itemDetailButtons =
  document.querySelectorAll(".item-detail-button");


const itemModalSection =
  document.querySelector("#item-modal-section");

const itemModalTitle =
  document.querySelector("#item-modal-title");

const itemModalDate =
  document.querySelector("#item-modal-date");

const itemModalLocation =
  document.querySelector("#item-modal-location");

const itemModalFinder =
  document.querySelector("#item-modal-finder");

const itemModalDescription =
  document.querySelector("#item-modal-description");

const itemModalPhoto =
  document.querySelector("#item-modal-photo");

const itemModalSubImage =
  document.querySelector("#item-modal-sub-image");

const itemModalCaption =
  document.querySelector("#item-modal-caption");


/* ========================================
   詳細モーダルの内容を入れ替える
======================================== */

function setItemModalContent(itemKey) {
  const item =
    itemData[itemKey];

  if (!item) {
    return false;
  }

  if (itemModalSection) {
    itemModalSection.textContent =
      item.section;
  }

  if (itemModalTitle) {
    itemModalTitle.textContent =
      item.title;
  }

  if (itemModalDate) {
    itemModalDate.textContent =
      item.date;
  }

  if (itemModalLocation) {
    itemModalLocation.textContent =
      item.location;
  }

  if (itemModalFinder) {
    itemModalFinder.textContent =
      item.finder;
  }

  if (itemModalDescription) {
    itemModalDescription.innerHTML =
      item.description;
  }

  if (itemModalPhoto) {
    itemModalPhoto.src =
      item.photo;

    itemModalPhoto.alt =
      item.photoAlt;
  }

  if (itemModalSubImage) {
    itemModalSubImage.src =
      item.subImage;

    itemModalSubImage.alt =
      item.subImageAlt;
  }

  if (itemModalCaption) {
    itemModalCaption.textContent =
      item.caption;
  }

  return true;
}


/* ========================================
   詳細モーダルを開く
======================================== */

function openItemModal(itemKey) {
  if (
    !itemModal ||
    !itemModalBackdrop
  ) {
    return;
  }

  const itemExists =
    setItemModalContent(itemKey);

  if (!itemExists) {
    return;
  }

  /*
    ハンバーガーメニューが開いていれば閉じる
  */
  closeMenu();

  itemModal.classList.add("is-open");
  itemModalBackdrop.classList.add("is-open");

  itemModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "item-modal-open"
  );

  if (itemModalClose) {
    itemModalClose.focus();
  }
}


/* ========================================
   詳細モーダルを閉じる
======================================== */

function closeItemModal() {
  if (
    !itemModal ||
    !itemModalBackdrop
  ) {
    return;
  }

  itemModal.classList.remove("is-open");
  itemModalBackdrop.classList.remove("is-open");

  itemModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "item-modal-open"
  );
}


/* ========================================
   「詳細を見る」ボタン
======================================== */

itemDetailButtons.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {
      const itemKey =
        button.dataset.item;

      openItemModal(itemKey);
    }
  );
});


/* ========================================
   ×ボタンで閉じる
======================================== */

if (itemModalClose) {
  itemModalClose.addEventListener(
    "click",
    closeItemModal
  );
}


/* ========================================
   暗い背景を押して閉じる
======================================== */

if (itemModalBackdrop) {
  itemModalBackdrop.addEventListener(
    "click",
    closeItemModal
  );
}


/* ========================================
   Escapeキー
======================================== */

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (
      itemModal &&
      itemModal.classList.contains("is-open")
    ) {
      closeItemModal();
      return;
    }

    if (
      globalMenu &&
      globalMenu.classList.contains("is-open")
    ) {
      closeMenu();
    }
  }
);


/* ========================================
   管理人ページから来た場合に自動表示
======================================== */

const itemParams =
  new URLSearchParams(
    window.location.search
  );

const requestedItem =
  itemParams.get("item");


if (requestedItem) {
  window.addEventListener(
    "load",
    function () {
      openItemModal(requestedItem);
    }
  );
}