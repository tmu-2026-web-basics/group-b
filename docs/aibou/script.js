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

  anpanman: {
    section: "Section 02　相棒",

    title: "手作りのお守り",

    date: "2026/7/17",

    location: "サイゼリヤ前",

    finder: "秦和花",

    description:
      "　朝礼に遅れそうで、全力で走る朝。かばんで揺れていたアンパンマンのお守りは、部活のマネージャーが手縫いで作ってくれたものなのかもしれない。激しい揺れで糸が切れ、お守りだけが道に残る。<br><br>　落ちたのは偶然だったのか、それとも持ち主の代わりに何かを受け止めてくれたのか。その答えを知る人はいない。",

    photo:
      "images/anpanman.png",

    photoAlt:
      "道に落ちていたアンパンマンのお守り",

    subImage:
      "images/faceanpanman.png",

    subImageAlt:
      "アンパンマンの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

 buzz: {
    section: "Section 02　相棒",

    title: "バズ・ライトイヤー",

    date: "2026/7/11",

    location: "青梅線の電車内",

    finder: "久下力斗",

    description:
      "　バッグで揺れるバズ・ライトイヤーは、毎日の通学のお供だった。電車に乗り遅れそうで慌てて走った朝、勢いよく揺れた拍子に金具が外れてしまう。本人は気づかないままホームへ向かう。気づいた頃には、「無限の彼方へ」ではなく、駅のどこかへ旅立っていた。",

    photo:
      "images/buzz.png",

    photoAlt:
      "道に落ちていたバズ・ライトイヤー",

    subImage:
      "images/facebuzz.png",

    subImageAlt:
      "バズ・ライトイヤーの落とし主イメージ",

    caption:
      "落とし主イメージ"
  }, 

 rakko: {
    section: "Section 02　相棒",

    title: "迎えを待つラッコ",

    date: "2026/1/23",

    location: "東京都立大学南大沢キャンパス",

    finder: "増田亜依美",

    description:
      "　試験前の朝、学生のリュックから小さなラッコが落ちてしまった。幸い、心の優しい方がそう時間の立たないうちに拾い上げてくれて、僕は大学の木の住人になった。あなたがまた見つけて、笑ってくれるその時まで、待ってるからね。",

    photo:
      "images/rakko.png",

    photoAlt:
      "道に落ちていたラッコ",

    subImage:
      "images/facerakko.png",

    subImageAlt:
      "ラッコの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  sadoru: {
    section: "Section 02　相棒",

    title: "サドルカバー",

    date: "2026/7/15",

    location: "東京都立大学南大沢キャンパス",

    finder: "秦和花",

    description:
      "　いつもの帰り道、外したサドルカバーを前かごへ入れた。坂道を下ると、サドルカバーは風にあおられ、道へ落ちてしまった。色あせたそれは、子どもの頃から長く使い続けた、持ち主の相棒だったのかもしれない。<br><br>　この喪失は、少しの寂しさと、卒業を感じさせる。",

    photo:
      "images/sadoru.png",

    photoAlt:
      "道に落ちていたサドルカバー",

    subImage:
      "images/facesadoru.png",

    subImageAlt:
      "サドルカバーの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  kuma: {
    section: "Section 02　相棒",

    title: "ぬいぐるみ",

    date: "2026/7/25",

    location: "自宅前の道路",

    finder: "山口貴悠",

    description:
      "　今、その女は振られ、一人寂しくいつもの帰路を重い足取りで歩いていた。2年付き合った彼氏、なんとなく振られることはわかっていたけど、やっぱり心に大きな穴が空いたような気持ちだった。それでも不思議と涙は出ず、逆に冷静な自分に嫌気がさしていた。ふと鞄を見ると今年の誕生日に彼がくれたジェラピケの人形が揺れていた。この人形は何も悪くない。けど、この子は彼との記憶媒体になってしまう、また思い出すたびに苦しくなってしまうかもしれない。悲しい決別ではあるし、可愛くて気に入っていた。それでも、鞄からそっと外し、道中、コンクリートの塀の上にそっと置いた。そして「さようなら、、」と呟いて、家に向かって歩き続けた。",

    photo:
      "images/kuma.png",

    photoAlt:
      "道に落ちていたぬいぐるみ",

    subImage:
      "images/facekuma.png",

    subImageAlt:
      "ぬいぐるみの落とし主イメージ",

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