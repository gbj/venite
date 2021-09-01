import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Page } from "../../ssg/page.ts";
const CanticleTablePage = await Page({
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "canticle-table.css")],
  main: () => <main>
    <h1>Table of Suggested Canticles</h1>
    <section class="sources">
      <a class="source" href="https://www.episcopalchurch.org/wp-content/uploads/sites/2/2019/11/bcp_compressed.pdf#page=144" target="_blank">
        <span class="label">Source</span>
        BCP p. 144-145
      </a>
    </section>
    <h2>Book of Common Prayer (1979)</h2>
    <h3>Suggested Canticles at Morning Prayer</h3>
    <table class="canticle-table">
      <tr>
        <td></td>
        <td><em>After the Old Testament Reading</em></td>
        <td><em>After the New Testament Reading</em></td>
      </tr>
      <tr>
        <td class="day-name">Sun.</td>
        <td><a href="/canticle/canticle-4">4.</a> or <a href="/canticle/canticle-16">16. Benedictus Dominus</a></td>
        <td><a href="/canticle/canticle-7">7.</a> or <a href="/canticle/canticle-21">21. Te Deum laudamus</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Advent:</em><br/><a href="/canticle/canticle-11">11. Surge, illuminare</a></td>
        <td><em>Advent and Lent:</em><br/><a href="/canticle/canticle-4">4.</a> or <a href="/canticle/canticle-16">16. Benedictus Dominus</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-14">14. Kyrie Pantokrator</a></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Easter:</em><br/><a href="/canticle/canticle-8">8. Cantemus Domino</a></td>
        <td></td>
      </tr>
      <tr class="day">
        <td class="day-name">Mon.</td>
        <td><a href="/canticle/canticle-9">9. Ecce, Deus</a></td>
        <td><a href="/canticle/canticle-19">19. Magna et Mirabilia</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Tue.</td>
        <td><a href="/canticle/canticle-2">2.</a> or <a href="/canticle/canticle-13">13. Benedictus es</a></td>
        <td><a href="/canticle/canticle-18">18. Dignus es</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Wed.</td>
        <td><a href="/canticle/canticle-11">11. Surge, illuminare</a></td>
        <td><a href="/canticle/canticle-4">4.</a> or <a href="/canticle/canticle-16">16. Benedictus Dominus</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-14">14. Kyrie Pantokrator</a></td>
        <td></td>
      </tr>
      <tr class="day">
        <td class="day-name">Thu.</td>
        <td><a href="/canticle/canticle-8">8. Cantemus Domino</a></td>
        <td><a href="/canticle/canticle-6">6.</a> or <a href="/canticle/canticle-20">20. Gloria in excelsis</a></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td><em>Advent and Lent:</em><br/><a href="/canticle/canticle-19">19. Magna et mirabilia</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Fri.</td>
        <td><a href="/canticle/canticle-10">10. Quaerite Dominum</a></td>
        <td><a href="/canticle/canticle-18">18. Dignus es</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><a href="/canticle/canticle-14">14. Kyrie Pantokrator</a></td>
        <td></td>
      </tr>
      <tr class="day">
        <td class="day-name">Sat.</td>
        <td><a href="/canticle/canticle-1">1.</a> or <a href="/canticle/canticle-12">12. Benedicite</a></td>
        <td><a href="/canticle/canticle-19">19. Magna et mirabilia</a></td>
      </tr>
    </table>
    <p><em class="rubric">On Feasts of our Lord and other Major Feasts</em></p>
    <table>
      <tr>
        <td></td>
        <td><a href="/canticle/canticle-4">4.</a> or <a href="/canticle/canticle-16">16. Benedictus Dominus</a></td>
        <td><a href="/canticle/canticle-7">7.</a> or <a href="/canticle/canticle-21">21. Te Deum laudamus</a></td>
      </tr>
    </table>
    <h3>Suggested Canticles at Evening Prayer</h3>
    <table>
      <tr>
        <td></td>
        <td><em>After the Old Testament Reading</em></td>
        <td><em>After the New Testament Reading</em></td>
      </tr>
      <tr class="day">
        <td class="day-name">Sun.</td>
        <td><a href="/canticle/canticle-3">3.</a> or <a href="/canticle/canticle-15">15. Magnificat</a></td>
        <td><a href="/canticle/canticle-5">5.</a> or <a href="/canticle/canticle-17">17. Nunc dimittis</a>*</td>
      </tr>
      <tr class="day">
        <td class="day-name">Mon.</td>
        <td><a href="/canticle/canticle-8">8. Cantemus, Domino</a></td>
        <td><a href="/canticle/canticle-5">5.</a> or <a href="/canticle/canticle-17">17. Nunc dimittis</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-14">14. Kyrie Pantokrator</a></td>
        <td></td>
      </tr>
      <tr class="day">
        <td class="day-name">Tue.</td>
        <td><a href="/canticle/canticle-10">10. Quaerite Dominum</a></td>
        <td><a href="/canticle/canticle-3">3.</a> or <a href="/canticle/canticle-15">15. Magnificat</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Wed.</td>
        <td><a href="/canticle/canticle-1">1.</a> or <a href="/canticle/canticle-12">12. Benedicite</a></td>
        <td><a href="/canticle/canticle-5">5.</a> or <a href="/canticle/canticle-17">17. Nunc dimittis</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Thu.</td>
        <td><a href="/canticle/canticle-11">11. Surge, illuminare</a></td>
        <td><a href="/canticle/canticle-3">3.</a> or <a href="/canticle/canticle-15">15. Magnificat</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Fri.</td>
        <td><a href="/canticle/canticle-2">2.</a> or <a href="/canticle/canticle-13">13. Benedictus es</a></td>
        <td><a href="/canticle/canticle-5">5.</a> or <a href="/canticle/canticle-17">17. Nunc dimittis</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Sat.</td>
        <td><a href="/canticle/canticle-9">9. Ecce, Deus</a></td>
        <td><a href="/canticle/canticle-3">3.</a> or <a href="/canticle/canticle-15">15. Magnificat</a></td>
      </tr>
    </table>
    <p><em class="rubric">On Feasts of our Lord and other Major Feasts</em></p>
    <table>
    <tr>
      <td></td>
      <td><a href="/canticle/canticle-3">3.</a> or <a href="/canticle/canticle-15">15. Magnificat</a></td>
      <td><a href="/canticle/canticle-5">5.</a> or <a href="/canticle/canticle-17">17. Nunc dimittis</a></td>
    </tr>
    </table>	
    <p><em class="rubric">* If only one Reading is used, the suggested Canticle is the Magnificat.</em></p>
  

    <section class="sources">
      <a class="source" href="https://www.churchpublishing.org/siteassets/pdf/enriching-our-worship-1/enrichingourworship1.pdf#page=44" target="_blank">
        <span class="label">Source</span>
        EOW 1 p. 44-45
      </a>
    </section>
    <h2>Enriching Our Worship 1 (1998)</h2>

    <h3>Suggested Canticles at Morning Prayer</h3>
    <h4>Supplemental Liturgical Materials and Rite II</h4>
    <table class="canticle-table">
      <tr>
        <td></td>
        <td><em>After the Old Testament reading</em></td>
        <td><em>After the New Testament reading</em></td>
      </tr>
      <tr>
        <td class="day-name">Sunday</td>
        <td><a href="/canticle/canticle-e">E. A <span class="typo">song</span> of Jerusalem Our Mother</a> <em>or</em> <br/><a href="/canticle/canticle-16-eow">16. The Song of Zechariah</a></td>
        <td><a href="/canticle/canticle-k">K. A Song of Our Adoption</a> <em>or</em> <br/><a href="/canticle/canticle-21-eow">21. We Praise You O God</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Advent:</em><br/><a href="/canticle/canticle-d">D. A <span class="typo">song</span> of the Wilderness</a></td>
        <td><em>Advent:</em><br/><a href="/canticle/canticle-p">P. A Song of the Spirit</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Christmas:*</em><br/><a href="/canticle/canticle-c">C. A Song of Hannah</a> <em>or</em> <br/><a href="/canticle/canticle-9">9. The First Song of Isaiah</a></td>
        <td><em>Christmas:*</em><br/><a href="/canticle/canticle-n">N. A Song of God’s Love</a> <em>or</em> <br/><a href="/canticle/canticle-20">2. Glory to God</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-h">H. A Song of Hosea</a></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-l">L. A Song of Christ’s Humility</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Easter:</em><br/><a href="/canticle/canticle-a">A. A Song of Wisdom</a> <em>or</em> <br/><a href="/canticle/canticle-8">8. The Song of Moses</a></td>
        <td><em>Easter:</em><br/><a href="/canticle/canticle-m">M. A Song of Faith</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Monday</td>
        <td><a href="/canticle/canticle-c">C. A Song of Hannah</a> <em>or</em> <br/><a href="/canticle/canticle-11">11. The Third Song of Isaiah</a></td>
        <td><a href="/canticle/canticle-l">L. A Song of Christ’s Humility</a> <em>or</em> <br/><a href="/canticle/canticle-q">Q. A Song of Christ’s Goodness</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Tuesday</td>
        <td><a href="/canticle/canticle-b">B. A Song of Pilgrimage</a> <em>or</em> <br/><a href="/canticle/canticle-13">13. A Song of Praise</a></td>
        <td><a href="/canticle/canticle-m">L. A Song of Faith</a> <em>or</em> <br/><a href="/canticle/canticle-n">N. A Song of God’s Love</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Wednesday</td>
        <td><a href="/canticle/canticle-g">C. A Song of Ezekiel</a> <em>or</em> <br/><a href="/canticle/canticle-h">H. A Song of Hosea</a></td>
        <td><a href="/canticle/canticle-p">P. A Song of the Spirit</a> <em>or</em> <br/><a href="/canticle/canticle-s">S. A Song of Our True Nature</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-i">I. A Song of Jonah</a> <em>or</em> <br/><a href="/canticle/canticle-10">10. The Second Song of Isaiah</a></td>
        <td></td>
      </tr>
      <tr class="day">
        <td class="day-name">Thursday</td>
        <td><a href="/canticle/canticle-a">A. A Song of Wisdom</a> <em>or</em> <br/><a href="/canticle/canticle-j">J. A Song of Judith</a></td>
        <td><a href="/canticle/canticle-r">R. A Song of True Motherhood</a> <em>or</em> <br/><a href="/canticle/canticle-16-eow">16. A Song of Zechariah</a></td>
      </tr>
      <tr>
        <td class="day-name">Friday</td>
        <td><a href="/canticle/canticle-i">I. A Song of Jonah</a></td>
        <td><a href="/canticle/canticle-18">18. A Song to the Lamb</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Christmas:*</em><br/><a href="/canticle/canticle-j">J. A Song of Judith</a></td>
        <td><em>Christmas:*</em><br/><a href="/canticle/canticle-r">R. A Song of True Motherhood</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-f">F. A Song of Lamentation</a> <em>or</em> <br/><a href="/canticle/canticle-14">14. A Song of Penitence</a></td>
        <td><em>Lent:</em><br/><a href="/canticle/canticle-s">S. A Song of Our True Nature</a></td>
      </tr>
      <tr>
        <td></td>
        <td><em>Easter:</em><br/><a href="/canticle/canticle-g">G. A Song of Ezekiel</a></td>
        <td><em>Easter:</em><br/><a href="/canticle/canticle-k">K. A Song of Our Adoption</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Saturday</td>
        <td><a href="/canticle/canticle-12">C. A Song of Creation</a> <em>or</em> <br/><a href="/canticle/canticle-d">D. A Song of the Wilderness</a></td>
        <td><a href="/canticle/canticle-o">L. A Song of the Heavenly City</a> <em>or</em> <br/><a href="/canticle/canticle-19">19. The Song of the Redeemed</a></td>
      </tr>
    </table>
    <p><em class="rubric">on Feasts of Our Lord and other Major Feasts</em></p>
    <table>
      <tr>
        <td></td>
        <td><a href="/canticle/canticle-16-eow">16. A Song of Zechariah</a> <em>or</em><br/> <a href="/canticle/canticle-e">E. A Song of Jerusalem Our Mother</a></td>
        <td><a href="/canticle/canticle-21-eow">21. We Praise You O God</a> <em>or</em><br/> <a href="/canticle/canticle-k">K. A <span class="typo">Son</span> of Our Adoption</a></td>
      </tr>
    </table>
    <p><em class="rubric">*Canticles appointed for Christmas may be used through the First Sunday after the Epiphany.</em></p>
    <h3>Suggested Canticles at Evening Prayer</h3>
    <h4>Supplemental Liturgical Materials and Rite II</h4>
    <table>
      <tr>
        <td></td>
        <td><em>After the Old Testament reading</em></td>
        <td><em>After the New Testament reading</em></td>
      </tr>
      <tr class="day">
        <td class="day-name">Sunday</td>
        <td><a href="/canticle/canticle-15-eow"><span class="typo">16.</span> The Song of Mary</a></td>
        <td><a href="/canticle/canticle-17">The Song of Simeon</a>** <em>or</em><br/> <a href="/canticle/canticle-m">A Song of Faith</a>**</td>
      </tr>
      <tr class="day">
        <td class="day-name">Monday</td>
        <td><a href="/canticle/canticle-a">A. A Song of Wisdom</a></td>
        <td><a href="/canticle/canticle-n">N. A Song of God’s Love</a> <em>or</em> <br/><a href="/canticle/canticle-17">The Song of Simeon</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Tuesday</td>
        <td><a href="/canticle/canticle-D">D. A Song of the Wilderness</a></td>
        <td><a href="/canticle/canticle-15-eow"><span class="typo">16.</span> The Song of Mary</a> <em>or</em> <br/><a href="/canticle/canticle-p">P. A Song of the Spirit</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Wednesday</td>
        <td><a href="/canticle/canticle-C">C. The Song of Hannah</a></td>
        <td><a href="/canticle/canticle-l">L. A Song of Christ’s Humility</a> <em>or</em> <br/><a href="/canticle/canticle-17">The Song of Simeon</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Thursday</td>
        <td><a href="/canticle/canticle-j">J. A Song of Judith</a></td>
        <td><a href="/canticle/canticle-15-eow"><span class="typo">16.</span> The Song of Mary</a> <em>or</em> <br/><a href="/canticle/canticle-s">S. A Song of Our True Nature</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Friday</td>
        <td><a href="/canticle/canticle-g">C. A Song of Ezekiel</a></td>
        <td><a href="/canticle/canticle-q">Q. A Song of Christ’s Goodness</a> <em>or</em> <br/><a href="/canticle/canticle-17">The Song of Simeon</a></td>
      </tr>
      <tr class="day">
        <td class="day-name">Saturday</td>
        <td><a href="/canticle/canticle-b">B. A Song of Pilgrimage</a></td>
        <td><a href="/canticle/canticle-15-eow"><span class="typo">16.</span> The Song of Mary</a> <em>or</em> <br/><a href="/canticle/canticle-r">R. A Song of True Motherhood</a></td>
    </tr>
    </table>
    <p><em class="rubric">on Feasts of Our Lord and other Major Feasts</em></p>
    <table>
    <tr>
      <td></td>
      <td><a href="/canticle/canticle-15-eow"><span class="typo">16.</span> The Song of Mary</a> <em>or</em> <br/><a href="/canticle/canticle-s">S. A Song of Our True Nature</a></td>
      <td><a href="/canticle/canticle-o">O. A Song of the Heavenly City</a>** <em>or</em><br/> <a href="/canticle/canticle-17">The Song of Simeon</a>**</td>
    </tr>
    </table>	
    <p><em class="rubric">** If only one reading is used, the suggested canticle is The Song of Mary.</em></p>
    <details class="disclaimer">
      <summary>Please Note</summary>
      <p>The published edition of Enriching Our Worship 1 includes a handful of typographical errors in the table of suggested canticles.</p>
      <p>For the sake of fidelity to the published texts, I’ve left them as written and marked them with a light yellow highlight. They will, however, link to the correct canticles.</p>
    </details>
  </main>
});
export default CanticleTablePage;