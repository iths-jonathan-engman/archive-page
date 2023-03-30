setTimeout(
  function()
  {
    $(function(){
      $(".archiveCard .archiveDescription").each(function(){
      if ($(this).height() > 85) {
        $(this).parents(".archiveCard").addClass('readMoreDesc')
      }
      });
    });
  }, 1000);