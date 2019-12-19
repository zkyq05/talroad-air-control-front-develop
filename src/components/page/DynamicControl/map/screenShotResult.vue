
<template>
 <div id="screenshotDiv" class="hide">
    <img class="js-screenshot-image" />
    <div>
      <label>设置图片的文字: </label
      ><input type="text" placeholder="Image text" id="textInput" autofocus />
    </div>
    <button
      id="downloadBtn"
      class="action-button"
      aria-label="Download image"
      title="下载图片"
    >
      下载图片
    </button>
    <button
      id="closeBtn"
      class="action-button"
      aria-label="Back to webscene"
      title="返回"
    >
    关闭窗口
    </button>
  </div>
</template>

<script>

export default {
  name: 'screenShotResult',
  props: { 
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  },
  methods:{
      //截图工具

  }
}
</script>

<style lang="less" scoped>
#screenshotDiv {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .hide {
    display: none;
  }

  img {
    border: 10px solid white;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  }

  #screenshotDiv > * {
    margin: 0.5em;
  }
  .action-button {
    padding: 0.6em;
    border: 1px solid #0079c1;
    text-align: center;
    background-color: white;
    cursor: pointer;
  }

  .action-button:hover,
  .action-button:focus {
    background: #0079c1;
    color: white;
  }
</style>
