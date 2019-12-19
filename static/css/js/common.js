 $(function(){
  // 模态框关闭
  $('.modal-close').on("click",function(){
    $(".mask").fadeOut();
    $(this).parent().fadeOut();
  })
  // tooltip弹框关闭
  $('.is-close').on("click",function(){
    $(".mask").fadeOut();
    $(this).parents(".tooltip-wrap").fadeOut();
  })
  // 头部输入框
  $(".header .input-wrap .icon").click(function(){
    $(".header .input-wrap").addClass("is-open");
  });
  // 右侧参数 展开折叠
  $('.params-hd>.icon').on("click",function(){
    $(this).parent().parent().toggleClass("is-toggle");
  })
  // tab切换
  $('.tab-head>li').on("click",function(){
    var $index=$(this).index();
    // var $parent=$(this).parent().parent().parent();
    $(this).parent().children().removeClass("is-active");
    $(this).addClass("is-active");

    var $siblings=$(this).parent().parent().siblings(".tab-bd");
    $siblings.show();
    $siblings.children().hide();
    $siblings.children().eq($index).fadeIn();
  })
  $('.fold-toggle').on("click",function(){
    $(this).parent().toggleClass("is-toggle");
  })
  
  
})