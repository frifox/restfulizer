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
                query_to_post: false,
                method: "POST",
                action: null
            }, options);
            options.method = options.method.toUpperCase();

            return this.each(function() {
                var $a = $(this);

                // get options
                if($a.attr('data-method') !== undefined) {
                    options.method = $a.attr('data-method').toUpperCase();
                }
                if($a.attr('href') !== undefined) {
                    options.action = $a.attr('href');
                }

                // prepare the form
                var $form = $('<form/>')
                    .attr('style', 'display:none')
                    .attr('action', options.action)
                    .append(
                        $('<input/>')
                            .attr('type', 'hidden')
                            .attr('name', '_token')
                            .attr('value', $('meta[name=csrf-token]').attr('content'))
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
                            $('<input/>')
                                .attr('type', 'hidden')
                                .attr('name', '_method')
                                .attr('value', options.method)
                        );
                    break;
                }

                // transform query into <intput>s?
                if(options.query_to_post) {
                    var params = options.action.substr(options.action.indexOf("?")+1).split('&');
                    $form.attr('action', options.action.substr(0, options.action.indexOf("?")));

                    for (var i = 0; i < params.length; i++) {
                        var pair = params[i].split('=');
                        $form.append(
                            $('<input/>')
                                .attr('type', 'hidden')
                                .attr('name', decodeURIComponent(pair[0]))
                                .attr('value', decodeURIComponent(pair[1]))
                        );
                    }
                }

                // we're good to go
                $a.append($form)
                    .removeAttr('href')
                    .attr('style', 'cursor: pointer');

                // submit the form on <a> click
                $a.click(function() {
                    if (options.method === 'DELETE') {
                        if(!confirm('Are you sure?')) {
                            return false;
                        }
                    }

                    $form[0].submit();
                });
            });
        }
    });

    $.restfulizer = function() {
        var supported_methods = [
            'GET',
            'POST',
            'PUT',
            'DELETE'
        ];

        $('a').each(function() {
            var $a = $(this);

            var method = $a.data('method');
            if(
                method !== undefined
                && supported_methods.includes(method.toUpperCase())
                && $a.attr('href') !== undefined
                && $a.attr('href') !== ''
            ) {
                $a.restfulize();
            }
        });
    };
})(jQuery);