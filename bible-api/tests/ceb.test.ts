import { parseCEBResponse } from '../src/ceb';
import { parse } from 'node-html-parser';

describe('parseCEBResponse', () => {
  it('should format ordinary proses verses properly', () => {
    expect(parseCEBResponse(JOHN_3_16_21)).toEqual([
      { book: 'John', chapter : "3", verse: "16", text: ' God so loved the world that he gave his only Son, so that everyone who believes in him won’t perish but will have eternal life.' },
      { book: 'John', chapter : "3", verse: "17", text: ' God didn’t send his Son into the world to judge the world, but that the world might be saved through him.' },
      { book: 'John', chapter : "3", verse: "18", text: ' Whoever believes in him isn’t judged; whoever doesn’t believe in him is already judged, because they don’t believe in the name of God’s only Son.' },
			{ type: 'heading', hidden: false, value: [''] },
			{ book: 'John', chapter : "3", verse: "19", text: ' “This is the basis for judgment: The light came into the world, and people loved darkness more than the light, for their actions are evil.' },
      { book: 'John', chapter : "3", verse: "20", text: ' All who do wicked things hate the light and don’t come to the light for fear that their actions will be exposed to the light.' },
      { book: 'John', chapter : "3", verse: "21", text: ' Whoever does the truth comes to the light so that it can be seen that their actions were done in God.”' },
    ])
  });

  it('should format poetry', () => {
    expect(parseCEBResponse(ISAIAH_55_1_2)).toEqual([
      { book: 'Isa', chapter: '55', verse: '1', text: ' All of you who are thirsty, come to the water!\nWhoever has no money, come, buy food and eat!\nWithout money, at no cost, buy wine and milk!\n'},
      { book: 'Isa', chapter: '55', verse: '2', text: ' Why spend money for what isn’t food,\n\tand your earnings for what doesn’t satisfy?\nListen carefully to me and eat what is good;\n\tenjoy the richest of feasts.'}
    ])
  })

  it('should handle smallcaps', () => {
    expect(parseCEBResponse(DEUT_3_20)).toEqual([
      { book: 'Deut', chapter: '3', verse: '20', text: ' Once the LORD settles your relatives, as you have been settled, and they also possess the land that the LORD your God is giving them across the Jordan River, each of you can return to the property that I have given to you.'},
    ])
	})
	
	it('should handle first verse of books', () => {
		expect(parseCEBResponse(JOHN_1_1)).toEqual([
			{ book: 'John', chapter: '1', verse: '1', text: ' In the beginning was the Word\n\tand the Word was with God\n\tand the Word was God.'}
		])
	})
})

const JOHN_3_16_21 = parse(`
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<link href='/css/fonts.css' rel='stylesheet' type='text/css'>
	<link href='/taglib/css/fonts/font-awesome/3.2.1/font-awesome.css' rel='stylesheet' type='text/css'>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
	<meta name="keywords" content="" /> 
	<meta name="description" content="" /> 
	<meta name="author" content="" />

<!-- Start IBM Marketing Cloud -->

<meta name="com.silverpop.brandeddomains" content="www.commonenglishbible.com" />
<meta name="com.silverpop.cothost" content="pod8.ibmmarketingcloud.com" />

<script>
(function(){
	var ibm_host = (window.location.protocol == 'https:') ? 'https://www.sc.pages08.net' : 'http://contentz.mkt81.net';
	document.write(unescape('%3Cscript src="' + ibm_host + '/lp/static/js/iMAWebCookie.js?d59a4e-157255bafde-6681ada67421f5d3ed5e65517ed2e77a&h=www.pages08.net" type="text/javascript"%3E%3C/script%3E'));
})();
</script>

<!-- End IBM Marketing Cloud -->
	
	<title>Passage Lookup &middot; Common English Bible</title>
	
	<link href="/css/main.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/pages.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/magnific-popup.css" rel="stylesheet" type="text/css"> 
	

	<style type="text/css">

			

	</style>

	<script type="text/javascript" src="/taglib/javascript/carousel.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script type="text/javascript" src="/javascript/interface.js?v=1.2"></script>
	<script type="text/javascript" src="/javascript/jquery.magnific-popup.min.js"></script> 

	<script type="text/javascript">
		
		

	</script>

	<script type="text/javascript" src="/taglib/javascript/modernizr-1.7.min.js"></script>
	<script type="text/javascript" src="/taglib/javascript/respond.min.js"></script>
	

</head>
<body id="page-passage-lookup">
<div id="wrapper">	
<div id="document" role="document">
	
	<header role="banner" class="static">
		
	<div class="container">

		<h1 id="logo"><a href="/"><img src="/images/main/logo-sm.png" alt="Common English Bible" /></a></h1>
		
		<!--
		INVALID MODULE DEFINITION

		<div id="header-login">
			<a href="/store/my-account">Account</a>
		</div>	
		-->

		<nav role="navigation">
			
			<div>
				<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
				<div class="close">Close Menu</div>
			</div>
			
			<h2 class="toggle">Menu</h2>

		</nav>

	</div>

</header>

<div id="alternate_header" class="hide">
	<div class="container">

		<!--div id="header-cart">
			<a href="/store/cart">Your Cart</a>
		</div>

		<div id="header-login">
			<a href="/store/my-account">Login</a>
		</div-->	

		<nav role="navigation">
			<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
		</nav>

	</div>
</div>	

	<section id="content" role="main">

		<header>
			<div class="container">
				<h1>Explore</h1>
			</div>
			<div class="divider"></div>
		</header>

		<nav>
			<div class="container">
				<div class="toggle">More Pages</div> <ul><li><a href="/explore">About</a></li><li><a href="/explore/compare">Compare Translations</a></li><li><a href="/explore/our-scholars">Our Scholars</a></li><li><a href="/explore/maps">Maps</a></li><li class="current"><a href="/explore/passage-lookup">Passage Lookup</a></li><li><a href="/explore/downloads">Free Downloads</a></li></ul>
			</div>
		</nav>
		
		<section id="main">

			<div class="container">

				<div id="bible_gateway">

	<form action="/explore/passage-lookup" method="POST">
		<h2>Search the CEB</h2>
		<div class="field">
			<input name="query" placeholder="Enter your favorite passage... (e.g. John 1:14)" type="text" value="John 3:16-21" />
			<button type="submit">Read It</button>
		</div>
	</form>
	
	<div id="ceb_search_results">
		<ul><li><h2>John 3:16-21</h2><p> <span id="unique-id-26126" class="text John-3-16"><sup class="versenum">16 </sup><span class="woj">God so loved the world that he gave his only Son, so that everyone who believes in him won’t perish but will have eternal life.</span></span> <span id="unique-id-26127" class="text John-3-17"><sup class="versenum">17 </sup><span class="woj">God didn’t send his Son into the world to judge the world, but that the world might be saved through him.</span></span> <span id="unique-id-26128" class="text John-3-18"><sup class="versenum">18 </sup><span class="woj">Whoever believes in him isn’t judged; whoever doesn’t believe in him is already judged, because they don’t believe in the name of God’s only Son.</span></span></p> <p><span id="unique-id-26129" class="text John-3-19"><sup class="versenum">19 </sup><span class="woj">“This is the basis for judgment: The light came into the world, and people loved darkness more than the light, for their actions are evil.</span></span> <span id="unique-id-26130" class="text John-3-20"><sup class="versenum">20 </sup><span class="woj">All who do wicked things hate the light and don’t come to the light for fear that their actions will be exposed to the light.</span></span> <span id="unique-id-26131" class="text John-3-21"><sup class="versenum">21 </sup><span class="woj">Whoever does the truth comes to the light so that it can be seen that their actions were done in God.”</span></span></p> </li></ul>
	</div>
	
</div>


			</div>

		</section>

	</section>

	<footer>

		<div class="container">

			<div id="footer-logo"><img src="/images/main/footer-logo.png" alt="" /></div>

			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/help">Help</a></li>
<!-- 					<li><a href="/blog">Blog</a></li> -->
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/explore">Explore</a></li>
					<li><a href="/terms-of-use">Terms of Use</a></li>
					<li><a href="/bibles">Bibles</a></li>
					<li><a href="/explore/downloads">Downloads</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>	
			</nav>

			<div class="social_links">
				<h2>Social Media</h2>
				<ul>
					<li class="twitter"><a target="_blank" href="https://twitter.com/commonengbible">Twitter</a></li>
					<li class="facebook"><a target="_blank" href="https://www.facebook.com/LiveTheBible">Facebook</a></li>
					<li class="vimeo"><a target="_blank" href="http://vimeo.com/commonenglishbible">Vimeo</a></li>
					<li class="pinterest"><a target="_blank" href="http://pinterest.com/commonengbible/">Vimeo</a></li>
				</ul>	
			</div>

			<div id="footer-dbk-link"><a href="http://www.deepbluekidsbible.com/" target="_blank"><img src="/images/main/footer-dbk-logo.jpg" alt="" /></a></div>

			<div class="copyright">&copy; 2011 Common English Bible &bull;&nbsp;Powered by <a href="http://www.agroup.com" target="_blank">The A Group</a></div>

		</div>

	</footer>

	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-44934529-1']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();	
	</script>

<!-- Google Tag Manager -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH57FX8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH57FX8');</script>
<!-- End Google Tag Manager -->

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '160873714581778');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1"
src="https://www.facebook.com/tr?id=160873714581778&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->


</div>
</div>
</body>
</html>
`).querySelectorAll('#ceb_search_results p');

const ISAIAH_55_1_2 = parse(`

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<link href='/css/fonts.css' rel='stylesheet' type='text/css'>
	<link href='/taglib/css/fonts/font-awesome/3.2.1/font-awesome.css' rel='stylesheet' type='text/css'>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
	<meta name="keywords" content="" /> 
	<meta name="description" content="" /> 
	<meta name="author" content="" />

<!-- Start IBM Marketing Cloud -->

<meta name="com.silverpop.brandeddomains" content="www.commonenglishbible.com" />
<meta name="com.silverpop.cothost" content="pod8.ibmmarketingcloud.com" />

<script>
(function(){
	var ibm_host = (window.location.protocol == 'https:') ? 'https://www.sc.pages08.net' : 'http://contentz.mkt81.net';
	document.write(unescape('%3Cscript src="' + ibm_host + '/lp/static/js/iMAWebCookie.js?d59a4e-157255bafde-6681ada67421f5d3ed5e65517ed2e77a&h=www.pages08.net" type="text/javascript"%3E%3C/script%3E'));
})();
</script>

<!-- End IBM Marketing Cloud -->
	
	<title>Passage Lookup &middot; Common English Bible</title>
	
	<link href="/css/main.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/pages.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/magnific-popup.css" rel="stylesheet" type="text/css"> 
	

	<style type="text/css">

			

	</style>

	<script type="text/javascript" src="/taglib/javascript/carousel.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script type="text/javascript" src="/javascript/interface.js?v=1.2"></script>
	<script type="text/javascript" src="/javascript/jquery.magnific-popup.min.js"></script> 

	<script type="text/javascript">
		
		

	</script>

	<script type="text/javascript" src="/taglib/javascript/modernizr-1.7.min.js"></script>
	<script type="text/javascript" src="/taglib/javascript/respond.min.js"></script>
	

</head>
<body id="page-passage-lookup">
<div id="wrapper">	
<div id="document" role="document">
	
	<header role="banner" class="static">
		
	<div class="container">

		<h1 id="logo"><a href="/"><img src="/images/main/logo-sm.png" alt="Common English Bible" /></a></h1>
		
		<!--
		INVALID MODULE DEFINITION

		<div id="header-login">
			<a href="/store/my-account">Account</a>
		</div>	
		-->

		<nav role="navigation">
			
			<div>
				<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
				<div class="close">Close Menu</div>
			</div>
			
			<h2 class="toggle">Menu</h2>

		</nav>

	</div>

</header>

<div id="alternate_header" class="hide">
	<div class="container">

		<!--div id="header-cart">
			<a href="/store/cart">Your Cart</a>
		</div>

		<div id="header-login">
			<a href="/store/my-account">Login</a>
		</div-->	

		<nav role="navigation">
			<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
		</nav>

	</div>
</div>	

	<section id="content" role="main">

		<header>
			<div class="container">
				<h1>Explore</h1>
			</div>
			<div class="divider"></div>
		</header>

		<nav>
			<div class="container">
				<div class="toggle">More Pages</div> <ul><li><a href="/explore">About</a></li><li><a href="/explore/compare">Compare Translations</a></li><li><a href="/explore/our-scholars">Our Scholars</a></li><li><a href="/explore/maps">Maps</a></li><li class="current"><a href="/explore/passage-lookup">Passage Lookup</a></li><li><a href="/explore/downloads">Free Downloads</a></li></ul>
			</div>
		</nav>
		
		<section id="main">

			<div class="container">

				<div id="bible_gateway">

	<form action="/explore/passage-lookup" method="POST">
		<h2>Search the CEB</h2>
		<div class="field">
			<input name="query" placeholder="Enter your favorite passage... (e.g. John 1:14)" type="text" value="Isa 55:1-2" />
			<button type="submit">Read It</button>
		</div>
	</form>
	
	<div id="ceb_search_results">
		<ul><li><h2>Isaiah 55:1-2</h2> <h3><span id="unique-id-18742" class="text Isa-55-1">Invitation to the feast</span></h3><div class="poetry"><p class="line"><span class="chapter-2"><span class="text Isa-55-1"><span class="chapternum">55 </span>All of you who are thirsty, come to the water!</span></span><br /><span class="text Isa-55-1">Whoever has no money, come, buy food and eat!</span><br /><span class="text Isa-55-1">Without money, at no cost, buy wine and milk!</span><br /><span id="unique-id-18743" class="text Isa-55-2"><sup class="versenum">2 </sup>Why spend money for what isn’t food,</span><br /><span class="indent-1"><span class="indent-1-breaks">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text Isa-55-2">and your earnings for what doesn’t satisfy?</span></span><br /><span class="text Isa-55-2">Listen carefully to me and eat what is good;</span><br /><span class="indent-1"><span class="indent-1-breaks">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text Isa-55-2">enjoy the richest of feasts.</span></span></p> </div></li></ul>
	</div>
	
</div>


			</div>

		</section>

	</section>

	<footer>

		<div class="container">

			<div id="footer-logo"><img src="/images/main/footer-logo.png" alt="" /></div>

			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/help">Help</a></li>
<!-- 					<li><a href="/blog">Blog</a></li> -->
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/explore">Explore</a></li>
					<li><a href="/terms-of-use">Terms of Use</a></li>
					<li><a href="/bibles">Bibles</a></li>
					<li><a href="/explore/downloads">Downloads</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>	
			</nav>

			<div class="social_links">
				<h2>Social Media</h2>
				<ul>
					<li class="twitter"><a target="_blank" href="https://twitter.com/commonengbible">Twitter</a></li>
					<li class="facebook"><a target="_blank" href="https://www.facebook.com/LiveTheBible">Facebook</a></li>
					<li class="vimeo"><a target="_blank" href="http://vimeo.com/commonenglishbible">Vimeo</a></li>
					<li class="pinterest"><a target="_blank" href="http://pinterest.com/commonengbible/">Vimeo</a></li>
				</ul>	
			</div>

			<div id="footer-dbk-link"><a href="http://www.deepbluekidsbible.com/" target="_blank"><img src="/images/main/footer-dbk-logo.jpg" alt="" /></a></div>

			<div class="copyright">&copy; 2011 Common English Bible &bull;&nbsp;Powered by <a href="http://www.agroup.com" target="_blank">The A Group</a></div>

		</div>

	</footer>

	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-44934529-1']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();	
	</script>

<!-- Google Tag Manager -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH57FX8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH57FX8');</script>
<!-- End Google Tag Manager -->

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '160873714581778');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1"
src="https://www.facebook.com/tr?id=160873714581778&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->


</div>
</div>
</body>
</html>
`).querySelectorAll('#ceb_search_results p')

const DEUT_3_20 = parse(`

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<link href='/css/fonts.css' rel='stylesheet' type='text/css'>
	<link href='/taglib/css/fonts/font-awesome/3.2.1/font-awesome.css' rel='stylesheet' type='text/css'>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
	<meta name="keywords" content="" /> 
	<meta name="description" content="" /> 
	<meta name="author" content="" />

<!-- Start IBM Marketing Cloud -->

<meta name="com.silverpop.brandeddomains" content="www.commonenglishbible.com" />
<meta name="com.silverpop.cothost" content="pod8.ibmmarketingcloud.com" />

<script>
(function(){
	var ibm_host = (window.location.protocol == 'https:') ? 'https://www.sc.pages08.net' : 'http://contentz.mkt81.net';
	document.write(unescape('%3Cscript src="' + ibm_host + '/lp/static/js/iMAWebCookie.js?d59a4e-157255bafde-6681ada67421f5d3ed5e65517ed2e77a&h=www.pages08.net" type="text/javascript"%3E%3C/script%3E'));
})();
</script>

<!-- End IBM Marketing Cloud -->
	
	<title>Passage Lookup &middot; Common English Bible</title>
	
	<link href="/css/main.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/pages.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/magnific-popup.css" rel="stylesheet" type="text/css"> 
	

	<style type="text/css">

			

	</style>

	<script type="text/javascript" src="/taglib/javascript/carousel.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script type="text/javascript" src="/javascript/interface.js?v=1.2"></script>
	<script type="text/javascript" src="/javascript/jquery.magnific-popup.min.js"></script> 

	<script type="text/javascript">
		
		

	</script>

	<script type="text/javascript" src="/taglib/javascript/modernizr-1.7.min.js"></script>
	<script type="text/javascript" src="/taglib/javascript/respond.min.js"></script>
	

</head>
<body id="page-passage-lookup">
<div id="wrapper">	
<div id="document" role="document">
	
	<header role="banner" class="static">
		
	<div class="container">

		<h1 id="logo"><a href="/"><img src="/images/main/logo-sm.png" alt="Common English Bible" /></a></h1>
		
		<!--
		INVALID MODULE DEFINITION

		<div id="header-login">
			<a href="/store/my-account">Account</a>
		</div>	
		-->

		<nav role="navigation">
			
			<div>
				<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
				<div class="close">Close Menu</div>
			</div>
			
			<h2 class="toggle">Menu</h2>

		</nav>

	</div>

</header>

<div id="alternate_header" class="hide">
	<div class="container">

		<!--div id="header-cart">
			<a href="/store/cart">Your Cart</a>
		</div>

		<div id="header-login">
			<a href="/store/my-account">Login</a>
		</div-->	

		<nav role="navigation">
			<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
		</nav>

	</div>
</div>	

	<section id="content" role="main">

		<header>
			<div class="container">
				<h1>Explore</h1>
			</div>
			<div class="divider"></div>
		</header>

		<nav>
			<div class="container">
				<div class="toggle">More Pages</div> <ul><li><a href="/explore">About</a></li><li><a href="/explore/compare">Compare Translations</a></li><li><a href="/explore/our-scholars">Our Scholars</a></li><li><a href="/explore/maps">Maps</a></li><li class="current"><a href="/explore/passage-lookup">Passage Lookup</a></li><li><a href="/explore/downloads">Free Downloads</a></li></ul>
			</div>
		</nav>
		
		<section id="main">

			<div class="container">

				<div id="bible_gateway">

	<form action="/explore/passage-lookup" method="POST">
		<h2>Search the CEB</h2>
		<div class="field">
			<input name="query" placeholder="Enter your favorite passage... (e.g. John 1:14)" type="text" value="Deut. 3:20" />
			<button type="submit">Read It</button>
		</div>
	</form>
	
	<div id="ceb_search_results">
		<ul><li><h2>Deuteronomy 3:20</h2><p> <span id="unique-id-4996" class="text Deut-3-20"><sup class="versenum">20 </sup>Once the <span style="font-variant: small-caps" class="small-caps">Lord</span> settles your relatives, as you have been settled, and they also possess the land that the <span style="font-variant: small-caps" class="small-caps">Lord</span> your God is giving them across the Jordan River, each of you can return to the property that I have given to you.</span></p> </li></ul>
	</div>
	
</div>


			</div>

		</section>

	</section>

	<footer>

		<div class="container">

			<div id="footer-logo"><img src="/images/main/footer-logo.png" alt="" /></div>

			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/help">Help</a></li>
<!-- 					<li><a href="/blog">Blog</a></li> -->
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/explore">Explore</a></li>
					<li><a href="/terms-of-use">Terms of Use</a></li>
					<li><a href="/bibles">Bibles</a></li>
					<li><a href="/explore/downloads">Downloads</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>	
			</nav>

			<div class="social_links">
				<h2>Social Media</h2>
				<ul>
					<li class="twitter"><a target="_blank" href="https://twitter.com/commonengbible">Twitter</a></li>
					<li class="facebook"><a target="_blank" href="https://www.facebook.com/LiveTheBible">Facebook</a></li>
					<li class="vimeo"><a target="_blank" href="http://vimeo.com/commonenglishbible">Vimeo</a></li>
					<li class="pinterest"><a target="_blank" href="http://pinterest.com/commonengbible/">Vimeo</a></li>
				</ul>	
			</div>

			<div id="footer-dbk-link"><a href="http://www.deepbluekidsbible.com/" target="_blank"><img src="/images/main/footer-dbk-logo.jpg" alt="" /></a></div>

			<div class="copyright">&copy; 2011 Common English Bible &bull;&nbsp;Powered by <a href="http://www.agroup.com" target="_blank">The A Group</a></div>

		</div>

	</footer>

	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-44934529-1']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();	
	</script>

<!-- Google Tag Manager -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH57FX8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH57FX8');</script>
<!-- End Google Tag Manager -->

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '160873714581778');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1"
src="https://www.facebook.com/tr?id=160873714581778&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->


</div>
</div>
</body>
</html>`).querySelectorAll('#ceb_search_results p')

const JOHN_1_1 = parse(`<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<link href='/css/fonts.css' rel='stylesheet' type='text/css'>
	<link href='/taglib/css/fonts/font-awesome/3.2.1/font-awesome.css' rel='stylesheet' type='text/css'>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
	<meta name="keywords" content="" /> 
	<meta name="description" content="" /> 
	<meta name="author" content="" />

<!-- Start IBM Marketing Cloud -->

<meta name="com.silverpop.brandeddomains" content="www.commonenglishbible.com" />
<meta name="com.silverpop.cothost" content="pod8.ibmmarketingcloud.com" />

<script>
(function(){
	var ibm_host = (window.location.protocol == 'https:') ? 'https://www.sc.pages08.net' : 'http://contentz.mkt81.net';
	document.write(unescape('%3Cscript src="' + ibm_host + '/lp/static/js/iMAWebCookie.js?d59a4e-157255bafde-6681ada67421f5d3ed5e65517ed2e77a&h=www.pages08.net" type="text/javascript"%3E%3C/script%3E'));
})();
</script>

<!-- End IBM Marketing Cloud -->
	
	<title>Passage Lookup &middot; Common English Bible</title>
	
	<link href="/css/main.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/pages.css?v=1" rel="stylesheet" type="text/css" />
	<link href="/css/magnific-popup.css" rel="stylesheet" type="text/css"> 
	

	<style type="text/css">

			

	</style>

	<script type="text/javascript" src="/taglib/javascript/carousel.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script type="text/javascript" src="/javascript/interface.js?v=1.2"></script>
	<script type="text/javascript" src="/javascript/jquery.magnific-popup.min.js"></script> 

	<script type="text/javascript">
		
		

	</script>

	<script type="text/javascript" src="/taglib/javascript/modernizr-1.7.min.js"></script>
	<script type="text/javascript" src="/taglib/javascript/respond.min.js"></script>
	

</head>
<body id="page-passage-lookup">
<div id="wrapper">	
<div id="document" role="document">
	
	<header role="banner" class="static">
		
	<div class="container">

		<h1 id="logo"><a href="/"><img src="/images/main/logo-sm.png" alt="Common English Bible" /></a></h1>
		
		<!--
		INVALID MODULE DEFINITION

		<div id="header-login">
			<a href="/store/my-account">Account</a>
		</div>	
		-->

		<nav role="navigation">
			
			<div>
				<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
				<div class="close">Close Menu</div>
			</div>
			
			<h2 class="toggle">Menu</h2>

		</nav>

	</div>

</header>

<div id="alternate_header" class="hide">
	<div class="container">

		<!--div id="header-cart">
			<a href="/store/cart">Your Cart</a>
		</div>

		<div id="header-login">
			<a href="/store/my-account">Login</a>
		</div-->	

		<nav role="navigation">
			<ul><li class="current explore"><a href="/explore">Explore</a></li><li class="home"><a href="/home">Home</a></li><li class="bibles"><a href="/bibles">Bibles</a></li><li class="reviews"><a href="/reviews">Reviews</a></li><li class="deep-blue-kids-bible"><a href="/deep-blue-kids-bible" target="_blank">Deep Blue Kids Bible</a></li></ul>
		</nav>

	</div>
</div>	

	<section id="content" role="main">

		<header>
			<div class="container">
				<h1>Explore</h1>
			</div>
			<div class="divider"></div>
		</header>

		<nav>
			<div class="container">
				<div class="toggle">More Pages</div> <ul><li><a href="/explore">About</a></li><li><a href="/explore/compare">Compare Translations</a></li><li><a href="/explore/our-scholars">Our Scholars</a></li><li><a href="/explore/maps">Maps</a></li><li class="current"><a href="/explore/passage-lookup">Passage Lookup</a></li><li><a href="/explore/downloads">Free Downloads</a></li></ul>
			</div>
		</nav>
		
		<section id="main">

			<div class="container">

				<div id="bible_gateway">

	<form action="/explore/passage-lookup" method="POST">
		<h2>Search the CEB</h2>
		<div class="field">
			<input name="query" placeholder="Enter your favorite passage... (e.g. John 1:14)" type="text" value="John 1:1" />
			<button type="submit">Read It</button>
		</div>
	</form>
	
	<div id="ceb_search_results">
		<ul><li><h2>John 1:1</h2> <h3><span id="unique-id-26035" class="text John-1-1">Story of the Word</span></h3><div class="poetry"><p class="line"><span class="chapter-1"><span class="text John-1-1"><span class="chapternum">1 </span>In the beginning was the Word</span></span><br /><span class="indent-1"><span class="indent-1-breaks">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text John-1-1">and the Word was with God</span></span><br /><span class="indent-1"><span class="indent-1-breaks">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text John-1-1">and the Word was God.</span></span></p> </div></li></ul>
	</div>
	
</div>


			</div>

		</section>

	</section>

	<footer>

		<div class="container">

			<div id="footer-logo"><img src="/images/main/footer-logo.png" alt="" /></div>

			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/help">Help</a></li>
<!-- 					<li><a href="/blog">Blog</a></li> -->
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/explore">Explore</a></li>
					<li><a href="/terms-of-use">Terms of Use</a></li>
					<li><a href="/bibles">Bibles</a></li>
					<li><a href="/explore/downloads">Downloads</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>	
			</nav>

			<div class="social_links">
				<h2>Social Media</h2>
				<ul>
					<li class="twitter"><a target="_blank" href="https://twitter.com/commonengbible">Twitter</a></li>
					<li class="facebook"><a target="_blank" href="https://www.facebook.com/LiveTheBible">Facebook</a></li>
					<li class="vimeo"><a target="_blank" href="http://vimeo.com/commonenglishbible">Vimeo</a></li>
					<li class="pinterest"><a target="_blank" href="http://pinterest.com/commonengbible/">Vimeo</a></li>
				</ul>	
			</div>

			<div id="footer-dbk-link"><a href="http://www.deepbluekidsbible.com/" target="_blank"><img src="/images/main/footer-dbk-logo.jpg" alt="" /></a></div>

			<div class="copyright">&copy; 2011 Common English Bible &bull;&nbsp;Powered by <a href="http://www.agroup.com" target="_blank">The A Group</a></div>

		</div>

	</footer>

	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-44934529-1']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();	
	</script>

<!-- Google Tag Manager -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NH57FX8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH57FX8');</script>
<!-- End Google Tag Manager -->

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '160873714581778');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1"
src="https://www.facebook.com/tr?id=160873714581778&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->


</div>
</div>
</body>
</html>`).querySelectorAll('#ceb_search_results p');