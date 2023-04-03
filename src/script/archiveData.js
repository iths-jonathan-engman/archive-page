// Define an async function to get the data
async function getData() {
  const response = await fetch('https://gist.githubusercontent.com/andreasnylin/161dae2fc8a807d1a858bb6eec965b0e/raw/56fb3e8f24cb6934bd22f2db8f9a8a9409e4d140/data.json');
  const responseData = await response.json();
  return responseData.items;
}

// Define a function to create archive cards
function createArchiveCard(item) {
  const $archiveCard = $("<div/>", { class: "archiveCard" });

  const $archiveImg = $("<img/>", { class: "archiveImg", text: 'img', src: (item.enclosure ? item.enclosure : 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80') });
  const $archiveInnerWrap = $("<div/>", { class: "archiveInnerWrap" });
  const $archiveDate = $("<span/>", { class: "archiveDate", text: item.pubDate });
  const $archiveTitle = $("<h2/>", { class: "archiveTitle", text: item.title });
  const $archiveTitleLink = $("<a/>", { class: "archiveTitleLink", href: item.link });
  const $archiveDescription = $("<p/>", { class: "archiveDescription", text: item.description });

  $archiveCard.append($archiveImg, $archiveInnerWrap.append($archiveDate, $archiveTitleLink.append($archiveTitle), $archiveDescription));

  return $archiveCard;
}

// Define an async function to render the archive
async function render() {
  // Get the data
  const list = await getData();

  // Define a function to filter and render archive cards based on the selected year
  function filterAndRender(selectedYear, list) {
    // If selected year is empty, render all cards
    if (!selectedYear) {
      $(".archiveList").empty();
      list.forEach(item => {
        const $archiveCard = createArchiveCard(item);
        $(".archiveList").append($archiveCard);
      });
      return;
    }

    // Filter the items based on the selected year
    const filteredList = list.filter(item => {
      const date = new Date(item.pubDate);
      return date.getFullYear() === selectedYear;
    });

    // Sort the filtered items in descending order based on the publication date
    filteredList.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return dateB - dateA;
    });

    // Clear the archive list
    $(".archiveList").empty();

    // Render the archive cards for the filtered items
    filteredList.forEach(item => {
      const $archiveCard = createArchiveCard(item);
      $(".archiveList").append($archiveCard);
    });
  }

  // Get the unique years from the data
  const uniqueYears = [...new Set(list.map(item => new Date(item.pubDate).getFullYear()))];

  // Populate the filter dropdown with the unique years
  const $filterDropdown = $('.filterDropdown select');
  uniqueYears.forEach(year => {
    $filterDropdown.append($('<option>', { value: year, text: year }));
  });

  // Add a change event listener to the filter dropdown
  // $filterDropdown.on('change', function () {
  //   const selectedYear = parseInt($(this).val());
  //   filterAndRender(selectedYear, list);
  // });

  // Add a click event listener to the filter button
  $('.filterBtn').on('click', function () {
    // Get the selected year from the filter dropdown
    const selectedYear = parseInt($('.filterDropdown select').val());

    // Filter and render the archive cards for the selected year
    filterAndRender(selectedYear, list);
  });

  // Store the list of items in the archiveList container
  $('.archiveList').data('list', list);

  // Render the archive cards for the initial data
  list.forEach(item => {
    const $archiveCard = createArchiveCard(item);
    $(".archiveList").append($archiveCard);
  });
}

// Call the render function
render();