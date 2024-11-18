// header
const header = document.querySelector('header');
const sec1 = document.querySelector('.sec1');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    if (window.scrollY >= sec1.offsetTop) {
        if (window.scrollY > lastScrollY) {
            header.style.top = "-180px";
        } else {
        header.style.top = "0";
        }
    }
    lastScrollY = window.scrollY;
});



// .front5(community)
const feedList = document.querySelector('.feed_list');
const feeds = document.querySelectorAll('.feed');
const gap = 8;

function masonLayout() {
  const columnCount = Math.floor(feedList.offsetWidth / (feeds[0].offsetWidth + gap));
  const columns = new Array(columnCount).fill(0);

  feeds.forEach((feed, index) => {
    const column = index % columnCount;

    feed.style.top = columns[column] + 'px';
    feed.style.left = `${column * (feed.offsetWidth + gap)}px`;

    columns[column] += feed.offsetHeight + gap;
  });

  feedList.style.height = `${Math.max(...columns)}px`;
  
  const totalWidth = columnCount * (feeds[0].offsetWidth + gap) - gap;
  const marginLeft = (feedList.offsetWidth - totalWidth) / 2;

  feedList.style.marginLeft = `${marginLeft}px`;
}
window.addEventListener('load', masonLayout);
window.addEventListener('resize', masonLayout);



// footer > .time_box
function updateTime() {
  const now = new Date();

  // UTC
  const utcYear = now.getUTCFullYear();
  const utcMonth = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const utcDate = now.getUTCDate().toString().padStart(2, '0');
  const utcHours = now.getUTCHours().toString().padStart(2, '0');
  const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
  const utcSeconds = now.getUTCSeconds().toString().padStart(2, '0');
  const utcTime = `${utcYear}.${utcMonth}.${utcDate} ${utcHours}:${utcMinutes}:${utcSeconds}`;

  // KST
  const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC에 9시간을 더한 시간
  const kstYear = kstDate.getUTCFullYear();
  const kstMonth = (kstDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const kstDay = kstDate.getUTCDate().toString().padStart(2, '0');
  const kstHours = kstDate.getUTCHours().toString().padStart(2, '0');
  const kstMinutes = kstDate.getUTCMinutes().toString().padStart(2, '0');
  const kstSeconds = kstDate.getUTCSeconds().toString().padStart(2, '0');
  const kstTime = `${kstYear}.${kstMonth}.${kstDay} ${kstHours}:${kstMinutes}:${kstSeconds}`;

  document.getElementById("utc_time").textContent = utcTime;
  document.getElementById("kst_time").textContent = kstTime;
}
updateTime();
setInterval(updateTime, 1000);