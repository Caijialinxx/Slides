let header = $('header'),
  loopID = intervalSlide('loop'), loopN = 0,
  loopImgItems = $('#loop .images').find('img'),
  loopBtnItems = $('#loop .items').find('span'),
  thumbID = intervalSlide('thumb'), thumbN = 0,
  thumbWinWidth = $('.thumbSlides_wrapper')[0].offsetWidth,
  thumbImgContainer = $('#thumb .images'),
  thumbBtnContainer = $('#thumbBtns'),
  thumbBtnItems = $('#thumbBtns').find('li')

/* Loop模式 */
$('#prev').click(() => { clickSlide(loopN - 2, 'loop') })
$('#next').click(() => { clickSlide(loopN, 'loop') })
loopBtnItems.click((e) => { clickSlide($(e.target).index() - 1, 'loop') })
$('#loop .images').mouseenter(() => { window.clearInterval(loopID) })
$('#loop .images').mouseleave(() => { loopID = intervalSlide('loop') })


/* 缩略图模式 */
thumbBtnItems.click((e) => { clickSlide($(e.target).index() - 1, 'thumb') })
$('#thumb .images').mouseenter(() => { window.clearInterval(thumbID) })
$('#thumb .images').mouseleave(() => { thumbID = intervalSlide('thumb') })

window.onresize = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    let loopWindowHeight = window.innerWidth / 1.5
    $('#loop .window').css({ height: loopWindowHeight })
  }
  thumbWinWidth = $('.thumbSlides_wrapper')[0].offsetWidth
}

window.onscroll = () => {
  window.pageYOffset > 0 ? header.addClass('float') : header.removeClass('float')
}

/* 以下是自定义函数 */
// 点击时的动画函数
function clickSlide(target_N, type) {
  if (type === 'loop') {
    window.clearInterval(loopID)
    loopN = target_N
    slide(type)
    loopID = intervalSlide(type)
  } else {
    window.clearInterval(thumbID)
    thumbN = target_N
    slide(type)
    thumbID = intervalSlide(type)
  }
}
// 循环播放
function intervalSlide(type) {
  return setInterval(() => {
    slide(type)
  }, 2000)
}
// 播放一次的动画函数
function slide(type) {
  if (type === 'loop') {
    // 上一张图standby
    loopImgItems.eq(which(loopN - 1)).removeClass('leave enter').addClass('standby')
    // 当前图leave
    loopImgItems.eq(which(loopN)).removeClass('enter standby').addClass('leave')
    // 下一张图enter
    loopImgItems.eq(which(loopN + 1)).removeClass('standby leave').addClass('enter')
    // 圆点随之变化
    loopBtnItems.eq(which(loopN + 1)).addClass('active').siblings('.active').removeClass('active')
    loopN++
  } else {
    thumbImgContainer.css({ transform: `translateX(${(thumbN + 1) * -thumbWinWidth}px)` })
    thumbBtnContainer.css({ transform: `translateX(${thumbN * -2.5}rem)` })
    thumbBtnItems.eq(thumbN + 1).addClass('active').siblings().removeClass('active')
    thumbN++
    if (thumbN > 1) {
      thumbN = -1
    }
  }
}
// 返回应该播放的第x张图
function which(index) {
  if (index < 0) { index += 3 }
  return index % 3
}