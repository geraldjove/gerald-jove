$(document).ready(function () {
  const projectListItems = $("projects-list-item");

  projectListItems.map(function (index, project) {
    console.log(
      "Image " +
        (index + 1) +
        ": " +
        $(project).find(".gallery-grid-background-image").attr("src")
    );

    console.log(
      " URL " +
        (index + 1) +
        ": " +
        $(project).find(".gallery-grid-link").attr("href")
    );
  });
});
