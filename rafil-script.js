////////////////////////////////////////////////////////////
// Footer menu

document.querySelectorAll(".footer_subheading_wrap").forEach((item) => {
  item.addEventListener("click", () => {
    // Get the corresponding link list
    const linkList = item.nextElementSibling; // Assuming the link list is the next sibling

    // Collapse all other link lists
    document.querySelectorAll(".footer_link_list").forEach((otherLinkList) => {
      if (otherLinkList !== linkList) {
        otherLinkList.classList.remove("show"); // Remove show class
        otherLinkList.style.opacity = "0"; // Set opacity to 0
      }
    });

    // Remove is-current class from all icons
    document.querySelectorAll(".footer_icon").forEach((icon) => {
      icon.classList.remove("is-current");
    });

    // Toggle the clicked accordion
    if (linkList.classList.contains("show")) {
      linkList.classList.remove("show"); // Remove show class
      linkList.style.opacity = "0"; // Set opacity to 0 when collapsing
    } else {
      linkList.classList.add("show"); // Add show class
      linkList.style.opacity = "1"; // Set opacity to 1 when expanding
      // Add is-current class to the clicked icon
      item.querySelector(".footer_icon").classList.add("is-current");
    }
  });
});

////////////////////////////////////////////////////////////
// Mobible menu

const navButton = document.querySelector(".nav_button_menu");
const navRight = document.querySelector(".nav_right");

navButton.addEventListener("click", () => {
  if (navRight.style.display === "none" || navRight.style.display === "") {
    // Open the menu
    navRight.style.display = "flex";
    gsap.fromTo(
      navRight,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    document.body.style.overflow = "hidden"; // Prevent scrolling
  } else {
    // Close the menu
    gsap.to(navRight, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        navRight.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
      },
    });
  }
});

////////////////////////////////////////////////////////////
// Color nested counter

document.addEventListener("DOMContentLoaded", function () {
  // Select the Collection List and the text element
  const collectionItems = document.querySelectorAll(
    ".product_color_list .w-dyn-item"
  ); // Replace with your Collection List class
  const itemCountElement = document.querySelector(".color_item_number"); // Replace with your text element class

  // Count the items and update the text element
  const itemCount = collectionItems.length;
  itemCountElement.textContent = `(${itemCount})`;
});

////////////////////////////////////////////////////////////
// Read time counter

const wordsPerMinute = 200;
const secondsPerImage = 10;

const cards = document.querySelectorAll(
  ".articles_item, .article_contain, .guides_item"
);

for (const card of cards) {
  const blogPostHome = card.querySelector(".article_rtb");
  const words = blogPostHome.textContent.split(" ").length;
  const images = blogPostHome.getElementsByTagName("img").length;

  const totalMinutes = Math.floor(
    words / wordsPerMinute + (images * secondsPerImage) / 60
  );
  const totalSeconds = (words / wordsPerMinute) * 60 + images * secondsPerImage;

  const readTimeDiv = card.querySelector(".read_time_label");

  if (totalSeconds < 60) {
    readTimeDiv.textContent = `Przeczytasz w 1 min`;
  } else if (totalMinutes === 1) {
    readTimeDiv.textContent = `Przeczytasz w 1 min`;
  } else {
    readTimeDiv.textContent = `Przeczytasz w ${totalMinutes} min`;
  }
}

////////////////////////////////////////////////////////////
// Footerdata

document.addEventListener("DOMContentLoaded", function () {
  const yrSpan = document.querySelector(".footer_credit-year");
  const currentYr = new Date().getFullYear();
  yrSpan.textContent = currentYr;
});

////////////////////////////////////////////////////////////
// Breadcrumb mobile

document.addEventListener("DOMContentLoaded", function () {
  const maxCharacters = 16; // Set your character limit
  const targets = document.querySelectorAll(".truncate-text");

  targets.forEach((target) => {
    const text = target.textContent;
    if (text.length > maxCharacters) {
      target.textContent = text.substring(0, maxCharacters) + "...";
    }
  });
});

////////////////////////////////////////////////////////////
// MAIN SLIDER CODE

$(".hero_slider").each(function () {
  let childArrow = $(this).find(".hero_slider_link");
  let childItems = $(this).find(".hero_slider_item").hide();
  let childDots = $(this).find(".slider_dot_item");
  let totalSlides = childItems.length;
  let activeIndex = 0;

  childItems.first().css("display", "grid");
  gsap.set(childDots.eq(0).find(".slider_dot_line"), { x: "0%" });

  // DOT LINES
  let tl2 = gsap.timeline({ repeat: -1 });
  childDots.each(function (index) {
    tl2.addLabel(`step${index}`);
    tl2.to($(this).find(".slider_dot_line"), {
      // width: "100%",
      scaleX: "1.0",
      ease: "none",
      duration: 5,
      onComplete: () => {
        goNext(index + 1);
      },
    });
  });

  // MAIN SLIDER CODE
  function moveSlide(nextIndex, forwards) {
    let tl3 = gsap.timeline();
    tl3.set(childDots.eq(nextIndex).find(".slider_dot_line"), { x: "0%" });
    tl3.fromTo(
      childDots.eq(activeIndex).find(".slider_dot_line"),
      { x: "0%" },
      { x: "100%" }
    );

    tl2.seek(`step${nextIndex}`);

    let titleFrom = -100;
    let titleDelay = "<";
    if (forwards) {
      titleFrom = 100;
      titleDelay = "<50%";
    }
    //
    childItems.hide();
    let prevItem = childItems.eq(activeIndex).css("display", "grid");
    let nextItem = childItems.eq(nextIndex).css("display", "grid");
    let tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
    if (forwards) {
      tl.fromTo(nextItem, { opacity: 0 }, { opacity: 1 });
      tl.fromTo(prevItem, { opacity: 1 }, { opacity: 0 }, "<");
    } else {
      tl.fromTo(nextItem, { opacity: 0 }, { opacity: 1 });
      tl.fromTo(prevItem, { opacity: 1 }, { opacity: 0 }, "<");
    }
    tl.fromTo(
      nextItem.find(".slider_cms_title .char"),
      { yPercent: titleFrom },
      { yPercent: 0, duration: 0.5, stagger: { amount: 0.5 } },
      titleDelay
    );

    activeIndex = nextIndex;
  }

  // ARROWS
  function goNext(num) {
    let nextIndex = num;
    if (nextIndex > totalSlides - 1) nextIndex = 0;
    moveSlide(nextIndex, true);
  }
  // go next
  childArrow.filter(".is-next").on("click", function () {
    goNext(activeIndex + 1);
  });
  // go prev
  childArrow.filter(".is-prev").on("click", function () {
    let nextIndex = activeIndex - 1;
    if (nextIndex < 0) nextIndex = totalSlides - 1;
    moveSlide(nextIndex, false);
  });

  // CLICK OF DOTS
  childDots.on("click", function () {
    let dotIndex = $(this).index();
    if (activeIndex > dotIndex) {
      moveSlide(dotIndex, false);
    } else if (activeIndex < dotIndex) {
      moveSlide(dotIndex, true);
    }
  });
});
