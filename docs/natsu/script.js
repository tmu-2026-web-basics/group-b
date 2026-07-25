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

  kasa: {
    section: "Section 04　夏",

    title: "日傘カバー",

    date: "2026/7/15",

    location: "都立大前の歩道",

    finder: "秦和花",

    description:
      "　昼休み、照りつける日差しに日傘を取り出す。その拍子に、日傘カバーが足元へ落ちる。<br><br>　日傘カバーというものは、なくてもあまり困らないが、なくした場合それだけ買うということは出来ず、大変厄介である。",

    photo:
      "images/kasa.png",

    photoAlt:
      "道に落ちていた日傘カバー",

    subImage:
      "images/facekasa.png",

    subImageAlt:
      "日傘カバーの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  megane: {
    section: "Section 04　夏",

    title: "UVカットメガネ",

    date: "2026/7/16",

    location: "南町田グランべりーパーク",

    finder: "丸岡瑚子",

    description:
      "　強く日差しの照るお昼。今日はショッピング。アウトレットモールはこの気候には暑すぎて、ゲームセンターに立ち寄る。冷房がガンガンに効いている。<br>　腕に抱えた我が子が顔を触るので、俺はメガネを外してカバンに引っ掛けた。<br>　夕日が眩しくて、メガネのことを思い出した。もうそこにその姿はない。",

    photo:
      "images/megane.png",

    photoAlt:
      "道に落ちていたUVカットメガネ",

    subImage:
      "images/facemegane.png",

    subImageAlt:
      "メガネの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  super: {
    section: "Section 04　夏",

    title: "スーパーボール",

    date: "2026/7/18",

    location: "公園のお祭り",

    finder: "久下力斗",

    description:
      "　お祭りで何度も挑戦して、すくったお気に入りのスーパーボール。<br>　帰り道、公園で友達と見せ合って遊ぶうち、ポケットから転がり落ちたのだろう。家に帰って袋を開けたとき、一つ足りないことに気づく。楽しかったお祭りの終わりを告げるような、小さな忘れものだった。",

    photo:
      "images/super.png",

    photoAlt:
      "道に落ちていたスーパーボール",

    subImage:
      "images/facesuper.png",

    subImageAlt:
      "スーパーボールの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  uchiwa: {
    section: "Section 04　夏",

    title: "うちわ",

    date: "2026/7/18",

    location: "公園のお祭り",

    finder: "久下力斗",

    description:
      "　屋台を巡り、花火を待ちながら仰いでいたうちわ。帰る頃には少し涼しくなり、もう使わないと椅子に置いていたのだろう。友達との会話に夢中になっているうちに、そこに置いたことすら忘れてしまった。夏祭りの熱気だけが、そのうちわに残されていた。",

    photo:
      "images/uchiwa.png",

    photoAlt:
      "道に落ちていたうちわ",

    subImage:
      "images/faceuchiwa.png",

    subImageAlt:
      "うちわの落とし主イメージ",

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