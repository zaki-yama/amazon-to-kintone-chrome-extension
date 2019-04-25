// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log(sender);
  // `ImgBlkFront` or `ebooksImgBlkFront`
  const imgSrc = document.querySelectorAll("[id*=mgBlkFront]")[0];

  sendResponse({ message: 'response' });
});
