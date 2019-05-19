// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log(sender);

  const url = document.URL;
  // `ImgBlkFront` or `ebooksImgBlkFront`
  const imageUrl = (document.querySelectorAll(
    "[id*=mgBlkFront]"
  )[0] as HTMLImageElement).src;
  // `productTitle` or `ebooksProductTitle`
  const title = (document.querySelectorAll(
    "[id*=roductTitle]"
  )[0] as HTMLSpanElement).textContent;

  sendResponse({ url, title, imageUrl });
});
