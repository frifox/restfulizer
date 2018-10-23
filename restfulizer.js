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
            return this.each(function() {
                var $a = $(this);

                $a.options = $.extend({
                    post_query: true,
                    method: null,
                    action: null,
                    confirm: 'Are you sure?'
                }, options);

                // get options from html?
                if($a.data('method') !== undefined) {
                    $a.options.method = $a.data('method').toUpperCase();
                }
                if($a.data('confirm') !== undefined) {
                    $a.options.confirm = $a.data('confirm');
                }
                if($a.attr('href') !== undefined) {
                    $a.options.action = $a.attr('href');
                }

                // avoid restfulizing normal links
                if($a.options.method === null) {
                    return;
                }

                // prepare the form
                var $form = $('<form/>', {
                    style: 'display:none',
                    action: $a.options.action
                });

                var token = $('meta[name=csrf-token]').attr('content');
                if(token !== undefined) {
                    $form.append(
                        $('<input/>', {
                            type: 'hidden',
                            name: '_token',
                            value: token
                        })
                    );
                }

                // how are we submitting it?
                $a.options.method = $a.options.method.toUpperCase();
                switch($a.options.method) {
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
                                value: $a.options.method
                            })
                        );
                    break;
                }

                // transform query into <intput>s?
                var query_index = $a.options.action.indexOf('?');
                if($a.options.post_query &&  query_index > 0) {
                    var query = $a.options.action.substr(query_index + 1);
                    $.each(query.split('&'), function(i, pair) {
                        pair = pair.split('=');
                        $form.append(
                            $('<input/>', {
                                type: 'hidden',
                                name: decodeURIComponent(pair[0]),
                                value: decodeURIComponent(pair[1])
                            })
                        );
                    });

                    $form.attr('action', $a.options.action.substr(0, query_index));
                }

                // write the form, remember method/confirm values
                $a.append($form)
                    .removeAttr('href')
                    .attr('style', 'cursor: pointer')
                    .data('method', $a.options.method)
                    .data('confirm', $a.options.confirm);

                // submit the form on click
                $a.on('click', function(event) {
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