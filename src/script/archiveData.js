async function getData() {
  let response = await fetch ('https://gist.githubusercontent.com/andreasnylin/161dae2fc8a807d1a858bb6eec965b0e/raw/56fb3e8f24cb6934bd22f2db8f9a8a9409e4d140/data.json')

  let responseData = await response.json()

  // console.log(responseData)

  return responseData.items
}

async function render() {

  let list = await getData()

  console.log(list)
  console.log(list.description)
  for(let i = 0; i < list.length; i++) {
    // console.log(list[i]);
    // $document.createElement('div').appendTo('.archiveList');
    console.log('test')
    // $('.archiveList').html('<p> Name: ' + list[i].description + '</p>');
    // $('.archiveList').append('<p>Age : ' + list[i].title+ '</p>');
    // $('.archiveList').append('<p> Sex: ' + list[i].link+ '</p>');


    var $archiveCard = $("<div/>", { class: "archiveCard" }),
    $archiveImg = $("<img/>", { class: "archiveImg", text: 'img' }),

    $archiveInnerWrap = $("<div/>", { class: "archiveInnerWrap" }),

    $archiveDate = $("<span/>", { class: "archiveDate", text: list[i].updated });
    $archiveTitle = $("<h2/>", { class: "archiveTitle", text: list[i].title });
    $archiveDescription = $("<p/>", { class: "archiveDescription", text: list[i].description });

    $archiveCard.append($archiveImg, $archiveInnerWrap.append($archiveDate, $archiveTitle, $archiveDescription)).appendTo(".archiveList");
  }
}

render()