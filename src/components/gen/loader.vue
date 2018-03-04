<template>
  <div>
    <div class="preloader-icon-container" >
      <div class="pre-icon" style="background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMy45NzcsMTZjMCw0LjUwNi0zLjY1MSw4LjE2LTguMTYxLDguMTZjLTQuNTA3LDAtOC4xNi0zLjY1NC04LjE2LTguMTZzMy42NTItOC4xNiw4LjE1OS04LjE2QzIwLjMyMiw3Ljg0LDIzLjk3NywxMS40OTQsMjMuOTc3LDE2Ii8+PHBhdGggZD0iTTMxLjgwMywxNi4yNGMwLTAuODc0LTIuOTg0LTEuNjM5LTcuNDYtMi4wNjhjLTAuODQ0LTMuOTM1LTQuMzQ1LTYuODk1LTguNTI3LTYuODk1Yy00LjE5NiwwLTcuNzA3LDIuOTc4LTguNTM2LDYuOTMxYy00LjI2NiwwLjQzOC03LjA4MywxLjE4My03LjA4MywyLjAzMmMwLDAuODYxLDIuOTA2LDEuNzc3LDcuMjgzLDIuMzI3YzEuMDk4LDMuNTYxLDQuNDE5LDYuMTU1LDguMzM2LDYuMTU1YzMuOSwwLDcuMjA4LTIuNTcyLDguMzIyLTYuMTA5QzI4LjcyNiwxOC4wNywzMS44MDMsMTcuMTI2LDMxLjgwMywxNi4yNHogTTE1LjgxNiw4LjQwMmM0LjE4OCwwLDcuNTk3LDMuNDA5LDcuNTk4LDcuNTk5YzAsMC41MTYtMC4wNTMsMS4wMTktMC4xNTEsMS41MDZjLTIuMDg5LDAuMTU2LTQuNTgxLDAuMjQ3LTcuMjYzLDAuMjQ3Yy0yLjg0NCwwLTUuNDc0LTAuMTAzLTcuNjM2LTAuMjc1QzguMjcsMTcsOC4yMTgsMTYuNTA3LDguMjE4LDE2LjAwMUM4LjIxOCwxMS44MSwxMS42MjcsOC40MDIsMTUuODE2LDguNDAyeiBNMi43MDgsMTYuMjRjMC0wLjQ0OCwxLjcxOS0wLjg0OSw0LjQzLTEuMTI2Yy0wLjAyOSwwLjI5Mi0wLjA0NSwwLjU4Ny0wLjA0NSwwLjg4N2MwLDAuNDY4LDAuMDQ4LDAuOTI1LDAuMTE5LDEuMzczQzQuNDU2LDE3LjA5NywyLjcwOCwxNi42OTIsMi43MDgsMTYuMjR6IE0xNS44MTYsMjMuNTk4Yy0zLjIzNCwwLTUuOTk2LTIuMDM1LTcuMDktNC44ODhjMi4xNzgsMC4yMjUsNC42NDgsMC4zNiw3LjI3NCwwLjM2YzIuNDc1LDAsNC44MDctMC4xMjIsNi44OTMtMC4zMjRDMjEuNzg4LDIxLjU4LDE5LjAzNSwyMy41OTgsMTUuODE2LDIzLjU5OHogTTI0LjQxNCwxNy40MTJjMC4wNzUtMC40NjEsMC4xMjUtMC45MywwLjEyNS0xLjQxMWMwLTAuMzEyLTAuMDE4LTAuNjItMC4wNS0wLjkyM2MyLjkyNiwwLjI3Nyw0LjgwMywwLjY5NCw0LjgwMywxLjE2MkMyOS4yOTIsMTYuNzEzLDI3LjM5MSwxNy4xMzQsMjQuNDE0LDE3LjQxMnoiLz48L2c+PC9zdmc+)">
      </div>
    </div>
  </div>
</template>
<style scoped>
  .pre-icon {
    width: 32px !important;
    height: 32px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    -webkit-animation: rotating 1s linear infinite !important;
    -moz-animation: rotating 1s linear infinite !important;
    -ms-animation: rotating 1s linear infinite !important;
    -o-animation: rotating 1s linear infinite !important;
    animation: rotating 1s linear infinite !important;
  }
  .preloader-icon-container {
    position: fixed !important;
    top: 0  !important;
    left: 0 !important;
    z-index: 9999999 !important;
    width: 100% !important;
    height: 100% !important;
    display: -webkit-flex !important;
    display: -moz-flex !important;
    display: -ms-flex !important;
    display: -o-flex !important;
    display: flex !important;
    justify-content: center !important;
    -ms-align-items: center !important;
    align-items: center !important;
    background: #ffffff !important;
  }
</style>
