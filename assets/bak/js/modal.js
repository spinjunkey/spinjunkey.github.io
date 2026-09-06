var modal = (function () {
  var
    method = {},
    $overlay,
    $modal,
    $content,
    $close;

  // Center the modal in the viewport
  method.center = function () {
    var top, left;

    top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
    left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

    $modal.css({
      top: top + $(window).scrollTop(),
      left: left + $(window).scrollLeft()
    });
  };

  // Open the modal
  method.open = function (settings) {
    $content.empty().append(settings.content);

    $modal.css({
      width: settings.width || 'auto',
      height: settings.height || 'auto'
    });

    method.center();
    $(window).bind('resize.modal', method.center);
    $modal.show();
    $overlay.show();
  };

  // Close the modal
  method.close = function () {
    $modal.hide();
    $overlay.hide();
    $content.empty();
    $(window).unbind('resize.modal');
  };

  // Generate the HTML and add it to the document
  $overlay = $('<div id="overlay"></div>');
  $modal = $('<div id="modal"></div>');
  $content = $('<div id="content"></div>');
  $close = $('<a id="close" href="#">close</a>');

  $modal.hide();
  $overlay.hide();
  $modal.append($content, $close);

  $(document).ready(function () {
    $('body').append($overlay, $modal);
  });

  $close.click(function (e) {
    e.preventDefault();
    method.close();
  });

  return method;
}());

// Wait until the DOM has loaded before querying the document
$(document).ready(function () {

  $('a#multipotentialite').click(function (e) {
    modal.open({ content: "<h4 style='color: black; width='200px'; align:left;'>A multipotentialite combines different knowledge domains to solve problems. You might know this word by a different name, generalist. Believe it or not, generalists are needed just as much as specialists. They make large imapacts on business. Don't believe me? Read <a href='https://www.forbes.com/sites/forbesbusinesscouncil/2021/06/03/the-value-of-being-a-generalist/?sh=151897002fc8' target='_blank'>this</a>. And <a href='https://hbr.org/2018/07/when-generalists-are-better-than-specialists-and-vice-versa' target='_blank'>this</a>. And <a href='https://knowledge.wharton.upenn.edu/podcast/knowledge-at-wharton-podcast/generalists-vs-specialists/' target='_blank'>this</a>. Maybe even <a href='https://hbr.org/2020/09/in-rd-generalists-are-more-valuable-than-you-think' target='_blank'>this</a>. While my career has crossed many domains, the core of what I do remains the same. Catalyzing change and acting as a spark for new thinking. As a lifelong learner, I continually add skills to my toolbox. These tools come in handy depending on the problem/domain. Read some <a href=''>case studies</a> to see how I bring it all together.<br /><br />For the corporate types, here's the 'corporate' bio: <br /><br /><I>I'm an experienced creative leader who helps people make sense of the world. I accomplish this through deep curiosity, continual learning, and looking at problems with a systems lens. As a 'generalist' I use these perspectives to span across multiple domains. It allows a unique perspective where I am able to connect the dots and spot patterns in complexity. I use my strong empathy to understand the human condition in a VUCA (Volatile, Uncertain, Complex, Ambiguous) world. I have a track record of inspiring others to act, change, and develop in new ways to deliver change and real impact. I'm a maker at heart, I #GSD (Get Shit Done).</I></p></h4>" });
    e.preventDefault();
  });

  $('a#toolbox').click(function (e) {
    modal.open({ content: "<h4 style='color: black; width='200px'; align:left;'><Strong>Communication</Strong>: Language & Translation, Storytelling, Explainers, Podcasts, Technical Writing, Information Design<br /><Strong>Technology</Strong>: Front-End Development (JavaScript, HTML, CSS, Python), Creative Development (Arduino, Embedded, Raspberry Pi)<br /><Strong>Creativity</Strong>: LEGO Serious Play™, Improvisation, Multiple POVs<br /><Strong>Human Centered Design</Strong>: Journey Maps, Wireframes, Prototyping, User/Task Flows, User Testing</h4>" });
    e.preventDefault();
  });

  $('a#howdy').click(function (e) {
    modal.open({ content: "<img src='assets/img/fabio.JPG' />" });
    e.preventDefault();
  });
});


