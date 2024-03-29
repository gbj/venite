import { parseOremusResponse } from "../src/oremus";
import { parse } from "node-html-parser";

describe("Bible API", () => {
  it("should format ordinary proses verses properly (NRSVAE)", () => {
    expect(
      parseOremusResponse("John 3:16-21", JOHN_3_16_21_NRSVAE, "NRSVAE")
    ).toEqual([
      {
        book: "John",
        chapter: "3",
        verse: "16",
        text:
          "&#145;For God so loved the world that he gave his only Son, so that everyone who believes in him may not perish but may have eternal life. ",
      },
      {
        type: "heading",
        hidden: false,
        value: [""],
      },
      {
        book: "John",
        chapter: "3",
        verse: "17",
        text:
          "&#145;Indeed, God did not send the Son into the world to condemn the world, but in order that the world might be saved through him. ",
      },
      {
        book: "John",
        chapter: "3",
        verse: "18",
        text:
          "Those who believe in him are not condemned; but those who do not believe are condemned already, because they have not believed in the name of the only Son of God. ",
      },
      {
        book: "John",
        chapter: "3",
        verse: "19",
        text:
          "And this is the judgement, that the light has come into the world, and people loved darkness rather than light because their deeds were evil. ",
      },
      {
        book: "John",
        chapter: "3",
        verse: "20",
        text:
          "For all who do evil hate the light and do not come to the light, so that their deeds may not be exposed. ",
      },
      {
        book: "John",
        chapter: "3",
        verse: "21",
        text:
          "But those who do what is true come to the light, so that it may be clearly seen that their deeds have been done in God.&#146; \n",
      },
    ]);
  });

  it("should handle the KJV", () => {
    expect(
      parseOremusResponse("Isaiah 55:1-2", ISAIAH_55_1_2_AV, "AV")
    ).toEqual([
      {
        book: "Isaiah",
        chapter: "55",
        verse: "1",
        text:
          "Ho, every one that thirsteth, come ye to the waters, and he that hath no money; come ye, buy, and eat; yea, come, buy wine and milk without money and without price. ",
      },
      {
        book: "Isaiah",
        chapter: "55",
        verse: "2",
        text:
          "Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness. ",
      },
    ]);
  });

  it("should handle smallcaps and ordinary prose (NRSV)", () => {
    expect(parseOremusResponse("Deut. 3:20", DEUT_3_20_NRSV, "NRSV")).toEqual([
      {
        book: "Deut.",
        chapter: "3",
        verse: "20",
        text:
          "When the LORD gives rest to your kindred, as to you, and they too have occupied the land that the LORD your God is giving them beyond the Jordan, then each of you may return to the property that I have given to you.&#148; ",
      },
    ]);
  });

  it("should handle cross-chapter citations (NRSV)", () => {
    expect(
      parseOremusResponse("1 Samuel 8:4-20; 11:14-15", FIRST_SAM, "NRSV")
    ).toEqual([
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "4",
        text:
          "Then all the elders of Israel gathered together and came to Samuel at Ramah, ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "5",
        text:
          "and said to him, &#145;You are old and your sons do not follow in your ways; appoint for us, then, a king to govern us, like other nations.&#146; ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "6",
        text:
          "But the thing displeased Samuel when they said, &#145;Give us a king to govern us.&#146; Samuel prayed to the LORD, ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "7",
        text:
          "and the LORD said to Samuel, &#145;Listen to the voice of the people in all that they say to you; for they have not rejected you, but they have rejected me from being king over them. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "8",
        text:
          "Just as they have done to me, from the day I brought them up out of Egypt to this day, forsaking me and serving other gods, so also they are doing to you. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "9",
        text:
          "Now then, listen to their voice; only&#151;you shall solemnly warn them, and show them the ways of the king who shall reign over them.&#146; ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "10",
        text:
          "So Samuel reported all the words of the LORD to the people who were asking him for a king. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "11",
        text:
          "He said, &#145;These will be the ways of the king who will reign over you: he will take your sons and appoint them to his chariots and to be his horsemen, and to run before his chariots; ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "12",
        text:
          "and he will appoint for himself commanders of thousands and commanders of fifties, and some to plow his ground and to reap his harvest, and to make his implements of war and the equipment of his chariots. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "13",
        text:
          "He will take your daughters to be perfumers and cooks and bakers. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "14",
        text:
          "He will take the best of your fields and vineyards and olive orchards and give them to his courtiers. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "15",
        text:
          "He will take one-tenth of your grain and of your vineyards and give it to his officers and his courtiers. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "16",
        text:
          "He will take your male and female slaves, and the best of your cattle and donkeys, and put them to his work. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "17",
        text:
          "He will take one-tenth of your flocks, and you shall be his slaves. ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "18",
        text:
          "And in that day you will cry out because of your king, whom you have chosen for yourselves; but the LORD will not answer you in that day.&#146; ",
      },
      {
        hidden: false,
        type: "heading",
        value: [""],
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "19",
        text:
          "But the people refused to listen to the voice of Samuel; they said, &#145;No! but we are determined to have a king over us, ",
      },
      {
        book: "1 Samuel",
        chapter: "8",
        verse: "20",
        text:
          "so that we also may be like other nations, and that our king may govern us and go out before us and fight our battles.&#146; ",
      },
      {
        hidden: false,
        type: "heading",
        value: [""],
      },
      {
        book: "1 Samuel",
        chapter: "11",
        verse: "14",
        text:
          "Samuel said to the people, &#145;Come, let us go to Gilgal and there renew the kingship.&#146; ",
      },
      {
        book: "1 Samuel",
        chapter: "11",
        verse: "15",
        text:
          "So all the people went to Gilgal, and there they made Saul king before the LORD in Gilgal. There they sacrificed offerings of well-being before the LORD, and there Saul and all the Israelites rejoiced greatly. ",
      },
    ]);
  });
});

const JOHN_3_16_21_NRSVAE = parse(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>oremus Bible Browser : John 3:16-21</title>
    <link rel="stylesheet" href="/bible.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/bscreen.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/bprint.css" type="text/css" media="print" />
    <link rel="stylesheet" href="/obb/obb.css" type="text/css" media="all" />
    <link rev="made" href="mailto:biblemail&#64;oremus.org" />
    <script type="text/javascript" src="/bible.js?10"></script>
  </head>
  <body class="dmtog" onLoad="bStart();">

    <script language="JavaScript">
      var ol_sticky=1;var ol_cap="footnote";
      ol_fixx=610;var ol_offsety=-25;ol_fgcolor="#FFEEEE";
      ol_bgcolor="#880000";ol_textcolor="black";ol_textsize="-1";ol_closecolor="#FFEEEE";
    </script>

    <div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000;"></div>
    <script language="JavaScript" src="overlib_mini.js"><!-- overLIB (c) Erik Bosrup --></script>

    <script type="text/javascript">

       var dark = false;
       function init_dark()
       {
          var cdark = b_get_cookie( 'darkmode' );
          if ( cdark && cdark == 'true' )
          {
             darkToggle();
          }
       }

       function b_set_cookie( name, value, expires, path, domain, secure )
       {
          // set time, in milliseconds
          var today = new Date();
          today.setTime( today.getTime() );

           /*
              if the expires variable is set, make the correct
              expires time, the current script below will set
              it for x number of days, to make it for hours,
              delete * 24, for minutes, delete * 60 * 24
           */
           if ( expires )
           {
              expires = expires * 1000 * 60 * 60 * 24;
           }
           var expires_date = new Date( today.getTime() + (expires) );

           document.cookie = name + "=" +escape( value ) +
               ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
               ( ( path ) ? ";path=" + path : "" ) +
               ( ( domain ) ? ";domain=" + domain : "" ) +
               ( ( secure ) ? ";secure" : "" );
       }


       function b_get_cookie( check_name )
       {
          // first split this cookie up into name/value pairs
          // note: document.cookie only returns name=value, not the other components
          var a_all_cookies = document.cookie.split( ';' );
          var a_temp_cookie = '';
          var cookie_name = '';
          var cookie_value = '';
          var b_cookie_found = false; // set boolean t/f default f
         
          for ( i = 0; i < a_all_cookies.length; i++ )
          {
             // now split apart each name=value pair
             a_temp_cookie = a_all_cookies[i].split( '=' );
           
             // and trim left/right whitespace while we are at it
             cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
           
             // if the extracted name matches passed check_name
             if ( cookie_name == check_name )
             {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if ( a_temp_cookie.length > 1 )
                {
                   cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
             }
             a_temp_cookie = null;
             cookie_name = '';
          }
          if ( ! b_cookie_found )
          {
             return null;
          }
       }

       function darkToggle()
       {
	   if ( dark )
	   {
             dark = false;

             dmStyleClassToggle( 'dmtog', '#FFFFFF', '#880000' );
             dmStyleClassToggle( 'bibletext', '#FFFFFF', '#010000' );
             dmStyleClassToggle( 'dmtog2', '', '#880000' );
             dmStyleClassToggle( 'obb', '', '#DD0000' );
             dmStyleClassToggle( 'search', '', '#440000' );
             dmStyleClassToggle( 'credits', '#FFFFFF', '#440000' );
             dmStyleClassToggle( 'screencredits', '', '#440000' );

             dmStyleTagToggle( 'h2', '', '#880000' );
             dmStyleTagToggle( 'h3', '', '#880000' );
             dmStyleTagToggle( 'a', '', '#0000BB' );

             document.getElementById( "dark-checkbox" ).checked = false;
	   }
           else
           {
             dark = true;

             dmStyleClassToggle( 'dmtog', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'bibletext', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'dmtog2', '', '#EECCCC' );
             dmStyleClassToggle( 'obb', '', '#FF9999' );
             dmStyleClassToggle( 'search', '', '#EECCCC' );
             dmStyleClassToggle( 'credits', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'screencredits', '#222222', '#CCCCCC' );

             dmStyleTagToggle( 'h2', '', '#EECCCC' );
             dmStyleTagToggle( 'h3', '', '#EECCCC' );
             dmStyleTagToggle( 'a', '', '#8888BB' );

             document.getElementById( "dark-checkbox" ).checked = true;
           }
           b_set_cookie( 'darkmode', dark, '3652', '/', '', '' );
       }

       function dmStyleClassToggle( className, bgColor, fgColor )
       {
             const togs = document.getElementsByClassName( className );
             for ( let tog of togs )
             {
                 if ( bgColor )
                 {
                     tog.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     tog.style.color = fgColor;
                 }
             }
       }

       function dmStyleTagToggle( tagName, bgColor, fgColor )
       {
             const els = document.getElementsByTagName( tagName );
             for ( let el of els )
             {
                 if ( bgColor )
                 {
                     el.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     el.style.color = fgColor;
                 }
             }
       }


       function bStart()
       {
           FormLoad();
           init_dark();     
       }

    </script>

<p>
  <label for="dark-checkbox">Dark mode:</label>

    <input type="checkbox" name="dark" id="dark-checkbox" onclick="darkToggle();">
</p>
    <script language="JavaScript">
      function setVis()
      {
        changeElementVisibility('sect');

      }
    </script>
<h1 align="center" id="h1screen">
<span class="obb" style="font-size: 65px; color: #D00"> Bible Browser</span>
</h1>
<div class="quicklink">
<form method="post" action="/?version=NRSVAE&amp;passage=John%203:16-21" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="John 3:16-21"  />
<input type="hidden" name="version" value="NRSVAE"  />
</form>
</div>
<hr class="quicklink" /><div class="visbuttons"><nobr><label><input type="checkbox" name="vnum" value="no" checked="checked" id="vnum" onclick="changeElementVisibility('vnum')" /></label><label for="vnum">Omit&nbsp;verse&nbsp;numbers;</label></nobr>
<nobr><label><input type="checkbox" name="fnote" value="no" checked="checked" id="fnote" onclick="changeElementVisibility('fnote')" /></label><label for="fnote">Omit&nbsp;footnotes</label></nobr>
<br />
<nobr><label><input type="checkbox" name="headings" value="yes" checked="checked" id="headings" onclick="changeElementVisibility('sect')" /></label><label for="headings">Show&nbsp;section&nbsp;headings;</label></nobr>
<nobr><label><input type="checkbox" name="show_ref" value="no" id="ref" onclick="changeElementVisibility('passageref')" /></label><label for="ref">Omit&nbsp;passage&nbsp;reference</label></nobr>
<br />
<nobr><label><input type="checkbox" name="show_adj" value="no" id="adj" onclick="changeElementVisibility('adj')" /></label><label for="adj">Omit&nbsp;adjacent&nbsp;passage&nbsp;references</label></nobr>
<form onSubmit="removeHidden();return false;"><input type="submit" value="Remove hidden text" /></form><hr />
</div><!-- class="visbuttons" -->
<div class="bible dmtog">

<h2 class="passageref">John 3:16-21</h2>

<div class="bibletext">
<p>

</p><p><span class="vv vnumVis">16&nbsp;</span>&#145;For God so loved the world that he gave his only Son, so that everyone who believes in him may not perish but may have eternal life.
</p><p><span class="vv vnumVis">17&nbsp;</span>&#145;Indeed, God did not send the Son into the world to condemn the world, but in order that the world might be saved through him.
<sup class="ww vnumVis">18</sup>Those who believe in him are not condemned; but those who do not believe are condemned already, because they have not believed in the name of the only Son of God.
<sup class="ww vnumVis">19</sup>And this is the judgement, that the light has come into the world, and people loved darkness rather than light because their deeds were evil.
<sup class="ww vnumVis">20</sup>For all who do evil hate the light and do not come to the light, so that their deeds may not be exposed.
<sup class="ww vnumVis">21</sup>But those who do what is true come to the light, so that it may be clearly seen that their deeds have been done in God.&#146;<a href="javascript:void(0);" onmouseover="return overlib('Some interpreters hold that the quotation concludes with verse<span class=thinspace> </span>15');" onmouseout="return nd();"><sup class="fnote">*</sup></a> <br class=plus-b /></p><p>
</p>

</div><!-- class="bibletext" -->

<div class="adj">
<table border="0" width="100%"><tr><td valign="top" align="right">&lt;&lt;</td><td valign="top" align="left"><form method="post" action="/?version=NRSVAE&amp;passage=John%203:16-21" enctype="multipart/form-data"><input type="hidden" name="passage" value="John 3.1-15" />
<input type="submit" name="show passage_button" value="John 3.1-15" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSVAE" />
</form>
</td><td valign="top" align="right"><form method="post" action="/?version=NRSVAE&amp;passage=John%203:16-21" enctype="multipart/form-data"><input type="hidden" name="passage" value="John 3.22-36" />
<input type="submit" name="show passage_button" value="John 3.22-36" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSVAE" />
</form>
</td><td valign="top" align="left">&gt;&gt;</td></tr></table>
</div><!-- class="adj" -->
</div><!-- class="bible" -->

<div class="copyright dmtog">
<hr />
<p class="dmtog">
<cite>New Revised Standard Version Bible: Anglicized Edition</cite>, copyright &copy; 1989, 1995 National Council of the Churches of Christ in the United States of America. Used by permission. All rights reserved worldwide. <a href="http://nrsvbibles.org">http://nrsvbibles.org</a>
</p>
</div><!-- class="copyright" -->

<div class="quicklink">
<form method="post" action="/?version=NRSVAE&amp;passage=John%203:16-21" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="John 3:16-21"  />
<input type="hidden" name="version" value="NRSVAE"  />
</form>
</div>
<hr class="quicklink" />
<div class="another">
<p>Enter another bible reference: </p><form method="post" action="/?version=NRSVAE&amp;passage=John%203:16-21" enctype="multipart/form-data"><input type="text" name="passage" value="" size="22" maxlength="1024" /><input type="submit" name="show passage_button" value="show passage" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSVAE" />
</form>

</div> <!-- class="another" -->
    <div align="left" class="credits dmtog">
      <hr />
      <div class="screencredits">
	<p class="dmtog">
	  <a href="/">
<span class="obb" style="font-size: 68px; color: #D00; line-height: 0.65em;">obb</span><br />
<span class="obb" style="font-size: 18px; color: #D00">bible browser</span>
</a><br />
	    <a href="mailto:biblemail&#64;oremus.org">biblemail&#64;oremus.org</a><br />
	  v&nbsp;2.5.1<br />
	  29 April 2019
	</p>
      </div>
      <div class="printcredits">
	From the oremus Bible Browser https://bible.oremus.org v2.5.1 29 April 2019.
      </div>
    </div>

  </body>

</html>
`).querySelector("div.bibletext");
const ISAIAH_55_1_2_AV = parse(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>oremus Bible Browser : Isaiah 55:1-2</title>
    <link rel="stylesheet" href="/bible.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/bscreen.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/bprint.css" type="text/css" media="print" />
    <link rel="stylesheet" href="/obb/obb.css" type="text/css" media="all" />
    <link rev="made" href="mailto:biblemail@oremus.org" />
    <script type="text/javascript" src="/bible.js?10"></script>
  </head>
  <body class="dmtog" onLoad="bStart();">

    <script language="JavaScript">
      var ol_sticky=1;var ol_cap="footnote";
      ol_fixx=610;var ol_offsety=-25;ol_fgcolor="#FFEEEE";
      ol_bgcolor="#880000";ol_textcolor="black";ol_textsize="-1";ol_closecolor="#FFEEEE";
    </script>

    <div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000;"></div>
    <script language="JavaScript" src="overlib_mini.js"><!-- overLIB (c) Erik Bosrup --></script>

    <script type="text/javascript">

       var dark = false;
       function init_dark()
       {
          var cdark = b_get_cookie( 'darkmode' );
          if ( cdark && cdark == 'true' )
          {
             darkToggle();
          }
       }

       function b_set_cookie( name, value, expires, path, domain, secure )
       {
          // set time, in milliseconds
          var today = new Date();
          today.setTime( today.getTime() );

           /*
              if the expires variable is set, make the correct
              expires time, the current script below will set
              it for x number of days, to make it for hours,
              delete * 24, for minutes, delete * 60 * 24
           */
           if ( expires )
           {
              expires = expires * 1000 * 60 * 60 * 24;
           }
           var expires_date = new Date( today.getTime() + (expires) );

           document.cookie = name + "=" +escape( value ) +
               ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
               ( ( path ) ? ";path=" + path : "" ) +
               ( ( domain ) ? ";domain=" + domain : "" ) +
               ( ( secure ) ? ";secure" : "" );
       }


       function b_get_cookie( check_name )
       {
          // first split this cookie up into name/value pairs
          // note: document.cookie only returns name=value, not the other components
          var a_all_cookies = document.cookie.split( ';' );
          var a_temp_cookie = '';
          var cookie_name = '';
          var cookie_value = '';
          var b_cookie_found = false; // set boolean t/f default f
         
          for ( i = 0; i < a_all_cookies.length; i++ )
          {
             // now split apart each name=value pair
             a_temp_cookie = a_all_cookies[i].split( '=' );
           
             // and trim left/right whitespace while we are at it
             cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
           
             // if the extracted name matches passed check_name
             if ( cookie_name == check_name )
             {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if ( a_temp_cookie.length > 1 )
                {
                   cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
             }
             a_temp_cookie = null;
             cookie_name = '';
          }
          if ( ! b_cookie_found )
          {
             return null;
          }
       }

       function darkToggle()
       {
	   if ( dark )
	   {
             dark = false;

             dmStyleClassToggle( 'dmtog', '#FFFFFF', '#880000' );
             dmStyleClassToggle( 'bibletext', '#FFFFFF', '#010000' );
             dmStyleClassToggle( 'dmtog2', '', '#880000' );
             dmStyleClassToggle( 'obb', '', '#DD0000' );
             dmStyleClassToggle( 'search', '', '#440000' );
             dmStyleClassToggle( 'credits', '#FFFFFF', '#440000' );
             dmStyleClassToggle( 'screencredits', '', '#440000' );

             dmStyleTagToggle( 'h2', '', '#880000' );
             dmStyleTagToggle( 'h3', '', '#880000' );
             dmStyleTagToggle( 'a', '', '#0000BB' );

             document.getElementById( "dark-checkbox" ).checked = false;
	   }
           else
           {
             dark = true;

             dmStyleClassToggle( 'dmtog', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'bibletext', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'dmtog2', '', '#EECCCC' );
             dmStyleClassToggle( 'obb', '', '#FF9999' );
             dmStyleClassToggle( 'search', '', '#EECCCC' );
             dmStyleClassToggle( 'credits', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'screencredits', '#222222', '#CCCCCC' );

             dmStyleTagToggle( 'h2', '', '#EECCCC' );
             dmStyleTagToggle( 'h3', '', '#EECCCC' );
             dmStyleTagToggle( 'a', '', '#8888BB' );

             document.getElementById( "dark-checkbox" ).checked = true;
           }
           b_set_cookie( 'darkmode', dark, '3652', '/', '', '' );
       }

       function dmStyleClassToggle( className, bgColor, fgColor )
       {
             const togs = document.getElementsByClassName( className );
             for ( let tog of togs )
             {
                 if ( bgColor )
                 {
                     tog.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     tog.style.color = fgColor;
                 }
             }
       }

       function dmStyleTagToggle( tagName, bgColor, fgColor )
       {
             const els = document.getElementsByTagName( tagName );
             for ( let el of els )
             {
                 if ( bgColor )
                 {
                     el.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     el.style.color = fgColor;
                 }
             }
       }


       function bStart()
       {
           FormLoad();
           init_dark();     
       }

    </script>

<p>
  <label for="dark-checkbox">Dark mode:</label>

    <input type="checkbox" name="dark" id="dark-checkbox" onclick="darkToggle();">
</p>
    <script language="JavaScript">
      function setVis()
      {
        changeElementVisibility('sect');

      }
    </script>
<h1 align="center" id="h1screen">
<span class="obb" style="font-size: 65px; color: #D00"> Bible Browser</span>
</h1>
<div class="quicklink">
<form method="post" action="/?version=AV&amp;passage=Isaiah%2055:1-2" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="Isaiah 55:1-2"  />
<input type="hidden" name="version" value="AV"  />
</form>
</div>
<hr class="quicklink" /><div class="visbuttons"><nobr><label><input type="checkbox" name="vnum" value="no" checked="checked" id="vnum" onclick="changeElementVisibility('vnum')" /></label><label for="vnum">Omit&nbsp;verse&nbsp;numbers;</label></nobr>
<nobr><label><input type="checkbox" name="fnote" value="no" checked="checked" id="fnote" onclick="changeElementVisibility('fnote')" /></label><label for="fnote">Omit&nbsp;footnotes</label></nobr>
<br />
<nobr><label><input type="checkbox" name="headings" value="yes" checked="checked" id="headings" onclick="changeElementVisibility('sect')" /></label><label for="headings">Show&nbsp;section&nbsp;headings;</label></nobr>
<nobr><label><input type="checkbox" name="show_ref" value="no" id="ref" onclick="changeElementVisibility('passageref')" /></label><label for="ref">Omit&nbsp;passage&nbsp;reference</label></nobr>
<br />
<nobr><label><input type="checkbox" name="show_adj" value="no" id="adj" onclick="changeElementVisibility('adj')" /></label><label for="adj">Omit&nbsp;adjacent&nbsp;passage&nbsp;references</label></nobr>
<form onSubmit="removeHidden();return false;"><input type="submit" value="Remove hidden text" /></form><hr />
</div><!-- class="visbuttons" -->
<div class="bible dmtog">

<h2 class="passageref">Isaiah 55:1-2</h2>

<div class="bibletext">
<p>

<p>&nbsp;</p><p><span class="cc vnumVis">55</span>Ho, every one that thirsteth, come ye to the waters, and he that hath no money; come ye, buy, and eat; yea, come, buy wine and milk without money and without price.<br />
<sup class="ww vnumVis">2</sup>Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness.<br /></verse>
</p>

</div><!-- class="bibletext" -->

<div class="adj">
<table border="0" width="100%"><tr><td valign="top" align="right">&lt;&lt;</td><td valign="top" align="left"><form method="post" action="/?version=AV&amp;passage=Isaiah%2055:1-2" enctype="multipart/form-data"><input type="hidden" name="passage" value="Isaiah 54" />
<input type="submit" name="show passage_button" value="Isaiah 54" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="AV" />
</form>
</td><td valign="top" align="right"><form method="post" action="/?version=AV&amp;passage=Isaiah%2055:1-2" enctype="multipart/form-data"><input type="hidden" name="passage" value="Isaiah 55.3-13" />
<input type="submit" name="show passage_button" value="Isaiah 55.3-13" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="AV" />
</form>
</td><td valign="top" align="left">&gt;&gt;</td></tr></table>
</div><!-- class="adj" -->
</div><!-- class="bible" -->

<div class="copyright dmtog">
<hr />
</div><!-- class="copyright" -->

<div class="quicklink">
<form method="post" action="/?version=AV&amp;passage=Isaiah%2055:1-2" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="Isaiah 55:1-2"  />
<input type="hidden" name="version" value="AV"  />
</form>
</div>
<hr class="quicklink" />
<div class="another">
<p>Enter another bible reference: </p><form method="post" action="/?version=AV&amp;passage=Isaiah%2055:1-2" enctype="multipart/form-data"><input type="text" name="passage" value="" size="22" maxlength="1024" /><input type="submit" name="show passage_button" value="show passage" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="AV" />
</form>

</div> <!-- class="another" -->
    <div align="left" class="credits dmtog">
      <hr />
      <div class="screencredits">
	<p class="dmtog">
	  <a href="/">
<span class="obb" style="font-size: 68px; color: #D00; line-height: 0.65em;">obb</span><br />
<span class="obb" style="font-size: 18px; color: #D00">bible browser</span>
</a><br />
	    <a href="mailto:biblemail&#64;oremus.org">biblemail&#64;oremus.org</a><br />
	  v&nbsp;2.5.1<br />
	  29 April 2019
	</p>
      </div>
      <div class="printcredits">
	From the oremus Bible Browser https://bible.oremus.org v2.5.1 29 April 2019.
      </div>
    </div>

  </body>

</html>
`).querySelector("div.bibletext");
const DEUT_3_20_NRSV = parse(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>oremus Bible Browser : Deut. 3:20</title>
    <link rel="stylesheet" href="/bible.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/bscreen.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/bprint.css" type="text/css" media="print" />
    <link rel="stylesheet" href="/obb/obb.css" type="text/css" media="all" />
    <link rev="made" href="mailto:biblemail&#64;oremus.org" />
    <script type="text/javascript" src="/bible.js?10"></script>
  </head>
  <body class="dmtog" onLoad="bStart();">

    <script language="JavaScript">
      var ol_sticky=1;var ol_cap="footnote";
      ol_fixx=610;var ol_offsety=-25;ol_fgcolor="#FFEEEE";
      ol_bgcolor="#880000";ol_textcolor="black";ol_textsize="-1";ol_closecolor="#FFEEEE";
    </script>

    <div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000;"></div>
    <script language="JavaScript" src="overlib_mini.js"><!-- overLIB (c) Erik Bosrup --></script>

    <script type="text/javascript">

       var dark = false;
       function init_dark()
       {
          var cdark = b_get_cookie( 'darkmode' );
          if ( cdark && cdark == 'true' )
          {
             darkToggle();
          }
       }

       function b_set_cookie( name, value, expires, path, domain, secure )
       {
          // set time, in milliseconds
          var today = new Date();
          today.setTime( today.getTime() );

           /*
              if the expires variable is set, make the correct
              expires time, the current script below will set
              it for x number of days, to make it for hours,
              delete * 24, for minutes, delete * 60 * 24
           */
           if ( expires )
           {
              expires = expires * 1000 * 60 * 60 * 24;
           }
           var expires_date = new Date( today.getTime() + (expires) );

           document.cookie = name + "=" +escape( value ) +
               ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
               ( ( path ) ? ";path=" + path : "" ) +
               ( ( domain ) ? ";domain=" + domain : "" ) +
               ( ( secure ) ? ";secure" : "" );
       }


       function b_get_cookie( check_name )
       {
          // first split this cookie up into name/value pairs
          // note: document.cookie only returns name=value, not the other components
          var a_all_cookies = document.cookie.split( ';' );
          var a_temp_cookie = '';
          var cookie_name = '';
          var cookie_value = '';
          var b_cookie_found = false; // set boolean t/f default f
         
          for ( i = 0; i < a_all_cookies.length; i++ )
          {
             // now split apart each name=value pair
             a_temp_cookie = a_all_cookies[i].split( '=' );
           
             // and trim left/right whitespace while we are at it
             cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
           
             // if the extracted name matches passed check_name
             if ( cookie_name == check_name )
             {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if ( a_temp_cookie.length > 1 )
                {
                   cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
             }
             a_temp_cookie = null;
             cookie_name = '';
          }
          if ( ! b_cookie_found )
          {
             return null;
          }
       }

       function darkToggle()
       {
	   if ( dark )
	   {
             dark = false;

             dmStyleClassToggle( 'dmtog', '#FFFFFF', '#880000' );
             dmStyleClassToggle( 'bibletext', '#FFFFFF', '#010000' );
             dmStyleClassToggle( 'dmtog2', '', '#880000' );
             dmStyleClassToggle( 'obb', '', '#DD0000' );
             dmStyleClassToggle( 'search', '', '#440000' );
             dmStyleClassToggle( 'credits', '#FFFFFF', '#440000' );
             dmStyleClassToggle( 'screencredits', '', '#440000' );

             dmStyleTagToggle( 'h2', '', '#880000' );
             dmStyleTagToggle( 'h3', '', '#880000' );
             dmStyleTagToggle( 'a', '', '#0000BB' );

             document.getElementById( "dark-checkbox" ).checked = false;
	   }
           else
           {
             dark = true;

             dmStyleClassToggle( 'dmtog', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'bibletext', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'dmtog2', '', '#EECCCC' );
             dmStyleClassToggle( 'obb', '', '#FF9999' );
             dmStyleClassToggle( 'search', '', '#EECCCC' );
             dmStyleClassToggle( 'credits', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'screencredits', '#222222', '#CCCCCC' );

             dmStyleTagToggle( 'h2', '', '#EECCCC' );
             dmStyleTagToggle( 'h3', '', '#EECCCC' );
             dmStyleTagToggle( 'a', '', '#8888BB' );

             document.getElementById( "dark-checkbox" ).checked = true;
           }
           b_set_cookie( 'darkmode', dark, '3652', '/', '', '' );
       }

       function dmStyleClassToggle( className, bgColor, fgColor )
       {
             const togs = document.getElementsByClassName( className );
             for ( let tog of togs )
             {
                 if ( bgColor )
                 {
                     tog.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     tog.style.color = fgColor;
                 }
             }
       }

       function dmStyleTagToggle( tagName, bgColor, fgColor )
       {
             const els = document.getElementsByTagName( tagName );
             for ( let el of els )
             {
                 if ( bgColor )
                 {
                     el.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     el.style.color = fgColor;
                 }
             }
       }


       function bStart()
       {
           FormLoad();
           init_dark();     
       }

    </script>

<p>
  <label for="dark-checkbox">Dark mode:</label>

    <input type="checkbox" name="dark" id="dark-checkbox" onclick="darkToggle();">
</p>
    <script language="JavaScript">
      function setVis()
      {
        changeElementVisibility('sect');

      }
    </script>
<h1 align="center" id="h1screen">
<span class="obb" style="font-size: 65px; color: #D00"> Bible Browser</span>
</h1>
<div class="quicklink">
<form method="post" action="/?version=NRSV&amp;passage=Deut.%203:20" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="Deut. 3:20"  />
<input type="hidden" name="version" value="NRSV"  />
</form>
</div>
<hr class="quicklink" /><div class="visbuttons"><nobr><label><input type="checkbox" name="vnum" value="no" checked="checked" id="vnum" onclick="changeElementVisibility('vnum')" /></label><label for="vnum">Omit&nbsp;verse&nbsp;numbers;</label></nobr>
<nobr><label><input type="checkbox" name="fnote" value="no" checked="checked" id="fnote" onclick="changeElementVisibility('fnote')" /></label><label for="fnote">Omit&nbsp;footnotes</label></nobr>
<br />
<nobr><label><input type="checkbox" name="headings" value="yes" checked="checked" id="headings" onclick="changeElementVisibility('sect')" /></label><label for="headings">Show&nbsp;section&nbsp;headings;</label></nobr>
<nobr><label><input type="checkbox" name="show_ref" value="no" id="ref" onclick="changeElementVisibility('passageref')" /></label><label for="ref">Omit&nbsp;passage&nbsp;reference</label></nobr>
<br />
<nobr><label><input type="checkbox" name="show_adj" value="no" id="adj" onclick="changeElementVisibility('adj')" /></label><label for="adj">Omit&nbsp;adjacent&nbsp;passage&nbsp;references</label></nobr>
<form onSubmit="removeHidden();return false;"><input type="submit" value="Remove hidden text" /></form><hr />
</div><!-- class="visbuttons" -->
<div class="bible dmtog">

<h2 class="passageref">Deut. 3:20</h2>

<div class="bibletext">
<p>

<sup class="ww vnumVis">20</sup>When the <span class=sc>Lord</span> gives rest to your kindred, as to you, and they too have occupied the land that the <span class=sc>Lord</span> your God is giving them beyond the Jordan, then each of you may return to the property that I have given to you.&#148;
</p>

</div><!-- class="bibletext" -->

<div class="adj">
<table border="0" width="100%"><tr><td valign="top" align="right">&lt;&lt;</td><td valign="top" align="left"><form method="post" action="/?version=NRSV&amp;passage=Deut.%203:20" enctype="multipart/form-data"><input type="hidden" name="passage" value="Deuteronomy 3.1-19" />
<input type="submit" name="show passage_button" value="Deuteronomy 3.1-19" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSV" />
</form>
</td><td valign="top" align="right"><form method="post" action="/?version=NRSV&amp;passage=Deut.%203:20" enctype="multipart/form-data"><input type="hidden" name="passage" value="Deuteronomy 3.21-29" />
<input type="submit" name="show passage_button" value="Deuteronomy 3.21-29" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSV" />
</form>
</td><td valign="top" align="left">&gt;&gt;</td></tr></table>
</div><!-- class="adj" -->
</div><!-- class="bible" -->

<div class="copyright dmtog">
<hr />
<p class="dmtog">
<cite>New Revised Standard Version Bible</cite>, copyright &copy; 1989 National Council of the Churches of Christ in the United States of America. Used by permission. All rights reserved worldwide. <a href="http://nrsvbibles.org">http://nrsvbibles.org</a>
</p>
</div><!-- class="copyright" -->

<div class="quicklink">
<form method="post" action="/?version=NRSV&amp;passage=Deut.%203:20" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="Deut. 3:20"  />
<input type="hidden" name="version" value="NRSV"  />
</form>
</div>
<hr class="quicklink" />
<div class="another">
<p>Enter another bible reference: </p><form method="post" action="/?version=NRSV&amp;passage=Deut.%203:20" enctype="multipart/form-data"><input type="text" name="passage" value="" size="22" maxlength="1024" /><input type="submit" name="show passage_button" value="show passage" />
<input type="hidden" name="vnum" value="yes"  />
<input type="hidden" name="fnote" value="yes"  />
<input type="hidden" name="headings" value="no"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="NRSV" />
</form>

</div> <!-- class="another" -->
    <div align="left" class="credits dmtog">
      <hr />
      <div class="screencredits">
	<p class="dmtog">
	  <a href="/">
<span class="obb" style="font-size: 68px; color: #D00; line-height: 0.65em;">obb</span><br />
<span class="obb" style="font-size: 18px; color: #D00">bible browser</span>
</a><br />
	    <a href="mailto:biblemail&#64;oremus.org">biblemail&#64;oremus.org</a><br />
	  v&nbsp;2.5.1<br />
	  29 April 2019
	</p>
      </div>
      <div class="printcredits">
	From the oremus Bible Browser https://bible.oremus.org v2.5.1 29 April 2019.
      </div>
    </div>

  </body>

</html>
`).querySelector("div.bibletext");

const FIRST_SAM = parse(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>oremus Bible Browser : 1 Samuel 8:4-20, 11:14-15</title>
    <link rel="stylesheet" href="/bible.css" type="text/css" media="all" />
    <link rel="stylesheet" href="/bscreen.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/bprint.css" type="text/css" media="print" />
    <link rel="stylesheet" href="/obb/obb.css" type="text/css" media="all" />
    <link rev="made" href="mailto:biblemail@oremus.org" />
    <script type="text/javascript" src="/bible.js?10"></script>
  </head>
  <body class="dmtog" onLoad="bStart();">

    <script language="JavaScript">
      var ol_sticky=1;var ol_cap="footnote";
      ol_fixx=610;var ol_offsety=-25;ol_fgcolor="#FFEEEE";
      ol_bgcolor="#880000";ol_textcolor="black";ol_textsize="-1";ol_closecolor="#FFEEEE";
    </script>

    <div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000;"></div>
    <script language="JavaScript" src="overlib_mini.js"><!-- overLIB (c) Erik Bosrup --></script>

    <script type="text/javascript">

       var dark = false;
       function init_dark()
       {
          var cdark = b_get_cookie( 'darkmode' );
          if ( cdark && cdark == 'true' )
          {
             darkToggle();
          }
       }

       function b_set_cookie( name, value, expires, path, domain, secure )
       {
          // set time, in milliseconds
          var today = new Date();
          today.setTime( today.getTime() );

           /*
              if the expires variable is set, make the correct
              expires time, the current script below will set
              it for x number of days, to make it for hours,
              delete * 24, for minutes, delete * 60 * 24
           */
           if ( expires )
           {
              expires = expires * 1000 * 60 * 60 * 24;
           }
           var expires_date = new Date( today.getTime() + (expires) );

           document.cookie = name + "=" +escape( value ) +
               ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
               ( ( path ) ? ";path=" + path : "" ) +
               ( ( domain ) ? ";domain=" + domain : "" ) +
               ( ( secure ) ? ";secure" : "" );
       }


       function b_get_cookie( check_name )
       {
          // first split this cookie up into name/value pairs
          // note: document.cookie only returns name=value, not the other components
          var a_all_cookies = document.cookie.split( ';' );
          var a_temp_cookie = '';
          var cookie_name = '';
          var cookie_value = '';
          var b_cookie_found = false; // set boolean t/f default f
         
          for ( i = 0; i < a_all_cookies.length; i++ )
          {
             // now split apart each name=value pair
             a_temp_cookie = a_all_cookies[i].split( '=' );
           
             // and trim left/right whitespace while we are at it
             cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
           
             // if the extracted name matches passed check_name
             if ( cookie_name == check_name )
             {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if ( a_temp_cookie.length > 1 )
                {
                   cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
             }
             a_temp_cookie = null;
             cookie_name = '';
          }
          if ( ! b_cookie_found )
          {
             return null;
          }
       }

       function darkToggle()
       {
	   if ( dark )
	   {
             dark = false;

             dmStyleClassToggle( 'dmtog', '#FFFFFF', '#880000' );
             dmStyleClassToggle( 'bibletext', '#FFFFFF', '#010000' );
             dmStyleClassToggle( 'dmtog2', '', '#880000' );
             dmStyleClassToggle( 'obb', '', '#DD0000' );
             dmStyleClassToggle( 'search', '', '#440000' );
             dmStyleClassToggle( 'credits', '#FFFFFF', '#440000' );
             dmStyleClassToggle( 'screencredits', '', '#440000' );

             dmStyleTagToggle( 'h2', '', '#880000' );
             dmStyleTagToggle( 'h3', '', '#880000' );
             dmStyleTagToggle( 'a', '', '#0000BB' );

             document.getElementById( "dark-checkbox" ).checked = false;
	   }
           else
           {
             dark = true;

             dmStyleClassToggle( 'dmtog', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'bibletext', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'dmtog2', '', '#EECCCC' );
             dmStyleClassToggle( 'obb', '', '#FF9999' );
             dmStyleClassToggle( 'search', '', '#EECCCC' );
             dmStyleClassToggle( 'credits', '#222222', '#CCCCCC' );
             dmStyleClassToggle( 'screencredits', '#222222', '#CCCCCC' );

             dmStyleTagToggle( 'h2', '', '#EECCCC' );
             dmStyleTagToggle( 'h3', '', '#EECCCC' );
             dmStyleTagToggle( 'a', '', '#8888BB' );

             document.getElementById( "dark-checkbox" ).checked = true;
           }
           b_set_cookie( 'darkmode', dark, '3652', '/', '', '' );
       }

       function dmStyleClassToggle( className, bgColor, fgColor )
       {
             const togs = document.getElementsByClassName( className );
             for ( let tog of togs )
             {
                 if ( bgColor )
                 {
                     tog.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     tog.style.color = fgColor;
                 }
             }
       }

       function dmStyleTagToggle( tagName, bgColor, fgColor )
       {
             const els = document.getElementsByTagName( tagName );
             for ( let el of els )
             {
                 if ( bgColor )
                 {
                     el.style.backgroundColor = bgColor;
                 }
                 if ( fgColor )
                 {
                     el.style.color = fgColor;
                 }
             }
       }


       function bStart()
       {
           FormLoad();
           init_dark();     
       }

    </script>

<p>
  <label for="dark-checkbox">Dark mode:</label>

    <input type="checkbox" name="dark" id="dark-checkbox" onclick="darkToggle();">
</p>
    <script language="JavaScript">
      function setVis()
      {
        changeElementVisibility('vnum');
changeElementVisibility('fnote');

      }
    </script>
<h1 align="center" id="h1screen">
<span class="obb" style="font-size: 65px; color: #D00"> Bible Browser</span>
</h1>
<div class="quicklink">
<form method="post" action="/" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="1 Samuel 8:4-20, 11:14-15"  />
<input type="hidden" name="version" value="nrsvae"  />
<input type="hidden" name="vnum" value="no"  />
<input type="hidden" name="fnote" value="no"  />
<input type="hidden" name="headings" value="yes"  />
</form>
</div>
<hr class="quicklink" /><div class="visbuttons"><nobr><label><input type="checkbox" name="vnum" value="no" checked="checked" id="vnum" onclick="changeElementVisibility('vnum')" /></label><label for="vnum">Omit&nbsp;verse&nbsp;numbers;</label></nobr>
<nobr><label><input type="checkbox" name="fnote" value="no" checked="checked" id="fnote" onclick="changeElementVisibility('fnote')" /></label><label for="fnote">Omit&nbsp;footnotes</label></nobr>
<br />
<nobr><label><input type="checkbox" name="headings" value="yes" checked="checked" id="headings" onclick="changeElementVisibility('sect')" /></label><label for="headings">Show&nbsp;section&nbsp;headings;</label></nobr>
<nobr><label><input type="checkbox" name="show_ref" value="no" id="ref" onclick="changeElementVisibility('passageref')" /></label><label for="ref">Omit&nbsp;passage&nbsp;reference</label></nobr>
<br />
<nobr><label><input type="checkbox" name="show_adj" value="no" id="adj" onclick="changeElementVisibility('adj')" /></label><label for="adj">Omit&nbsp;adjacent&nbsp;passage&nbsp;references</label></nobr>
<form onSubmit="removeHidden();return false;"><input type="submit" value="Remove hidden text" /></form><hr />
</div><!-- class="visbuttons" -->
<div class="bible dmtog">

<h2 class="passageref">1 Samuel 8:4-20, 11:14-15</h2>

<div class="bibletext">
<p>

</p><p><span class="vv vnumVis">4&nbsp;</span>Then all the elders of Israel gathered together and came to Samuel at Ramah,
<sup class="ww vnumVis">5</sup>and said to him, &#145;You are old and your sons do not follow in your ways; appoint for us, then, a king to govern us, like other nations.&#146;
<sup class="ww vnumVis">6</sup>But the thing displeased Samuel when they said, &#145;Give us a king to govern us.&#146; Samuel prayed to the <span class=sc>Lord</span>,
<sup class="ww vnumVis">7</sup>and the <span class=sc>Lord</span> said to Samuel, &#145;Listen to the voice of the people in all that they say to you; for they have not rejected you, but they have rejected me from being king over them.
<sup class="ww vnumVis">8</sup>Just as they have done to me,<a href="javascript:void(0);" onmouseover="return overlib('Gk:<span class=thinspace> </span>Heb lacks <em>to me</em>');" onmouseout="return nd();"><sup class="fnote">*</sup></a> from the day I brought them up out of Egypt to this day, forsaking me and serving other gods, so also they are doing to you.
<sup class="ww vnumVis">9</sup>Now then, listen to their voice; only&#151;you shall solemnly warn them, and show them the ways of the king who shall reign over them.&#146;
</p><p><span class="vv vnumVis">10&nbsp;</span>So Samuel reported all the words of the <span class=sc>Lord</span> to the people who were asking him for a king.
<sup class="ww vnumVis">11</sup>He said, &#145;These will be the ways of the king who will reign over you: he will take your sons and appoint them to his chariots and to be his horsemen, and to run before his chariots;
<sup class="ww vnumVis">12</sup>and he will appoint for himself commanders of thousands and commanders of fifties, and some to plow his ground and to reap his harvest, and to make his implements of war and the equipment of his chariots.
<sup class="ww vnumVis">13</sup>He will take your daughters to be perfumers and cooks and bakers.
<sup class="ww vnumVis">14</sup>He will take the best of your fields and vineyards and olive orchards and give them to his courtiers.
<sup class="ww vnumVis">15</sup>He will take one-tenth of your grain and of your vineyards and give it to his officers and his courtiers.
<sup class="ww vnumVis">16</sup>He will take your male and female slaves, and the best of your cattle<a href="javascript:void(0);" onmouseover="return overlib('Gk:<span class=thinspace> </span>Heb <em>young men</em>');" onmouseout="return nd();"><sup class="fnote">*</sup></a> and donkeys, and put them to his work.
<sup class="ww vnumVis">17</sup>He will take one-tenth of your flocks, and you shall be his slaves.
<sup class="ww vnumVis">18</sup>And in that day you will cry out because of your king, whom you have chosen for yourselves; but the <span class=sc>Lord</span> will not answer you in that day.&#146;
<!-- <VN>19</VN> --><h2 class="plus-S sectVis">Israel&#146;s Request for a King Granted</h2><p><span class="vv vnumVis">19&nbsp;</span>But the people refused to listen to the voice of Samuel; they said, &#145;No! but we are determined to have a king over us,
<sup class="ww vnumVis">20</sup>so that we also may be like other nations, and that our king may govern us and go out before us and fight our battles.&#146;
</p><p><span class="vv vnumVis">14&nbsp;</span>Samuel said to the people, &#145;Come, let us go to Gilgal and there renew the kingship.&#146;
<sup class="ww vnumVis">15</sup>So all the people went to Gilgal, and there they made Saul king before the <span class=sc>Lord</span> in Gilgal. There they sacrificed offerings of well-being before the <span class=sc>Lord</span>, and there Saul and all the Israelites rejoiced greatly.
</p>

</div><!-- class="bibletext" -->

<div class="adj">
<table border="0" width="100%"><tr><td valign="top" align="right">&lt;&lt;</td><td valign="top" align="left"><form method="post" action="/" enctype="multipart/form-data"><input type="hidden" name="passage" value="1 Samuel 8.1-3" />
<input type="submit" name="show passage_button" value="1 Samuel 8.1-3" />
<input type="hidden" name="vnum" value="no"  />
<input type="hidden" name="fnote" value="no"  />
<input type="hidden" name="headings" value="yes"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="nrsvae" />
</form>
</td><td valign="top" align="right"><form method="post" action="/" enctype="multipart/form-data"><input type="hidden" name="passage" value="1 Samuel 12" />
<input type="submit" name="show passage_button" value="1 Samuel 12" />
<input type="hidden" name="vnum" value="no"  />
<input type="hidden" name="fnote" value="no"  />
<input type="hidden" name="headings" value="yes"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="nrsvae" />
</form>
</td><td valign="top" align="left">&gt;&gt;</td></tr></table>
</div><!-- class="adj" -->
</div><!-- class="bible" -->

<div class="copyright dmtog">
<hr />
<p class="dmtog">
<cite>New Revised Standard Version Bible: Anglicized Edition</cite>, copyright &copy; 1989, 1995 National Council of the Churches of Christ in the United States of America. Used by permission. All rights reserved worldwide. <a href="http://nrsvbibles.org">http://nrsvbibles.org</a>
</p>
</div><!-- class="copyright" -->

<div class="quicklink">
<form method="post" action="/" enctype="multipart/form-data"><input type="submit" name="make_quicklink" value="make Quicklink" onmouseout="return nd();" onmouseover="return overlib('Create a saved query and get an oBB Quicklink to it', 0, FIXX,-1, CAPTION,'', FGCOLOR,'#FFFCFC', BGCOLOR,'#CC3300', TEXTCOLOR,'#000000', OFFSETX,50, OFFSETY,-25, TEXTSIZE,-1, TIMEOUT,2500);" />
<input type="hidden" name="passage" value="1 Samuel 8:4-20, 11:14-15"  />
<input type="hidden" name="version" value="nrsvae"  />
<input type="hidden" name="vnum" value="no"  />
<input type="hidden" name="fnote" value="no"  />
<input type="hidden" name="headings" value="yes"  />
</form>
</div>
<hr class="quicklink" />
<div class="another">
<p>Enter another bible reference: </p><form method="post" action="/" enctype="multipart/form-data"><input type="text" name="passage" value="" size="22" maxlength="1024" /><input type="submit" name="show passage_button" value="show passage" />
<input type="hidden" name="vnum" value="no"  />
<input type="hidden" name="fnote" value="no"  />
<input type="hidden" name="headings" value="yes"  />
<input type="hidden" name="adj" value=""  />
<input type="hidden" name="version" value="nrsvae" />
</form>

</div> <!-- class="another" -->
    <div align="left" class="credits dmtog">
      <hr />
      <div class="screencredits">
	<p class="dmtog">
	  <a href="/">
<span class="obb" style="font-size: 68px; color: #D00; line-height: 0.65em;">obb</span><br />
<span class="obb" style="font-size: 18px; color: #D00">bible browser</span>
</a><br />
	    <a href="mailto:biblemail&#64;oremus.org">biblemail&#64;oremus.org</a><br />
	  v&nbsp;2.5.2<br />
	  2 April 2021
	</p>
      </div>
      <div class="printcredits">
	From the oremus Bible Browser https://bible.oremus.org v2.5.2 2 April 2021.
      </div>
    </div>

  </body>

</html>
`).querySelector("div.bibletext");
