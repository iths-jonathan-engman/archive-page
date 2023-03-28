async function getData() {
  let response = await fetch ('https://gist.githubusercontent.com/andreasnylin/161dae2fc8a807d1a858bb6eec965b0e/raw/56fb3e8f24cb6934bd22f2db8f9a8a9409e4d140/data.json')

  let responseData = await response.json()

  // console.log(responseData)

  return responseData.items
}

async function render() {

  let list = await getData()

  // console.log(list)
  // console.log(list.description)
  for(let i = 0; i < list.length; i++) {

    // var list = [
    //   {name:"One",url:'http://google.com'},{name:"Two", url:""}

    //   ];

    //   for(var i = 0; i < list.length; ++i ) {


    //       if(list[i].url !== "") {
    //          var Webseite = '<a href="'+ list[i].url + '">Webseite</a>'
    //       }else{
    //          var Webseite = '';
    //       }

    //       $(".list").append('\
    //      <tr>\
    //      <td>'+ list[i].name + '</td>\
    //      <td>' + list[i].area1 + ',<br> ' + list[i].area2 + ',<br> ' + list[i].area3 + '</td>\
    //      <td>'+ list[i].small_area + '</td>\
    //      <td>'+ list[i].studies + '</td>\
    //      <td>'+ list[i].email + '</td>\
    //      <td>' + Webseite + '</td>\
    //      <td>'+ list[i].other + '</td>\
    //      </tr>\
    //      ');
    //   }

    // console.log(list[i]);
    // $document.createElement('div').appendTo('.archiveList');
    // console.log('test')
    console.log(list[i].enclosure)
    var $archiveCard = $("<div/>", { class: "archiveCard" }),

    // if (list[i].enclosure === undefined) {
    //   console.log('img not ok');
    // }
    // (list[i].enclosure) ? list[i].enclosure : '';

    $archiveImg = $("<img/>", { class: "archiveImg", text: 'img', src: (list[i].enclosure ? list[i].enclosure : 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')  }),
    $archiveInnerWrap = $("<div/>", { class: "archiveInnerWrap" }),
    $archiveDate = $("<span/>", { class: "archiveDate", text: list[i].updated });
    $archiveTitle = $("<h2/>", { class: "archiveTitle", text: list[i].title });
    $archiveDescription = $("<p/>", { class: "archiveDescription", text: list[i].description });

    $archiveCard.append($archiveImg, $archiveInnerWrap.append($archiveDate, $archiveTitle, $archiveDescription)).appendTo(".archiveList");
  }
}

render()