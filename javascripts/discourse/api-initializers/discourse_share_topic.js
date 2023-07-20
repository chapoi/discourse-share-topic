import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  if (api.container.lookup("service:site").desktopView) {
    let position = "second";
    api.addPostMenuButton("copy", () => {
      return {
        action: "copyLink",
        icon: "d-post-share",
        className: "copy-link",
        title: themePrefix("copy_title"),
        position,
      };
    });

    api.attachWidgetAction("post", "copyLink", function () {
      let postUrl = this.attrs.shareUrl;
      let shareUrl = new URL(postUrl, window.origin).toString();
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          createAlert("Link copied!", "success");
        },
        () => {
          createAlert("Failed to copy link.", "fail");
        }
      );
    });
  }
});

function createAlert(message, type) {
  let alertDiv = document.createElement("div");
  alertDiv.className =
    "link-copied-alert" + (type === "success" ? " -success" : " -fail");
  alertDiv.textContent = message;

  document.body.appendChild(alertDiv);

  alertDiv.classList.add("is-visible");
  setTimeout(function () {
    alertDiv.classList.remove("is-visible");
  }, 1500);

  setTimeout(function () {
    document.body.removeChild(alertDiv);
  }, 2000);
}
