/* ========================================
   1. トップページ全体の基本要素
======================================== */

const screen1 =
  document.querySelector(".screen1");

const screen2 =
  document.querySelector(".screen2");

const screen3 =
  document.querySelector(".screen3");

const siteHeader =
  document.querySelector(".site-header");


/* ========================================
   2. URLとオープニング再生状態
======================================== */

/*
  index.html?home でトップページへ戻った場合は、
  オープニングを省略してscreen3から表示する
*/

const pageParams =
  new URLSearchParams(window.location.search);

const returnToHome =
  pageParams.has("home");


/*
  同じタブの中でオープニングを再生したかを記録する
*/

function hasOpeningPlayed() {

  return (
    sessionStorage.getItem("openingPlayed") === "true"
  );

}


function saveOpeningPlayed() {

  sessionStorage.setItem(
    "openingPlayed",
    "true"
  );

}


/* ========================================
   3. オープニング用タイマー
======================================== */

/*
  screen3のスライダー開始を遅らせるタイマー
*/

let openingSliderStartTimer = null;


/*
  すでに動いている開始タイマーを解除する
*/

function clearOpeningSliderStartTimer() {

  if (!openingSliderStartTimer) {
    return;
  }

  window.clearTimeout(
    openingSliderStartTimer
  );

  openingSliderStartTimer = null;

}


/* ========================================
   4. オープニングを省略してscreen3を表示
======================================== */

function skipOpening() {

  if (screen1) {
    screen1.style.display = "none";
  }

  if (screen2) {
    screen2.style.display = "none";
  }

  if (screen3) {

    screen3.style.opacity = "1";
    screen3.style.visibility = "visible";
    screen3.style.filter = "none";
    screen3.style.animation = "none";

  }

  if (siteHeader) {
    siteHeader.classList.add("skip-opening");
  }


  /*
    詳細ページから戻ったときも、
    screen3のスライダーを確実に再開する
  */

  startScreen3Slider();

}


/* ========================================
   5. 初回オープニングを再生
======================================== */

function playOpening() {

  if (screen1) {
    screen1.style.display = "";
  }

  if (screen2) {
    screen2.style.display = "";
  }

  if (screen3) {

    /*
      HTMLやCSSに設定している
      本来のアニメーション状態へ戻す
    */

    screen3.style.opacity = "";
    screen3.style.visibility = "";
    screen3.style.filter = "";
    screen3.style.animation = "";

  }

  if (siteHeader) {
    siteHeader.classList.remove("skip-opening");
  }


  /*
    一度オープニングを再生したことを保存
  */

  saveOpeningPlayed();


  /*
    オープニング終了後に
    背景画像スライダーを開始する
  */

  clearOpeningSliderStartTimer();

  openingSliderStartTimer =
    window.setTimeout(function () {

      startScreen3Slider();

      openingSliderStartTimer = null;

    }, 6000);

}


/* ========================================
   6. オープニング表示を判断
======================================== */

function initializeOpening() {

  clearOpeningSliderStartTimer();


  /*
    次の場合はオープニングを省略する

    ・index.html?homeで戻ってきた
    ・このタブですでにオープニングを再生した
  */

  if (
    returnToHome ||
    hasOpeningPlayed()
  ) {

    skipOpening();
    return;

  }


  /*
    本当に最初に訪れたときだけ再生する
  */

  playOpening();

}


/* ========================================
   7. Introセクション
======================================== */

const introSection =
  document.querySelector(".intro-section");

const fadeElements =
  document.querySelectorAll(
    ".intro-section .fade-up"
  );


/*
  IntroのIntersectionObserverを保存
*/

let introObserver = null;


/*
  順番に表示するためのタイマーを保存
*/

let introAnimationTimers = [];


/* ========================================
   8. Introタイマーを解除
======================================== */

function clearIntroAnimationTimers() {

  introAnimationTimers.forEach(
    function (timerId) {

      window.clearTimeout(timerId);

    }
  );

  introAnimationTimers = [];

}


/* ========================================
   9. Introアニメーションをリセット
======================================== */

function resetIntroAnimation() {

  clearIntroAnimationTimers();

  fadeElements.forEach(
    function (element) {

      element.classList.remove("is-visible");

    }
  );

}


/* ========================================
   10. Introアニメーションを開始
======================================== */

function playIntroAnimation() {

  clearIntroAnimationTimers();

  fadeElements.forEach(
    function (element, index) {

      const timerId =
        window.setTimeout(function () {

          element.classList.add(
            "is-visible"
          );

        }, index * 900);

      introAnimationTimers.push(
        timerId
      );

    }
  );

}


/* ========================================
   11. Intro監視を初期化
======================================== */

function initializeIntroObserver() {

  if (!introSection) {
    return;
  }


  /*
    古いObserverが残っている場合は解除する
  */

  if (introObserver) {
    introObserver.disconnect();
  }


  /*
    詳細ページから戻ってきた場合に備えて、
    表示済みのクラスを一度外す
  */

  resetIntroAnimation();


  introObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            playIntroAnimation();

            introObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.85
      }
    );


  introObserver.observe(
    introSection
  );

}


/* ========================================
   12. Welcomeセクション
======================================== */

const welcomeSection =
  document.querySelector(".welcome-section");

const welcomeText =
  document.querySelector(".welcome-fade");


/*
  Welcome用Observer
*/

let welcomeObserver = null;


/* ========================================
   13. Welcomeアニメーションをリセット
======================================== */

function resetWelcomeAnimation() {

  if (!welcomeText) {
    return;
  }

  welcomeText.classList.remove(
    "is-visible"
  );

}


/* ========================================
   14. Welcome監視を初期化
======================================== */

function initializeWelcomeObserver() {

  if (
    !welcomeSection ||
    !welcomeText
  ) {
    return;
  }


  /*
    古いObserverを解除
  */

  if (welcomeObserver) {
    welcomeObserver.disconnect();
  }


  /*
    詳細ページから戻った場合も
    再びアニメーションできるようにする
  */

  resetWelcomeAnimation();


  welcomeObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            welcomeText.classList.add(
              "is-visible"
            );

            welcomeObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.85
      }
    );


  welcomeObserver.observe(
    welcomeSection
  );

}


/* ========================================
   15. IndexセクションとScroll Snap
======================================== */

const indexSection =
  document.querySelector(".index-section");


/*
  Indexセクションに近づいたら
  縦方向のScroll Snapを解除する
*/

function updateScrollSnap() {

  if (!indexSection) {
    return;
  }

  const indexTop =
    indexSection.offsetTop;

  const releasePosition =
    indexTop -
    window.innerHeight * 0.25;


  if (
    window.scrollY >= releasePosition
  ) {

    document.documentElement.classList.add(
      "no-snap"
    );

  } else {

    document.documentElement.classList.remove(
      "no-snap"
    );

  }

}


/* ========================================
   16. Scroll Snapイベント
======================================== */

window.addEventListener(
  "scroll",
  updateScrollSnap,
  {
    passive: true
  }
);

window.addEventListener(
  "resize",
  updateScrollSnap
);


/* ========================================
   17. ヘッダーの色切替
======================================== */

const themeSections =
  document.querySelectorAll(
    "[data-header-theme]"
  );


/*
  ヘッダー色変更用Observer
*/

let headerThemeObserver = null;


/* ========================================
   18. 現在位置からヘッダー色を判断
======================================== */

function updateHeaderThemeImmediately() {

  if (!siteHeader) {
    return;
  }

  const screenCenter =
    window.innerHeight * 0.5;

  let currentTheme = null;


  themeSections.forEach(
    function (section) {

      const sectionRect =
        section.getBoundingClientRect();

      const containsCenter =
        sectionRect.top <= screenCenter &&
        sectionRect.bottom >= screenCenter;


      if (containsCenter) {

        currentTheme =
          section.dataset.headerTheme;

      }

    }
  );


  if (currentTheme === "dark") {

    siteHeader.classList.add(
      "is-dark"
    );

  } else if (currentTheme === "light") {

    siteHeader.classList.remove(
      "is-dark"
    );

  }

}


/* ========================================
   19. ヘッダー色監視を初期化
======================================== */

function initializeHeaderThemeObserver() {

  if (!siteHeader) {
    return;
  }


  /*
    古いObserverが残っていれば解除する
  */

  if (headerThemeObserver) {
    headerThemeObserver.disconnect();
  }


  headerThemeObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            const theme =
              entry.target.dataset.headerTheme;


            if (theme === "dark") {

              siteHeader.classList.add(
                "is-dark"
              );

            } else {

              siteHeader.classList.remove(
                "is-dark"
              );

            }

          }
        );

      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      }
    );


  themeSections.forEach(
    function (section) {

      headerThemeObserver.observe(
        section
      );

    }
  );


  /*
    ブラウザバック直後はObserverの判定より先に、
    現在位置に合わせて色を変更する
  */

  updateHeaderThemeImmediately();

}


/* ========================================
   20. ページ表示時の再初期化
======================================== */

/*
  pageshowは次の両方で実行される

  ・通常のページ読み込み
  ・ブラウザの戻る／進むによる復元

  event.persistedがtrueの場合は、
  bfcacheから復元されたことを表す
*/

window.addEventListener(
  "pageshow",
  function () {

    initializeOpening();

    initializeIntroObserver();

    initializeWelcomeObserver();

    initializeHeaderThemeObserver();

    updateScrollSnap();

  }
);


/* ========================================
   21. ハンバーガーメニューの基本要素
======================================== */

const menuButton =
  document.querySelector("#menu-button");

const globalMenu =
  document.querySelector("#global-menu");

const menuBackdrop =
  document.querySelector("#menu-backdrop");

const menuLinks =
  document.querySelectorAll(".global-menu__link");

const fixedHeader =
  document.querySelector(".site-header");


/* ========================================
   22. メニューが開いているかを確認
======================================== */

function isMenuOpen() {

  if (!globalMenu) {
    return false;
  }

  return globalMenu.classList.contains(
    "is-open"
  );

}


/* ========================================
   23. ハンバーガーメニューを開く
======================================== */

function openMenu() {

  if (
    !menuButton ||
    !globalMenu ||
    !menuBackdrop
  ) {
    return;
  }


  /*
    管理人モーダルが開いている場合は、
    先に閉じてからメニューを開く
  */

  if (
    typeof isStaffModalOpen === "function" &&
    isStaffModalOpen()
  ) {

    closeStaffModal();

  }


  menuButton.classList.add(
    "is-open"
  );

  globalMenu.classList.add(
    "is-open"
  );

  menuBackdrop.classList.add(
    "is-open"
  );


  if (fixedHeader) {

    fixedHeader.classList.add(
      "menu-is-open"
    );

  }


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


  /*
    メニュー表示中は、
    背景ページのスクロールを止める
  */

  document.body.classList.add(
    "menu-open"
  );

}


/* ========================================
   24. ハンバーガーメニューを閉じる
======================================== */

function closeMenu() {

  if (menuButton) {

    menuButton.classList.remove(
      "is-open"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "メニューを開く"
    );

  }


  if (globalMenu) {

    globalMenu.classList.remove(
      "is-open"
    );

    globalMenu.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (menuBackdrop) {

    menuBackdrop.classList.remove(
      "is-open"
    );

  }


  if (fixedHeader) {

    fixedHeader.classList.remove(
      "menu-is-open"
    );

  }


  document.body.classList.remove(
    "menu-open"
  );

}


/* ========================================
   25. メニューボタンのクリック処理
======================================== */

if (menuButton) {

  menuButton.addEventListener(
    "click",
    function () {

      if (isMenuOpen()) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );

}


/* ========================================
   26. メニュー背景のクリック処理
======================================== */

if (menuBackdrop) {

  menuBackdrop.addEventListener(
    "click",
    closeMenu
  );

}


/* ========================================
   27. メニュー内リンクのクリック処理
======================================== */

menuLinks.forEach(
  function (link) {

    link.addEventListener(
      "click",
      function () {

        closeMenu();

      }
    );

  }
);


/* ========================================
   28. 管理人データ
======================================== */

/*
  各管理人のプロフィールと、
  管理している落とし物をまとめている

  HTML側の管理人ボタンにある

  data-manager="rikito"

  などの値と、
  下の管理人キーを一致させる
*/

const managerData = {


  /* ======================================
     管理人 1：久下カ斗
  ====================================== */

  rikito: {

    name: "久下　カ斗",

    shortName: "久下カ斗",

    photo: "images/rikito.png",

    role: "学芸員",

    birthday: "2006.07.15",

    origin: "東京都青梅市",

    hobby: "ダンス、写真",

    comment:
      "落とした財布はお金を抜かれ交番に届けられていました。",


    items: [

      {
        title: "スーパーボール",
        href: "sosyaku/index.html?item=ball"
      },

      {
        title: "CD",
        href: "sosyaku/index.html?item=cd"
      },

      {
        title: "うちわ",
        href: "sosyaku/index.html?item=uchiwa"
      },

      {
        title: "バズ・ライトイヤー",
        href: "sosyaku/index.html?item=buzz"
      }

    ]

  },


  /* ======================================
     管理人 2：増田亜依美
  ====================================== */

  aimi: {

    name: "増田　亜依美",

    shortName: "増田亜依美",

    photo: "images/aimi.png",

    role: "学芸員",

    birthday: "2006.06.14",

    origin: "静岡県沼津市",

    hobby: "、",

    comment: "。",


    items: [

      {
        title: "もやし",
        href: "aibou/index.html?item=moyashi"
      },

      {
        title: "助けを求めるラッコ",
        href: "aibou/index.html?item=rakko"
      },

      {
        title: "ピックとハンカチ",
        href: "aibou/index.html?item=pick"
      },

      {
        title: "玉ねぎ",
        href: "aibou/index.html?item=onion"
      }

    ]

  },


  /* ======================================
     管理人 3：丸岡瑚子
  ====================================== */

  koko: {

    name: "丸岡　瑚子",

    shortName: "丸岡瑚子",

    photo: "images/koko.png",

    role: "学芸員",

    birthday: "2006.09.20",

    origin: "神奈川県横浜市",

    hobby: "音楽",

    comment:
      "よく落とす黒い手袋がありますが、必ず帰ってきます。",


    items: [

      {
        title: "携帯用歯ブラシ",
        href: "kurashi/index.html?item=tooth"
      },

      {
        title: "UVカットメガネ",
        href: "kurashi/index.html?item=UV"
      },

      {
        title: "濃い緑茶",
        href: "kurashi/index.html?item=tea"
      },

      {
        title: "たくさんのきゅうり",
        href: "kurashi/index.html?item=kyuuri"
      }

    ]

  },


  /* ======================================
     管理人 4：秦和花
  ====================================== */

  nodoka: {

    name: "秦　和花",

    shortName: "秦和花",

    photo: "images/nodoka.png",

    role: "学芸員",

    birthday: "2006.08.26",

    origin: "静岡県富士市",

    hobby: "食",

    comment:
      "色々なものを落としてきましたが単位だけは落としません。",


    items: [

      {
        title: "サドルカバー",
        href: "natsu/index.html?item=cover"
      },

      {
        title: "日傘カバー",
        href: "natsu/index.html?item=suncover"
      },

      {
        title: "手作りお守り",
        href: "natsu/index.html?item=diffence"
      },

      {
        title: "ボールペン",
        href: "natsu/index.html?item=ballpen"
      }

    ]

  },


  /* ======================================
     管理人 5：山口貴悠
  ====================================== */

  takaharu: {

    name: "山口　貴悠",

    shortName: "山口貴悠",

    photo: "images/takaharu.png",

    role: "学芸員",

    birthday: "2006.08.18",

    origin: "東京都立川市",

    hobby: "さんぽ、日向ぼっこ",

    comment:
      "リップクリームぐらい単位も落としてます。",


    items: [

      {
        title: "軍手",
        href: "nazo/index.html?item=glove"
      },

      {
        title: "スクイーズ",
        href: "nazo/index.html?item=skuizu"
      },

      {
        title: "羽",
        href: "nazo/index.html?item=wing"
      }

    ]

  }

};


/* ========================================
   29. 管理人モーダルの基本要素
======================================== */

const managerButtons =
  document.querySelectorAll(
    ".manager-card__button"
  );

const staffModal =
  document.querySelector("#staff-modal");

const staffModalBackdrop =
  document.querySelector(
    "#staff-modal-backdrop"
  );

const staffModalClose =
  document.querySelector(
    "#staff-modal-close"
  );


/* ========================================
   30. 管理人モーダル内の表示要素
======================================== */

const modalPhoto =
  document.querySelector(
    "#staff-modal-photo"
  );

const modalTitle =
  document.querySelector(
    "#staff-modal-title"
  );

const modalRole =
  document.querySelector(
    "#staff-modal-role"
  );

const modalBirthday =
  document.querySelector(
    "#staff-modal-birthday"
  );

const modalOrigin =
  document.querySelector(
    "#staff-modal-origin"
  );

const modalHobby =
  document.querySelector(
    "#staff-modal-hobby"
  );

const modalComment =
  document.querySelector(
    "#staff-modal-comment"
  );

const modalShortName =
  document.querySelector(
    "#staff-modal-short-name"
  );

const modalItems =
  document.querySelector(
    "#staff-modal-items"
  );


/* ========================================
   31. 最後に押した管理人ボタンを保存
======================================== */

/*
  モーダルを閉じたあとに、
  元の管理人ボタンへ操作位置を戻すために使う
*/

let lastFocusedManagerButton = null;


/* ========================================
   32. 管理人モーダルが開いているか確認
======================================== */

function isStaffModalOpen() {

  if (!staffModal) {
    return false;
  }

  return staffModal.classList.contains(
    "is-open"
  );

}


/* ========================================
   33. 管理人情報をモーダルへ反映
======================================== */

function setManagerInformation(
  managerKey
) {

  const manager =
    managerData[managerKey];


  /*
    対応する管理人データがない場合は終了
  */

  if (!manager) {
    return false;
  }


  /* ----------------------------------------
     管理人写真
  ---------------------------------------- */

  if (modalPhoto) {

    modalPhoto.src =
      manager.photo;

    modalPhoto.alt =
      manager.name + "の写真";

  }


  /* ----------------------------------------
     管理人名
  ---------------------------------------- */

  if (modalTitle) {

    modalTitle.textContent =
      manager.name;

  }


  /* ----------------------------------------
     役職
  ---------------------------------------- */

  if (modalRole) {

    modalRole.textContent =
      manager.role;

  }


  /* ----------------------------------------
     誕生日
  ---------------------------------------- */

  if (modalBirthday) {

    modalBirthday.textContent =
      manager.birthday;

  }


  /* ----------------------------------------
     出身地
  ---------------------------------------- */

  if (modalOrigin) {

    modalOrigin.textContent =
      manager.origin;

  }


  /* ----------------------------------------
     趣味
  ---------------------------------------- */

  if (modalHobby) {

    modalHobby.textContent =
      manager.hobby;

  }


  /* ----------------------------------------
     一言
  ---------------------------------------- */

  if (modalComment) {

    modalComment.textContent =
      manager.comment;

  }


  /* ----------------------------------------
     落とし物一覧の見出しに表示する名前
  ---------------------------------------- */

  if (modalShortName) {

    modalShortName.textContent =
      manager.shortName;

  }


  /* ----------------------------------------
     管理する落とし物一覧
  ---------------------------------------- */

  if (modalItems) {

    /*
      前の管理人の一覧を削除
    */

    modalItems.innerHTML = "";


    /*
      管理人の落とし物を1件ずつ追加
    */

    manager.items.forEach(
      function (item) {

        const listItem =
          document.createElement("li");

        const link =
          document.createElement("a");


        link.classList.add(
          "staff-items-link"
        );

        link.href =
          item.href;

        link.textContent =
          item.title;


        listItem.appendChild(
          link
        );

        modalItems.appendChild(
          listItem
        );

      }
    );

  }


  return true;

}


/* ========================================
   34. 管理人モーダルを開く
======================================== */

function openStaffModal(
  managerKey,
  clickedButton
) {

  if (
    !staffModal ||
    !staffModalBackdrop
  ) {
    return;
  }


  /*
    対応する管理人データがなければ開かない
  */

  const managerExists =
    setManagerInformation(
      managerKey
    );

  if (!managerExists) {
    return;
  }


  /*
    メニューが開いている場合は、
    先に閉じる
  */

  closeMenu();


  /*
    押された管理人ボタンを保存
  */

  if (clickedButton) {

    lastFocusedManagerButton =
      clickedButton;

  }


  staffModal.classList.add(
    "is-open"
  );

  staffModalBackdrop.classList.add(
    "is-open"
  );

  staffModal.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
    背景ページのスクロールを止める
  */

  document.body.classList.add(
    "staff-modal-open"
  );


  /*
    モーダル表示後、
    閉じるボタンへ操作位置を移動する
  */

  window.requestAnimationFrame(
    function () {

      if (staffModalClose) {

        staffModalClose.focus();

      }

    }
  );

}


/* ========================================
   35. 管理人モーダルを閉じる
======================================== */

function closeStaffModal() {

  if (staffModal) {

    staffModal.classList.remove(
      "is-open"
    );

    staffModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (staffModalBackdrop) {

    staffModalBackdrop.classList.remove(
      "is-open"
    );

  }


  document.body.classList.remove(
    "staff-modal-open"
  );


  /*
    モーダルを開く前に押した
    管理人ボタンへ操作位置を戻す
  */

  if (lastFocusedManagerButton) {

    lastFocusedManagerButton.focus();

    lastFocusedManagerButton = null;

  }

}


/* ========================================
   36. 管理人カードのクリック処理
======================================== */

managerButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const managerKey =
          button.dataset.manager;

        openStaffModal(
          managerKey,
          button
        );

      }
    );

  }
);


/* ========================================
   37. モーダルの閉じるボタン
======================================== */

if (staffModalClose) {

  staffModalClose.addEventListener(
    "click",
    closeStaffModal
  );

}


/* ========================================
   38. モーダル背景のクリック処理
======================================== */

if (staffModalBackdrop) {

  staffModalBackdrop.addEventListener(
    "click",
    closeStaffModal
  );

}


/* ========================================
   39. Escapeキーの共通処理
======================================== */

/*
  Escapeキーを押したときは、

  1. 管理人モーダル
  2. ハンバーガーメニュー

  の優先順で閉じる
*/

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key !== "Escape") {
      return;
    }


    /*
      管理人モーダルが開いている場合
    */

    if (isStaffModalOpen()) {

      closeStaffModal();

      return;

    }


    /*
      メニューが開いている場合
    */

    if (isMenuOpen()) {

      closeMenu();

    }

  }
);


/* ========================================
   40. ページ復元時にメニューとモーダルを閉じる
======================================== */

/*
  詳細ページからブラウザバックしたときに、
  メニューやモーダルの開いた状態が
  キャッシュから復元されることを防ぐ
*/

window.addEventListener(
  "pageshow",
  function () {

    closeMenu();


    /*
      フォーカスを戻す必要はないため、
      一度保存を解除してからモーダルを閉じる
    */

    lastFocusedManagerButton = null;

    closeStaffModal();

  }
);

/* ========================================
   41. Screen3スライダーの基本要素
======================================== */

const screen3Slider =
  document.querySelector(
    ".screen3-slider"
  );

const screen3SliderTrack =
  document.querySelector(
    ".screen3-slider__track"
  );

const screen3Slides =
  Array.from(
    document.querySelectorAll(
      ".screen3-slide"
    )
  );


/*
  スライダーの現在位置
*/

let screen3SlideIndex = 0;


/*
  自動切り替え用タイマー
*/

let screen3SliderInterval = null;


/*
  ループ位置を戻すためのタイマー
*/

let screen3SliderResetTimer = null;


/*
  スライドが切り替わる間隔

  4000 = 4秒
*/

const screen3SliderDelay = 4000;


/*
  スライド移動にかける時間

  CSSのtransitionにも使用する
*/

const screen3SliderDuration = 1200;


/* ========================================
   42. スライダーが使用可能か確認
======================================== */

function canUseScreen3Slider() {

  return (
    screen3Slider &&
    screen3SliderTrack &&
    screen3Slides.length > 1
  );

}


/* ========================================
   43. スライダーの移動量を取得
======================================== */

/*
  track全体に対する割合で移動する

  画像が4枚なら、

  0枚目  0%
  1枚目 -25%
  2枚目 -50%
  3枚目 -75%

  となる
*/

function getScreen3SlidePosition(
  slideIndex
) {

  if (screen3Slides.length === 0) {
    return 0;
  }

  return (
    slideIndex *
    (
      100 /
      screen3Slides.length
    )
  );

}


/* ========================================
   44. スライダーのtransitionを設定
======================================== */

function enableScreen3SliderTransition() {

  if (!screen3SliderTrack) {
    return;
  }

  screen3SliderTrack.style.transition =
    `transform ${screen3SliderDuration}ms ` +
    "cubic-bezier(0.76, 0, 0.24, 1)";

}


/* ========================================
   45. スライダーのtransitionを解除
======================================== */

function disableScreen3SliderTransition() {

  if (!screen3SliderTrack) {
    return;
  }

  screen3SliderTrack.style.transition =
    "none";

}


/* ========================================
   46. 指定した位置へスライド
======================================== */

function moveScreen3Slider(
  slideIndex,
  useAnimation = true
) {

  if (!canUseScreen3Slider()) {
    return;
  }


  if (useAnimation) {

    enableScreen3SliderTransition();

  } else {

    disableScreen3SliderTransition();

  }


  const slidePosition =
    getScreen3SlidePosition(
      slideIndex
    );


  screen3SliderTrack.style.transform =
    `translate3d(-${slidePosition}%, 0, 0)`;

}


/* ========================================
   47. 先頭と最後の画像が同じか確認
======================================== */

/*
  HTML側で最後に先頭画像の複製を置いている場合、
  最後の画像まで移動したあとに
  アニメーションなしで先頭へ戻す
*/

function hasClonedFirstSlide() {

  if (screen3Slides.length < 2) {
    return false;
  }


  const firstImage =
    screen3Slides[0].querySelector("img");

  const lastImage =
    screen3Slides[
      screen3Slides.length - 1
    ].querySelector("img");


  if (
    !firstImage ||
    !lastImage
  ) {
    return false;
  }


  /*
    img.srcは絶対URLへ変換されるため、
    相対パスの違いに影響されにくい
  */

  return (
    firstImage.src ===
    lastImage.src
  );

}


/* ========================================
   48. スライダーを先頭へ瞬時に戻す
======================================== */

function resetScreen3SliderToBeginning() {

  if (!canUseScreen3Slider()) {
    return;
  }


  if (screen3SliderResetTimer) {

    window.clearTimeout(
      screen3SliderResetTimer
    );

    screen3SliderResetTimer = null;

  }


  screen3SlideIndex = 0;

  disableScreen3SliderTransition();

  moveScreen3Slider(
    screen3SlideIndex,
    false
  );


  /*
    ブラウザにtransitionなしの状態を
    一度反映させる
  */

  void screen3SliderTrack.offsetWidth;

}


/* ========================================
   49. 次の画像へ進む
======================================== */

function showNextScreen3Slide() {

  if (!canUseScreen3Slider()) {
    return;
  }


  const lastSlideIndex =
    screen3Slides.length - 1;


  screen3SlideIndex += 1;


  /*
    最後に先頭画像の複製がある場合
  */

  if (hasClonedFirstSlide()) {

    moveScreen3Slider(
      screen3SlideIndex,
      true
    );


    /*
      複製された最後の画像まで移動したら、
      アニメーション終了後に先頭へ戻す
    */

    if (
      screen3SlideIndex ===
      lastSlideIndex
    ) {

      if (screen3SliderResetTimer) {

        window.clearTimeout(
          screen3SliderResetTimer
        );

      }


      screen3SliderResetTimer =
        window.setTimeout(
          function () {

            resetScreen3SliderToBeginning();

            screen3SliderResetTimer = null;

          },
          screen3SliderDuration + 50
        );

    }


    return;

  }


  /*
    複製画像がない場合は、
    最後から先頭へ通常移動する
  */

  if (
    screen3SlideIndex >
    lastSlideIndex
  ) {

    screen3SlideIndex = 0;

  }


  moveScreen3Slider(
    screen3SlideIndex,
    true
  );

}


/* ========================================
   50. Screen3スライダーを停止
======================================== */

function stopScreen3Slider() {

  if (screen3SliderInterval) {

    window.clearInterval(
      screen3SliderInterval
    );

    screen3SliderInterval = null;

  }


  if (screen3SliderResetTimer) {

    window.clearTimeout(
      screen3SliderResetTimer
    );

    screen3SliderResetTimer = null;

  }

}


/* ========================================
   51. Screen3スライダーを開始
======================================== */

function startScreen3Slider() {

  if (!canUseScreen3Slider()) {
    return;
  }


  /*
    多重起動を防ぐ
  */

  stopScreen3Slider();


  /*
    開始時は必ず最初の画像へ戻す

    詳細ページからブラウザバックした場合も、
    中途半端なtransformを引き継がない
  */

  resetScreen3SliderToBeginning();


  /*
    タブが非表示なら、
    表示されるまで開始しない
  */

  if (document.hidden) {
    return;
  }


  screen3SliderInterval =
    window.setInterval(
      showNextScreen3Slide,
      screen3SliderDelay
    );

}


/* ========================================
   52. タブ表示状態に応じて停止・再開
======================================== */

/*
  別のタブを見ている間もスライダーが進み続けると、
  戻った瞬間に位置が飛ぶことがあるため停止する
*/

document.addEventListener(
  "visibilitychange",
  function () {

    if (document.hidden) {

      stopScreen3Slider();

      return;

    }


    /*
      Screen3が表示可能な状態なら再開する
  */

    if (
      returnToHome ||
      hasOpeningPlayed()
    ) {

      startScreen3Slider();

    }

  }
);


/* ========================================
   53. ページを離れるときにタイマーを停止
======================================== */

window.addEventListener(
  "pagehide",
  function () {

    clearOpeningSliderStartTimer();

    stopScreen3Slider();

  }
);


/* ========================================
   54. 画面サイズ変更時の位置補正
======================================== */

window.addEventListener(
  "resize",
  function () {

    if (!canUseScreen3Slider()) {
      return;
    }


    /*
      サイズ変更時はアニメーションさせず、
      現在の画像位置を再計算する
  */

    moveScreen3Slider(
      screen3SlideIndex,
      false
    );

  }
);