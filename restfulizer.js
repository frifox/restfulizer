/*!
 * based on RestfulizerJs
 * http://ifnot.github.io/RestfulizerJs
 *
 * overhauled by frifox
 * https://github.com/frifox/restfulizer
 */

(function($){
    $.fn.extend({
        restfulize: function(options) {
            options = $.extend({
                post_query: false,
                method: "POST",
                action: null,
                confirm: 'Are you sure?'
            }, options);
            options.method = options.method.toUpperCase();

            return this.each(function() {
                var $a = $(this);
                $a.options = options;

                // get options from html?
                if($a.data('method') !== undefined) {
                    options.method = $a.data('method').toUpperCase();
                }
                if($a.data('confirm') !== undefined) {
                    options.confirm = $a.data('confirm');
                }
                if($a.attr('href') !== undefined) {
                    options.action = $a.attr('href');
                }

                // prepare the form
                var $form = $('<form/>', {
                        style: 'display:none',
                        action: options.action
                    })
                    .append(
                        $('<input/>', {
                            type: 'hidden',
                            name: '_token',
                            value: $('meta[name=csrf-token]').attr('content')
                        })
                    );

                // how are we submitting it?
                switch(options.method) {
                    case 'GET':
                        $form.attr('method', 'GET');
                    break;
                    case 'POST':
                    case 'PUT':
                    case 'DELETE':
                        $form.attr('method', 'POST');
                        $form.append(
                            $('<input/>', {
                                type: 'hidden',
                                name: '_method',
                                value: options.method
                            })
                        );
                    break;
                }

                // transform query into <intput>s?
                if(options.post_query) {
                    var params = options.action.substr(options.action.indexOf("?") + 1).split('&');
                    for (var i = 0; i < params.length; i++) {
                        var pair = params[i].split('=');
                        $form.append(
                            $('<input/>', {
                                type: 'hidden',
                                name: decodeURIComponent(pair[0]),
                                value: decodeURIComponent(pair[1])
                            })
                        );
                    }

                    $form.attr('action', options.action.substr(0, options.action.indexOf("?")));
                }

                // write the form, remember method/confirm values
                $a.append($form)
                    .removeAttr('href')
                    .attr('style', 'cursor: pointer')
                    .data('method', options.method)
                    .data('confirm', options.confirm);

                // submit the form on click
                $a.bind('click', function(event) {
                    if ($a.data('method') === 'DELETE' && $a.data('confirm') !== false) {
                        if(!confirm($a.data('confirm'))) {
                            return false;
                        }
                    }

                    // in case form has `submit` attribute, which overrides submit()
                    document.createElement('form').submit.call($form[0]);
                });
            });
        }
    });
})(jQuery);