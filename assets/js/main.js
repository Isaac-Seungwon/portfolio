/**
* Template Name: Laura
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    // window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 300,
    loop: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry', // Masonry 레이아웃 모드 적용
        masonry: {
          columnWidth: '.portfolio-item',
          horizontalOrder: false,
          gutter: 25 // 간격 설정
        }
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// portfolio detail
document.addEventListener('DOMContentLoaded', function () {
  const portfolioItems = document.querySelectorAll('.portfolio .col-lg-4.portfolio-item');

  portfolioItems.forEach((item) => {
    if (window.innerWidth >= 576) {
      item.addEventListener('click', function (event) {
        // 기본 링크 동작 방지
        event.preventDefault();

        // 클릭한 포트폴리오 아이템에서 포트폴리오 번호 추출
        const portfolioNumber = item.getAttribute('data-portfolio-number');

        // 포트폴리오 번호를 사용하여 포트폴리오 상세 페이지 URL 생성
        const portfolioDetailURL = `portfolio-details${portfolioNumber}.html`;

        // URL로 이동
        window.location.href = portfolioDetailURL;
      });
    }

    // bx-plus 아이콘 클릭 이벤트 리스너를 추가
    const plusIcons = item.querySelectorAll('.portfolio-info .preview-link');
    plusIcons.forEach((icon) => {
      icon.addEventListener('click', function (event) {
        // 상위로 버블링 방지
        event.stopPropagation();
      });
    });
  });
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // 모바일 기기
  //console.log("현재 기기: 모바일");

  var prevButton = document.querySelector('.swiper-button-prev');
  var nextButton = document.querySelector('.swiper-button-next');

  if (prevButton && nextButton) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  }

} else {
  // 데스크탑 기기
  //console.log("현재 기기: 데스크탑");
  window.addEventListener("resize", resizeWordCloud);
}

/*
 * 별 생성
*/
const numstar = 400; // 별 개수
const space = document.querySelector('.space');

// 별 사이의 간격 계산
const getRandomInterval = () => {
  return Math.random() * 10 + 3;
};

// 별 생성 및 스타일 설정
for (let i = 0; i < numstar; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  const starize = Math.random() * 2 + 0.5;
  star.style.width = `${starize}px`;
  star.style.height = `${starize}px`;

  star.style.animationDuration = `${getRandomInterval()}s`;
  space.appendChild(star);
}

// 별 반짝임 효과
const twinklestar = () => {
  const star = document.querySelectorAll('.star');
  star.forEach(star => {
    star.style.animation = 'none';
    star.offsetHeight;
    star.style.animationDuration = `${getRandomInterval()}s`;
    star.style.animation = null;
  });
};

/*
 * 해와 달 생성
*/
let minus = 250;
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const content = document.querySelector('.content');
const windowHeight = window.innerHeight;
const contentTop = content.offsetTop - (windowHeight + 500 - minus);
const opacityTop = document.getElementById('resume').offsetTop - windowHeight;

const waveSun = document.getElementById('wave-sun');
const waveMoon = document.getElementById('wave-moon');

let moonOpacity = 0.9;
const opacityThreshold = opacityTop + 50;

// 해, 달, 파동 위치 업데이트
const updateWavePosition = () => {
  // 해와 달 위치
  const sunPosition = sun.getBoundingClientRect();
  const moonPosition = moon.getBoundingClientRect();

  // 파동의 위치
  waveSun.style.top = `${sunPosition.top - 400}px`;
  waveSun.style.left = `${sunPosition.left - 400}px`;

  waveMoon.style.top = `${moonPosition.top - 360}px`;
  waveMoon.style.left = `${moonPosition.left - 360}px`;
};

// 페이지 스크롤 시 애니메이션 업데이트
const updateWaveAnimation = () => {

  // 스크린 백분율 계산
  let scrollPercentage = window.scrollY / contentTop;
  let opacityPercentage = (window.scrollY - contentTop - 370 + minus) / (opacityTop - contentTop) * 10;

  scrollPercentage = Math.min(scrollPercentage, 1);
  opacityPercentage = Math.min(opacityPercentage, 1);

  // 각도 계산
  const angle = Math.PI * scrollPercentage;

  // 달 투명도
  moonOpacity = 0.9 - opacityPercentage;
  if (moonOpacity > 0.9) {
    moonOpacity = 0.9;
  }
  moon.style.opacity = moonOpacity;

  // 해와 달 위치 조정
  sun.style.top = `${50 - 40 * Math.cos(angle) + 70}%`;
  sun.style.left = `${50 + 40 * Math.sin(angle)}%`;
  moon.style.top = `${50 + 40 * Math.cos(angle) + 74}%`;
  moon.style.left = `${50 - 40 * Math.sin(angle)}%`;
  waveSun.style.transform = `rotate(${angle}rad) scaleY(${Math.sin(angle)}`;
  waveMoon.style.transform = `rotate(${angle}rad) scaleY(${Math.sin(angle)}`;

  // 달의 파동의 투명도
  let dynamicOpacity = 0.22 * moonOpacity;
  // console.log(moonOpacity + ', ' + dynamicOpacity);

  // 달의 투명도가 0인 경우
  if (moonOpacity > 0) {
    moon.style.pointerEvents = 'auto';
    waveMoon.style.background = `radial-gradient(circle, rgba(230, 230, 230, ${dynamicOpacity}) 0%, rgb(0, 0, 0, 0) 60%)`;

    // 달 클릭 이벤트
    moon.addEventListener('click', (event) => {
      window.open('https://isaac-christian.tistory.com/', '_blank');
    });
  } else {
    moon.style.pointerEvents = 'none';
    moon.style.opacity = 0;
    waveMoon.style.background = '#FFFFFF00';
  }

  updateWavePosition();

  // 페이지 스크롤 백분율에 따른 배경색 및 글자색 변경
  if (scrollPercentage > 0.5) {
    document.body.style.backgroundColor = '#011936';
  } else {
    document.body.style.backgroundColor = '#6395ED';
  }

  requestAnimationFrame(updateWaveAnimation);
};

updateWaveAnimation();

/**
 * 나이 계산
 */
function calculateAge() {
  const birthDate = new Date('2000-02-03'); // 출생 날짜
  const currentDate = new Date(); // 현재 날짜
  const ageInMilliseconds = currentDate - birthDate; // 밀리초 단위로 나이 차 계산
  const millisecondsPerYear = 3.15576e10; // 1년의 평균 밀리초
  const age = Math.floor(ageInMilliseconds / millisecondsPerYear); // 나이 계산

  return age;
}

// 나이 표시
const ageElement = document.getElementById('age');
if (ageElement) {
  const age = calculateAge();
  ageElement.textContent = age.toString();
}

/**
 * 타자기 타이핑 효과
 */
const typewriterText = document.getElementById('typewriter-text');
const texts = [
  'Developer Portfolio          ',
  'I\'m Passionate Developer          ',
  'I Enjoy Programming!          '
];

let textIndex = 0;
let textLength = 0;
let isDeleting = false;
let animationStarted = false;
let typingSpeed = 85; // 출력 속도
let deletingSpeed = 55; // 삭제 속도
let pauseDuration = 100; // 일시 정지

async function startTypewriter() {
  const currentText = texts[textIndex];

  // 타이핑
  while (!isDeleting && textLength <= currentText.length) {
    typewriterText.textContent = currentText.substring(0, textLength);
    textLength++;
    await sleep(typingSpeed);
  }

  // 일시정지
  await sleep(pauseDuration);

  // 삭제
  isDeleting = true;
  while (isDeleting && textLength >= 0) {
    typewriterText.textContent = currentText.substring(0, textLength);
    textLength--;
    await sleep(deletingSpeed);
  }

  // 다음 문장으로 이동
  if (textLength < 0) {
    textIndex = (textIndex + 1) % texts.length; // 텍스트 인덱스 증가
    textLength = 0;
    isDeleting = false;
    await sleep(pauseDuration); // 일시정지
  }

  // 다음 텍스트반복
  startTypewriter();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  if (!animationStarted && isInViewport(typewriterText)) {
    animationStarted = true;
    startTypewriter();
    window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

/*
 * 링크 말풍선
*/
function showTooltip(event, tooltipId) {
  const tooltip = document.getElementById(tooltipId);
  tooltip.style.display = 'block';
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
}

function hideTooltip(tooltipId) {
  const tooltip = document.getElementById(tooltipId);
  tooltip.style.display = 'none';
}

/*
 * 워드 클라우드
*/
const words = [
  { text: "Java", size: 60, color: "white", opacity: 1, tags: ["언어", "Java"] },
  { text: "SQL", size: 55, color: "white", opacity: 1, tags: ["데이터베이스", "SQL"] },
  { text: "R", size: 50, color: "white", opacity: 1, tags: ["언어", "R"] },
  { text: "C", size: 50, color: "white", opacity: 1, tags: ["언어", "C"] },
  { text: "C++", size: 50, color: "white", opacity: 1, tags: ["언어", "C++"] },
  { text: "Eclipse", size: 60, color: "white", opacity: 1, tags: ["도구", "Eclipse"] },
  { text: "Oracle", size: 60, color: "white", opacity: 1, tags: ["데이터베이스", "Oracle"] },
  { text: "VS Code", size: 40, color: "white", opacity: 1, tags: ["도구", "VSCode"] },
  { text: "DBeaver", size: 40, color: "white", opacity: 1, tags: ["도구", "DBeaver"] },
  { text: "Git", size: 55, color: "white", opacity: 1, tags: ["도구", "Git"] },
  { text: "Photoshop", size: 45, color: "white", opacity: 1, tags: ["도구", "Photoshop"] },
  { text: "Illustrator", size: 40, color: "white", opacity: 1, tags: ["도구", "Illustrator"] },
  { text: "Premiere Pro", size: 40, color: "white", opacity: 1, tags: ["도구", "Premiere Pro"] },
  { text: "JSP", size: 50, color: "white", opacity: 1, tags: ["언어", "JSP"] },
  { text: "Servlet", size: 45, color: "white", opacity: 1, tags: ["언어", "Servlet"] },
  { text: "JDBC", size: 45, color: "white", opacity: 1, tags: ["데이터베이스", "JDBC"] },
  { text: "Python", size: 40, color: "white", opacity: 1, tags: ["언어", "Python"] },
  { text: "HTML", size: 50, color: "white", opacity: 1, tags: ["언어", "HTML"] },
  { text: "CSS", size: 45, color: "white", opacity: 1, tags: ["언어", "CSS"] },
  { text: "JavaScript", size: 50, color: "white", opacity: 1, tags: ["언어", "JavaScript"] },
  { text: "Spring", size: 50, color: "white", opacity: 1, tags: ["프레임워크", "Spring"] },
  { text: "MyBatis", size: 45, color: "white", opacity: 1, tags: ["프레임워크", "MyBatis"] },
  { text: "jQuery", size: 45, color: "white", opacity: 1, tags: ["라이브러리", "jQuery"] },
  { text: "SPSS", size: 40, color: "white", opacity: 1, tags: ["통계 소프트웨어", "SPSS"] },
  { text: "AWS", size: 55, color: "white", opacity: 1, tags: ["클라우드", "AWS"] },
  { text: "jSoup", size: 40, color: "white", opacity: 1, tags: ["라이브러리", "jSoup"] },
  { text: "Selenium", size: 40, color: "white", opacity: 1, tags: ["프레임워크", "Selenium"] },
  { text: "SDL", size: 40, color: "white", opacity: 1, tags: ["라이브러리", "SDL"] },
  { text: "STS", size: 50, color: "white", opacity: 1, tags: ["도구", "STS"] },
  { text: "Restful API", size: 45, color: "white", opacity: 1, tags: ["라이브러리", "Restful API"] },
  { text: "Elasticsearch", size: 40, color: "white", opacity: 1, tags: ["라이브러리", "Elasticsearch"] },
  { text: "WSL", size: 40, color: "white", opacity: 1, tags: ["도구", "WSL"] },
];

const colorByTag = {
  "언어": "#f0cf65",
  "데이터베이스": "#bd4f6c",
  "도구": "#93b5c6",
  "프레임워크": "#d7816a",
  "라이브러리": "#ddedaa",
  "통계 소프트웨어": "#dee2e6",
  "클라우드": "#502e2e" // #af8b60 #482626 #643939
};

// 워드 클라우드 원본 색상 객체
const originalWordSizes = {};

function resizeWordCloud() {
  // 브라우저 창 너비, 높이
  const svgContainer = d3.select("#word-cloud-container");
  const width = window.innerWidth - 100;
  const height = window.innerHeight - 250;

  // 요소 초기화
  svgContainer.selectAll("*").remove();

  const svg = svgContainer
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("left", "50%")
    .style("top", "50%")
    .style("transform", "translate(-50%, -60%)")
    .attr("text-anchor", "middle")
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(words)
    .padding(5)
    .rotate(function () { return ~~(Math.random() * 2); })
    .font("'SBAggroB', Impact")
    .fontSize(function (d) {
      const originalSize = originalWordSizes[d.text];
      const newSize = (originalSize / 60) * (width / 20);
      const maxSize = originalSize;
      return Math.max(Math.min(newSize, maxSize), 30); // 최소 폰트 크기 30, 최대 폰트 크기 기존 크기
    })
    .on("end", draw);

  layout.start();

  function draw(words) {
    svg
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .attr("class", "word-cloud-text")
      .style("font-size", function (d) { return d.size + "px"; })
      .style("font-family", "'SBAggroB', 'Impact'")
      .style("fill", "transparent")
      .style("stroke", "white")
      .style("stroke-width", "0.2px")
      .style("opacity", function (d) { return d.opacity; })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return `translate(${d.x},${d.y})rotate(${d.rotate})`;
      })
      .text(function (d) { return d.text; })
      .on("mouseover", function () {
        if (!isOriginalColors) return;
        d3.select(this)
          .style("fill", function (d) { return colorByTag[d.tags[0]] || "white"; })
          .style("stroke", "transparent");
      })
      .on("mouseout", function () {
        if (!isOriginalColors) return;
        d3.select(this)
          .style("fill", "transparent")
          .style("stroke", "white");
      });
  }

  // 해 클릭 이벤트
  let isOriginalColors = true;

  sun.addEventListener("click", () => {
    const wordCloudTextElements = svg.selectAll(".word-cloud-text");
    wordCloudTextElements.each(function (d, i) {
      const wordCloudText = d3.select(this);
      setTimeout(function () {
        if (isOriginalColors) {
          wordCloudText
            .style("fill", "transparent")
            .style("stroke", "white");
        } else {
          wordCloudText
            .style("fill", function (d) { return colorByTag[d.tags[0]] || "white"; })
            .style("stroke", "transparent");
        }
      }, i * 20);
    });
    isOriginalColors = !isOriginalColors;
  });
}

// 초기 워드 클라우드 생성
if (Object.keys(originalWordSizes).length === 0) {

  // 각 단어의 원래 크기를 저장
  words.forEach(word => {
    originalWordSizes[word.text] = word.size;
  });

  setTimeout(resizeWordCloud, 300);
}
