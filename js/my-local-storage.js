 $(document).ready(function () {

     var fields = $('[contenteditable]');

     function hideAlert() {
         setTimeout(function () {
             $('[class^="alert"]').addClass('hidden-xs-up');
         }, 800);
     }

     function dataGet() {
         fields.each(function () {
             var field = $(this);

            // if data is stored and is not empty string - in case someone deleted it or it was added later ;p
            if($.localStorage.get(field.data('store')) && $.localStorage.get(field.data('store')) !== '') {
                 field.html($.localStorage.get(field.data('store')));
             }
         });
     }

     function dataSet() {
         fields.each(function () {
             var field = $(this);
             $.localStorage.set(field.data('store'), field.html());
         });

         $.localStorage.set('init', 'true');
     }

     function dataUpdate() {
         fields.each(function () {
             var field = $(this);
             var currentHtml = field.html();

             field.off().on('blur', function () {

                 // first trim all empty spaces &nbsp; and br
                 field.html(field.html().replace(/(&nbsp;|<br>|<br \/>)/g, '').trim());

                  // if is not empty string and not the same as on focus
                  // save data
                  if(field.html() !== '' && field.html() !== currentHtml) {
                    $.localStorage.set(field.data('store'), field.html());
                    $('.alert-success').removeClass('hidden-xs-up');
                    hideAlert();
                  }
                  // if is empty
                  // restore last saved value and prompt user
                  else if(field.html() === ''){
                    field.html($.localStorage.get(field.data('store')));
                    $('.alert-danger').removeClass('hidden-xs-up');
                    hideAlert();
                  }
             });
         });
     }

     // check if data in localstorage has been already set
     // if yes retrieve data else store data
     if ($.localStorage.isSet('init')) {
         dataGet();
     } else {
         dataSet();
     }

     // update data on change
     dataUpdate();

    $('#reset-cv').on('click', function(){

        function delete_cookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        $.localStorage.removeAll();
        delete_cookie('style_selected');
        location.reload();

    });
 });
