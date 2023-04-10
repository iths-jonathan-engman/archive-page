async function getData() {
  const response = await fetch('https://gist.githubusercontent.com/andreasnylin/161dae2fc8a807d1a858bb6eec965b0e/raw/56fb3e8f24cb6934bd22f2db8f9a8a9409e4d140/data.json');
  const responseData = await response.json();
  return responseData.items;
}

function createArchiveCard(item) {
  const $archiveCard = $("<div/>", { class: "archiveCard skeleton" });

  const $archiveImg = $("<img/>", { class: "archiveImg", text: 'img', src: (item.enclosure ? item.enclosure : 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80') });
  const $archiveInnerWrap = $("<div/>", { class: "archiveInnerWrap" });
  const $archiveDate = $("<span/>", { class: "archiveDate", text: item.pubDate.slice(0, -14) });
  const $archiveTitle = $("<h2/>", { class: "archiveTitle", text: item.title });
  const $archiveTitleLink = $("<a/>", { class: "archiveTitleLink", href: item.link });
  const $archiveDescriptionWrap = $("<div/>", { class: "archiveDescriptionWrap" });
  const $archiveDescription = $("<p/>", { class: "archiveDescription", text: item.description });

  $archiveCard.append($archiveImg, $archiveInnerWrap.append($archiveDate, $archiveTitleLink.append($archiveTitle), $archiveDescriptionWrap.append($archiveDescription)));

  return $archiveCard;
}

async function render() {
  const list = await getData();

  function checkDescHeight() {
    $(".archiveCard .archiveDescription").each((i, descHeight) => {
      if ($(descHeight).height() > 90) {
        $(descHeight).parents(".archiveCard").addClass("readMoreDesc");
        $(descHeight).parents(".archiveDescriptionWrap").append('<span class="toggleDesc"></span>');
      }
   });
  };

  function removeSkeletonLoading() {
    setTimeout(() => {
      const allSkeleton = document.querySelectorAll(".archiveCard.skeleton"); // Select only the archive cards with the "skeleton" class
      allSkeleton.forEach(item => {
        item.classList.remove("skeleton");
      });
    }, 800);
  }

  function filterAndRender(selectedYear, list) {
    if (!selectedYear) {
      $(".archiveList").empty();
      list.forEach(item => {
        const $archiveCard = createArchiveCard(item);
        $(".archiveList").append($archiveCard);
      });
      checkDescHeight();
      removeSkeletonLoading()
      return;
    }

    const filteredList = list.filter(item => {
      const date = new Date(item.pubDate);
      return date.getFullYear() === selectedYear;
    });

    filteredList.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return dateB - dateA;
    });

    $(".archiveList").empty();

    filteredList.forEach(item => {
      const $archiveCard = createArchiveCard(item);
      $(".archiveList").append($archiveCard);
    });

    checkDescHeight();
    removeSkeletonLoading()
  }

  const uniqueYears = [...new Set(list.map(item => new Date(item.pubDate).getFullYear()))];

  const $filterDropdown = $('.filterDropdown select');
  uniqueYears.forEach(year => {
    $filterDropdown.append($('<option>', { value: year, text: year }));
  });

  $('.filterBtn').on('click', function () {
    const selectedYear = parseInt($('.filterDropdown select').val());
    filterAndRender(selectedYear, list);
  });

  $(document).on( 'click', '.toggleDesc', function () {
    $(this).parents(".archiveDescriptionWrap").toggleClass("open");
  });

  $('.archiveList').data('list', list);

  list.forEach(item => {
    const $archiveCard = createArchiveCard(item);
    $(".archiveList").append($archiveCard);

  });

  setTimeout(() => {
    checkDescHeight();
  }, 800);

  removeSkeletonLoading()
}

render();