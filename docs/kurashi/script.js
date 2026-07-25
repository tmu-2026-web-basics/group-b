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

  gunte: {
    section: "Section 03　暮らし",

    title: "軍手",

    date: "2026/7/21",

    location: "電柱の下",

    finder: "山口貴悠",

    description:
      "　梅雨の季節、電柱工事をしていた一人の配線技能士の男性は、その日も朝も早よからと仕事に取り掛かっていた。梅雨どきだと言うのにやけに晴れたその日は、正午間近の強い日差しが日陰のない電柱の上を暑く照らした。<br>　男性は暑さのあまり、一息つきがてら、汗で蒸した軍手を右左ともに外し、作業用ベルトのホルダーから水の入ったペットボトルを取り出した。水を飲もうとボトルを口に運んだその時、左手に持っていた軍手の片割れが、地面に向かって勢いよく落下してしまった。しかし、一度上まで登ってしまうと下に降りるのが少々手間であったために、手袋を拾いに行かずに休憩後も黙々と作業を進めていた。",

    photo:
      "images/gunte.png",

    photoAlt:
      "道に落ちていた軍手",

    subImage:
      "images/facegunte.png",

    subImageAlt:
      "軍手の落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  haburashi: {
    section: "Section 03　暮らし",

    title: "携帯用歯ブラシ",

    date: "2026/7/9",

    location: "公園脇の歩道",

    finder: "丸岡瑚子",

    description:
      "　駅からの急な上り坂。ジリジリと太陽が照りつける。汗が鬱陶しくて、ハンカチを探す。<br>「あれ〜、絶対入れたのに。」<br>ガサゴソ、カバンを漁る。足は止めず。ハンカチは忘れてしまったようだった。<br></br>昼休みも終わりに近づく。歯ブラシを探す。これも忘れてしまったのだろうか。そういう日もある。",

    photo:
      "images/.png",

    photoAlt:
      "道に落ちていた携帯用歯ブラシ",

    subImage:
      "images/facehaburashi.png",

    subImageAlt:
      "携帯用歯ブラシの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  pen: {
    section: "Section 03　暮らし",

    title: "ボールペン",

    date: "2026/7/17",

    location: "並木道",

    finder: "秦和花",

    description:
      "　森で夢中になって描いた一枚が、思わず誰かに見せたくなるほど上手く描けた。スケッチブックを抱えて走り出した瞬間、一本のペンが地面に落ちる。<br><br>　喜びに背中を押されて置いていかれたその一本は、静かに達成感の余韻を見届けていた。",

    photo:
      "images/pen.png",

    photoAlt:
      "道に落ちていたボールペン",

    subImage:
      "images/facepen.png",

    subImageAlt:
      "ボールペンの落とし主イメージ",

    caption:
      "落とし主イメージ"
  },

  pic: {
    section: "Section 03　暮らし",

    title: "ピックとハンカチ",

    date: "2024/10/20",

    location: "通っていた高校の最寄りのバス停",

    finder: "増田亜依美",

    description:
      "　放課後バスはちょうど到着し、制服のポケットからSuicaを取り出した拍子に、ハンカチと一緒に一枚のピックが落ちた。、急いで乗り込んだ持ち主はそのことに気づかない。<br>　実はこれ、気になってる先輩が使ってたからお揃いで買ったみたピックだったんだ。",

    photo:
      "images/pic.png",

    photoAlt:
      "道に落ちていたピックとハンカチ",

    subImage:
      "images/facepic.png",

    subImageAlt:
      "ピックとハンカチの落とし主イメージ",

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