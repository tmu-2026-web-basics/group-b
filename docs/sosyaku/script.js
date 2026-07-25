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

  kyuuri: {
    section: "Section 01　咀嚼",

    title: "たくさんのきゅうり",

    date: "2026/7/19",

    location: "坂道の歩道",

    finder: "丸岡瑚子",

    description:
      "　ご近所さんにきゅうりをたくさんいただいてしまった。自転車の後方に他の荷物と一緒にくくりつけた。帰ったら塩漬けにしようなんて思いながら漕ぎ出す。<br><br>　帰ってみると、きゅうりがそこにない。塩漬けのお預けを食らうとともに、罪悪感に苛まれた。",

    photo:
      "images/kyuuri.png",

    photoAlt:
      "道に落ちていたきゅうり",

    subImage:
      "images/facekyuuri.png",

    subImageAlt:
      "きゅうりの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },


  moyashi: {
    section: "Section 01　咀嚼",

    title: "はなさかもやし",

    date: "2026/7/18",

    location: "団地の前の道",

    finder: "増田亜依美",

    description:
      "団地の前で、買い物帰りのママ友同士が立ち話を始めた。「最近どう？」そんな何気ない会話に花が咲き、気づけば夕方。慌てて手を振り、それぞれ家路につく。その瞬間、買い物袋からもやしが一袋、そっと地面へ滑り落ちた。楽しい時間の置き土産だったのかもしれない。",

    photo:
      "images/moyashi.png",

    photoAlt:
      "道に落ちていたもやし",

    subImage:
      "images/facemoyashi.png",

    subImageAlt:
      "もやしの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  tamanegi: {
    section: "Section 01　咀嚼",

    title: "玉ねぎ",

    date: "2024/10/10",

    location: "高校の近くのラーメン屋の前",

    finder: "増田亜依美",

    description:
      "　高校生で賑わうラーメン屋の前に、たまねぎが一つ。買い物帰り、うっかりおばあちゃんが落としてしまった。<br><br>　このまま店主に拾われたら、ラーメンの具になってしまうかもしれない。今日は袋の中で一緒だったにんじんさんやじゃがいもくんと、シチューのお風呂に入る約束だったのに……。",

    photo:
      "images/tamanegi.png",

    photoAlt:
      "道に落ちていた玉ねぎ",

    subImage:
      "images/facetamanegi.png",

    subImageAlt:
      "玉ねぎの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  ocha: {
    section: "Section 01　咀嚼",

    title: "濃い緑茶",

    date: "2026/7/18",

    location: "公文の前",

    finder: "丸岡瑚子",

    description:
      "（今日もあそこ集合で）<br><br>　夏休み初日、昼下がり。いつメンのグループにチャットが届いて、俺は歩いて向かう。<br><br>そこにはもう何人か集まっていて、花壇に腰掛けながら揃うのを待った。<br><br>　自転車に乗って、最後の一人がたどり着く。そのままみんなで公園に駆け出した。",

    photo:
      "images/ocha.png",

    photoAlt:
      "道に落ちていた濃い緑茶",

    subImage:
      "images/faceocha.png",

    subImageAlt:
      "濃い緑茶の落とし主イメージ",

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